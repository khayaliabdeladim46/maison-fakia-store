'use client';

import { Star, Truck, ShieldCheck, Heart, Phone, MapPin } from 'lucide-react';

export interface ExtraSectionsProps {
    lang?: 'fr' | 'ar' | string;
    t?: any;
}

export function TestimonialsSection({ lang = 'fr', t }: ExtraSectionsProps) {
    const isAr = lang === 'ar';

    const reviews = [
        {
            name: isAr ? 'سارة من الدار البيضاء' : 'Sarah M. (Casablanca)',
            comment: isAr ? 'الجرانولا بأملو وأركان لديدة بزاف وطبيعية! التوصيل كان فـ 24 ساعة. شكراً ميزون فاكهة!' : 'Le granola Amlou & Argan est tout simplement délicieux et naturel ! Livraison en 24h à Casablanca.',
            rating: 5,
        },
        {
            name: isAr ? 'أمين من الرباط' : 'Amine K. (Rabat)',
            comment: isAr ? 'خديت Pack Trio، الشوكولاتة السوداء والـ Energy Balls ناضيين بزاف للرياضة.' : 'J\'ai pris le Pack Trio. La qualité est au rendez-vous et le goût est exceptionnel.',
            rating: 5,
        },
        {
            name: isAr ? 'مريم من مراكش' : 'Meriem B. (Marrakech)',
            comment: isAr ? 'التغليف زوين ومحكم، والمنتج طري وطبيعي 100%. غانعاود نطلب أكيد.' : 'Emballage soigné, livraison rapide et produit 100% frais. Je recommande vivement !',
            rating: 5,
        },
    ];

    return (
        <section className="py-16 bg-white border-t border-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded-full">
            {isAr ? 'آراء زبنائنا' : 'Avis Clients'}
          </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B]">
                        {isAr ? 'ماذا يقول عشاق ميزون فاكهة' : 'Ce Que Disent Nos Clients'}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="bg-[#FDFBF7] p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                            <div className="flex gap-1 text-[#D97706]">
                                {[...Array(rev.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium italic">
                                "{rev.comment}"
                            </p>
                            <h4 className="text-xs font-bold text-[#1E3A2B] pt-2 border-t border-slate-200/60">
                                {rev.name}
                            </h4>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export function Footer({ lang = 'fr', t }: ExtraSectionsProps) {
    const isAr = lang === 'ar';

    return (
        <footer className="bg-[#1E3A2B] text-white pt-12 pb-8 border-t border-[#1E3A2B]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">

                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Brand Info */}
                    <div className="space-y-3">
                        <h3 className="text-xl font-extrabold text-[#D97706]">MAISON FAKIA</h3>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                            {isAr
                                ? 'علامة مغربية رائدة متخصصة فـ الجرانولا والسنكات الصحية المصنوعة يدويًا بمكونات طبيعية 100%.'
                                : 'Marque marocaine artisanale spécialisée dans le granola et les snacks healthy 100% naturels.'}
                        </p>
                    </div>

                    {/* Quick Features */}
                    <div className="space-y-2 text-xs text-slate-300 font-medium">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <Truck size={16} className="text-[#D97706]" />
                            <span>{isAr ? 'توصيل سريع فـ 24-48 ساعة' : 'Livraison rapide en 24-48h'}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <ShieldCheck size={16} className="text-[#D97706]" />
                            <span>{isAr ? 'الدفع عند الاستلام (COD)' : 'Paiement à la livraison'}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <Heart size={16} className="text-[#D97706]" />
                            <span>{isAr ? 'طبيعي 100% وبدون مواد حافظة' : '100% naturel & fait maison'}</span>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2 text-xs text-slate-300">
                        <h4 className="font-bold text-white mb-2">{isAr ? 'تواصل معنا' : 'Contact Us'}</h4>
                        <p className="flex items-center justify-center md:justify-start gap-2">
                            <Phone size={14} className="text-[#D97706]" />
                            <span>+212 600 000 000</span>
                        </p>
                        <p className="flex items-center justify-center md:justify-start gap-2">
                            <MapPin size={14} className="text-[#D97706]" />
                            <span>Casablanca, Maroc</span>
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-6 border-t border-white/10 text-center text-[11px] text-slate-400 font-medium">
                    © {new Date().getFullYear()} Maison Fakia. {isAr ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
                </div>

            </div>
        </footer>
    );
}
