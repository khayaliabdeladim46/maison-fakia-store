'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
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
        descFr: 'Miel pur d\'oranger, amandes grillées croquantes & graines de sésame.',
        descAr: 'عسل الليمون الحر، لوز بلدي مقرمش وبذور السمسم.',
        price: 75,
        oldPrice: 95,
        image: '/doypack_miel_amandes.png',
    },
    {
        id: 'chocolat-noir',
        nameFr: 'Granola Chocolat Noir',
        nameAr: 'جرانولا الشوكولاتة السوداء',
        descFr: 'Pépites de chocolat noir 74% intense, noisettes & miel d\'oranger.',
        descAr: 'حبيبات الشوكولاتة السوداء 74%، بندق وعسل الليمون.',
        price: 80,
        oldPrice: 100,
        image: '/doypack_chocolat_noir.png',
    },
    {
        id: 'amlou-argan',
        nameFr: 'Granola Amlou & Argan',
        nameAr: 'جرانولا أملو وزيت الأركان',
        descFr: 'Avoine grillée, Amlou traditionnel à l\'huile d\'argan bio & miel pur.',
        descAr: 'شوفان محمر، أملو بلدي بزيت الأركان الطبيعي وعسل الحر.',
        price: 85,
        oldPrice: 110,
        image: '/doypack_amlou_argan.png',
    },
    {
        id: 'mix-energie',
        nameFr: 'Mix Fruits Secs Énergie',
        nameAr: 'فواكه جافة مشكلة طاقة',
        descFr: 'Mélange premium d\'amandes, noix, anacardes et figues séchées bio.',
        descAr: 'تشكيلة فاخرة من اللوز، الجوز، الكاجو والتين المجفف.',
        price: 70,
        image: '/doypack_fruits_secs.png',
    },
    {
        id: 'energy-balls',
        nameFr: 'Pack Boules d’Énergie (Energy Balls)',
        nameAr: 'باك كرات الطاقة بالتمر والجوز',
        descFr: 'Bouchées énergétiques aux dattes Majhoul, noix & cacao brut.',
        descAr: 'كرات مشبعة بتمر المجهول، الجوز والكاكاو الخام.',
        price: 85,
        oldPrice: 120,
        image: '/doypack_energy_balls.png',
    },
    {
        id: 'pro-sport',
        nameFr: 'Granola Pro-Sport Protéiné',
        nameAr: 'جرانولا بروتين للرياضيين',
        descFr: 'Enrichi en graines de courge, chia & protéines végétales naturelles.',
        descAr: 'غني ببذور اليقطين، الشيا والبروتين النباتي للرياضيين.',
        price: 90,
        oldPrice: 115,
        image: '/doypack_pro_sport.png',
    }
];

const translations: any = {
    fr: {
        dir: 'ltr',
        pageBadge: 'CATALOGUE COMPLET',
        pageTitle: 'Tous Nos Produits Artisanaux',
        pageSubtitle: 'Découvrez notre gamme complète de granolas faits-maison, fruits secs et snacks sains.',
        backHome: 'Retour à l\'accueil',
        buyBtn: 'Commander',
    },
    ar: {
        dir: 'rtl',
        pageBadge: 'الكتالوج الكامل',
        pageTitle: 'جميع منتجاتنا الطبيعية والتقليدية',
        pageSubtitle: 'اكتشف تشكيلتنا الكاملة من الجرانولا البلدي، الفواكه الجافة والسناكات الصحية.',
        backHome: 'الرجوع للرئيسية',
        buyBtn: 'طلب الآن',
    }
};

export default function ProductsPage() {
    const [lang, setLang] = useState<'fr' | 'ar'>('fr');
    const [viewProduct, setViewProduct] = useState<any | null>(null);
    const [orderProduct, setOrderProduct] = useState<any | null>(null);

    const t = translations[lang];

    return (
        <div dir={t.dir} className="bg-[#FDFBF7] text-[#1E3A2B] min-h-screen font-sans">
            {/* Header */}
            <Header lang={lang} setLang={setLang} t={t} />

            <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-14">

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2B]/70 hover:text-[#D97706] transition"
                    >
                        <ArrowLeft size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
                        <span>{t.backHome}</span>
                    </Link>

                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded-full inline-block">
                            {t.pageBadge}
                        </span>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1E3A2B] leading-tight">
                            {t.pageTitle}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                            {t.pageSubtitle}
                        </p>
                    </div>
                </div>

                {/* All Products Grid */}
                <section className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
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

                                    <h2
                                        onClick={() => setViewProduct(prod)}
                                        className="text-[11px] sm:text-sm font-bold text-[#1E3A2B] cursor-pointer hover:text-[#D97706] transition line-clamp-1 leading-snug"
                                    >
                                        {name}
                                    </h2>
                                </div>

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
                </section>

                <TestimonialsSection lang={lang} />

            </main>

            <Footer lang={lang} />

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
