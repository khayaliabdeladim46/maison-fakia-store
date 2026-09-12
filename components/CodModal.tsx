'use client';

import { useState } from 'react';
import { X, CheckCircle2, Truck, Phone, User, MapPin, ShieldCheck, ShoppingBag } from 'lucide-react';

export interface CodModalProps {
    product: any;
    isOpen?: boolean;
    onClose: () => void;
    lang?: 'fr' | 'ar';
    t?: any;
}

export default function CodModal({ product, isOpen, onClose, lang = 'fr', t }: CodModalProps) {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // التحكم فـ الظهور سواء بالـ isOpen أو بحضور الـ product
    const shouldShow = isOpen !== undefined ? isOpen : !!product;
    if (!shouldShow || !product) return null;

    // استخراج الاسم والوزن بأمان بلا أخطاء TypeScript
    const nameStr = lang === 'ar'
        ? (product.nameAr || product.title || product.name || 'منتج ميزون فاكهة')
        : (product.nameFr || product.title || product.name || 'Pack Maison Fakia');

    const weightStr = product.weight || (Array.isArray(product.weights) ? product.weights.join(', ') : product.weights) || '500g';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !phone.trim() || !city.trim()) return;

        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
            setFullName('');
            setPhone('');
            setCity('');
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 relative z-10">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
                >
                    <X size={18} />
                </button>

                {isSubmitted ? (
                    <div className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 size={36} />
                        </div>
                        <h3 className="text-xl font-extrabold text-[#1E3A2B]">
                            {lang === 'ar' ? 'تم تأكيد طلبك بنجاح!' : 'Commande Confirmée !'}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            {lang === 'ar'
                                ? 'شكراً لك! سيتصل بك فريقنا قريباً لتأكيد عنوان التسليم والتوصيل.'
                                : 'Merci ! Notre équipe vous contactera sous peu pour confirmer la livraison.'}
                        </p>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                onClose();
                            }}
                            className="w-full bg-[#1E3A2B] text-white font-bold py-3 rounded-xl text-xs cursor-pointer"
                        >
                            {lang === 'ar' ? 'إغلاق' : 'Fermer'}
                        </button>
                    </div>
                ) : (
                    <div className="p-6 space-y-5">
                        <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded-full">
                {lang === 'ar' ? 'الدفع عند الاستلام (COD)' : 'Paiement à la Livraison (COD)'}
              </span>
                            <h3 className="text-lg font-extrabold text-[#1E3A2B] pt-1">
                                {lang === 'ar' ? 'أدخل معلوماتك لإتمام الطلب' : 'Finalisez Votre Commande'}
                            </h3>
                        </div>

                        {/* Product Summary */}
                        <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                            <div className="w-14 h-14 relative shrink-0 bg-white rounded-lg p-1 border border-slate-100 flex items-center justify-center">
                                <img
                                    src={product.image || '/doypack_3_flavors_lineup.png'}
                                    alt={nameStr}
                                    className="object-contain max-h-12"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-[#1E3A2B] truncate">{nameStr}</h4>
                                <p className="text-[10px] text-slate-500 font-medium truncate">{weightStr}</p>
                            </div>
                            <span className="text-sm font-extrabold text-[#D97706] shrink-0">
                {product.price} DH
              </span>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-[11px] font-bold text-[#1E3A2B] mb-1">
                                    {lang === 'ar' ? 'الاسم الكامل *' : 'Nom Complet *'}
                                </label>
                                <div className="relative">
                                    <User size={16} className="absolute left-3 top-3 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder={lang === 'ar' ? 'مثال: محمد العلوي' : 'ex: Mohamed Alami'}
                                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#D97706] text-[#1E3A2B] font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#1E3A2B] mb-1">
                                    {lang === 'ar' ? 'رقم الهاتف *' : 'Numéro de Téléphone *'}
                                </label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="06XX XX XX XX"
                                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#D97706] text-[#1E3A2B] font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#1E3A2B] mb-1">
                                    {lang === 'ar' ? 'المدينة والعنوان *' : 'Ville & Adresse *'}
                                </label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder={lang === 'ar' ? 'مثال: الدار البيضاء، معاريف' : 'ex: Casablanca, Maarif'}
                                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#D97706] text-[#1E3A2B] font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition text-xs shadow-md cursor-pointer mt-4"
                            >
                                <ShoppingBag size={16} />
                                <span>{lang === 'ar' ? 'تأكيد الطلب الآن' : 'Confirmer la Commande'}</span>
                            </button>
                        </form>

                        <div className="flex justify-around items-center pt-2 text-[10px] text-slate-500 font-semibold border-t border-slate-100">
                            <div className="flex items-center gap-1">
                                <Truck size={13} className="text-[#D97706]" />
                                <span>{lang === 'ar' ? 'توصيل سريع' : 'Livraison Express'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <ShieldCheck size={13} className="text-emerald-600" />
                                <span>{lang === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}</span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}