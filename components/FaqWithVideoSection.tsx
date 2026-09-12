'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Play } from 'lucide-react';

export default function FaqWithVideoSection({ t = {}, lang = 'fr' }: any) {
    const [openIdx, setOpenIdx] = useState<number | null>(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const safeT = t || {};

    const recipeBadge = safeT.recipeBadge || (lang === 'ar' ? 'وصفة الفطور الصحي' : 'Recette Petit-Déjeuner');
    const recipeTitle = safeT.recipeTitle || (lang === 'ar' ? 'كيفاش تحضّر فطور صحّي ولذيذ f 2 دقائق بـ الجرانولا والياغورت' : 'Comment préparer un petit-déjeuner sain en 2 min avec le Granola');
    const recipeDesc = safeT.recipeDesc || (lang === 'ar' ? 'استمتع بقرمشة الجرانولا الطبيعية مع الياغورت والفواكه الطازجة لفطور غني بالفيتمينات والطاقة طيلة اليوم.' : 'Savourez le croustillant de notre granola naturel avec du yaourt et des fruits frais pour faire le plein d énergie.');
    const faqBadge = safeT.faqBadge || (lang === 'ar' ? 'أسئلة شائعة' : 'Questions Fréquentes');
    const faqTitle = safeT.faqTitle || (lang === 'ar' ? 'كل ما تحتاج معرفته قبل الطلب' : 'Tout ce que vous devez savoir');

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play().catch(() => {});
                setIsPlaying(true);
            }
        }
    };

    const faqs = [
        {
            q: lang === 'ar' ? "كيف تتم عملية التوصيل والدفع؟" : "Comment se déroule la livraison et le paiement?",
            a: lang === 'ar' ? "تصلك الطلبية خلال 24 إلى 48 ساعة والدفع نقداً عند الاستلام مع إمكانية المعاينة قبل الأداء." : "Livraison express en 24h/48h partout au Maroc avec paiement Cash à la livraison après vérification du colis."
        },
        {
            q: lang === 'ar' ? "كم هي مدة صلاحية أكياس الجرانولا؟" : "Quelle est la durée de conservation du Granola?",
            a: lang === 'ar' ? "بفضل أكياس Doypack الكرافت المحكمة الإغلاق مع Zip، تحافظ الجرانولا على قرمشتها وطراوتها حتى 6 أشهر." : "Grâce au sachet Doypack hermétique avec zip, votre granola conserve son croustillant jusqu à 6 mois."
        },
        {
            q: lang === 'ar' ? "هل المنتجات خالية من السكر المكرر؟" : "Les produits sont-ils sans sucre raffiné?",
            a: lang === 'ar' ? "نعم 100%! منتجاتنا محلاة حصرياً بعسل الليمون الحر وزيت الأركان البيو وبدون أي مواد حافظة." : "Oui 100%! Nos recettes sont sucrées exclusivement au miel pur d oranger et huile d Argan bio."
        }
    ];

    return (
        <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 text-[#1E3A2B] my-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

                {/* Video Player Column */}
                <div className="bg-[#1E3A2B] text-[#FDFBF7] rounded-2xl p-4 sm:p-6 shadow-md border border-emerald-900/60 space-y-3.5">
                    <div className="flex items-center gap-2 text-[#D97706] text-[11px] font-bold uppercase tracking-wider">
                        <Sparkles size={14} />
                        <span>{recipeBadge}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {recipeTitle}
                    </h3>

                    {/* Custom Video Player Container */}
                    <div
                        className="relative rounded-xl overflow-hidden bg-[#142A1E] border border-emerald-800/60 aspect-video w-full shadow-inner group cursor-pointer"
                        onClick={togglePlay}
                    >
                        <video
                            ref={videoRef}
                            controls
                            playsInline
                            muted
                            preload="metadata"
                            poster="/doypack_miel_amandes.png"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            className="w-full h-full object-cover"
                        >
                            <source src="/granola.mp4" type="video/mp4" />
                            <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
                        </video>

                        {/* Dark Overlay with Blur to maximize Play Button contrast */}
                        {!isPlaying && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1.5px] flex items-center justify-center transition-all pointer-events-none group-hover:bg-black/30">
                                <div className="w-14 h-14 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition duration-300 ring-4 ring-white/20">
                                    <Play size={24} className="ml-1 fill-white" />
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="text-[11px] text-[#F4EFEA]/80 font-medium leading-relaxed">
                        {recipeDesc}
                    </p>
                </div>

                {/* FAQ Accordion Column */}
                <div className="bg-[#F4EFEA] border border-[#1E3A2B]/10 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#D97706]">{faqBadge}</span>
                        <h3 className="text-base sm:text-lg font-bold text-[#1E3A2B]">{faqTitle}</h3>
                    </div>

                    <div className="space-y-2">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div key={idx} className="bg-white border border-[#1E3A2B]/15 rounded-xl overflow-hidden shadow-2xs transition">
                                    <button
                                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                                        className="w-full p-3.5 text-left flex justify-between items-center text-xs font-bold text-[#1E3A2B] hover:text-[#D97706] transition gap-2"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown size={15} className={`shrink-0 transition-transform duration-300 \${isOpen ? 'rotate-180 text-[#D97706]' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden bg-[#FDFBF7]"
                                            >
                                                <p className="p-3.5 pt-1 text-[11px] text-[#1E3A2B]/80 font-medium leading-relaxed border-t border-slate-100">{faq.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
