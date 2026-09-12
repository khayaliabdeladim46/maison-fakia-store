'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import WhyUsMinimal from '@/components/WhyUsMinimal';
import CustomPackBuilder from '@/components/CustomPackBuilder';
import FaqWithVideoSection from '@/components/FaqWithVideoSection';
import ProductDetailModal from '@/components/ProductDetailModal';
import CodModal from '@/components/CodModal';
import LiveSalesNotification from '@/components/LiveSalesNotification';
import WhatsAppButton from '@/components/WhatsAppButton';
import { TestimonialsSection, Footer } from '@/components/ExtraSections';

const PRODUCTS = [
    {
        id: 'miel-amandes',
        nameFr: 'Granola Miel & Amandes',
        nameAr: 'جرانولا العسل واللوز',
        price: 75,
        image: '/doypack_miel_amandes.png',
    },
    {
        id: 'chocolat-noir',
        nameFr: 'Granola Chocolat Noir',
        nameAr: 'جرانولا الشوكولاتة السوداء',
        price: 80,
        image: '/doypack_chocolat_noir.png',
    },
    {
        id: 'amlou-argan',
        nameFr: 'Granola Amlou & Argan',
        nameAr: 'جرانولا أملو وزيت الأركان',
        price: 85,
        image: '/doypack_amlou_argan.png',
    },
    {
        id: 'mix-energie',
        nameFr: 'Mix Fruits Secs Énergie',
        nameAr: 'فواكه جافة مشكلة طاقة',
        price: 70,
        image: '/doypack_fruits_secs.png',
    },
    {
        id: 'energy-balls',
        nameFr: 'Energy Balls Dattes & Noix',
        nameAr: 'كرات الطاقة بالتمر والجوز',
        price: 65,
        image: '/doypack_energy_balls.png',
    },
    {
        id: 'pro-sport',
        nameFr: 'Granola Pro-Sport Protéiné',
        nameAr: 'جرانولا بروتين للرياضيين',
        price: 90,
        image: '/doypack_pro_sport.png',
    }
];

const translations: any = {
    fr: {
        dir: 'ltr',
        collectionBadge: 'NOS CRÉATIONS',
        collectionTitle: 'Sélection Artisanale & Healthy',
        buyBtn: 'Commander',
    },
    ar: {
        dir: 'rtl',
        collectionBadge: 'تشكيلتنا الفاخرة',
        collectionTitle: 'جرانولا وسناكات طبيعية 100%',
        buyBtn: 'طلب الآن',
    }
};

export default function Home() {
    const [lang, setLang] = useState<'fr' | 'ar'>('fr');
    const [viewProduct, setViewProduct] = useState<any | null>(null);
    const [orderProduct, setOrderProduct] = useState<any | null>(null);

    const t = translations[lang];

    return (
        <div dir={t.dir} className="bg-[#FDFBF7] text-[#1E3A2B] min-h-screen font-sans">
            {/* Navbar */}
            <Header lang={lang} setLang={setLang} t={t} />

            {/* Hero Slider */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6">
                <HeroSlider t={t} />
            </main>

            {/* Trust Bar */}
            <WhyUsMinimal t={t} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* 1. Products Collection Grid (2x2 Mobile / 3 Columns Desktop) */}
                <section id="collection" className="pt-10 pb-8">
                    <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] block">
                          {t.collectionBadge}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A2B] leading-tight">
                            {t.collectionTitle}
                        </h2>
                    </div>

                    {/* ✅ 2 Columns Grid on Mobile (2x2) and 3 on Desktop */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                        {PRODUCTS.slice(0, 4).map((prod: any, index: number) => {
                            const name = lang === 'ar' ? prod.nameAr : prod.nameFr;

                            return (
                                <motion.div
                                    key={prod.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-white border border-[#1E3A2B]/10 rounded-2xl p-3 sm:p-4 flex flex-col justify-between shadow-xs hover:border-[#1E3A2B]/30 transition duration-300 group"
                                >
                                    <div
                                        onClick={() => setViewProduct(prod)}
                                        className="relative rounded-xl overflow-hidden h-36 sm:h-48 mb-3 bg-[#F4EFEA] cursor-pointer"
                                    >
                                        <img
                                            src={prod.image}
                                            alt={name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />

                                        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                            <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-xs text-[#1E3A2B] text-[10px] sm:text-[11px] font-bold shadow-xs flex items-center gap-1">
                                                <Eye size={13} /> {lang === 'ar' ? 'عرض التفاصيل' : 'Détails'}
                                            </span>
                                        </div>
                                    </div>

                                    <h3
                                        onClick={() => setViewProduct(prod)}
                                        className="text-xs sm:text-sm font-bold text-[#1E3A2B] cursor-pointer hover:text-[#D97706] transition line-clamp-1"
                                    >
                                        {name}
                                    </h3>

                                    <div className="mt-3 border-t border-[#1E3A2B]/10 pt-3 flex items-center justify-between gap-1">
                                        <div className="flex items-baseline gap-0.5 sm:gap-1">
                                            <span className="text-sm sm:text-lg font-bold text-[#D97706]">{prod.price} DH</span>
                                            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">(500g)</span>
                                        </div>

                                        <button
                                            onClick={() => setOrderProduct(prod)}
                                            className="px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#1E3A2B] hover:bg-[#142A1E] text-white font-bold rounded-xl transition flex items-center gap-1 text-[10px] sm:text-[11px] shadow-xs active:scale-95 cursor-pointer"
                                        >
                                            <ShoppingBag size={13} /> {t.buyBtn}
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ✅ زر Voir Tout كيدي لـ /products */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/products"
                            className="inline-block w-full sm:w-auto bg-[#1E3A2B] hover:bg-[#D97706] text-white font-extrabold text-xs py-3.5 px-8 rounded-xl shadow-md transition active:scale-95 text-center"
                        >
                            {lang === 'ar' ? 'Voir Tout (عرض جميع المنتجات)' : 'Voir Tous Les Produits (Voir Tout)'}
                        </Link>
                    </div>
                </section>

                {/* 2. Pack Trio Section (Slide أفقي فـ التلفون) */}
                <div className="overflow-x-auto md:overflow-visible pb-4 scrollbar-none snap-x snap-mandatory">
                    <CustomPackBuilder onOrderCustomPack={(pack: any) => setOrderProduct(pack)} t={t} lang={lang} />
                </div>

                {/* 3. Video + FAQ */}
                <FaqWithVideoSection t={t} lang={lang} />

                {/* 4. Avis Clients (خلفية خضراء ملكية خفيفة) */}
                <TestimonialsSection t={t} lang={lang} />
            </main>

            {/* Footer (خلفية خضراء داكنة) */}
            <Footer t={t} lang={lang} />

            {/* Modals & Live Notifications */}
            <LiveSalesNotification lang={lang} />

            <ProductDetailModal
                product={viewProduct}
                onClose={() => setViewProduct(null)}
                onOrder={(prod: any) => {
                    setViewProduct(null);
                    setOrderProduct(prod);
                }}
                lang={lang}
            />

            <CodModal
                product={orderProduct}
                onClose={() => setOrderProduct(null)}
                t={t}
                lang={lang}
            />

            <WhatsAppButton lang={lang} />
        </div>
    );
}