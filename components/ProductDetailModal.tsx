'use client';

import Image from 'next/image';
import { X, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Product } from '../lib/products';

interface ProductDetailModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onOrderNow: (product: Product) => void;
    lang?: string;
}

export default function ProductDetailModal({
                                               product,
                                               isOpen,
                                               onClose,
                                               onOrderNow,
                                               lang = 'fr',
                                           }: ProductDetailModalProps) {
    if (!isOpen || !product) return null;

    const currentLang = (lang === 'ar' ? 'ar' : 'fr') as 'fr' | 'ar';

    const getStr = (val: any) => {
        if (!val) return '';
        if (typeof val === 'string') return val;
        return val[currentLang] || val.fr || val.ar || '';
    };

    const nameStr = getStr(product.name);
    const descStr = getStr(product.description);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
            {/* Backdrop Click */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative z-10 p-6 space-y-6">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
                    aria-label="Fermer"
                >
                    <X size={18} />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-2 text-xs font-bold text-[#D97706] uppercase tracking-wider">
                    <Sparkles size={14} />
                    <span>{lang === 'ar' ? 'تفاصيل المنتج' : 'Détails du Produit'}</span>
                </div>

                {/* Product Info */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-5 relative h-48 w-full bg-[#FDFBF7] rounded-xl p-3 border border-slate-100 flex items-center justify-center">
                        <Image
                            src={product.image || '/doypack_3_flavors_lineup.png'}
                            alt={nameStr}
                            width={160}
                            height={160}
                            className="object-contain max-h-40 drop-shadow-md"
                        />
                    </div>

                    <div className="sm:col-span-7 space-y-3">
                        <h3 className="text-lg font-extrabold text-[#1E3A2B] leading-tight">{nameStr}</h3>

                        <div className="flex items-center gap-2">
                            <span className="text-xl font-extrabold text-[#D97706]">{product.price} DH</span>
                            <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full">
                {product.weight}
              </span>
                        </div>

                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {descStr}
                        </p>

                        <ul className="space-y-1.5 pt-1 text-[11px] text-slate-700 font-semibold">
                            <li className="flex items-center gap-1.5 text-emerald-800">
                                <Check size={14} className="text-emerald-600" />
                                <span>{lang === 'ar' ? 'طبيعي 100% بدون حافظات' : '100% Naturel sans conservateurs'}</span>
                            </li>
                            <li className="flex items-center gap-1.5 text-emerald-800">
                                <Check size={14} className="text-emerald-600" />
                                <span>{lang === 'ar' ? 'بعسل الليمون وزيت الأركان' : 'Au miel d oranger & huile d argan'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                    <button
                        onClick={() => onOrderNow(product)}
                        className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition text-xs shadow-lg cursor-pointer"
                    >
                        <ShoppingBag size={18} />
                        <span>{lang === 'ar' ? 'طلب هذا المنتج الآن' : 'Commander Ce Produit Maintenant'}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}