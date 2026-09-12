'use client';

import { useState } from 'react';
import {
    ShoppingBag,
    Sparkles,
    ChevronDown,
    Globe,
    Truck,
    ShieldCheck,
    CheckCircle2,
    Star,
    ArrowRight,
    Grid
} from 'lucide-react';

import CodModal from '@/components/CodModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import FaqWithVideoSection from '@/components/FaqWithVideoSection';
import { TestimonialsSection, Footer } from '@/components/ExtraSections';

// قائمة المنتجات الـ 6 لـ Maison Fakia
const PRODUCTS = [
    {
        id: 'miel-amandes',
        nameFr: 'Granola Miel & Amandes',
        nameAr: 'جرانولا العسل واللوز',
        price: 75,
        weights: ['500g'],
        weight: '500g',
        image: '/doypack_miel_amandes.png',
        badgeFr: 'Best Seller',
        badgeAr: 'الأكثر مبيعاً',
        descriptionFr: 'Granola artisanal cuit au four avec du miel pur de fleur d\'oranger et des amandes grillées croquantes.',
        descriptionAr: 'جرانولا محضر يدويًا ومحمص فـ الفرن بالعسل الحر وزهر البرتقال مع اللوز المحمص.',
    },
    {
        id: 'chocolat-noir',
        nameFr: 'Granola Chocolat Noir',
        nameAr: 'جرانولا الشوكولاتة السوداء',
        price: 80,
        weights: ['500g'],
        weight: '500g',
        image: '/doypack_chocolat_noir.png',
        badgeFr: 'Gourmand',
        badgeAr: 'لذيذ جداً',
        descriptionFr: 'Pépites de chocolat noir intense 70% et céréales croustillantes pour les amateurs de cacao.',
        descriptionAr: 'حبيبات شوكولاتة سوداء ممتازة 70% مع حبوب جرانولا مقرمشة للغيورين على المذاق الرفيع.',
    },
    {
        id: 'amlou-argan',
        nameFr: 'Granola Amlou & Argan',
        nameAr: 'جرانولا أملو وزيت الأركان',
        price: 85,
        weights: ['500g'],
        weight: '500g',
        image: '/doypack_amlou_argan.png',
        badgeFr: 'Recette Beldi',
        badgeAr: 'وصفة بلدية أصيلة',
        descriptionFr: 'Une recette marocaine authentique mariant le granola au véritable Amlou et huile d\'Argan bio.',
        descriptionAr: 'خلطة مغربية أصيلة تجمع بين الجرانولا وأملو اللوز الطبيعي وزيت الأركان التجميلي والغذائي الحر.',
    },
    {
        id: 'mix-energie',
        nameFr: 'Mix Fruits Secs Énergie',
        nameAr: 'فواكه جافة مشكلة طاقة',
        price: 70,
        weights: ['500g'],
        weight: '500g',
        image: '/doypack_fruits_secs.png',
        badgeFr: '100% Naturel',
        badgeAr: 'طبيعي 100%',
        descriptionFr: 'Mélange premium de noix, amandes, cajou, raisins secs et dattes pour faire le plein d\'énergie.',
        descriptionAr: 'تشكيلة فاخرة من الكاجو، الجوز، اللوز، التمر والزبيب الممتاز لشحن الطاقة طوال اليوم.',
    },
    {
        id: 'energy-balls',
        nameFr: 'Energy Balls Dattes & Noix',
        nameAr: 'كرات الطاقة بالتمر والجوز',
        price: 65,
        weights: ['400g'],
        weight: '400g',
        image: '/doypack_energy_balls.png',
        badgeFr: 'Snack Healthy',
        badgeAr: 'سناك صحي',
        descriptionFr: 'Bouchées énergétiques aux dattes, cacao brut et graines sans sucre ajouté.',
        descriptionAr: 'كرات طاقة طبيعية بالتمر الشاهق، الكاكاو الخام والبذور بدون أي سكر مضاف.',
    },
    {
        id: 'pro-sport',
        nameFr: 'Granola Pro-Sport Protéiné',
        nameAr: 'جرانولا بروتين للرياضيين',
        price: 90,
        weights: ['500g'],
        weight: '500g',
        image: '/doypack_pro_sport.png',
        badgeFr: 'High Protein',
        badgeAr: 'غني بالبروتين',
        descriptionFr: 'Enrichي en graines de courge, chia et protéines végétales pour les sportifs et actifs.',
        descriptionAr: 'معزز ببذور القرع، الشيا والبروتين النباتي الخالص للرياضيين وأصحاب المجهود البدني.',
    },
];

export default function HomePage() {
    const [lang, setLang] = useState<'fr' | 'ar'>('fr');
    const [selectedProductDetail, setSelectedProductDetail] = useState<any | null>(null);
    const [selectedProductCod, setSelectedProductCod] = useState<any | null>(null);
    const [showAllProductsMobile, setShowAllProductsMobile] = useState<boolean>(false);

    const isAr = lang === 'ar';

    // المنتجات الظاهرة فـ التلفون (2x2 = 4 منتجات الأولين، أو الكل فاش يكليكي على Voir Tout)
    const visibleProducts = showAllProductsMobile ? PRODUCTS : PRODUCTS.slice(0, 4);

    const handleOrder = (product: any) => {
        setSelectedProductDetail(null);
        setSelectedProductCod(product);
    };

    return (
        <div className={`min-h-screen bg-[#FDFBF7] text-[#1E3A2B] ${isAr ? 'font-sans' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>

            {/* Navbar Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-black tracking-tight text-[#1E3A2B]">MAISON FAKIA</span>
                        <span className="text-[10px] font-bold bg-[#D97706]/10 text-[#D97706] px-2 py-0.5 rounded-full uppercase">
              Maroc
            </span>
                    </div>

                    {/* Switch Langue */}
                    <button
                        onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                        className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A2B] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition cursor-pointer"
                    >
                        <Globe size={14} className="text-[#D97706]" />
                        <span>{lang === 'fr' ? 'العربية' : 'Français'}</span>
                    </button>
                </div>
            </header>

            {/* 1. HERO SECTION (100dvh Fullscreen on Mobile) */}
            <section className="relative min-h-[100dvh] flex flex-col justify-center items-center pt-20 pb-10 px-4 bg-[#FDFBF7] overflow-hidden">

                {/* Background glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D97706]/10 rounded-full blur-3xl -z-10" />

                <div className="max-w-3xl mx-auto text-center space-y-5 my-auto">

          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded-full">
            <Sparkles size={14} />
              {isAr ? 'منتجات طبيعية ومصنوعة يدوياً 100%' : '100% Naturel & Artisanal'}
          </span>

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A2B] leading-tight sm:leading-tight">
                        {isAr ? (
                            <>الجرانولا والسنكات الصحية <br /><span className="text-[#D97706]">الأجود بالمغرب</span></>
                        ) : (
                            <>Le Meilleur du Granola & Snacks <br /><span className="text-[#D97706]">Artisanaux au Maroc</span></>
                        )}
                    </h1>

                    <p className="text-xs sm:text-base text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
                        {isAr
                            ? 'اكتشف مجموعتنا الفاخرة المحضرة بالعسل الحر، أملو البلدي، الشوكولاتة السوداء والفواكه الجافة المقرمشة.'
                            : 'Découvrez nos recettes gourmandes préparées avec du miel pur, du véritable Amlou, du chocolat noir et des fruits secs rigoureusement sélectionnés.'}
                    </p>

                    {/* Top Hero Product Image */}
                    <div className="py-2 flex justify-center">
                        <img
                            src="/doypack_3_flavors_lineup.png"
                            alt="Maison Fakia Lineup"
                            className="max-h-48 sm:max-h-64 object-contain drop-shadow-xl hover:scale-105 transition duration-300"
                        />
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <a
                            href="#products"
                            className="w-full sm:w-auto bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95"
                        >
                            <ShoppingBag size={18} />
                            <span>{isAr ? 'اكتشف المنتجات والطلبيات' : 'Voir les Produits & Commander'}</span>
                        </a>
                    </div>

                    {/* Micro Proof Badges */}
                    <div className="flex items-center justify-center gap-4 text-[11px] font-bold text-slate-500 pt-3 border-t border-slate-200/60 max-w-md mx-auto">
                        <div className="flex items-center gap-1">
                            <Truck size={14} className="text-[#D97706]" />
                            <span>{isAr ? 'توصيل 24-48 ساعة' : 'Livraison 24-48h'}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <ShieldCheck size={14} className="text-emerald-600" />
                            <span>{isAr ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}</span>
                        </div>
                    </div>

                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce">
                    <ChevronDown size={22} />
                </div>
            </section>

            {/* 2. PRODUCTS SECTION (2x2 Grid on Mobile with "Voir Tout" Button) */}
            <section id="products" className="py-16 px-4 max-w-6xl mx-auto">

                <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded-full">
            {isAr ? 'تشكيلتنا الفاخرة' : 'Notre Collection'}
          </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B]">
                        {isAr ? 'اختر منتجك المفضل' : 'Nos 6 Recettes Gourmandes'}
                    </h2>
                </div>

                {/* Responsive Grid: 2 columns on Mobile (2x2), 3 on Desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                    {visibleProducts.map((product) => {
                        const nameStr = isAr ? product.nameAr : product.nameFr;
                        const badgeStr = isAr ? product.badgeAr : product.badgeFr;

                        return (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-5 shadow-xs hover:shadow-lg transition flex flex-col justify-between relative group"
                            >
                                {/* Badge */}
                                <span className="absolute top-2.5 left-2.5 z-10 text-[9px] sm:text-[10px] font-extrabold uppercase bg-[#1E3A2B] text-white px-2 py-0.5 rounded-full">
                  {badgeStr}
                </span>

                                {/* Product Image Clickable to detail */}
                                <div
                                    onClick={() => setSelectedProductDetail(product)}
                                    className="bg-[#FDFBF7] rounded-xl p-3 mb-3 flex items-center justify-center cursor-pointer min-h-[140px] sm:min-h-[180px]"
                                >
                                    <img
                                        src={product.image}
                                        alt={nameStr}
                                        className="max-h-28 sm:max-h-40 object-contain group-hover:scale-105 transition duration-300 drop-shadow-sm"
                                    />
                                </div>

                                {/* Info */}
                                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold block">{product.weight}</span>
                                        <h3
                                            onClick={() => setSelectedProductDetail(product)}
                                            className="text-xs sm:text-sm font-extrabold text-[#1E3A2B] line-clamp-2 cursor-pointer hover:text-[#D97706] transition"
                                        >
                                            {nameStr}
                                        </h3>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                    <span className="text-sm sm:text-lg font-black text-[#D97706]">
                      {product.price} <span className="text-xs font-bold">DH</span>
                    </span>

                                        <button
                                            onClick={() => handleOrder(product)}
                                            className="bg-[#1E3A2B] hover:bg-[#D97706] text-white p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer active:scale-95"
                                        >
                                            <ShoppingBag size={14} />
                                            <span className="hidden sm:inline">{isAr ? 'طلب' : 'Commander'}</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* Button "Voir Tout / عرض الكل" on Mobile */}
                {!showAllProductsMobile && PRODUCTS.length > 4 && (
                    <div className="mt-8 text-center md:hidden">
                        <button
                            onClick={() => setShowAllProductsMobile(true)}
                            className="w-full bg-white border-2 border-[#1E3A2B] text-[#1E3A2B] font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-xs active:scale-95 transition flex items-center justify-center gap-2"
                        >
                            <Grid size={16} />
                            <span>{isAr ? `عرض جميع المنتجات (${PRODUCTS.length})` : `Voir Tous Les Produits (${PRODUCTS.length})`}</span>
                        </button>
                    </div>
                )}

            </section>

            {/* 3. TRIO PACK BUNDLE SECTION */}
            <section className="py-14 bg-[#1E3A2B] text-white px-4">
                <div className="max-w-4xl mx-auto text-center space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] bg-white/10 px-3 py-1 rounded-full">
            {isAr ? 'عرض خاص' : 'Offre Spéciale Trio'}
          </span>
                    <h2 className="text-2xl sm:text-4xl font-black">
                        {isAr ? 'Pack Trio 1.5kg — اختر 3 نكهات بـ 210 درهم فقط' : 'Pack Trio 1.5kg — Choisissez 3 Saveurs pour 210 DH'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto font-medium">
                        {isAr ? 'توصيل مجاني فـ جميع المدن المغربية + خصم استثنائي عند اختيار 3 أكياس من اختيارك.' : 'Livraison Gratuite partout au Maroc + réduction exclusive pour tout achat du Pack 3 sachets.'}
                    </p>

                    <div className="pt-2">
                        <button
                            onClick={() => handleOrder({
                                id: 'pack-trio',
                                nameFr: 'Pack Trio Sur Mesure (3 Sachets)',
                                nameAr: 'باك تريو حسب الاختيار (3 أكياس)',
                                price: 210,
                                weight: '1.5 kg (3 x 500g)',
                                image: '/doypack_3_flavors_lineup.png'
                            })}
                            className="bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold px-8 py-4 rounded-xl text-xs sm:text-sm shadow-xl transition active:scale-95 cursor-pointer"
                        >
                            {isAr ? 'طلب Pack Trio بـ 210 DH مع توصيل مجاني' : 'Commander le Pack Trio à 210 DH (Livraison Gratuite)'}
                        </button>
                    </div>
                </div>
            </section>

            {/* 4. FAQ WITH VIDEO SECTION */}
            <FaqWithVideoSection lang={lang} t={{}} />

            {/* 5. TESTIMONIALS SECTION */}
            <TestimonialsSection lang={lang} t={{}} />

            {/* 6. FOOTER */}
            <Footer lang={lang} t={{}} />

            {/* MODALS */}
            {selectedProductDetail && (
                <ProductDetailModal
                    product={selectedProductDetail}
                    onClose={() => setSelectedProductDetail(null)}
                    onOrder={handleOrder}
                    lang={lang}
                />
            )}

            {selectedProductCod && (
                <CodModal
                    product={selectedProductCod}
                    isOpen={!!selectedProductCod}
                    onClose={() => setSelectedProductCod(null)}
                    lang={lang}
                />
            )}

        </div>
    );
}