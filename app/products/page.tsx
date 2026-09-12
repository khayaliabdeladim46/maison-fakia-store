'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Eye, Globe, CheckCircle2, Star, Sparkles } from 'lucide-react';
import CodModal from '@/components/CodModal';
import ProductDetailModal from '@/components/ProductDetailModal';

const ALL_PRODUCTS = [
    {
        id: 'miel-amandes',
        nameFr: 'Granola Miel & Amandes',
        nameAr: 'جرانولا العسل واللوز',
        price: 75,
        weight: '500g',
        image: '/doypack_miel_amandes.png',
        badgeFr: 'Best Seller',
        badgeAr: 'الأكثر مبيعاً',
        benefitsFr: ['Miel pur de fleur d\'oranger', 'Amandes grillées riches en Oméga-3', 'Sans sucre raffiné'],
        benefitsAr: ['عسل زهر البرتقال الحر', 'لوز بلدي محمص غني بالأوميغا 3', 'بدون سكر أبيض مضاف'],
    },
    {
        id: 'chocolat-noir',
        nameFr: 'Granola Chocolat Noir',
        nameAr: 'جرانولا الشوكولاتة السوداء',
        price: 80,
        weight: '500g',
        image: '/doypack_chocolat_noir.png',
        badgeFr: 'Gourmand',
        badgeAr: 'لذيذ جداً',
        benefitsFr: ['Chocolat noir 70% antioxydant', 'Booster d\'énergie et de moral', 'Avoine complète croustillante'],
        benefitsAr: ['شوكولاتة سوداء 70% مضادة للأكسدة', 'محفز طبيعي للطاقة والمزاج', 'شوفان كامل مقرمش'],
    },
    {
        id: 'amlou-argan',
        nameFr: 'Granola Amlou & Argan',
        nameAr: 'جرانولا أملو وزيت الأركان',
        price: 85,
        weight: '500g',
        image: '/doypack_amlou_argan.png',
        badgeFr: 'Recette Beldi',
        badgeAr: 'وصفة بلدية أصيلة',
        benefitsFr: ['Véritable Amlou aux amandes', 'Huile d\'Argan bio de Souss', 'Recette marocaine authentique'],
        benefitsAr: ['أملو بلدي خالص باللوز', 'زيت أركان للتغذية طبيعي 100%', 'وصفة مغربية أصيلة'],
    },
    {
        id: 'mix-energie',
        nameFr: 'Mix Fruits Secs Énergie',
        nameAr: 'فواكه جافة مشكلة طاقة',
        price: 70,
        weight: '500g',
        image: '/doypack_fruits_secs.png',
        badgeFr: '100% Naturel',
        badgeAr: 'طبيعي 100%',
        benefitsFr: ['Mélange de noix & cajou', 'Riche en magnésium et protéines', 'Parfait pour le sport et snack'],
        benefitsAr: ['تشكيلة فاخرة من الجوز والكاجو', 'غني بالمغنيسيوم والبروتين', 'مثالي للرياضة والسناك الصحية'],
    },
    {
        id: 'energy-balls',
        nameFr: 'Energy Balls Dattes & Noix',
        nameAr: 'كرات الطاقة بالتمر والجوز',
        price: 65,
        weight: '400g',
        image: '/doypack_energy_balls.png',
        badgeFr: 'Healthy Snack',
        badgeAr: 'سناك صحي',
        benefitsFr: ['100% dattes et cacao brut', 'Sans aucun sucre ajouté', 'Format prêt à emporter'],
        benefitsAr: ['100% تمر طبيعي وكاكاو خام', 'بدون أي غرام سكر مضاف', 'سهلة الحمل للاستعمال اليومي'],
    },
    {
        id: 'pro-sport',
        nameFr: 'Granola Pro-Sport Protéiné',
        nameAr: 'جرانولا بروتين للرياضيين',
        price: 90,
        weight: '500g',
        image: '/doypack_pro_sport.png',
        badgeFr: 'High Protein',
        badgeAr: 'غني بالبروتين',
        benefitsFr: ['Enrichi en protéines végétales', 'Graines de chia et courge', 'Pour une récupération musculaire'],
        benefitsAr: ['معزز بالبروتينات النباتية', 'بذور الشيا والقرع', 'بناء وترميم العضلات للرياضيين'],
    }
];

export default function ProductsPage() {
    const [lang, setLang] = useState<'fr' | 'ar'>('fr');
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [viewModalProduct, setViewModalProduct] = useState<any | null>(null);

    const isAr = lang === 'ar';

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1E3A2B]" dir={isAr ? 'rtl' : 'ltr'}>

            {/* 1. Header with Brand Logo */}
            <header className="bg-white border-b border-[#1E3A2B]/10 px-4 py-4 sticky top-0 z-30 shadow-xs">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xs font-bold text-[#1E3A2B] hover:text-[#D97706] transition">
                        <ArrowLeft size={16} />
                        <span>{isAr ? 'الرجوع للرئيسية' : 'Retour à l\'accueil'}</span>
                    </Link>

                    {/* Logo Branding */}
                    <div className="text-center">
                        <h1 className="text-lg font-black tracking-tight text-[#1E3A2B]">MAISON FAKIA</h1>
                        <p className="text-[9px] font-bold tracking-widest text-[#D97706] uppercase">Artisanal & Healthy</p>
                    </div>

                    <button
                        onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                        className="text-xs font-bold px-3 py-1.5 bg-[#EAF2ED] text-[#1E3A2B] rounded-full flex items-center gap-1.5 border border-[#1E3A2B]/15"
                    >
                        <Globe size={13} />
                        <span>{lang === 'fr' ? 'العربية' : 'FR'}</span>
                    </button>
                </div>
            </header>

            {/* 2. Hero Header */}
            <div className="py-10 px-4 text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3.5 py-1.5 rounded-full inline-block">
          {isAr ? 'جميع منتجاتنا' : 'Tous Nos Produits'}
        </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                    {isAr ? 'وصفاتنا الطبيعية المصنوعة بكل حب' : 'Nos 6 Recettes Gourmandes & Artisanales'}
                </h2>
            </div>

            {/* 3. Products Grid with Benefits & Order Button */}
            <main className="max-w-6xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ALL_PRODUCTS.map((prod) => (
                        <div
                            key={prod.id}
                            className="bg-white border border-[#1E3A2B]/15 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-[#1E3A2B]/40 transition duration-300 group"
                        >
                            <div>
                                <div
                                    onClick={() => setViewModalProduct(prod)}
                                    className="relative bg-[#F4EFEA] rounded-2xl p-4 mb-4 flex items-center justify-center h-48 cursor-pointer overflow-hidden"
                                >
                                    <img
                                        src={prod.image}
                                        alt={prod.nameFr}
                                        className="max-h-40 object-contain group-hover:scale-105 transition duration-500"
                                    />
                                    <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#1E3A2B] text-white px-2.5 py-1 rounded-full shadow-2xs">
                    {isAr ? prod.badgeAr : prod.badgeFr}
                  </span>
                                </div>

                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold block">{prod.weight}</span>
                                        <h3 className="text-base font-extrabold text-[#1E3A2B]">
                                            {isAr ? prod.nameAr : prod.nameFr}
                                        </h3>
                                    </div>
                                    <span className="text-lg font-black text-[#D97706] shrink-0">{prod.price} DH</span>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-2 border-t border-slate-100 pt-3 mb-4">
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B] flex items-center gap-1">
                                        <Sparkles size={12} className="text-[#D97706]" />
                                        <span>{isAr ? 'أهم المنافع:' : 'Bienfaits clés:'}</span>
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {(isAr ? prod.benefitsAr : prod.benefitsFr).map((b, i) => (
                                            <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                                                <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Order Buttons */}
                            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                                <button
                                    onClick={() => setViewModalProduct(prod)}
                                    className="p-3 text-slate-600 hover:text-[#1E3A2B] bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                                    title="Voir détails"
                                >
                                    <Eye size={16} />
                                </button>
                                <button
                                    onClick={() => setSelectedProduct(prod)}
                                    className="flex-1 bg-[#1E3A2B] hover:bg-[#D97706] text-white font-extrabold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-xs active:scale-95 cursor-pointer"
                                >
                                    <ShoppingBag size={15} />
                                    <span>{isAr ? 'طلب سريع (COD)' : 'Commander (COD)'}</span>
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </main>

            {/* 4. Avis Clients Section (خلفية خضراء خفيفة) */}
            <section className="py-14 bg-[#EAF2ED] border-t border-[#1E3A2B]/15">
                <div className="max-w-6xl mx-auto px-4">

                    <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1E3A2B] bg-white border border-[#1E3A2B]/20 px-3 py-1 rounded-full inline-block shadow-2xs">
              {isAr ? 'آراء زبنائنا الكرام' : 'Avis Clients Vérifiés'}
            </span>
                        <h3 className="text-2xl font-extrabold text-[#1E3A2B]">
                            {isAr ? 'ماذا يقول عُشّاق maison fakia؟' : 'Ce Que Disent Nos Clients'}
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            {
                                name: 'سارة أ.',
                                city: 'الدار البيضاء',
                                textAr: 'جرانولا أملو وأركان غزيييالة بزاف ومقرمشة! ولادي عجباتهم فـ الفطور، والطلب وصلني فـ أقل من 24 ساعة.',
                                textFr: 'Le Granola Amlou & Argan est simplement délicieux ! Mes enfants l\'adorent au petit-déjeuner. Livraison très rapide à Casa.',
                                rating: 5,
                            },
                            {
                                name: 'Dr. Mehdi K.',
                                city: 'الرباط',
                                textAr: 'كمختص فـ التغذية، كنشجع على هاد السناكات الطبيعية. عسل حر بدون سكر مضاف ومكونات بلدية ممتازة.',
                                textFr: 'En tant que nutritionniste, je recommande vivement ces snacks. Ingrédients naturels, miel pur et aucun sucre raffiné.',
                                rating: 5,
                            },
                            {
                                name: 'إلهام م.',
                                city: 'مراكش',
                                textAr: 'باك تريو اقتصادي جاني بـ 210 درهم وتوصيل فابور! النكهات بـ 3 بيهم حارين ولذاذ.',
                                textFr: 'Le Pack Trio est super avantageux à 210 DH avec livraison gratuite. Les 3 saveurs sont excellentes !',
                                rating: 5,
                            },
                        ].map((rev, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-5 rounded-2xl border border-[#1E3A2B]/10 shadow-xs flex flex-col justify-between space-y-3"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1 text-[#D97706]">
                                        {[...Array(rev.rating)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-[#1E3A2B]/90 font-medium leading-relaxed italic">
                                        "{isAr ? rev.textAr : rev.textFr}"
                                    </p>
                                </div>

                                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#1E3A2B]">{rev.name}</span>
                                    <span className="text-[10px] font-semibold text-slate-400">{rev.city}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1E3A2B] text-white py-8 text-center text-xs">
                <p>© {new Date().getFullYear()} Maison Fakia. Tous droits réservés.</p>
            </footer>

            {/* Modals */}
            {selectedProduct && (
                <CodModal
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    lang={lang}
                />
            )}

            {viewModalProduct && (
                <ProductDetailModal
                    product={viewModalProduct}
                    onClose={() => setViewModalProduct(null)}
                    onOrder={(prod: any) => {
                        setViewModalProduct(null);
                        setSelectedProduct(prod);
                    }}
                    lang={lang}
                />
            )}

        </div>
    );
}