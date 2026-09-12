'use client';

import { useState, useEffect } from 'react';
import { Plus, ShoppingBag, X, ChevronLeft, ChevronRight, Clock, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../lib/products';

export default function CustomPackBuilder({ onOrderCustomPack, t, lang }: any) {
    const [selectedPack, setSelectedPack] = useState<any[]>([]);
    const [startIndex, setStartIndex] = useState(0);

    // Countdown Timer State
    const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 15 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return { hours: 4, minutes: 30, seconds: 0 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const addFlavor = (prod: any) => {
        if (selectedPack.length >= 3) return;
        setSelectedPack([...selectedPack, prod]);
    };

    const removeItem = (index: number) => {
        setSelectedPack(selectedPack.filter((_, i) => i !== index));
    };

    const clearAll = () => {
        setSelectedPack([]);
    };

    const handleNext = () => {
        if (startIndex + 3 < PRODUCTS.length) setStartIndex(startIndex + 1);
        else setStartIndex(0);
    };

    const handlePrev = () => {
        if (startIndex > 0) setStartIndex(startIndex - 1);
        else setStartIndex(PRODUCTS.length - 3);
    };

    const handleOrder = () => {
        if (selectedPack.length < 3) {
            return alert(lang === 'ar' ? 'المرجو اختيار 3 أكياس لإكمال العلبة' : 'Veuillez choisir 3 sachets pour compléter le pack');
        }
        onOrderCustomPack({
            name: lang === 'ar' ? 'علبة ثلاثية 1.5 KG (3 أكياس x 500g)' : 'Pack Trio 1.5 KG (3 Sachets x 500g)',
            price: 210,
        });
    };

    const visibleProducts = PRODUCTS.slice(startIndex, startIndex + 3);

    return (
        <section id="custom-pack" className="py-10 my-10 bg-[#1E3A2B] dark:bg-[#08120D] text-[#FDFBF7] rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-900/40 transition-colors duration-300">

            {/* Header Badges & Countdown */}
            <div className="max-w-2xl mx-auto text-center space-y-2.5 mb-6">
                <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="px-3.5 py-1 bg-[#D97706] text-white font-bold text-[10px] rounded-full uppercase tracking-widest inline-block shadow-xs">
            {t.packBadge}
          </span>

                    <span className="px-3 py-1 bg-[#152B1E] text-amber-200 font-bold text-[10px] rounded-full border border-emerald-700/50 flex items-center gap-1 shadow-xs">
            <Clock size={11} className="text-amber-300" />
            <span>{String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s</span>
          </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white tracking-normal">{t.packTitle}</h2>

                <p className="text-xs text-[#F4EFEA]/80 font-medium leading-relaxed max-w-lg mx-auto">
                    {t.packSub}
                </p>
            </div>

            {/* Selected Slots Bar */}
            <div className="max-w-md mx-auto bg-[#152B1E] dark:bg-[#0D1C14] border border-emerald-800/40 rounded-xl p-3.5 mb-6 shadow-inner">
                <div className="flex justify-between items-center mb-2.5 text-xs font-bold border-b border-emerald-800/40 pb-2 text-[#FDFBF7]">
                    <span>{t.selectedLabel}</span>
                    <div className="flex items-center gap-3">
            <span className="text-[#D97706] font-bold text-sm">
              {selectedPack.length}/3 {lang === 'ar' ? 'أكياس (500g)' : 'Sachets (500g)'}
            </span>

                        {selectedPack.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="text-[10px] text-red-300 hover:text-white flex items-center gap-1 bg-red-950/40 hover:bg-red-900/80 px-2 py-0.5 rounded-md border border-red-800/40 transition"
                            >
                                <RotateCcw size={10} /> {lang === 'ar' ? 'مسح' : 'Vider'}
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                    {[0, 1, 2].map((idx) => {
                        const item = selectedPack[idx];
                        return (
                            <div key={idx} className="h-22 rounded-xl border border-dashed border-emerald-700/40 flex flex-col items-center justify-center p-2 text-center relative bg-[#1B3626] dark:bg-[#12241A]">
                                {item ? (
                                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                        <img src={item.image} alt="" className="w-9 h-9 rounded-full object-cover mb-1 border border-[#D97706]" />
                                        <span className="text-[9px] font-bold text-white line-clamp-1">{lang === 'ar' ? item.nameAr : item.nameFr}</span>
                                        <span className="text-[8px] text-[#FDFBF7]/70 font-semibold">500g</span>
                                        <button onClick={() => removeItem(idx)} className="absolute -top-1.5 -right-1.5 bg-[#1E3A2B] text-white border border-emerald-700 rounded-full p-0.5 hover:bg-red-600 transition">
                                            <X size={10} />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <span className="text-[9px] text-emerald-300/40 font-semibold">+ {lang === 'ar' ? `كيس 500g (${idx + 1})` : `Sachet 500g (${idx + 1})`}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Product Carousel */}
            <div className="relative max-w-3xl mx-auto mb-6 px-7">
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#152B1E] text-white border border-emerald-800/40 hover:bg-[#1C3A29] transition z-10"
                >
                    <ChevronLeft size={18} />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <AnimatePresence mode="popLayout">
                        {visibleProducts.map((prod) => {
                            const name = lang === 'ar' ? prod.nameAr : prod.nameFr;

                            return (
                                <motion.div
                                    key={prod.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-[#152B1E] dark:bg-[#0D1C14] border border-emerald-800/30 rounded-xl p-3 flex flex-col justify-between shadow-xs"
                                >
                                    <img src={prod.image} alt={name} className="w-full h-24 object-cover rounded-lg mb-2 bg-[#1B3626] dark:bg-[#12241A]" />
                                    <h4 className="text-[11px] font-bold text-white line-clamp-1">{name}</h4>
                                    <p className="text-[9px] text-[#FDFBF7]/70 font-medium mb-2">Grand Format 500g</p>

                                    {/* Button text updated to Choisir / اختيار instead of Ajouter */}
                                    <button
                                        onClick={() => addFlavor(prod)}
                                        disabled={selectedPack.length >= 3}
                                        className="w-full py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg text-[10px] font-bold transition disabled:opacity-30 flex items-center justify-center gap-1"
                                    >
                                        <Plus size={12} /> {lang === 'ar' ? 'اختيار (500g)' : 'Choisir (500g)'}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#152B1E] text-white border border-emerald-800/40 hover:bg-[#1C3A29] transition z-10"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Main CTA Button */}
            <div className="text-center">
                <button
                    onClick={handleOrder}
                    disabled={selectedPack.length < 3}
                    className="px-8 py-3.5 bg-[#FDFBF7] text-[#1E3A2B] font-bold rounded-xl shadow-md hover:bg-white transition inline-flex items-center gap-2 text-xs disabled:opacity-40"
                >
                    <ShoppingBag size={15} /> {t.packCta} (210 DH)
                </button>
            </div>
        </section>
    );
}
