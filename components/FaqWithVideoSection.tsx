'use client';

import { useState, useRef } from 'react';
import { Play, Pause, ChevronDown, HelpCircle, Video } from 'lucide-react';

export interface FaqWithVideoSectionProps {
    lang?: 'fr' | 'ar' | string;
    t?: any;
}

export default function FaqWithVideoSection({ t, lang = 'fr' }: FaqWithVideoSectionProps) {
    const [openIdx, setOpenIdx] = useState<number | null>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const isAr = lang === 'ar';

    const defaultFaqs = [
        {
            q: isAr ? 'كيفاش نقدر نطلب المنتجات؟' : 'Comment puis-je passer une commande ?',
            a: isAr ? 'تقدر تطلب مباشرة عبر الموقع باختيار المنتجات أو الـ Pack المناسب، وتدخل معلوماتك (الاسم، الهاتف، المدينة) فـ نموذج الدفع عند الاستلام (COD).' : 'Vous pouvez commander directement sur le site en choisissant vos produits ou votre Pack, puis en remplissant vos coordonnées dans le formulaire de paiement à la livraison.'
        },
        {
            q: isAr ? 'شحال كاياخد التوصيل من وقت؟' : 'Quels sont les délais de livraison ?',
            a: isAr ? 'التوصيل سريع كاياخد من 24 إلى 48 ساعة فـ جميع المدن المغربية.' : 'La livraison est rapide et prend entre 24 et 48 heures partout au Maroc.'
        },
        {
            q: isAr ? 'واش كاين الدفع عند الاستلام؟' : 'Proposez-vous le paiement à la livraison ?',
            a: isAr ? 'نعم! كاتفحص الطلبية ديالك وتتأكد منها عاد كادفع للموزع.' : 'Oui ! Vous vérifiez votre commande à la réception avant de payer le livreur.'
        },
        {
            q: isAr ? 'واش المنتجات طبيعية 100%؟' : 'Les produits sont-ils 100% naturels ?',
            a: isAr ? 'نعم، جميع منتجات ميزون فاكهة طبيعية، بدون مواد حافظة وبدون سكر مضاف.' : 'Oui, tous les produits Maison Fakia sont 100% naturels, sans conservateurs ni sucres ajoutés.'
        }
    ];

    return (
        <section className="py-16 bg-[#FDFBF7] border-t border-slate-200/60" id="faq">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded-full">
            <HelpCircle size={14} />
              {t?.faqBadge || (isAr ? 'أسئلة شائعة' : 'FAQ & Démonstration')}
          </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B]">
                        {t?.faqTitle || (isAr ? 'كل ما تحتاج معرفته عن منتجاتنا' : 'Tout Ce Que Vous Devez Savoir')}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">

                    {/* Video Box */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 p-4 space-y-4">
                        <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center">
                            <video
                                ref={videoRef}
                                src="/granola.mp4"
                                poster="/doypack_3_flavors_lineup.png"
                                className="w-full h-full object-cover"
                                onEnded={() => setIsPlaying(false)}
                            />
                            <button
                                onClick={toggleVideo}
                                className="absolute w-14 h-14 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full flex items-center justify-center shadow-xl transition cursor-pointer hover:scale-105"
                            >
                                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                            </button>
                        </div>
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center shrink-0">
                                <Video size={20} />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#1E3A2B]">
                                    {t?.recipeTitle || (isAr ? 'طريقة التحضير والجودة' : 'Découvrez Nos Produits')}
                                </h4>
                                <p className="text-[11px] text-slate-500 font-medium">
                                    {t?.recipeDesc || (isAr ? 'شاهد مكونات الجرانولا الطبيعية وكيفية إعدادها' : 'Aperçu vidéo de nos ingrédients 100% naturels')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-3">
                        {defaultFaqs.map((item, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs transition"
                                >
                                    <button
                                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                                        className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-[#1E3A2B] hover:text-[#D97706] transition cursor-pointer"
                                    >
                                        <span>{item.q}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#D97706]' : 'text-slate-400'}`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-3">
                                            {item.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
}
