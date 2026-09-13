'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function Header({ lang, setLang, t }: any) {
    const [isScrolled, setIsScrolled] = useState(false);

    // Detect Scroll position to hide/show Top Banner
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#1E3A2B]/10 shadow-2xs transition-all duration-300">

            {/* Top Banner - Hides automatically on scroll */}
            <div
                className={`bg-[#1E3A2B] text-[#FDFBF7] text-[10px] sm:text-[11px] font-light text-center tracking-wide overflow-hidden transition-all duration-300 ease-in-out ${
                    isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-1.5 px-4 opacity-100'
                }`}
            >
                <p className="max-w-7xl mx-auto">
                    {lang === 'ar'
                        ? 'توصيل سريع بجميع المدن المغربية (24h - 48h) • الدفع عند الاستلام'
                        : 'Livraison Express partout au Maroc (24h - 48h) • Paiement à la livraison'}
                </p>
            </div>

            {/* Main Navbar - Always fixed & clean */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between relative">

                {/* Left Spacer for symmetry */}
                <div className="w-20 hidden sm:block"></div>

                {/* Center: Luxury Minimalist Logo */}
                <div className="text-center mx-auto sm:mx-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    <a href="/" className="inline-block group">
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
