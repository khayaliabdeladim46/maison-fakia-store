'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Package, Clock, CheckCircle2, Truck, Check,
    Search, MessageCircle, Phone, MapPin,
    Plus, Trash2, Edit3, Layers, X, ShoppingBag, Wallet,
    Volume2, Sparkles, FileText, Printer, Calendar, Download, Building2, LogOut
} from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500&auto=format&fit=crop&q=80';

const INITIAL_PRODUCTS = [
    {
        id: 'prod-1',
        nameAr: 'غرانولا العسل واللوز',
        nameFr: 'Granola Miel Pur & Amandes',
        price: 75,
        weight: '500g',
        category: 'granola',
        image: '/doypack_miel_amandes.png',
        image_url: '/doypack_miel_amandes.png',
        badgeAr: 'الأكثر مبيعاً',
        badgeFr: 'Best Seller'
    },
    {
        id: 'prod-2',
        nameAr: 'غرانولا الشوكولاتة السوداء',
        nameFr: 'Granola Chocolat Noir 70%',
        price: 80,
        weight: '500g',
        category: 'granola',
        image: '/doypack_chocolat_noir.png',
        image_url: '/doypack_chocolat_noir.png',
        badgeAr: 'غني بالمغنيسيوم',
        badgeFr: 'Riche en Magnésium'
    },
    {
        id: 'prod-3',
        nameAr: 'غرانولا أملو وأركان',
        nameFr: 'Granola Amlou & Argan Bio',
        price: 85,
        weight: '500g',
        category: 'granola',
        image: '/doypack_amlou_argan.png',
        image_url: '/doypack_amlou_argan.png',
        badgeAr: 'وصفة تقليدية',
        badgeFr: 'Recette Traditionnelle'
    },
    {
        id: 'prod-4',
        nameAr: 'مكس الفواكه الجافة الطاقة',
        nameFr: 'Mix Fruits Secs Énergie',
        price: 90,
        weight: '500g',
        category: 'dried_fruits',
        image: '/doypack_fruits_secs.png',
        image_url: '/doypack_fruits_secs.png',
        badgeAr: 'طاقة طبيعية',
        badgeFr: 'Énergie Naturelle'
    },
    {
        id: 'prod-5',
        nameAr: 'كرات الطاقة الطبيعية',
        nameFr: 'Energy Balls Dattes & Cacao',
        price: 65,
        weight: '400g',
        category: 'energy_balls',
        image: '/doypack_energy_balls.png',
        image_url: '/doypack_energy_balls.png',
        badgeAr: 'بدون سكر مضاف',
        badgeFr: 'Sans Sucre Ajouté'
    },
    {
        id: 'prod-6',
        nameAr: 'غرانولا بروتين برو سبورت',
        nameFr: 'Granola Pro-Sport & Seeds',
        price: 95,
        weight: '500g',
        category: 'granola',
        image: '/doypack_pro_sport.png',
        image_url: '/doypack_pro_sport.png',
        badgeAr: 'للرياضيين',
        badgeFr: 'Pour Sportifs'
    }
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>(INITIAL_PRODUCTS);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const [soundEnabled, setSoundEnabled] = useState(true);
    const [newOrderAlert, setNewOrderAlert] = useState<any | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const lastOrderIdsRef = useRef<Set<string>>(new Set());

    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('2026-09');
    const [selectedCity, setSelectedCity] = useState<string>('all');

    const [devisSingleOrder, setDevisSingleOrder] = useState<any | null>(null);
    const [showMonthlyDevis, setShowMonthlyDevis] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);

    // Logout Function with clear redirect
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            window.location.href = '/login';
        }
    };

    const playNotificationChime = () => {
        try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioCtx) return;
            if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
            gain1.gain.setValueAtTime(0.5, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start();
            osc1.stop(ctx.currentTime + 0.5);
        } catch (e) {
            console.log('Audio error:', e);
        }
    };

    const getClientName = (ord: any) => {
        if (!ord) return 'زبون';
        return ord.full_name || ord.fullName || ord.name || ord.client_name || ord.customer_name || 'زبون بدون اسم';
    };

    const fetchOrders = async (isInitial = false) => {
        if (isInitial) setLoadingOrders(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            data.forEach(o => lastOrderIdsRef.current.add(o.id));
            setOrders(data);
        }
        if (isInitial) setLoadingOrders(false);
    };

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
            setProducts(data);
        } else {
            setProducts(INITIAL_PRODUCTS);
        }
    };

    useEffect(() => {
        fetchOrders(true);
        fetchProducts();

        const channel = supabase
            .channel('orders-realtime-channel')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
                if (payload.new && !lastOrderIdsRef.current.has(payload.new.id)) {
                    lastOrderIdsRef.current.add(payload.new.id);
                    setOrders((prev) => [payload.new, ...prev]);
                    if (soundEnabled) playNotificationChime();
                    setNewOrderAlert(payload.new);
                    setTimeout(() => setNewOrderAlert(null), 10000);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [soundEnabled]);

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
        if (!error) {
            setOrders((prev) => prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord)));
        }
    };

    const handleDeleteProduct = async (prodId: string) => {
        if (!confirm('هل أنت متأكد من مسح هذا المنتج؟')) return;
        await supabase.from('products').delete().eq('id', prodId);
        setProducts(products.filter((p) => p.id !== prodId));
    };

    const availableCities = Array.from(new Set(orders.map(o => o.city).filter(Boolean)));

    const confirmedRevenue = orders
        .filter((o) => o.status === 'Delivered' || o.status === 'Confirmed')
        .reduce((acc, curr) => acc + (parseFloat(curr.total_price || curr.price) || 0), 0);

    const filteredOrders = orders.filter((order) => {
        const clientName = getClientName(order).toLowerCase();
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        const matchesCity = selectedCity === 'all' || (order.city && order.city === selectedCity);
        const matchesSearch =
            clientName.includes(searchTerm.toLowerCase()) ||
            (order.phone && order.phone.includes(searchTerm)) ||
            (order.city && order.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.product_name && order.product_name.toLowerCase().includes(searchTerm.toLowerCase()));

        let matchesMonth = true;
        if (selectedMonth !== 'all' && order.created_at) {
            matchesMonth = order.created_at.startsWith(selectedMonth);
        }

        return matchesStatus && matchesSearch && matchesMonth && matchesCity;
    });

    const monthlyTotalRevenue = filteredOrders.reduce((acc, curr) => acc + (parseFloat(curr.total_price || curr.price) || 0), 0);

    const exportToCSV = () => {
        if (filteredOrders.length === 0) {
            alert('لا توجد طلبيات لتصديرها!');
            return;
        }

        const headers = ['المعرف (ID)', 'التاريخ', 'اسم الزبون', 'الهاتف', 'المدينة', 'العنوان', 'المنتج', 'الكمية', 'المبلغ (DH)', 'الحالة'];

        const rows = filteredOrders.map(ord => [
            ord.id || '',
            ord.created_at ? ord.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
            `"${(getClientName(ord) || '').replace(/"/g, '""')}"`,
            `"${(ord.phone || '').replace(/"/g, '""')}"`,
            `"${(ord.city || '').replace(/"/g, '""')}"`,
            `"${(ord.address || '').replace(/"/g, '""')}"`,
            `"${(ord.product_name || 'غرانولا').replace(/"/g, '""')}"`,
            ord.quantity || 1,
            ord.total_price || ord.price || 0,
            ord.status || 'Pending'
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `commandes_maison_fakia_${selectedMonth}_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Confirmed':
                return <span className="px-2.5 py-1 bg-blue-100 text-blue-900 rounded-full text-[11px] font-black flex items-center gap-1 w-fit border border-blue-200"><CheckCircle2 size={12}/> مؤكدة</span>;
            case 'Shipped':
                return <span className="px-2.5 py-1 bg-purple-100 text-purple-900 rounded-full text-[11px] font-black flex items-center gap-1 w-fit border border-purple-200"><Truck size={12}/> في الطريق</span>;
            case 'Delivered':
                return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full text-[11px] font-black flex items-center gap-1 w-fit border border-emerald-200"><Check size={12}/> تم التسليم</span>;
            default:
                return <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full text-[11px] font-black flex items-center gap-1 w-fit border border-amber-200"><Clock size={12}/> قيد الانتظار</span>;
        }
    };

    return (
        <div dir="rtl" className="min-h-screen bg-[#FAF9F6] text-[#1E3A2B] font-sans pb-24 relative">

            <style>{`
                @media print {
                    body { background: white !important; color: black !important; }
                    .no-print, header, main, button, select, input { display: none !important; }
                    .fixed.inset-0 { position: absolute !important; inset: 0 !important; background: white !important; padding: 0 !important; margin: 0 !important; }
                    #devis-single-print, #devis-monthly-print { display: block !important; width: 100% !important; padding: 20px !important; border: none !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    @page { size: A4 portrait; margin: 10mm; }
                }
            `}</style>

            {newOrderAlert && (
                <div className="fixed top-16 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 animate-bounce duration-500 no-print">
                    <div className="bg-[#1E3A2B] border-2 border-[#D97706] text-white p-4 rounded-3xl shadow-2xl flex items-start justify-between gap-3 backdrop-blur-md">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-[#D97706] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md">
                                <Sparkles size={20} className="animate-spin" />
                            </div>
                            <div className="space-y-1 text-right">
                                <span className="font-black text-xs text-[#D97706] block">طلبية جديدة وصلت!</span>
                                <p className="text-xs font-bold text-emerald-100">
                                    الزبون: <span className="text-white font-black">{getClientName(newOrderAlert)}</span> ({newOrderAlert.city || 'المغرب'})
                                </p>
                                <p className="text-xs font-black text-amber-200" dir="ltr">
                                    <Phone size={12} className="inline ml-1" />
                                    <span className="text-white">{newOrderAlert.phone || 'بدون رقم'}</span>
                                </p>
                                <p className="text-xs font-black text-emerald-300">
                                    {newOrderAlert.product_name || 'غرانولا'} • <span className="text-amber-300 font-black text-sm">{newOrderAlert.total_price || newOrderAlert.price || 0} DH</span>
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setNewOrderAlert(null)}
                            className="p-1 rounded-full text-emerald-300 hover:text-white transition cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            <header className="bg-[#1E3A2B] text-white py-3.5 px-4 sm:px-8 shadow-xl sticky top-0 z-40 backdrop-blur-md bg-opacity-95 border-b border-[#D97706]/30 no-print">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center justify-between w-full sm:w-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#D97706] text-white rounded-2xl flex items-center justify-center font-black text-base shadow-lg">MF</div>
                            <div>
                                <h1 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                                    <span>Maison Fakia Admin</span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                                </h1>
                                <p className="text-[11px] text-emerald-200 font-semibold">لوحة تحكم الطلبيات والـ Devis PDF</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:hidden">
                            <button onClick={() => { setSoundEnabled(true); playNotificationChime(); }} className="p-2.5 bg-amber-500/20 text-amber-300 rounded-2xl border border-amber-500/40">
                                <Volume2 size={18} />
                            </button>

                            <button onClick={handleLogout} className="p-2.5 bg-rose-500/20 text-rose-300 rounded-2xl border border-rose-500/40" title="تسجيل الخروج">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <div className="grid grid-cols-2 w-full sm:w-auto bg-emerald-950/90 p-1 rounded-2xl border border-emerald-800">
                            <button onClick={() => setActiveTab('orders')} className={`py-2 px-5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'orders' ? 'bg-[#D97706] text-white shadow-md' : 'text-emerald-200 hover:text-white'}`}>
                                <Layers size={15} />
                                <span>الطلبيات ({orders.length})</span>
                            </button>
                            <button onClick={() => setActiveTab('products')} className={`py-2 px-5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'products' ? 'bg-[#D97706] text-white shadow-md' : 'text-emerald-200 hover:text-white'}`}>
                                <ShoppingBag size={15} />
                                <span>المنتجات ({products.length})</span>
                            </button>
                        </div>

                        <button onClick={() => { setSoundEnabled(true); playNotificationChime(); }} className="hidden sm:flex px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-2xl border border-amber-500/40 items-center gap-1.5 text-xs font-bold cursor-pointer">
                            <Volume2 size={16} />
                            <span>تفعيل الصوت</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="hidden sm:flex px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-2xl border border-rose-500/40 items-center gap-1.5 text-xs font-bold cursor-pointer transition"
                        >
                            <LogOut size={16} />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-6 space-y-6 no-print">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                    <div className="bg-white p-4 sm:p-6 rounded-3xl border border-emerald-200/80 shadow-xs space-y-1">
                        <span className="text-[11px] sm:text-xs font-bold text-emerald-800 block">المداخيل الإجمالية</span>
                        <span className="text-xl sm:text-3xl font-black text-[#1E3A2B] block">{confirmedRevenue.toLocaleString()} <span className="text-xs text-[#D97706]">DH</span></span>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                        <span className="text-[11px] sm:text-xs font-bold text-slate-500 block">إجمالي الطلبات</span>
                        <span className="text-xl sm:text-3xl font-black text-[#1E3A2B] block">{orders.length}</span>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-1">
                        <span className="text-[11px] sm:text-xs font-bold text-amber-700 block">قيد الانتظار</span>
                        <span className="text-xl sm:text-3xl font-black text-amber-600 block">{orders.filter(o => !o.status || o.status === 'Pending').length}</span>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-3xl border border-emerald-200/80 shadow-xs space-y-1">
                        <span className="text-[11px] sm:text-xs font-bold text-emerald-700 block">تم التسليم</span>
                        <span className="text-xl sm:text-3xl font-black text-emerald-600 block">{orders.filter(o => o.status === 'Delivered').length}</span>
                    </div>
                </div>

                {activeTab === 'orders' && (
                    <div className="space-y-4">

                        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">

                            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
                                <div className="relative w-full sm:w-64">
                                    <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="بحث بالاسم، الرقم، المدينة..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pr-10 pl-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#D97706]"
                                    />
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <div className="flex items-center gap-1.5 bg-[#FAF9F6] border border-slate-200 px-3 py-2 rounded-2xl text-xs font-bold w-full sm:w-auto">
                                        <Calendar size={15} className="text-[#D97706] shrink-0" />
                                        <select
                                            value={selectedMonth}
                                            onChange={(e) => setSelectedMonth(e.target.value)}
                                            className="bg-transparent focus:outline-none text-slate-700 text-xs cursor-pointer w-full"
                                        >
                                            <option value="all">جميع الأشهر</option>
                                            <option value="2026-09">شتنبر 2026</option>
                                            <option value="2026-08">غشت 2026</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-1.5 bg-[#FAF9F6] border border-slate-200 px-3 py-2 rounded-2xl text-xs font-bold w-full sm:w-auto">
                                        <Building2 size={15} className="text-[#D97706] shrink-0" />
                                        <select
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            className="bg-transparent focus:outline-none text-slate-700 text-xs cursor-pointer w-full"
                                        >
                                            <option value="all">جميع المدن ({availableCities.length})</option>
                                            {availableCities.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                                <button
                                    onClick={exportToCSV}
                                    className="px-3.5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-black transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                                    title="تصدير لـ Excel"
                                >
                                    <Download size={15} />
                                    <span>تصدير CSV</span>
                                </button>

                                <button
                                    onClick={() => setShowMonthlyDevis(true)}
                                    className="px-3.5 py-2.5 bg-[#1E3A2B] hover:bg-[#D97706] text-white rounded-2xl text-xs font-black transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                                >
                                    <FileText size={15} />
                                    <span>Devis الشهر (PDF)</span>
                                </button>

                                <div className="flex items-center gap-1 overflow-x-auto text-xs font-bold">
                                    {['all', 'Pending', 'Confirmed', 'Shipped', 'Delivered'].map((st) => (
                                        <button
                                            key={st}
                                            onClick={() => setFilterStatus(st)}
                                            className={`px-2.5 py-2 rounded-xl transition whitespace-nowrap text-[11px] cursor-pointer ${filterStatus === st ? 'bg-[#D97706] text-white' : 'bg-slate-100 text-slate-600'}`}
                                        >
                                            {st === 'all' ? 'الكل' : st === 'Pending' ? 'الانتظار' : st === 'Confirmed' ? 'مؤكدة' : st === 'Shipped' ? 'فـ الطريق' : 'مسلّمة'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {loadingOrders ? (
                            <div className="p-12 text-center text-xs font-bold text-slate-400 bg-white rounded-3xl">جاري تحميل الطلبيات...</div>
                        ) : filteredOrders.length === 0 ? (
                            <div className="p-12 text-center space-y-2 bg-white rounded-3xl">
                                <Package size={36} className="mx-auto text-slate-300" />
                                <p className="text-xs font-bold text-slate-500">لا توجد طلبيات مطابقة للبحث، المدينة أو الشهر المحدد.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {filteredOrders.map((ord) => {
                                    const clientName = getClientName(ord);
                                    const cleanPhone = ord.phone ? ord.phone.replace(/[^0-9]/g, '') : '';
                                    const formattedPhone = cleanPhone.startsWith('0') ? `212${cleanPhone.slice(1)}` : cleanPhone;
                                    const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(`السلام عليكم ${clientName}، معكم Maison Fakia لتأكيد طلبية ${ord.product_name || 'الغرانولا'}.`)}`;

                                    return (
                                        <div key={ord.id} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#D97706]/40 transition space-y-4 flex flex-col justify-between">

                                            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-xl bg-[#FAF9F6] border border-slate-200 text-[#1E3A2B] font-black text-xs flex items-center justify-center shrink-0">
                                                            {clientName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-black text-[#1E3A2B] text-base leading-snug">{clientName}</h3>
                                                            <span className="text-xs font-bold text-[#D97706] flex items-center gap-1" dir="ltr">
                                                                <Phone size={12} /> {ord.phone || 'بدون رقم'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {getStatusBadge(ord.status || 'Pending')}
                                                    <button
                                                        onClick={() => setDevisSingleOrder(ord)}
                                                        className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-[#D97706] rounded-xl text-xs font-black border border-amber-200 flex items-center gap-1 cursor-pointer transition"
                                                        title="عرض Devis الزبون"
                                                    >
                                                        <FileText size={13} />
                                                        <span>Devis</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF9F6] p-3.5 rounded-2xl border border-slate-100">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] text-slate-400 font-bold block">المنتج والكمية</span>
                                                    <p className="font-extrabold text-[#1E3A2B] line-clamp-1">{ord.product_name || 'غرانولا صحية'}</p>
                                                    <span className="text-[11px] font-bold text-slate-500 block">العدد: {ord.quantity || 1} قطعة</span>
                                                </div>

                                                <div className="space-y-1">
                                                    <span className="text-[10px] text-slate-400 font-bold block">المبلغ الإجمالي</span>
                                                    <p className="font-black text-[#D97706] text-base">{ord.total_price || ord.price || 0} DH</p>
                                                    <span className="text-[10px] text-emerald-700 font-bold block">الدفع عند الاستلام</span>
                                                </div>

                                                <div className="col-span-2 pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-slate-600">
                                                    <MapPin size={14} className="text-[#D97706] shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="font-black text-[#1E3A2B]">{ord.city || 'المدينة غير محددة'}</span>
                                                        {ord.address && <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{ord.address}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-1 flex items-center gap-2">
                                                <a
                                                    href={waLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex-1 py-2.5 bg-[#25D366] hover:bg-emerald-600 text-white rounded-2xl flex items-center justify-center gap-2 text-xs font-extrabold shadow-xs transition"
                                                >
                                                    <MessageCircle size={16} />
                                                    <span>تواصل عبر الواتساب</span>
                                                </a>

                                                <select
                                                    value={ord.status || 'Pending'}
                                                    onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                                                    className="py-2.5 px-3 bg-[#FAF9F6] border border-slate-200 rounded-2xl text-xs font-extrabold text-slate-700 cursor-pointer focus:outline-none focus:border-[#D97706]"
                                                >
                                                    <option value="Pending">قيد الانتظار</option>
                                                    <option value="Confirmed">تأكيد الكوموند</option>
                                                    <option value="Shipped">خرجت للتوصيل</option>
                                                    <option value="Delivered">تم التسليم</option>
                                                </select>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
                            <div>
                                <h2 className="text-base sm:text-lg font-black text-[#1E3A2B]">كتالوج منتجات Maison Fakia</h2>
                                <p className="text-[11px] text-slate-500">إدارة أكياس الـ Doypack والأسعار المعروضة للزبناء</p>
                            </div>

                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-4 py-2.5 bg-[#D97706] text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center gap-1.5 cursor-pointer"
                            >
                                <Plus size={15} />
                                <span>+ منتج جديد</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                            {products.map((prod) => {
                                const nameAr = prod.nameAr || prod.name_ar || 'منتج';
                                const nameFr = prod.nameFr || prod.name_fr || 'Produit';
                                const image = prod.image || prod.image_url || '/doypack_miel_amandes.png';

                                return (
                                    <div key={prod.id} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-2.5 sm:p-4 space-y-2 sm:space-y-3 shadow-xs relative flex flex-col justify-between group">
                                        <div className="w-full h-32 sm:h-52 bg-[#FAF9F6] rounded-xl overflow-hidden border border-slate-100 relative flex items-center justify-center p-1.5 sm:p-2">
                                            <img
                                                src={image}
                                                alt={nameAr}
                                                className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                                                onError={(e: any) => { e.target.src = FALLBACK_IMAGE; }}
                                            />
                                        </div>

                                        <div className="space-y-0.5">
                                            <h3 className="text-xs sm:text-sm font-black text-[#1E3A2B] line-clamp-1">{nameAr}</h3>
                                            <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold truncate">{nameFr}</p>
                                        </div>

                                        <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                                            <div>
                                                <span className="text-[9px] sm:text-[10px] text-slate-400 block font-bold">الثمن</span>
                                                <span className="text-sm sm:text-lg font-black text-[#D97706]">{prod.price} <span className="text-[10px] sm:text-xs">DH</span></span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setEditingProduct(prod)}
                                                    className="px-2 py-1.5 sm:px-3 sm:py-2 bg-[#1E3A2B] text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold"
                                                >
                                                    <Edit3 size={12} />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteProduct(prod.id)}
                                                    className="p-1.5 sm:p-2 bg-rose-50 text-rose-600 rounded-lg sm:rounded-xl text-xs font-bold border border-rose-200"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </main>

            {devisSingleOrder && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl relative my-auto">

                        <div id="devis-single-print" className="space-y-6 text-[#1E3A2B]">
                            <div className="flex items-start justify-between border-b border-amber-500/30 pb-4">
                                <div>
                                    <h2 className="text-xl font-black text-[#1E3A2B]">MAISON FAKIA</h2>
                                    <p className="text-xs font-bold text-[#D97706]">Snacks Artisanaux & Packagings Healthy</p>
                                    <p className="text-[10px] text-slate-400">Casablanca, Maroc | contact@maisonfakia.ma</p>
                                </div>
                                <div className="text-left" dir="ltr">
                                    <span className="text-lg font-black text-[#1E3A2B] block">DEVIS N° DEV-{devisSingleOrder.id ? devisSingleOrder.id.slice(0,6) : '001'}</span>
                                    <span className="text-xs font-bold text-slate-500 block">Date: {devisSingleOrder.created_at ? devisSingleOrder.created_at.slice(0,10) : new Date().toISOString().slice(0,10)}</span>
                                </div>
                            </div>

                            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-slate-200 text-xs">
                                <span className="font-extrabold text-[#D97706] block mb-1">بيانات الزبون (Client):</span>
                                <p className="font-black text-[#1E3A2B] text-sm">{getClientName(devisSingleOrder)}</p>
                                <p className="font-bold text-slate-600 mt-1">الهاتف: {devisSingleOrder.phone}</p>
                                <p className="font-bold text-slate-600">المدينة: {devisSingleOrder.city}</p>
                            </div>

                            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                                <table className="w-full text-right text-xs">
                                    <thead className="bg-[#1E3A2B] text-white font-bold">
                                    <tr>
                                        <th className="p-3">المنتج (Désignation)</th>
                                        <th className="p-3 text-center">الكمية</th>
                                        <th className="p-3 text-center">الثمن</th>
                                        <th className="p-3 text-left">المجموع</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-medium">
                                    <tr>
                                        <td className="p-3 font-bold">{devisSingleOrder.product_name || 'غرانولا صحية'}</td>
                                        <td className="p-3 text-center">{devisSingleOrder.quantity || 1}</td>
                                        <td className="p-3 text-center">{devisSingleOrder.price || devisSingleOrder.total_price || 0} DH</td>
                                        <td className="p-3 text-left font-black text-[#D97706]">{devisSingleOrder.total_price || devisSingleOrder.price || 0} DH</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end pt-2">
                                <div className="w-60 space-y-1 text-xs bg-[#FAF9F6] p-3 rounded-2xl border border-slate-200 font-bold">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Total HT:</span>
                                        <span>{devisSingleOrder.total_price || devisSingleOrder.price || 0} DH</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-[#1E3A2B] border-t border-slate-300 pt-2 font-black">
                                        <span>TOTAL NET TTC:</span>
                                        <span className="text-[#D97706]">{devisSingleOrder.total_price || devisSingleOrder.price || 0} DH</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 no-print">
                            <button onClick={() => setDevisSingleOrder(null)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold">إغلاق</button>
                            <button onClick={() => window.print()} className="px-5 py-2 bg-[#1E3A2B] hover:bg-[#D97706] text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer">
                                <Printer size={15} />
                                <span>حفظ PDF / طباعة</span>
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {showMonthlyDevis && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl relative my-auto">

                        <div id="devis-monthly-print" className="space-y-6 text-[#1E3A2B]">
                            <div className="flex items-start justify-between border-b border-amber-500/30 pb-4">
                                <div>
                                    <h2 className="text-xl font-black text-[#1E3A2B]">MAISON FAKIA</h2>
                                    <p className="text-xs font-bold text-[#D97706]">Rapport Mensuel & Devis Global des Ventes</p>
                                    <p className="text-[10px] text-slate-400">Casablanca, Maroc | contact@maisonfakia.ma</p>
                                </div>
                                <div className="text-left" dir="ltr">
                                    <span className="text-base font-black text-[#1E3A2B] block">DEVIS GLOBAL: {selectedMonth === 'all' ? 'TOUS LES MOIS' : selectedMonth}</span>
                                    <span className="text-xs font-bold text-slate-500 block">Édité le: {new Date().toLocaleDateString('fr-FR')}</span>
                                    <span className="text-xs font-black text-emerald-600 block">Total Commandes: {filteredOrders.length}</span>
                                </div>
                            </div>

                            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                                <table className="w-full text-right text-xs">
                                    <thead className="bg-[#1E3A2B] text-white font-bold">
                                    <tr>
                                        <th className="p-3">الزبون والهاتف</th>
                                        <th className="p-3">المنتج</th>
                                        <th className="p-3 text-center">المدينة</th>
                                        <th className="p-3 text-center">الحالة</th>
                                        <th className="p-3 text-left">المبلغ (DH)</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-medium">
                                    {filteredOrders.map((o) => (
                                        <tr key={o.id}>
                                            <td className="p-2.5 font-bold">{getClientName(o)} ({o.phone})</td>
                                            <td className="p-2.5">{o.product_name || 'غرانولا'}</td>
                                            <td className="p-2.5 text-center">{o.city || 'المغرب'}</td>
                                            <td className="p-2.5 text-center font-bold text-xs">{o.status || 'Pending'}</td>
                                            <td className="p-2.5 text-left font-black text-[#D97706]">{o.total_price || o.price || 0} DH</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end pt-2">
                                <div className="w-72 space-y-1.5 text-xs bg-[#FAF9F6] p-4 rounded-2xl border border-slate-200 font-bold">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Nombre total de ventes:</span>
                                        <span>{filteredOrders.length}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Livraison Globale:</span>
                                        <span className="text-emerald-600">Gratuite</span>
                                    </div>
                                    <div className="flex justify-between text-base text-[#1E3A2B] border-t border-slate-300 pt-2 font-black">
                                        <span>TOTAL DU MOIS NET TTC:</span>
                                        <span className="text-[#D97706]">{monthlyTotalRevenue.toLocaleString()} DH</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 no-print">
                            <button onClick={() => setShowMonthlyDevis(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold">إغلاق</button>
                            <button onClick={() => window.print()} className="px-5 py-2 bg-[#1E3A2B] hover:bg-[#D97706] text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer">
                                <Printer size={15} />
                                <span>حفظ Devis الشهر كـ PDF</span>
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}