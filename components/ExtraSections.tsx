'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronLeft, ChevronRight, CheckCheck } from 'lucide-react';

/* =====================================================================
   1. TESTIMONIALS SECTION (EDGE-TO-EDGE BEIGE BACKGROUND)
   ===================================================================== */
export function TestimonialsSection({ lang = 'fr', t }: { lang?: string; t?: any }) {
    const [activeTab, setActiveTab] = useState(0);

    const ugcFeedbacks = [
        {
            name: lang === 'ar' ? 'أمينة من الرباط' : 'Amina (Rabat)',
            time: '14:23',
            text: lang === 'ar'
                ? 'سلام خويا، وصلني الباك Trio اليوم. تبارك الله القرمشة ديال العسل واللوز طوب! والعيد قريب عاود نكواندي 😋'
                : 'Bonjour! J ai bien reçu le Pack Trio aujourd hui. Le granola Miel & Amandes est juste délicieux et hyper croustillant! 👍',
            product: lang === 'ar' ? 'جرانولا العسل واللوز' : 'Granola Miel & Amandes',
            image: '/doypack_miel_amandes.png',
        },
        {
            name: lang === 'ar' ? 'كريم من الدار البيضاء' : 'Karim (Casablanca)',
            time: '18:45',
            text: lang === 'ar'
                ? 'تبارك الله عليكم، جربت الجرانولا د الشوكولاتة السوداء مع الياغورت فالفطور، طاقة عجيبة ديال السبور! 💪'
                : 'Franchement bravo! Le Granola Chocolat Noir avec le yaourt le matin c est le top pour le sport.',
            product: lang === 'ar' ? 'جرانولا الشوكولاتة السوداء' : 'Granola Chocolat Noir',
            image: '/doypack_chocolat_noir.png',
        },
        {
            name: lang === 'ar' ? 'فاطمة الزهراء من مراكش' : 'Fatima-Zohra (Marrakech)',
            time: '11:10',
            text: lang === 'ar'
                ? 'التوصيل سريع وصلاتني فالوقت، والأهم الأملو وأركان كيبان حر 100%. شكراً بزاف على الجودة 👌'
                : 'Livraison très rapide en 24h et la qualité Amlou & Argan est au rendez-vous. Merci beaucoup!',
            product: lang === 'ar' ? 'جرانولا أملو وأركان' : 'Granola Amlou & Argan',
            image: '/doypack_amlou_argan.png',
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % ugcFeedbacks.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [ugcFeedbacks.length]);

    return (
        /* EDGE-TO-EDGE FULL-WIDTH BG */
        <section className="w-full bg-[#F4EFEA] py-16 px-4 sm:px-6 border-t border-[#1E3A2B]/10">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Title */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 text-[#D97706] text-xs font-bold uppercase tracking-widest">
                        <MessageSquare size={14} />
                        <span>{lang === 'ar' ? 'آراء الزبناء' : 'Avis Clients'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1E3A2B]">
                        {lang === 'ar' ? 'ماذا يقول زبناؤنا؟' : 'Ce que disent nos clients'}
                    </h2>
                    <div className="w-12 h-0.5 bg-[#D97706] mx-auto rounded-full opacity-80" />
                </div>

                {/* Balanced Card */}
                <div className="bg-white border border-[#1E3A2B]/10 rounded-2xl p-6 sm:p-10 shadow-sm relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                        >
                            {/* Product Image - Larger & Better Balanced */}
                            <div className="md:col-span-5 flex justify-center">
                                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-[#FDFBF7] p-4 border border-slate-100 flex items-center justify-center shadow-inner">
                                    <Image
                                        src={ugcFeedbacks[activeTab].image}
                                        alt={ugcFeedbacks[activeTab].product}
                                        width={180}
                                        height={180}
                                        className="object-contain max-h-40 sm:max-h-44 drop-shadow-md"
                                    />
                                </div>
                            </div>

                            {/* WhatsApp Message Content */}
                            <div className="md:col-span-7 space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                    <div>
                                        <span className="text-sm font-extrabold text-[#1E3A2B] block">{ugcFeedbacks[activeTab].name}</span>
                                        <span className="text-xs text-slate-500 font-semibold">{ugcFeedbacks[activeTab].product}</span>
                                    </div>
                                    <span className="text-xs text-slate-400 font-medium">{ugcFeedbacks[activeTab].time}</span>
                                </div>

                                <div className="bg-[#EAF0E8] p-4 rounded-2xl border border-emerald-900/10 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium shadow-2xs">
                                    <p>"{ugcFeedbacks[activeTab].text}"</p>
                                    <div className="flex justify-end items-center gap-1 mt-3 text-[10px] text-emerald-800 font-bold">
                                        <span>{ugcFeedbacks[activeTab].time}</span>
                                        <CheckCheck size={15} className="text-emerald-700" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots & Navigation */}
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-6">
                        <div className="flex gap-2">
                            {ugcFeedbacks.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                        activeTab === idx ? 'w-8 bg-[#D97706]' : 'w-2.5 bg-slate-200'
                                    }`}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setActiveTab((prev) => (prev > 0 ? prev - 1 : ugcFeedbacks.length - 1))}
                                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#1E3A2B] hover:bg-[#D97706] hover:text-white transition cursor-pointer"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setActiveTab((prev) => (prev < ugcFeedbacks.length - 1 ? prev + 1 : 0))}
                                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#1E3A2B] hover:bg-[#D97706] hover:text-white transition cursor-pointer"
                                aria-label="Next"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

/* =====================================================================
   2. FOOTER (EDGE-TO-EDGE FULL WIDTH)
   ===================================================================== */
export function Footer({ lang = 'fr', t }: { lang?: string; t?: any }) {
    return (
        <footer className="w-full bg-[#FDFBF7] text-[#1E3A2B] border-t border-[#1E3A2B]/10 py-10 px-4 font-sans">
            <div className="max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-3">
                <h3 className="text-xl font-light tracking-[0.25em] text-[#1E3A2B] uppercase font-serif">
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
