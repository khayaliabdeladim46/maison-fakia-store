'use client';

import { useState } from 'react';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import WhyUsMinimal from '../components/WhyUsMinimal';
import CustomPackBuilder from '../components/CustomPackBuilder';
import FaqWithVideoSection from '../components/FaqWithVideoSection';
import ProductDetailModal from '../components/ProductDetailModal';
import CodModal from '../components/CodModal';
import WhatsAppButton from '../components/WhatsAppButton';
import LiveSalesNotification from '../components/LiveSalesNotification';
import { TestimonialsSection, Footer } from '../components/ExtraSections';
import { PRODUCTS, Product } from '../lib/products';
import { translations } from '../lib/translations';
import { ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    const [lang, setLang] = useState<'fr' | 'ar'>('fr');
    const [viewProduct, setViewProduct] = useState<Product | null>(null);
    const [orderProduct, setOrderProduct] = useState<any | null>(null);
    const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

    const t = translations[lang];

    return (
        <div dir={t.dir} className="bg-[#FDFBF7] text-[#1E3A2B] min-h-screen font-sans">
            {/* 1. Header Navbar */}
            <Header lang={lang} setLang={setLang} t={t} />

            {/* 2. Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6">
                <HeroSlider t={t} />
            </main>

            {/* 3. Pure Minimalist Trust Bar */}
            <WhyUsMinimal t={t} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* 4. Products Collection Grid with Clean Spacing */}
                {/* SECTION PRODUITS */}
                <section id="products" className="py-14 px-4 max-w-6xl mx-auto">

                    {/* Header ديال المنتجات الأصلي ديالك */}

                    {/* Grid 2 كولون فـ التلفون (2x2) و 3 فـ البيسي */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                        {visibleProducts.map((prod: any, index: number) => {
                            const name = lang === 'ar' ? (prod.nameAr || prod.name) : (prod.nameFr || prod.name);

                            return (
                                <motion.div
                                    key={prod.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ y: -3 }}
                                    className="bg-white border border-[#1E3A2B]/10 rounded-2xl p-3 sm:p-4 flex flex-col justify-between shadow-xs hover:border-[#1E3A2B]/30 transition duration-300 group"
                                >
                                    {/* Image Container with Preview Hover */}
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

                    {/* زر Voir Tout فـ التلفون */}
                    {!showAllMobile && products.length > 4 && (
                        <div className="mt-8 text-center md:hidden">
                            <button
                                onClick={() => setShowAllMobile(true)}
                                className="w-full bg-white border-2 border-[#1E3A2B] text-[#1E3A2B] font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-xs active:scale-95 transition"
                            >
                                {lang === 'ar' ? `عرض جميع المنتجات (${products.length})` : `Voir Tous Les Produits (${products.length})`}
                            </button>
                        </div>
                    )}

                </section>


                {/* 5. Pack Trio Section */}
                <CustomPackBuilder onOrderCustomPack={(pack: any) => setOrderProduct(pack)} t={t} lang={lang} />

                {/* 6. Avis Clients */}
                <TestimonialsSection t={t} lang={lang} />

                {/* 7. Video Petit-Déjeuner + FAQ Accordion */}
                <FaqWithVideoSection t={t} lang={lang} />
            </main>

            {/* 8. Footer */}
            <Footer t={t} />

            {/* Live Sales Notification */}
            <LiveSalesNotification lang={lang} />
            {/* Avis Client */}
            <TestimonialsSection lang={lang} t={t} />

            {/* Footer */}
            <Footer lang={lang} t={t} />
            {/* Product Detail Modal */}
            <ProductDetailModal
                product={viewProduct}
                onClose={() => setViewProduct(null)}
                onOrder={(prod: any) => {
                    setViewProduct(null);
                    setOrderProduct(prod);
                }}
                lang={lang}
            />

            {/* Express Order Modal COD */}
            <CodModal
                product={orderProduct}
                onClose={() => setOrderProduct(null)}
                t={t}
                lang={lang}
            />

            {/* Floating WhatsApp */}
            <WhatsAppButton lang={lang} />
        </div>
    );
}
