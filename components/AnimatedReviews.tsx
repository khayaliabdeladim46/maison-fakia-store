'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function AnimatedReviews({ t, lang }: any) {
    const [index, setIndex] = useState(0);

    const reviews = [
        { name: lang === 'ar' ? "سارة بناني (الدار البيضاء)" : "Sarra B. (Casablanca)", text: lang === 'ar' ? "جرانولا أملو ممتازة جداً والقرمشة تبقى جيدة في كيس دويباك." : "Le Granola Amlou est excellent et le croustillant reste intact dans le sachet Doypack." },
        { name: lang === 'ar' ? "د. مهدي كباج (الرباط)" : "Dr. Mehdi K. (Rabat)", text: lang === 'ar' ? "منتج صحي وطبيعي والتوصيل كان سريعاً في 24 ساعة." : "Produit très sain au miel pur, livraison rapide en 24h à Rabat." },
        { name: lang === 'ar' ? "ياسمين لشهب (مراكش)" : "Yasmine L. (Marrakech)", text: lang === 'ar' ? "طعم العسل الحر ممتاز والتغليف أنيق جداً." : "Goût du miel pur très authentique et packaging très propre." },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [reviews.length]);

    return (
        <section id="reviews" className="py-12 my-10 bg-[#F4EFEA] border border-[#1E3A2B]/10 rounded-3xl text-[#1E3A2B] p-6 text-center shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706] block mb-1">Avis Verified</span>
            <h2 className="text-xl font-black mb-6 uppercase tracking-wider">{t.reviewsTitle}</h2>

            <div className="max-w-xl mx-auto min-h-[100px] relative flex items-center justify-center bg-white p-6 rounded-2xl border border-[#1E3A2B]/10 shadow-sm">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-2"
                    >
                        <p className="text-xs md:text-sm font-medium italic leading-relaxed text-[#1E3A2B]/90">&quot;{reviews[index].text}&quot;</p>
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 pt-2 border-t border-slate-100">
                            <CheckCircle size={14} />
                            <span>{reviews[index].name}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-1.5 mt-4">
                {reviews.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${index === i ? 'w-6 bg-[#D97706]' : 'w-2 bg-[#1E3A2B]/20'}`} />
                ))}
            </div>
        </section>
    );
}