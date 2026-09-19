'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Package, Clock, CheckCircle2, Truck, Check,
    Search, RefreshCw, MessageCircle, Phone, MapPin,
    Plus, Trash2, Edit3, Layers, X, ShoppingBag, Wallet,
    Bell, BellOff, Sparkles
} from 'lucide-react';

const PACKAGING_PRESETS = [
    { label: 'أملو & أركان', url: '/images/products/granola-amlou.png' },
    { label: 'عسل & لوز', url: '/images/products/granola-miel.png' },
    { label: 'شوكولاتة سوداء', url: '/images/products/granola-[#D97706].png' },
    { label: 'فواكه جافة', url: '/images/products/mix-fruits-secs.png' },
    { label: 'كرات الطاقة', url: '/images/products/energy-balls.png' },
    { label: 'بروتين سبورت', url: '/images/products/granola-pro-sport.png' },
    { label: 'Doypack أملو', url: '/doypack_amlou_argan.png' },
    { label: 'Doypack عسل', url: '/doypack_miel_amandes.png' },
];

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500&auto=format&fit=crop&q=80';

const INITIAL_PRODUCTS = [
    {
        id: 'prod-1',
        name_ar: 'غرانولا العسل واللوز',
        name_fr: 'Granola Miel Pur & Amandes',
        price: 75,
        weight: '500g',
        category: 'granola',
        image_url: '/images/products/granola-miel.png',
        badge_ar: 'الأكثر مبيعاً',
        badge_fr: 'Best Seller'
    },
    {
        id: 'prod-2',
        name_ar: 'غرانولا الشوكولاتة السوداء',
        name_fr: 'Granola Chocolat Noir 70%',
        price: 80,
        weight: '500g',
        category: 'granola',
        image_url: '/images/products/granola-chocolat.png',
        badge_ar: 'غني بالمغنيسيوم',
        badge_fr: 'Riche en Magnésium'
    },
    {
        id: 'prod-3',
        name_ar: 'غرانولا أملو وأركان',
        name_fr: 'Granola Amlou & Argan Bio',
        price: 85,
        weight: '500g',
        category: 'granola',
        image_url: '/images/products/granola-amlou.png',
        badge_ar: 'وصفة تقليدية',
        badge_fr: 'Recette Traditionnelle'
    },
    {
        id: 'prod-4',
        name_ar: 'مكس الفواكه الجافة الطاقة',
        name_fr: 'Mix Fruits Secs Énergie',
        price: 90,
        weight: '500g',
        category: 'dried_fruits',
        image_url: '/images/products/mix-fruits-secs.png',
        badge_ar: 'طاقة طبيعية',
        badge_fr: 'Énergie Naturelle'
    },
    {
        id: 'prod-5',
        name_ar: 'كرات الطاقة الطبيعية',
        name_fr: 'Energy Balls Dattes & Cacao',
        price: 65,
        weight: '400g',
        category: 'energy_balls',
        image_url: '/images/products/energy-balls.png',
        badge_ar: 'بدون سكر مضاف',
        badge_fr: 'Sans Sucre Ajouté'
    },
    {
        id: 'prod-6',
        name_ar: 'غرانولا بروتين برو سبورت',
        name_fr: 'Granola Pro-Sport & Seeds',
        price: 95,
        weight: '500g',
        category: 'granola',
        image_url: '/images/products/granola-pro-sport.png',
        badge_ar: 'للرياضيين',
        badge_fr: 'Pour Sportifs'
    }
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>(INITIAL_PRODUCTS);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Notifications & Realtime
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [newOrderAlert, setNewOrderAlert] = useState<any | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);

    // Filters & Search
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name_ar: '',
        name_fr: '',
        price: '',
        weight: '500g',
        category: 'granola',
        image_url: '/images/products/granola-amlou.png',
        badge_ar: 'منتج جديد',
        badge_fr: 'Nouveau'
    });
    const [editingProduct, setEditingProduct] = useState<any | null>(null);

    // تشغيل الصوت مع تجاوز حظر Autoplay فـ المتصفح
    const playNotificationChime = () => {
        try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioCtx) return;

            if (!audioCtxRef.current) {
                audioCtxRef.current = new AudioCtx();
            }
            const ctx = audioCtxRef.current;

            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
            gain1.gain.setValueAtTime(0.4, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start();
            osc1.stop(ctx.currentTime + 0.45);

            setTimeout(() => {
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(1174.66, ctx.currentTime);
                gain2.gain.setValueAtTime(0.25, ctx.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.start();
                osc2.stop(ctx.currentTime + 0.3);
            }, 130);
        } catch (e) {
            console.log('Audio alert trigger:', e);
        }
    };

    // ترخيص الصوت أوتوماتيكياً عند أول تفاعل فـ الصفحة
    useEffect(() => {
        const unlockAudio = () => {
            if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
            }
        };
        window.addEventListener('click', unlockAudio, { once: true });
        return () => window.removeEventListener('click', unlockAudio);
    }, []);

    // 1. جلب الطلبات
    const fetchOrders = async () => {
        setLoadingOrders(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setOrders(data);
        }
        setLoadingOrders(false);
    };

    // 2. جلب المنتجات
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

    // 3. التسمع المباشر للطلبات الجديدة
    useEffect(() => {
        fetchOrders();
        fetchProducts();

        const channel = supabase
            .channel('orders-realtime-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    const freshOrder = payload.new;
                    setOrders((prev) => [freshOrder, ...prev]);

                    if (soundEnabled) {
                        playNotificationChime();
                    }

                    setNewOrderAlert(freshOrder);
                    setTimeout(() => setNewOrderAlert(null), 10000);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [soundEnabled]);

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (!error) {
            setOrders((prev) =>
                prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
            );
        } else {
            alert('حدث خطأ أثناء تحديث الحالة');
        }
    };

    const handleAddProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.name_ar || !newProduct.price) {
            alert('المرجو كتابة اسم المنتج والثمن');
            return;
        }

        const prodToSave = {
            id: `prod-${Date.now()}`,
            name_ar: newProduct.name_ar,
            name_fr: newProduct.name_fr || newProduct.name_ar,
            price: parseFloat(newProduct.price),
            weight: newProduct.weight || '500g',
            category: newProduct.category,
            image_url: newProduct.image_url || '/images/products/granola-amlou.png',
            badge_ar: newProduct.badge_ar,
            badge_fr: newProduct.badge_fr
        };

        const { error } = await supabase.from('products').insert([prodToSave]);

        if (!error) {
            setProducts([prodToSave, ...products]);
        } else {
            setProducts([prodToSave, ...products]);
        }

        setShowAddModal(false);
        setNewProduct({
            name_ar: '',
            name_fr: '',
            price: '',
            weight: '500g',
            category: 'granola',
            image_url: '/images/products/granola-amlou.png',
            badge_ar: 'منتج جديد',
            badge_fr: 'Nouveau'
        });
    };

    const handleUpdateProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        const updatedData = {
            name_ar: editingProduct.name_ar,
            name_fr: editingProduct.name_fr,
            price: parseFloat(editingProduct.price),
            weight: editingProduct.weight,
            image_url: editingProduct.image_url,
            badge_ar: editingProduct.badge_ar,
            badge_fr: editingProduct.badge_fr
        };

        const { error } = await supabase
            .from('products')
            .update(updatedData)
            .eq('id', editingProduct.id);

        if (!error) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...updatedData } : p));
        } else {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...updatedData } : p));
        }

        setEditingProduct(null);
    };

    const handleDeleteProduct = async (prodId: string) => {
        if (!confirm('هل أنت متأكد من مسح هذا المنتج؟')) return;

        const { error } = await supabase.from('products').delete().eq('id', prodId);

        if (!error) {
            setProducts(products.filter((p) => p.id !== prodId));
        } else {
            setProducts(products.filter((p) => p.id !== prodId));
        }
    };

    const confirmedRevenue = orders
        .filter((o) => o.status === 'Delivered' || o.status === 'Confirmed')
        .reduce((acc, curr) => acc + (parseFloat(curr.total_price || curr.price) || 0), 0);

    const filteredOrders = orders.filter((order) => {
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        const matchesSearch =
            (order.full_name && order.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.phone && order.phone.includes(searchTerm)) ||
            (order.city && order.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.product_name && order.product_name.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Confirmed':
                return <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-black flex items-center gap-1 w-fit border border-blue-200"><CheckCircle2 size={12}/> مؤكدة</span>;
            case 'Shipped':
                return <span className="px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-black flex items-center gap-1 w-fit border border-purple-200"><Truck size={12}/> في الطريق</span>;
            case 'Delivered':
                return <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black flex items-center gap-1 w-fit border border-emerald-200"><Check size={12}/> تم التسليم</span>;
            default:
                return <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black flex items-center gap-1 w-fit border border-amber-200"><Clock size={12}/> قيد الانتظار</span>;
        }
    };

    return (
        <div dir="rtl" className="min-h-screen bg-[#FAF9F6] text-[#1E3A2B] font-sans pb-20 relative">

            {/* POPUP NOTIFICATION TOAST WITH COMPLETE NUMBERS & PHONE */}
            {newOrderAlert && (
                <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-bounce duration-500">
                    <div className="bg-[#1E3A2B] border-2 border-[#D97706] text-white p-4 rounded-3xl shadow-2xl flex items-start justify-between gap-3 backdrop-blur-md">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-[#D97706] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md">
                                <Sparkles size={20} className="animate-spin" />
                            </div>
                            <div className="space-y-1 text-right">
                                <div className="flex items-center gap-2">
                                    <span className="font-black text-sm text-[#D97706]">🎉 طلبية جديدة وصلت!</span>
                                </div>
                                <p className="text-xs font-bold text-emerald-100">
                                    الزبون: <span className="text-white font-black">{newOrderAlert.full_name || 'زبون جديد'}</span> ({newOrderAlert.city || 'المغرب'})
                                </p>
                                <p className="text-xs font-black text-amber-200" dir="ltr">
                                    📞 <span className="text-white">{newOrderAlert.phone || 'بدون رقم'}</span>
                                </p>
                                <p className="text-xs font-black text-emerald-300">
                                    📦 {newOrderAlert.product_name || 'غرانولا'} • <span className="text-amber-300 font-black text-sm">{newOrderAlert.total_price || newOrderAlert.price || 0} DH</span> (الكمية: {newOrderAlert.quantity || 1})
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

            {/* Header */}
            <header className="bg-[#1E3A2B] text-white py-4 px-6 shadow-xl border-b border-[#D97706]/40 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-tr from-[#D97706] to-amber-500 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg border border-amber-300/30">
                            MF
                        </div>
                        <div>
                            <h1 className="text-base sm:text-xl font-black tracking-tight flex items-center gap-2">
                                <span>لوحة إدارة Maison Fakia</span>
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" title="Realtime Active"></span>
                            </h1>
                            <p className="text-[11px] text-emerald-200/90 font-semibold">إدارة المبيعات والمنتجات لايف • Live COD Dashboard</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setSoundEnabled(!soundEnabled);
                                if (!soundEnabled) playNotificationChime();
                            }}
                            className={`p-2.5 rounded-2xl border transition flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                                soundEnabled
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : 'bg-emerald-900/60 text-slate-400 border-emerald-800'
                            }`}
                            title={soundEnabled ? 'تنبيهات الصوت مفعلة' : 'تنبيهات الصوت مكتومة'}
                        >
                            {soundEnabled ? <Bell size={16} className="animate-wiggle" /> : <BellOff size={16} />}
                            <span className="hidden sm:inline">{soundEnabled ? 'الصوت مفعّل' : 'مكتوم'}</span>
                        </button>

                        <div className="flex items-center bg-emerald-950/90 p-1 rounded-2xl border border-emerald-800/80 shadow-inner">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${
                                    activeTab === 'orders'
                                        ? 'bg-[#D97706] text-white shadow-md'
                                        : 'text-emerald-200 hover:text-white'
                                }`}
                            >
                                <Layers size={14} />
                                <span>الطلبيات ({orders.length})</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('products')}
                                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${
                                    activeTab === 'products'
                                        ? 'bg-[#D97706] text-white shadow-md'
                                        : 'text-emerald-200 hover:text-white'
                                }`}
                            >
                                <ShoppingBag size={14} />
                                <span>المنتجات ({products.length})</span>
                            </button>
                        </div>
                    </div>

                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 space-y-6">

                {/* METRICS CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

                    <div className="bg-white p-6 rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/20 shadow-xs space-y-2 relative overflow-hidden">
                        <div className="flex items-center justify-between text-emerald-800">
                            <span className="text-xs font-bold block">المداخيل المؤكدة (C.A)</span>
                            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-[#D97706]">
                                <Wallet size={18} />
                            </div>
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#1E3A2B] block">
                            {confirmedRevenue.toLocaleString()} <span className="text-xs text-[#D97706] font-extrabold">DH</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium block">تضمن الطلبات المؤكدة والمسلّمة فقط</span>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-slate-500">
                            <span className="text-xs font-bold block">إجمالي الطلبات</span>
                            <Package size={18} className="text-slate-400" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#1E3A2B] block">{orders.length}</span>
                        <span className="text-[10px] text-slate-400 font-medium block">كل الطلبيات الواردة</span>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-amber-200/90 bg-amber-50/10 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-amber-700">
                            <span className="text-xs font-bold block">قيد الانتظار (Pending)</span>
                            <Clock size={18} className="text-amber-500" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-amber-600 block">
                            {orders.filter(o => !o.status || o.status === 'Pending').length}
                        </span>
                        <span className="text-[10px] text-amber-700/70 font-semibold block">تحتاج لتأكيد الهاتف والواتساب</span>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-emerald-200/90 bg-emerald-50/10 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-emerald-700">
                            <span className="text-xs font-bold block">تم التسليم (Delivered)</span>
                            <CheckCircle2 size={18} className="text-emerald-600" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">
                            {orders.filter(o => o.status === 'Delivered').length}
                        </span>
                        <span className="text-[10px] text-emerald-700/70 font-semibold block">طلبيات مكتملة ومقبوضة</span>
                    </div>

                </div>

                {/* TAB 1: ORDERS */}
                {activeTab === 'orders' && (
                    <div className="space-y-4">

                        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">

                            <div className="relative w-full sm:w-80">
                                <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="بحث بالاسم، رقم الهاتف، أو المدينة..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pr-10 pl-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#D97706]"
                                />
                            </div>

                            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs font-bold">
                                {['all', 'Pending', 'Confirmed', 'Shipped', 'Delivered'].map((st) => (
                                    <button
                                        key={st}
                                        onClick={() => setFilterStatus(st)}
                                        className={`px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
                                            filterStatus === st
                                                ? 'bg-[#1E3A2B] text-white shadow-xs'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {st === 'all' ? 'الكل' : st === 'Pending' ? 'قيد الانتظار' : st === 'Confirmed' ? 'مؤكدة' : st === 'Shipped' ? 'فـ الطريق' : 'تم التسليم'}
                                    </button>
                                ))}
                            </div>

                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
                            {loadingOrders ? (
                                <div className="p-12 text-center text-xs font-bold text-slate-400">جاري تحميل الطلبيات...</div>
                            ) : filteredOrders.length === 0 ? (
                                <div className="p-12 text-center space-y-2">
                                    <Package size={36} className="mx-auto text-slate-300" />
                                    <p className="text-xs font-bold text-slate-500">لا توجد طلبيات مطابقة لهذا البحث حالياً.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-right text-xs">
                                        <thead className="bg-[#FAF9F6] text-slate-600 font-black border-b border-slate-200">
                                        <tr>
                                            <th className="p-4">الزبون والهاتف</th>
                                            <th className="p-4">المنتج والكمية</th>
                                            <th className="p-4">المبلغ الإجمالي</th>
                                            <th className="p-4">المدينة والعنوان</th>
                                            <th className="p-4">الحالة</th>
                                            <th className="p-4 text-center">التواصل والإجراءات</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 font-medium">
                                        {filteredOrders.map((ord) => {
                                            const cleanPhone = ord.phone ? ord.phone.replace(/[^0-9]/g, '') : '';
                                            const formattedPhone = cleanPhone.startsWith('0') ? `212${cleanPhone.slice(1)}` : cleanPhone;
                                            const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(`السلام عليكم ${ord.full_name || ''}، معكم Maison Fakia لتأكيد طلبية ${ord.product_name || 'الغرانولا'}.`)}`;

                                            return (
                                                <tr key={ord.id} className="hover:bg-amber-50/20 transition">
                                                    <td className="p-4 space-y-1">
                                                        <span className="font-extrabold text-[#1E3A2B] block text-sm">{ord.full_name || 'بدون اسم'}</span>
                                                        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-bold" dir="ltr">
                                                                <Phone size={12} className="text-[#D97706]" /> {ord.phone}
                                                            </span>
                                                    </td>

                                                    <td className="p-4 space-y-1">
                                                        <span className="font-extrabold text-[#1E3A2B] block">{ord.product_name || 'منتج غير محدد'}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold block">الكمية: {ord.quantity || 1}</span>
                                                    </td>

                                                    <td className="p-4">
                                                        <span className="font-black text-[#D97706] text-sm">{ord.total_price || ord.price || 0} DH</span>
                                                    </td>

                                                    <td className="p-4 space-y-1">
                                                            <span className="font-bold text-slate-700 block flex items-center gap-1">
                                                                <MapPin size={12} className="text-[#D97706]" /> {ord.city || 'غير محددة'}
                                                            </span>
                                                        <span className="text-[10px] text-slate-400 block max-w-xs truncate">{ord.address}</span>
                                                    </td>

                                                    <td className="p-4">
                                                        {getStatusBadge(ord.status || 'Pending')}
                                                    </td>

                                                    <td className="p-4">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <a
                                                                href={waLink}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="p-2 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-xl transition shadow-xs flex items-center gap-1 text-[11px] font-bold"
                                                                title="تواصل مباشر عبر الواتساب"
                                                            >
                                                                <MessageCircle size={14} />
                                                                <span>واتساب</span>
                                                            </a>

                                                            <select
                                                                value={ord.status || 'Pending'}
                                                                onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                                                                className="px-2.5 py-1.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 focus:outline-none focus:border-[#D97706]"
                                                            >
                                                                <option value="Pending">قيد الانتظار</option>
                                                                <option value="Confirmed">تأكيد الكوموند</option>
                                                                <option value="Shipped">خرجت للتوصيل</option>
                                                                <option value="Delivered">تم التسليم</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                    </div>
                )}

                {/* TAB 2: PRODUCTS */}
                {activeTab === 'products' && (
                    <div className="space-y-6">

                        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                            <div>
                                <h2 className="text-lg font-black text-[#1E3A2B]">كتالوج منتجات Maison Fakia</h2>
                                <p className="text-xs text-slate-500">إدارة الأكياس والأسعار والشارات المعروضة للزبناء</p>
                            </div>

                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-5 py-3 bg-[#D97706] hover:bg-amber-600 text-white font-extrabold text-xs rounded-2xl transition shadow-md flex items-center gap-2 cursor-pointer"
                            >
                                <Plus size={16} />
                                <span>إضافة منتج جديد (+ Produit)</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((prod) => (
                                <div key={prod.id} className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs relative flex flex-col justify-between group">

                                    <div className="w-full h-56 bg-[#FAF9F6] rounded-2xl overflow-hidden border border-slate-100 relative flex items-center justify-center p-2">
                                        {(prod.badge_ar || prod.badge_fr) && (
                                            <span className="absolute top-3 right-3 bg-[#D97706] text-white px-2.5 py-1 rounded-full text-[10px] font-black z-10 shadow-xs">
                                                {prod.badge_ar || prod.badge_fr}
                                            </span>
                                        )}
                                        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-black text-[#1E3A2B] border border-slate-200 z-10">
                                            {prod.weight || '500g'}
                                        </span>

                                        <img
                                            src={prod.image_url || prod.image || '/images/products/granola-amlou.png'}
                                            alt={prod.name_ar}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 rounded-xl"
                                            onError={(e: any) => { e.target.src = FALLBACK_IMAGE; }}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-base font-black text-[#1E3A2B]">{prod.name_ar}</h3>
                                        <p className="text-xs text-slate-400 font-semibold">{prod.name_fr}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <div>
                                            <span className="text-[10px] text-slate-400 block font-bold">الثمن</span>
                                            <span className="text-xl font-black text-[#D97706]">{prod.price} <span className="text-xs">DH</span></span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setEditingProduct(prod)}
                                                className="px-3 py-2 bg-[#1E3A2B] hover:bg-[#D97706] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                                            >
                                                <Edit3 size={13} />
                                                <span>تعديل</span>
                                            </button>

                                            <button
                                                onClick={() => handleDeleteProduct(prod.id)}
                                                className="px-2.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-rose-200"
                                                title="مسح المنتج"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                )}

            </main>

            {/* MODAL 1: ADD */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-200 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-base font-black text-[#1E3A2B]">إضافة منتج جديد للمتجر</h3>
                            <button onClick={() => setShowAddModal(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs font-bold">
                            <div>
                                <label className="block text-slate-700 mb-1">اسم المنتج بالعربية *</label>
                                <input
                                    type="text" required placeholder="مثال: غرانولا العسل والشوكولاتة"
                                    value={newProduct.name_ar}
                                    onChange={(e) => setNewProduct({ ...newProduct, name_ar: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 mb-1">اسم المنتج بالفرنسية (Nom FR)</label>
                                <input
                                    type="text" placeholder="Ex: Granola Miel & Chocolat"
                                    value={newProduct.name_fr}
                                    onChange={(e) => setNewProduct({ ...newProduct, name_fr: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-700 mb-1">الثمن بالدرهم (Prix DH) *</label>
                                    <input
                                        type="number" required placeholder="75"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 mb-1">الوزن (Poids)</label>
                                    <input
                                        type="text" placeholder="500g"
                                        value={newProduct.weight}
                                        onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-slate-700">اختر صورة التغليف الرسمية</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {PACKAGING_PRESETS.map((preset) => (
                                        <button
                                            key={preset.url}
                                            type="button"
                                            onClick={() => setNewProduct({ ...newProduct, image_url: preset.url })}
                                            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition ${
                                                newProduct.image_url === preset.url
                                                    ? 'bg-[#1E3A2B] text-white border-[#1E3A2B]'
                                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                            }`}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="text" placeholder="/images/products/granola-amlou.png"
                                    value={newProduct.image_url}
                                    onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-[#FAF9F6] border border-slate-200 rounded-xl text-[11px] focus:outline-none focus:border-[#D97706]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-700 mb-1">الشارة (Badge AR)</label>
                                    <input
                                        type="text" placeholder="الأكثر مبيعاً"
                                        value={newProduct.badge_ar}
                                        onChange={(e) => setNewProduct({ ...newProduct, badge_ar: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 mb-1">الشارة (Badge FR)</label>
                                    <input
                                        type="text" placeholder="Best Seller"
                                        value={newProduct.badge_fr}
                                        onChange={(e) => setNewProduct({ ...newProduct, badge_fr: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                    />
                                </div>
                            </div>

                            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl transition">إلغاء</button>
                                <button type="submit" className="px-5 py-2.5 bg-[#1E3A2B] hover:bg-[#D97706] text-white rounded-xl font-black shadow-md">حفظ المنتج</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: EDIT */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-200 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-base font-black text-[#1E3A2B]">تعديل بيانات المنتج</h3>
                            <button onClick={() => setEditingProduct(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProductSubmit} className="space-y-4 text-xs font-bold">
                            <div>
                                <label className="block text-slate-700 mb-1">اسم المنتج بالعربية *</label>
                                <input
                                    type="text" required
                                    value={editingProduct.name_ar}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name_ar: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 mb-1">اسم المنتج بالفرنسية (Nom FR)</label>
                                <input
                                    type="text"
                                    value={editingProduct.name_fr}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name_fr: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-700 mb-1">الثمن (DH) *</label>
                                    <input
                                        type="number" required
                                        value={editingProduct.price}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 mb-1">الوزن (Poids)</label>
                                    <input
                                        type="text"
                                        value={editingProduct.weight}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, weight: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-slate-700">تغيير صورة التغليف الرسمية</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {PACKAGING_PRESETS.map((preset) => (
                                        <button
                                            key={preset.url}
                                            type="button"
                                            onClick={() => setEditingProduct({ ...editingProduct, image_url: preset.url })}
                                            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition ${
                                                editingProduct.image_url === preset.url
                                                    ? 'bg-[#1E3A2B] text-white border-[#1E3A2B]'
                                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                            }`}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={editingProduct.image_url || ''}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-[#FAF9F6] border border-slate-200 rounded-xl text-[11px] focus:outline-none focus:border-[#D97706]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-700 mb-1">الشارة (Badge AR)</label>
                                    <input
                                        type="text"
                                        value={editingProduct.badge_ar || ''}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, badge_ar: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 mb-1">الشارة (Badge FR)</label>
                                    <input
                                        type="text"
                                        value={editingProduct.badge_fr || ''}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, badge_fr: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#D97706]"
                                    />
                                </div>
                            </div>

                            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                                <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl transition">إلغاء</button>
                                <button type="submit" className="px-5 py-2.5 bg-[#D97706] hover:bg-amber-600 text-white rounded-xl font-black shadow-md">تحديث التغيرات</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
