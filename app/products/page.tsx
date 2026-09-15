'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import CodModal from '@/components/CodModal';
import {
    ShoppingBag, Star, Truck, ShieldCheck, Leaf,
    Heart, MessageCircle, Globe, ChevronLeft, ChevronRight
} from 'lucide-react';

// === 1. SECTION AVIS CLIENTS (L'Art de Vivre Maison Fakia) ===
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

    const current = reviews[currentIndex];

    return (
        <section className="py-12 px-4 sm:px-8 max-w-4xl mx-auto w-full">
            <div className="bg-[#1E3A2B] text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden border border-[#D97706]/20 space-y-6">

                <div className="text-center space-y-1">
                    <span className="text-[11px] font-bold tracking-widest text-[#D97706] uppercase">
                        {isAr ? 'آراء الزبناء' : 'Avis Clients'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-light tracking-wide">
                        L'Art de Vivre Maison Fakia
                    </h2>
                </div>

                <div className="relative pt-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isAr ? 20 : -20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col md:flex-row items-center gap-6"
                        >
                            <div className="w-full md:w-48 h-48 md:h-52 rounded-2xl overflow-hidden flex-shrink-0 border border-white/15 shadow-md relative">
                                <img
                                    src={current.image}
                                    alt={current.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 space-y-3 text-right">
                                <p className="text-sm sm:text-base text-emerald-50/95 font-light leading-relaxed italic">
                                    "{isAr ? current.textAr : current.textFr}"
                                </p>

                                <div className="pt-3 border-t border-white/10 space-y-0.5">
                                    <h4 className="font-bold text-sm text-white">{current.name}</h4>
                                    <p className="text-[11px] text-emerald-200/80 font-medium">
                                        {isAr ? current.cityAr : current.city} • <span className="text-[#D97706] font-bold">{isAr ? current.productAr : current.productFr}</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-5">
                        <div className="flex items-center gap-1.5">
                            {reviews.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        idx === currentIndex
                                            ? 'w-5 bg-[#D97706]'
                                            : 'w-1.5 bg-white/20 hover:bg-white/50'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

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
        </section>
    );
}

// === 2. FOOTER (الكود الأصلي) ===
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

// === 3. OFFICIAL STORE PRODUCTS WITH PACKAGING DOYPACK ===
const OFFICIAL_PRODUCTS = [
    {
        id: 'prod-1',
        name_ar: 'غرانولا العسل واللوز',
        name_fr: 'Granola Miel Pur & Amandes',
        price: 75,
        weight: '500g',
        category: 'granola',
        image_url: '/doypack_miel_amandes.png',
        badge_ar: 'الأكثر مبيعاً',
        badge_fr: 'Best Seller'
    },
    {
        id: 'prod-2',
        name_ar: 'غرانولا الشوكولاتة السوداء',
        name_fr: 'Granola Chocolat Noir 70%',
        price: 80,
        weight: '500g',
        category: 'granola',
        image_url: '/doypack_chocolat_noir.png',
        badge_ar: 'غني بالمغنيسيوم',
        badge_fr: 'Riche en Magnésium'
    },
    {
        id: 'prod-3',
        name_ar: 'غرانولا أملو وأركان',
        name_fr: 'Granola Amlou & Argan Bio',
        price: 85,
        weight: '500g',
        category: 'granola',
        image_url: '/doypack_amlou_argan.png',
        badge_ar: 'وصفة تقليدية',
        badge_fr: 'Recette Traditionnelle'
    },
    {
        id: 'prod-4',
        name_ar: 'مكس الفواكه الجافة الطاقة',
        name_fr: 'Mix Fruits Secs Énergie',
        price: 90,
        weight: '500g',
        category: 'dried_fruits',
        image_url: '/doypack_fruits_secs.png',
        badge_ar: 'طاقة طبيعية',
        badge_fr: 'Énergie Naturelle'
    },
    {
        id: 'prod-5',
        name_ar: 'كرات الطاقة الطبيعية',
        name_fr: 'Energy Balls Dattes & Cacao',
        price: 65,
        weight: '400g',
        category: 'energy_balls',
        image_url: '/doypack_energy_balls.png',
        badge_ar: 'بدون سكر مضاف',
        badge_fr: 'Sans Sucre Ajouté'
    },
    {
        id: 'prod-6',
        name_ar: 'غرانولا بروتين برو سبورت',
        name_fr: 'Granola Pro-Sport & Seeds',
        price: 95,
        weight: '500g',
        category: 'granola',
        image_url: '/doypack_pro_sport.png',
        badge_ar: 'للرياضيين',
        badge_fr: 'Pour Sportifs'
    }
];

// === 4. MAIN PAGE PRODUCTS ===
export default function DynamicProductsPage() {
    const [lang, setLang] = useState<'fr' | 'ar'>('fr');
    const [products, setProducts] = useState<any[]>(OFFICIAL_PRODUCTS);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    const isAr = lang === 'ar';

    useEffect(() => {
        const fetchProductsFromSupabase = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                setProducts(data);
            } else {
                setProducts(OFFICIAL_PRODUCTS);
            }
            setLoading(false);
        };

        fetchProductsFromSupabase();
    }, []);

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
    };

    return (
        <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-[#FAF9F6] text-[#1E3A2B] font-sans flex flex-col justify-between relative">

            <div>
                {/* HEADER (اللوجو فـ الوسط + زر اللغة) */}
                <header className="bg-[#1E3A2B] text-white border-b border-[#D97706]/30 sticky top-0 z-30 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between relative">

                        {/* زر تغيير اللغة */}
                        <button
                            onClick={toggleLanguage}
                            className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-800/60 rounded-xl text-emerald-100 font-extrabold text-xs flex items-center gap-1.5 hover:bg-emerald-900 transition cursor-pointer"
                        >
                            <Globe size={14} className="text-[#D97706]" />
                            <span>{isAr ? 'FR' : 'العربية'}</span>
                        </button>

                        {/* اللوجو والاسم في الوسط */}
                        <a href="/" className="flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2">
                            <div className="w-9 h-9 bg-[#D97706] text-white rounded-xl flex items-center justify-center font-black text-sm shadow-xs">
                                MF
                            </div>
                            <span className="text-base sm:text-lg font-black tracking-tight text-white">
                                Maison Fakia
                            </span>
                        </a>

                        {/* زر التواصل السريع عبر الواتساب */}
                        <a
                            href="https://wa.me/212600000000"
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 bg-[#D97706] hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5"
                        >
                            <MessageCircle size={14} />
                            <span className="hidden sm:inline">{isAr ? 'واتساب' : 'WhatsApp'}</span>
                        </a>

                    </div>
                </header>

                {/* HERO BANNER */}
                <section className="bg-[#1E3A2B] text-white py-12 px-4 text-center space-y-3 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#D97706] text-white text-[11px] font-extrabold rounded-full uppercase tracking-wider shadow-xs">
                            <Leaf size={13} />
                            {isAr ? 'منتجات طبيعية 100%' : 'Ingrédients 100% Naturels'}
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                            {isAr ? 'تشكيلة Maison Fakia الفاخرة' : 'Notre Sélection Artisanale'}
                        </h1>
                        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl mx-auto font-medium leading-relaxed">
                            {isAr
                                ? 'اختر منتجك المفضل من الغرانولا والفواكه الجافة المصنوعة يدوياً بأجود المكونات الطبيعية المغربية مع التوصيل السريع والدفع عند الاستلام.'
                                : 'Découvrez nos granolas croustillants faits main au miel d oranger pur & huile d argan. Livraison express partout au Maroc.'}
                        </p>
                    </div>
                </section>

                {/* TRUST PILLARS BAR */}
                <section className="bg-white border-b border-slate-200/80 py-4 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs font-bold text-slate-700">
                        <div className="flex items-center justify-center gap-2">
                            <Truck size={18} className="text-[#D97706]" />
                            <span>{isAr ? 'توصيل سريع لكل المدن' : 'Livraison Express Maroc'}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <ShieldCheck size={18} className="text-[#D97706]" />
                            <span>{isAr ? 'الدفع عند الاستلام (COD)' : 'Paiement à la Livraison'}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Leaf size={18} className="text-[#D97706]" />
                            <span>{isAr ? 'مكونات طبيعية 100%' : '100% Ingrédients Sains'}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Heart size={18} className="text-[#D97706]" />
                            <span>{isAr ? 'صنع يدوي في المغرب 🇲🇦' : 'Fait Main au Maroc 🇲🇦'}</span>
                        </div>
                    </div>
                </section>

                {/* MAIN PRODUCTS CATALOG GRID WITH DOYPACK PACKAGING */}
                <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                        <div>
                            <h2 className="text-xl font-black text-[#1E3A2B]">
                                {isAr ? 'منتجات المتجر الرسمية' : 'Catalogue de nos Produits'}
                            </h2>
                            <p className="text-xs text-slate-500 font-medium">
                                {isAr ? 'اختر منتجك واطلب بـ الدفع عند الاستلام' : 'Sélectionnez vos produits et commandez en Cash on Delivery'}
                            </p>
                        </div>
                        <span className="text-xs font-bold bg-[#1E3A2B] text-white px-3.5 py-1.5 rounded-full">
                            {products.length} {isAr ? 'منتجات' : 'Produits'}
                        </span>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-slate-400 font-bold text-xs">
                            {isAr ? 'جاري تحميل المنتجات...' : 'Chargement du catalogue...'}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="bg-white rounded-3xl border border-slate-200/90 p-5 space-y-4 shadow-2xs hover:shadow-xl transition duration-300 flex flex-col justify-between group relative"
                                >
                                    {/* Product Image & Doypack Packaging */}
                                    <div className="w-full h-64 bg-[#FAF9F6] rounded-2xl overflow-hidden border border-slate-100 relative flex items-center justify-center">
                                        {(prod.badge || prod.badge_ar) && (
                                            <span className="absolute top-3 right-3 bg-[#D97706] text-white px-2.5 py-1 rounded-full text-[10px] font-black z-10 shadow-xs">
                                                {isAr ? (prod.badge_ar || prod.badge) : (prod.badge_fr || prod.badge)}
                                            </span>
                                        )}
                                        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-black text-[#1E3A2B] border border-slate-200 shadow-2xs z-10">
                                            {prod.weight || '500g'}
                                        </span>

                                        <img
                                            src={prod.image_url || prod.image || '/doypack_miel_amandes.png'}
                                            alt={prod.name_fr || prod.name_ar}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            onError={(e: any) => {
                                                e.target.src = '/images/products/granola-miel.png';
                                            }}
                                        />
                                    </div>

                                    {/* Titles */}
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black text-[#1E3A2B]">
                                            {isAr ? prod.name_ar : prod.name_fr}
                                        </h3>
                                        <p className="text-xs text-slate-400 font-semibold">
                                            {isAr ? prod.name_fr : prod.name_ar}
                                        </p>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                        <span className="text-slate-500 text-[11px] mr-1">(4.9/5)</span>
                                    </div>

                                    {/* Price & Order CTA Button */}
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <div>
                                            <span className="text-[10px] text-slate-400 block font-bold">
                                                {isAr ? 'الثمن' : 'Prix'}
                                            </span>
                                            <span className="text-2xl font-black text-[#D97706]">{prod.price} <span className="text-xs">DH</span></span>
                                        </div>

                                        <button
                                            onClick={() => setSelectedProduct(prod)}
                                            className="px-5 py-3 bg-[#1E3A2B] hover:bg-[#D97706] text-white text-xs font-black rounded-2xl transition duration-300 flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
                                        >
                                            <ShoppingBag size={15} />
                                            <span>{isAr ? 'طلب الآن (COD)' : 'Commander (COD)'}</span>
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </main>

                {/* REVIEWS SECTION */}
                <TestimonialsSection lang={lang} />
            </div>

            {/* FOOTER */}
            <Footer lang={lang} />

            {/* FLOATING WHATSAPP BUTTON (ثابت فـ الجنب لتحت) */}
            <a
                href="https://wa.me/212600000000?text=Bonjour%20Maison%20Fakia,%20je%20souhaite%20commander"
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebd59] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer border-2 border-white"
                aria-label="Contact via WhatsApp"
            >
                <MessageCircle size={28} className="fill-white text-[#25D366]" />
            </a>

            {/* MODAL الدفع عند الاستلام COD */}
            {selectedProduct && (
                <CodModal
                    productName={`${selectedProduct.name_ar} (${selectedProduct.name_fr})`}
                    price={selectedProduct.price}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

        </div>
    );
}