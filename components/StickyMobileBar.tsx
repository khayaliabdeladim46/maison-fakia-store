'use client';

import { ShoppingBag, Zap } from 'lucide-react';

export default function StickyMobileBar({ onOpenOrder, lang }: { onOpenOrder: () => void; lang: 'fr' | 'ar' }) {
    return (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#080C0A]/95 backdrop-blur-md border-t border-[#1E3A2B]/10 dark:border-emerald-900/40 p-3 md:hidden shadow-lg flex items-center justify-between gap-3">
            <div className="flex flex-col">
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1">
          <Zap size={10} /> Maison Fakia COD
        </span>
                <span className="text-xs font-bold text-[#1E3A2B] dark:text-[#FDFBF7]">
          {lang === 'ar' ? 'توصيل مجاني +250 DH' : 'Livraison Express COD'}
        </span>
            </div>

            <button
                onClick={onOpenOrder}
                className="px-5 py-2.5 bg-[#1E3A2B] dark:bg-[#D97706] hover:bg-[#142A1E] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition"
            >
                <ShoppingBag size={14} />
                {lang === 'ar' ? 'طلب سريع الان' : 'Commander Express'}
            </button>
        </div>
    );
}