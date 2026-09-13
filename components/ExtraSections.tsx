'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 1. SECTION AVIS CLIENTS (Softer Warm White Text Edition)
export function TestimonialsSection({ lang = 'fr', t }: { lang?: string; t?: any }) {
    const isAr = lang === 'ar';

    const reviews = [
        {
            name: 'Sarah A.',
            city: 'Casablanca',
            cityAr: 'الدار البيضاء',
            productFr: 'Adepte du Granola Amlou & Argan',
            productAr: 'عاشقة لجرانولا أملو وأركان',
            image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80',
            textAr: 'أحسن جرانولا جربت فالمغرب! الريحة ديال أملو وزيت الأركان البلدي كتشهي منين كتحل الباك.',
            textFr: 'L\'odeur de l\'Amlou artisanal dès l\'ouverture du Doypack est magique. Un vrai régal sain pour toute la famille.',
        },
        {
            name: 'Ilham M.',
            city: 'Marrakech',
            cityAr: 'مراكش',
            productFr: 'Consommatrice du Pack Trio',
            productAr: 'زبونة جربت باك تريو',
            image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80',
            textAr: 'باك تريو جاني ممتاز ومقرمش! النكهات بثلاثة بيهم لُذاذ بزاف وبدون سكر مضاف. التوصيل كان سريع لمراكش.',
            textFr: 'Le Pack Trio est d\'une fraîcheur incroyable. Le mélange Amlou & Argan est devenu mon petit-déjeuner quotidien.',
        },
        {
            name: 'Dr. Mehdi K.',
            city: 'Rabat',
            cityAr: 'الرباط',
            productFr: 'Amateur du Granola Miel & Amandes',
            productAr: 'عاشق لجرانولا العسل واللوز',
            image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
            textAr: 'كمختص في التغذية، كنقدر بزاف الجودة ديال المكونات الطبيعية والعسل الحر. سناك صحي ومغذي للرياضة والعمل.',
            textFr: 'En tant que professionnel de santé, je valide à 100% la composition. Du miel pur, des amandes de qualité et aucun additif.',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto Slider كل 5 ثواني
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [reviews.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const currentReview = reviews[currentIndex];

    return (
        <section className="py-10 my-6 bg-[#1E3A2B] rounded-2xl border border-[#1E3A2B] text-slate-200 overflow-hidden shadow-md font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Sub-header Badge */}
                <div className="text-center mb-6 space-y-1.5">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#D97706] bg-white/10 px-3 py-0.5 rounded-full inline-block border border-white/10">
                        {isAr ? 'شهادات موثوقة' : 'Avis & Expériences'}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-100">
                        {isAr ? 'تجربة عُشّاق Maison Fakia' : 'L\'Art de Vivre Maison Fakia'}
                    </h2>
                </div>

                {/* Split Card Container */}
                <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 backdrop-blur-xs">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">

                        {/* 1. Image Side */}
                        <div className="md:col-span-5 relative h-48 sm:h-64 md:h-72 rounded-lg overflow-hidden shadow-xs">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentReview.image}
                                    src={currentReview.image}
                                    alt={currentReview.name}
                                    initial={{ opacity: 0, scale: 1.03 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {/* Top Clean Badge */}
                            <div className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[9px] font-bold text-slate-200 tracking-widest uppercase">
                                {isAr ? 'فطور صحي' : 'Petit-Déjeuner'}
                            </div>
                        </div>

                        {/* 2. Content Side */}
                        <div className="md:col-span-7 flex flex-col justify-between h-full min-h-[220px] sm:min-h-[250px] space-y-4 px-1 sm:px-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -15 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-3"
                                >
                                    {/* Quotation Mark */}
                                    <div className="text-[#D97706]/70 text-4xl sm:text-5xl font-bold leading-none select-none -mb-2">
                                        “
                                    </div>

                                    {/* Quote Text - Softer Off-White (slate-200) */}
                                    <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-200/90 pr-2">
                                        {isAr ? currentReview.textAr : currentReview.textFr}
                                    </p>

                                    {/* Customer Info */}
                                    <div className="pt-3 border-t border-white/10">
                                        <h3 className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">
                                            {currentReview.name}
                                        </h3>
                                        <p className="text-[11px] text-[#D97706] font-semibold mt-0.5">
                                            {isAr ? currentReview.productAr : currentReview.productFr} — <span className="text-slate-300/80 font-medium">{isAr ? currentReview.cityAr : currentReview.city}</span>
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Controls */}
                            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                                {/* Dots */}
                                <div className="flex items-center gap-1.5">
                                    {reviews.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`h-1 rounded-full transition-all duration-300 ${
                                                idx === currentIndex
                                                    ? 'w-6 bg-[#D97706]'
                                                    : 'w-1.5 bg-white/20 hover:bg-white/50'
                                            }`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* Arrows */}
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={handlePrev}
                                        className="p-1.5 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 text-slate-200 transition active:scale-95 cursor-pointer"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft size={14} />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="p-1.5 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 text-slate-200 transition active:scale-95 cursor-pointer"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

// 2. FOOTER (EDGE-TO-EDGE FULL WIDTH)
export function Footer({ lang = 'fr' }: { lang?: string }) {
    return (
        <footer className="w-full bg-[#FDFBF7] text-[#1E3A2B] border-t border-[#1E3A2B]/10 py-10 px-4 font-sans">
            <div className="max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-3">
                <h3 className="text-xl font-light tracking-[0.25em] text-[#1E3A2B] uppercase">
                    Maison Fakia
                </h3>
                <p className="text-xs text-[#1E3A2B]/70 font-medium max-w-sm leading-relaxed">
                    {lang === 'ar'
                        ? 'جرانولا ومأكولات صحية مغربية 100% بعسل الليمون وزيت الأركان الطبيعي.'
                        : 'Provisions saines & Granola artisanal du Maroc au Miel pur d Oranger & Huile d Argan.'}
                </p>
                <div className="pt-3 border-t border-[#1E3A2B]/10 w-full max-w-xs text-[11px] text-[#1E3A2B]/50 font-medium">
                    <p>© 2026 Maison Fakia. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}</p>
                </div>
            </div>
        </footer>
    );
}