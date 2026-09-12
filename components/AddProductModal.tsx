'use client';

import { useState } from 'react';
import { X, Plus, Image as ImageIcon, PackageCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddProductModal({ isOpen, onClose, onAddProduct, lang }: any) {
    const [nameFr, setNameFr] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [price, setPrice] = useState(75);
    const [image, setImage] = useState('/doypack_miel_amandes.png');
    const [descFr, setDescFr] = useState('');
    const [descAr, setDescAr] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nameFr || !price) return alert('المرجو كتابة اسم المنتج والثمن');

        const newProd = {
            id: `prod-${Date.now()}`,
            nameFr,
            nameAr: nameAr || nameFr,
            price: Number(price),
            image: image || '/doypack_miel_amandes.png',
            descFr,
            descAr,
            ingredientsFr: 'Amandes, Miel Pur, Avoine Bio',
            ingredientsAr: 'لوز، عسل حر، شوفان بيو',
        };

        onAddProduct(newProd);
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-[#0D1F15] text-[#1E3A2B] dark:text-[#FDFBF7] border border-[#1E3A2B]/15 dark:border-emerald-800/50 rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-emerald-900/40 text-slate-500 hover:text-red-500 transition"
                    >
                        <X size={18} />
                    </button>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-emerald-900/40 pb-3">
                            <PackageCheck className="text-[#D97706]" size={20} />
                            <h3 className="text-sm font-bold">
                                {lang === 'ar' ? 'إضافة منتج جديد (المسؤول)' : 'Ajouter un Produit (Admin)'}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="text-[11px] font-bold block mb-1">اسم المنتج (الفرنسية) *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: Granola Bio Amlou"
                                    value={nameFr}
                                    onChange={(e) => setNameFr(e.target.value)}
                                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-emerald-800/50 bg-slate-50 dark:bg-[#07120C]"
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-bold block mb-1">اسم المنتج (العربية)</label>
                                <input
                                    type="text"
                                    placeholder="مثال: جرانولا أملو الطبيعية"
                                    value={nameAr}
                                    onChange={(e) => setNameAr(e.target.value)}
                                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-emerald-800/50 bg-slate-50 dark:bg-[#07120C]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[11px] font-bold block mb-1">الثمن (DH) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-emerald-800/50 bg-slate-50 dark:bg-[#07120C]"
                                    />
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold block mb-1">مسار الصورة</label>
                                    <input
                                        type="text"
                                        placeholder="/doypack_miel_amandes.png"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-emerald-800/50 bg-slate-50 dark:bg-[#07120C]"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#1E3A2B] dark:bg-[#D97706] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                            >
                                <Plus size={15} /> {lang === 'ar' ? 'حفظ وإضافة للمتجر' : 'Enregistrer le Produit'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
