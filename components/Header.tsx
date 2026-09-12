'use client';

import { Globe } from 'lucide-react';

export default function Header({ lang, setLang, t }: any) {
    return (
        <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#1E3A2B]/10">

            {/* Top Banner - Subtle & Clean */}
            <div className="bg-[#1E3A2B] text-[#FDFBF7] py-1 px-4 text-[10px] sm:text-[11px] font-light text-center tracking-wide">
                <p className="max-w-7xl mx-auto">
                    {lang === 'ar'
                        ? 'توصيل سريع بجميع المدن المغربية (24h - 48h) • الدفع عند الاستلام'
                        : 'Livraison Express partout au Maroc (24h - 48h) • Paiement à la livraison'}
                </p>
            </div>

            {/* Main Navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between relative">

                {/* Left Spacer for symmetry */}
                <div className="w-20 hidden sm:block"></div>

                {/* Center: Luxury Minimalist Logo */}
                <div className="text-center mx-auto sm:mx-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    <a href="#" className="inline-block group">
            <span className="text-lg sm:text-2xl font-serif tracking-[0.25em] text-[#1E3A2B] uppercase font-bold">
              MAISON <span className="text-[#D97706] font-normal">FAKIA</span>
            </span>
                    </a>
                </div>

                {/* Right: Clean Language Pill Button */}
                <button
                    onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                    className="px-3 py-1 rounded-full border border-[#1E3A2B]/15 bg-white/80 hover:bg-white text-[11px] font-medium text-[#1E3A2B] shadow-2xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                    <Globe size={12} className="text-[#D97706]" />
                    <span>{lang === 'fr' ? 'العربية' : 'FR'}</span>
                </button>

            </div>
        </header>
    );
}
