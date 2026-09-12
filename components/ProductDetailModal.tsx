'use client';

import { X, ShoppingBag, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export interface ProductDetailModalProps {
    product: any;
    onClose: () => void;
    onOrder?: (prod: any) => void;
    lang?: 'fr' | 'ar';
}

export default function ProductDetailModal({ product, onClose, onOrder, lang = 'fr' }: ProductDetailModalProps) {
    if (!product) return null;

    const nameStr = lang === 'ar'
        ? (product.nameAr || product.name || 'منتج ميزون فاكهة')
        : (product.nameFr || product.name || 'Produit Maison Fakia');

    const descStr = lang === 'ar'
        ? (product.descriptionAr || product.description || 'منتج طبيعي وصحي 100% مكون من مواد مختارة بعناية.')
        : (product.descriptionFr || product.description || 'Produit 100% naturel préparé avec des ingrédients rigoureusement sélectionnés.');

    const weightStr = product.weight || (Array.isArray(product.weights) ? product.weights.join(', ') : product.weights) || '500g';

    const handleOrder = () => {
        if (onOrder) {
            onOrder(product);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative z-10 flex flex-col md:flex-row">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
                >
                    <X size={16} />
                </button>

                {/* Product Image */}
                <div className="md:w-1/2 bg-[#FDFBF7] p-6 flex items-center justify-center relative min-h-[220px]">
                    <img
                        src={product.image || '/doypack_3_flavors_lineup.png'}
                        alt={nameStr}
                        className="object-contain max-h-48 drop-shadow-md"
                    />
                </div>

                {/* Details Content */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                    <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
              {weightStr}
            </span>
                        <h3 className="text-lg font-bold text-[#1E3A2B]">{nameStr}</h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                            {descStr}
                        </p>
                    </div>

                    <div className="space-y-3 border-t border-slate-100 pt-3">
                        <div className="flex items-baseline justify-between">
                            <span className="text-xs text-slate-500 font-medium">{lang === 'ar' ? 'الثمن:' : 'Prix:'}</span>
                            <span className="text-xl font-extrabold text-[#D97706]">{product.price} DH</span>
                        </div>

                        {onOrder && (
                            <button
                                onClick={handleOrder}
                                className="w-full bg-[#1E3A2B] hover:bg-[#142A1E] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition text-xs shadow-md cursor-pointer active:scale-95"
                            >
                                <ShoppingBag size={15} />
                                <span>{lang === 'ar' ? 'طلب الآن' : 'Commander Maintenant'}</span>
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}