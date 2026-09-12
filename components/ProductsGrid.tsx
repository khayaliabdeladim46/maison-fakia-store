'use client';

import Image from 'next/image';
import { ShoppingBag, Star, Check } from 'lucide-react';

export default function ProductsGrid({ lang = 'fr' }: { lang?: string }) {
    const products = [
        {
            id: 'miel-amandes',
            name: lang === 'ar' ? 'جرانولا العسل واللوز' : 'Granola Miel & Amandes',
            weight: '500g',
            price: '75 DH',
            badge: 'Best-Seller 🏆',
            img: '/doypack_miel_amandes.png',
            desc: lang === 'ar' ? 'عسل الليمون الحر، لوز مقرمش، الشوفان الكامل وزيت الأركان.' : 'Miel d oranger pur, amandes grillées, avoine complète et huile d argan.'
        },
        {
            id: 'chocolat-noir',
            name: lang === 'ar' ? 'جرانولا الشوكولاتة السوداء' : 'Granola Chocolat Noir',
            weight: '500g',
            price: '75 DH',
            badge: 'Sans sucre raffiné 🍫',
            img: '/doypack_chocolat_noir.png',
            desc: lang === 'ar' ? 'قطع الشوكولاتة 70% كاكاو بيو، رقائق اللوز والعسل الطبيعي.' : 'Pépites de chocolat noir 70% bio, amandes effilées et miel pur.'
        },
        {
            id: 'amlou-argan',
            name: lang === 'ar' ? 'جرانولا أملو وأركان' : 'Granola Amlou & Argan',
            weight: '500g',
            price: '80 DH',
            badge: 'Édition Marocaine 🇲🇦',
            img: '/doypack_amlou_argan.png',
            desc: lang === 'ar' ? 'وصفة تقليدية بأملو اللوز البلدي وزيت الأركان التافراوتي البيو.' : 'Recette traditionnelle à l Amlou d amandes et huile d Argan bio.'
        },
        {
            id: 'pro-sport',
            name: lang === 'ar' ? 'جرانولا بروتين سبور' : 'Granola Pro-Sport',
            weight: '500g',
            price: '85 DH',
            badge: 'Riche en Protéines 🏋️',
            img: '/doypack_pro_sport.png',
            desc: lang === 'ar' ? 'مزيج عالي البروتين مع بذور الشيا، الكتان، الجوز واللوز.' : 'Mélange riche en protéines avec graines de chia, lin et noix.'
        },
        {
            id: 'fruits-secs',
            name: lang === 'ar' ? 'مكس الفواكه الجافة' : 'Mix Fruits Secs Énergie',
            weight: '500g',
            price: '70 DH',
            badge: 'Énergie Naturelle ⚡',
            img: '/doypack_fruits_secs.png',
            desc: lang === 'ar' ? 'تينة، زبيب ملكي، لوز محمص، كاجو وجوز طبيعي 100%.' : 'Figues, raisins secs premium, amandes torréfiées et noix de cajou.'
        },
        {
            id: 'energy-balls',
            name: lang === 'ar' ? 'كرات الطاقة بالتمور' : 'Energy Balls Dattes & Noix',
            weight: '400g (12 pcs)',
            price: '65 DH',
            badge: '100% Bio 🌿',
            img: '/doypack_energy_balls.png',
            desc: lang === 'ar' ? 'كرات التمر المجهول مع أملو والجوز بدون أي سكر مضاف.' : 'Bouchées de dattes Majhoul, amlou et noix sans sucre ajouté.'
        }
    ];

    const handleOrder = (productName: string) => {
        const text = encodeURIComponent(`Bonjour Maison Fakia, je souhaite commander : ${productName}`);
        window.open(`https://wa.me/212600000000?text=${text}`, '_blank');
    };

    return (
        <section id="products-section" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="text-center space-y-2 mb-10">
        <span className="text-xs font-bold tracking-widest uppercase text-[#D97706]">
          {lang === 'ar' ? 'تشكيلتنا الفاخرة' : 'Nos Produits Phares'}
        </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1E3A2B]">
                    {lang === 'ar' ? 'اختر جرانولا الفطور المفضل لديك' : 'Sélectionnez Votre Granola Préféré'}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white border border-[#1E3A2B]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between group"
                    >
                        <div className="p-5 space-y-4">

                            {/* Product Image Container with Badge */}
                            <div className="relative aspect-square w-full rounded-xl bg-[#FDFBF7] flex items-center justify-center p-4 border border-slate-100 group-hover:scale-102 transition duration-300">

                                {/* Visual Badge */}
                                <span className="absolute top-3 left-3 bg-[#1E3A2B] text-[#FDFBF7] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {p.badge}
                </span>

                                <Image
                                    src={p.img}
                                    alt={p.name}
                                    width={280}
                                    height={280}
                                    className="object-contain max-h-56 drop-shadow-md"
                                />
                            </div>

                            {/* Title & Price */}
                            <div className="flex justify-between items-start gap-2 pt-1">
                                <div>
                                    <h3 className="text-base font-bold text-[#1E3A2B] leading-snug">{p.name}</h3>
                                    <span className="text-[11px] font-semibold text-slate-500">{p.weight}</span>
                                </div>
                                <span className="text-base font-extrabold text-[#D97706] bg-[#D97706]/10 px-2.5 py-1 rounded-lg">
                  {p.price}
                </span>
                            </div>

                            <p className="text-xs text-slate-600 font-medium leading-relaxed">{p.desc}</p>
                        </div>

                        {/* Order Action Button */}
                        <div className="p-5 pt-0">
                            <button
                                onClick={() => handleOrder(p.name)}
                                className="w-full bg-[#1E3A2B] hover:bg-[#142A1E] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 text-xs shadow-xs cursor-pointer"
                            >
                                <ShoppingBag size={16} />
                                <span>{lang === 'ar' ? 'طلب سريع عبر الواتساب' : 'Commander via WhatsApp'}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}