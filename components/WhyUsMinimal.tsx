'use client';

export default function WhyUsMinimal({ t, lang = 'fr' }: any) {
    const features = [
        {
            title: lang === 'ar' ? 'طبيعي 100%' : '100% ARTISANAL',
            desc: lang === 'ar' ? 'عسل حر وزيت أركان بيو' : 'Miel d\'oranger & argan bio'
        },
        {
            title: lang === 'ar' ? 'توصيل سريع' : 'LIVRAISON EXPRESS',
            desc: lang === 'ar' ? '24h - 48h لباب منزلك' : 'Livraison rapide en 24h/48h'
        },
        {
            title: lang === 'ar' ? 'المعاينة قبل الدفع' : 'VERIFICATION COD',
            desc: lang === 'ar' ? 'تأكد من الجودة قبل الدفع' : 'Contrôlez avant de régler'
        }
    ];

    return (
        <section className="py-3 my-2 border-y border-[#1E3A2B]/8 bg-[#F4EFEA]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* 3 Compact Minimalist Columns */}
                <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
                    {features.map((feat, idx) => (
                        <div key={idx} className="space-y-0.5 py-1">
                            <h4 className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#1E3A2B] uppercase">
                                {feat.title}
                            </h4>
                            <p className="text-[9px] sm:text-[11px] text-[#1E3A2B]/60 font-light leading-tight">
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}