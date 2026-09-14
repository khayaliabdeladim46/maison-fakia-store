'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export default function CodModal({ product, onClose, t, lang = 'fr' }: any) {
    const isAr = lang === 'ar';
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!product) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // إرسال البيانات المباشر لـ Supabase
            const { error } = await supabase.from('orders').insert([
                {
                    customer_name: fullName,
                    phone: phone,
                    city: city,
                    address: address,
                    product_name: isAr ? product.nameAr : product.nameFr,
                    total_price: product.price,
                    status: 'pending',
                },
            ]);

            if (error) {
                console.error('Supabase Error:', error);
                alert(isAr ? 'خطأ فـ التسجيل: ' + error.message : 'Erreur: ' + error.message);
                return;
            }

            setIsSuccess(true);
        } catch (err: any) {
            console.error('Erreur:', err);
            alert(isAr ? 'حدث خطأ أثناء إرسال الطلب' : 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div dir={isAr ? 'rtl' : 'ltr'} className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl relative text-[#1E3A2B] font-sans">

                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X size={20} />
                </button>

                {isSuccess ? (
                    <div className="text-center py-8 space-y-3">
                        <CheckCircle2 size={56} className="text-emerald-600 mx-auto animate-bounce" />
                        <h3 className="text-xl font-bold text-[#1E3A2B]">
                            {isAr ? 'تم استلام طلبك بنجاح! 🎉' : 'Commande Confirmée ! 🎉'}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                            {isAr
                                ? 'شكراً لك! سيتصل بك فريقنا في أقرب وقت لتأكيد الشحن.'
                                : 'Merci ! Notre équipe vous contactera sous peu pour confirmer la livraison.'}
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-4 px-6 py-2.5 bg-[#1E3A2B] text-white text-xs font-bold rounded-xl"
                        >
                            {isAr ? 'إغلاق' : 'Fermer'}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="border-b pb-3">
                            <span className="text-[10px] font-extrabold uppercase text-[#D97706]">
                                {isAr ? 'تأكيد الطلب السريع' : 'Commande Express COD'}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-[#1E3A2B]">
                                {isAr ? product.nameAr : product.nameFr}
                            </h3>
                            <p className="text-sm font-extrabold text-[#D97706] mt-0.5">
                                {product.price} DH <span className="text-[10px] text-slate-400 font-normal">{isAr ? '(التوصيل سريع)' : '(Livraison Express)'}</span>
                            </p>
                        </div>

                        <div className="space-y-3 text-xs font-medium">
                            <div>
                                <label className="block text-slate-700 mb-1">{isAr ? 'الاسم الكامل *' : 'Nom & Prénom *'}</label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder={isAr ? 'مثال: محمد العلوي' : 'Ex: Mohamed Alami'}
                                    className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-[#D97706] bg-slate-50"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 mb-1">{isAr ? 'رقم الهاتف *' : 'Téléphone *'}</label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="06 XX XX XX XX"
                                    className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-[#D97706] bg-slate-50"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 mb-1">{isAr ? 'المدينة *' : 'Ville *'}</label>
                                <input
                                    type="text"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder={isAr ? 'مثال: الدار البيضاء، الرباط...' : 'Ex: Casablanca, Rabat...'}
                                    className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-[#D97706] bg-slate-50"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 mb-1">{isAr ? 'العنوان الشخصي' : 'Adresse de livraison'}</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder={isAr ? 'الحي، الشارع، أرقام المنزل...' : 'Quartier, Rue...'}
                                    className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-[#D97706] bg-slate-50"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-[#D97706] hover:bg-[#b56305] text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-md cursor-pointer"
                        >
                            <ShoppingBag size={14} />
                            <span>
                                {loading
                                    ? (isAr ? 'جاري الإرسال...' : 'Envoi en cours...')
                                    : (isAr ? `تأكيد الطلب (${product.price} DH)` : `Confirmer (${product.price} DH)`)}
                            </span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}