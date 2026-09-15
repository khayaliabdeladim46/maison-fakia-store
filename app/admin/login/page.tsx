'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // تقدر تبدل الإيميل وكلمة السر هنا
        if (email === 'admin@maisonfakia.ma' && password === 'admin123') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            router.push('/admin');
        } else {
            setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
    };

    return (
        <div dir="rtl" className="min-h-screen bg-[#1E3A2B] flex items-center justify-center p-4 font-sans">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D97706]/10 rounded-full blur-2xl" />

                <div className="text-center space-y-2 mb-8">
                    <div className="w-14 h-14 bg-[#1E3A2B]/10 text-[#1E3A2B] rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-[#1E3A2B]">Maison Fakia Admin</h1>
                    <p className="text-xs text-slate-500">تسجيل الدخول إلى لوحة إدارة المبيعات والطلبيات</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@maisonfakia.ma"
                                className="w-full pr-10 pl-4 py-3 bg-slate-50 border rounded-xl text-xs outline-none focus:border-[#D97706] transition"
                            />
                            <Mail size={16} className="absolute right-3.5 top-3.5 text-slate-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">كلمة المرور</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pr-10 pl-4 py-3 bg-slate-50 border rounded-xl text-xs outline-none focus:border-[#D97706] transition"
                            />
                            <Lock size={16} className="absolute right-3.5 top-3.5 text-slate-400" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-[#D97706] hover:bg-[#b56305] text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 active:scale-95"
                    >
                        <span>دخول إلى اللوحة</span>
                        <ArrowRight size={16} className="rotate-180" />
                    </button>
                </form>

                <div className="mt-6 text-center text-[10px] text-slate-400">
                    حساب الدخول: admin@maisonfakia.ma | كلمة السر: admin123
                </div>
            </div>
        </div>
    );
}
