'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag, ArrowRight } from 'lucide-react';
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
        oldPrice: 95,
        image: '/doypack_miel_amandes.png',
    },
    {
        id: 'chocolat-noir',
        nameFr: 'Granola Chocolat Noir',
        nameAr: 'جرانولا الشوكولاتة السوداء',
        price: 80,
        oldPrice: 100,
        image: '/doypack_chocolat_noir.png',
    },
    {
        id: 'amlou-argan',
        nameFr: 'Granola Amlou & Argan',
        nameAr: 'جرانولا أملو وزيت الأركان',
        price: 85,
        oldPrice: 110,
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
        nameFr: 'Pack Boules d’Énergie (Energy Balls)',
        nameAr: 'باك كرات الطاقة بالتمر والجوز',
        price: 85,
        oldPrice: 120,
        image: '/doypack_energy_balls.png',
    },
    {
        id: 'pro-sport',
        nameFr: 'Granola Pro-Sport Protéiné',
        nameAr: 'جرانولا بروتين للرياضيين',
        price: 90,
        oldPrice: 115,
        image: '/doypack_pro_sport.png',
    }
];

const translations: any = {
    fr: {
        dir: 'ltr',
        collectionBadge: 'NOS CRÉATIONS',
        collectionTitle: 'Sélection Artisanale & Healthy',
        seeAllBtn: 'Voir Tous Les Produits',
        buyBtn: 'Commander',
    },
    ar: {
        dir: 'rtl',
        collectionBadge: 'تشكيلتنا الفاخرة',
        collectionTitle: 'جرانولا وسناكات طبيعية 100%',
        seeAllBtn: 'عرض جميع المنتجات',
        buyBtn: 'طلب الآن',
    }
};

export default function Home() {
    const [lang, setLang] = useState<'fr' | 'ar'>('fr');
    const [viewProduct, setViewProduct] = useState<any | null>(null);
    const [orderProduct, setOrderProduct] = useState<any | null>(null);

    const t = translations[lang];

    return (
        <div dir={t.dir} className="bg-[#FDFBF7] text-[#1E3A2B] min-h-screen font-sans overflow-x-hidden">
            {/* Header */}
            <Header lang={lang} setLang={setLang} t={t} />

            {/* Hero Slider */}
            <main className="max-w-7xl mx-auto px-3 sm:px-6">
                <HeroSlider t={t} />
            </main>

            {/* Trust Bar */}
            <WhyUsMinimal t={t} />

            <main className="max-w-7xl mx-auto px-3 sm:px-6 space-y-10 sm:space-y-14">

                {/* 1. Products Section (3x2 Grid on Desktop / 2x3 on Mobile) */}
                <section id="collection" className="pt-4 sm:pt-8">
                    <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1.5 px-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D97706] block">
                          {t.collectionBadge}
                        </span>
                        <h2 className="text-xl sm:text-3xl font-bold text-[#1E3A2B] leading-tight">
                            {t.collectionTitle}
                        </h2>
                    </div>

                    {/* ✅ 6 Products Grid (3 Columns Desktop = 3x2) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
                        {PRODUCTS.map((prod: any, index: number) => {
                            const name = lang === 'ar' ? prod.nameAr : prod.nameFr;

                            return (
                                <motion.div
                                    key={prod.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.04 }}
                                    className="bg-white border border-[#1E3A2B]/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-[#1E3A2B]/30 transition duration-300 group"
                                >
                                    <div>
                                        {/* Image Container */}
                                        <div
                                            onClick={() => setViewProduct(prod)}
                                            className="relative rounded-lg sm:rounded-xl overflow-hidden h-36 sm:h-52 mb-2 sm:mb-3 bg-[#F4EFEA]/60 p-2 flex items-center justify-center cursor-pointer"
                                        >
                                            <img
                                                src={prod.image}
                                                alt={name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                                            />

                                            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                                <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-[#1E3A2B] text-[10px] font-bold shadow-2xs flex items-center gap-1">
                                                    <Eye size={12} /> {lang === 'ar' ? 'التفاصيل' : 'Détails'}
                                                </span>
                                            </div>
                                        </div>

                                        <h3
                                            onClick={() => setViewProduct(prod)}
                                            className="text-[11px] sm:text-sm font-bold text-[#1E3A2B] cursor-pointer hover:text-[#D97706] transition line-clamp-1 leading-snug"
                                        >
                                            {name}
                                        </h3>
                                    </div>

                                    {/* Price with Clean Strikethrough Effect */}
                                    <div className="mt-2.5 sm:mt-3 border-t border-[#1E3A2B]/10 pt-2 sm:pt-3 flex items-center justify-between gap-1">
                                        <div className="flex flex-col">
                                            {prod.oldPrice && (
                                                <span className="text-[9px] sm:text-[11px] text-slate-400 line-through font-semibold -mb-0.5">
                                                    {prod.oldPrice} DH
                                                </span>
                                            )}
                                            <span className="text-xs sm:text-base font-extrabold text-[#D97706]">
                                                {prod.price} DH
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => setOrderProduct(prod)}
                                            className="px-2 py-1.2 sm:px-3.5 sm:py-2 bg-[#1E3A2B] hover:bg-[#D97706] text-white font-bold rounded-lg sm:rounded-xl transition flex items-center gap-1 text-[9px] sm:text-[11px] shadow-2xs active:scale-95 cursor-pointer shrink-0"
                                        >
                                            <ShoppingBag size={12} />
                                            <span>{t.buyBtn}</span>
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ✅ Button "Voir Tous Les Produits" VISIBLE ON ALL DEVICES (Desktop + Mobile) */}
                    <div className="mt-6 sm:mt-8 text-center">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#1E3A2B] hover:bg-[#D97706] text-white font-extrabold text-xs py-3.5 px-8 rounded-xl shadow-xs transition active:scale-95 text-center"
                        >
                            <span>{t.seeAllBtn}</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </section>

                {/* 2. Custom Pack Builder Section */}
                <section>
                    <CustomPackBuilder onOrderCustomPack={(pack: any) => setOrderProduct(pack)} t={t} lang={lang} />
                </section>

                {/* 3. Video + FAQ Section */}
                <FaqWithVideoSection t={t} lang={lang} />

                {/* 4. Avis Clients Testimonials */}
                <TestimonialsSection t={t} lang={lang} />
            </main>

            {/* Footer */}
            <Footer t={t} lang={lang} />

            {/* Modals & Notifications */}
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