'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, ArrowLeft, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setErrorMsg('البريد الإلكتروني أو كلمة السر غير صحيحة');
            } else if (data.session) {
                router.push('/admin');
            }
        } catch (err: any) {
            setErrorMsg('حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة لاحقاً');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div dir="rtl" className="min-h-screen bg-[#FAF9F6] text-[#1E3A2B] font-sans flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">

                <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-[#1E3A2B] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg mx-auto border-2 border-[#D97706]">
                        MF
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black text-[#1E3A2B]">تسجيل الدخول - Admin</h1>
                    <p className="text-xs text-slate-500 font-semibold">لوحة تحكم Maison Fakia المغرب</p>
                </div>

                {errorMsg && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-extrabold">
                        <AlertCircle size={16} className="shrink-0 text-rose-600" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني (Email)</label>
                        <div className="relative">
                            <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@maisonfakia.ma"
                                className="w-full pr-10 pl-4 py-3 bg-[#FAF9F6] border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#D97706] transition"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">كلمة السر (Password)</label>
                        <div className="relative">
                            <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pr-10 pl-4 py-3 bg-[#FAF9F6] border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#D97706] transition"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-[#1E3A2B] hover:bg-[#D97706] text-white font-extrabold text-xs rounded-2xl shadow-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Sparkles size={16} className="animate-spin" />
                                <span>جاري التحقق...</span>
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <ShieldCheck size={16} />
                                <span>دخول اللوحة</span>
                            </span>
                        )}
                    </button>
                </form>

                <div className="pt-2 text-center border-t border-slate-100">
                    <button
                        onClick={() => router.push('/')}
                        className="text-xs font-bold text-slate-500 hover:text-[#D97706] transition inline-flex items-center gap-1 cursor-pointer"
                    >
                        <ArrowLeft size={14} />
                        <span>الرجوع للموقع الرئيسي</span>
                    </button>
                </div>

            </div>
        </div>
    );
}