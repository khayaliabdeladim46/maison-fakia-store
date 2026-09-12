'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function LiveSalesNotification({ lang }: { lang: 'fr' | 'ar' }) {
    const [currentNotification, setCurrentNotification] = useState<any | null>(null);

    const notifications = [
        {
            name: lang === 'ar' ? 'سيمو ب.' : 'Simo B.',
            city: lang === 'ar' ? 'الدار البيضاء' : 'Casablanca',
            product: lang === 'ar' ? 'العلبة الثلاثية 1.5 KG' : 'Pack Trio 1.5 KG',
            time: lang === 'ar' ? 'منذ 3 دقائق' : 'il y a 3 min',
        },
        {
            name: lang === 'ar' ? 'د. مهدي ك.' : 'Dr. Mehdi K.',
            city: lang === 'ar' ? 'الرباط' : 'Rabat',
            product: lang === 'ar' ? 'جرانولا أملو وزيت الأركان' : 'Granola Amlou & Argan',
            time: lang === 'ar' ? 'منذ 7 دقائق' : 'il y a 7 min',
        },
        {
            name: lang === 'ar' ? 'ياسمين ل.' : 'Yasmine L.',
            city: lang === 'ar' ? 'مراكش' : 'Marrakech',
            product: lang === 'ar' ? 'جرانولا العسل الحر واللوز' : 'Granola Miel Pur & Amandes',
            time: lang === 'ar' ? 'منذ 12 دقيقة' : 'il y a 12 min',
        },
        {
            name: lang === 'ar' ? 'أمين ع.' : 'Amine A.',
            city: lang === 'ar' ? 'طنجة' : 'Tanger',
            product: lang === 'ar' ? 'كرات التمر والكاكاو' : 'Energy Balls Dattes & Cacao',
            time: lang === 'ar' ? 'منذ 15 دقيقة' : 'il y a 15 min',
        },
    ];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setCurrentNotification(notifications[index]);
            index = (index + 1) % notifications.length;

            // Hide notification after 4 seconds
            setTimeout(() => {
                setCurrentNotification(null);
            }, 4000);
        }, 10000); // Popup every 10 seconds

        return () => clearInterval(interval);
    }, [lang]);

    return (
        <div className="fixed bottom-6 left-6 z-40 max-w-xs font-sans pointer-events-none hidden sm:block">
            <AnimatePresence>
                {currentNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-[#0D1F15] border border-[#1E3A2B]/15 dark:border-emerald-800/40 p-3 rounded-2xl shadow-xl flex items-center gap-3 pointer-events-auto"
                    >
                        <div className="p-2.5 rounded-xl bg-[#1E3A2B] text-white shrink-0">
                            <ShoppingBag size={15} />
                        </div>

                        <div className="space-y-0.5 text-left">
                            <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#1E3A2B] dark:text-[#FDFBF7]">
                  {currentNotification.name} ({currentNotification.city})
                </span>
                                <CheckCircle2 size={11} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <p className="text-[10px] font-semibold text-[#D97706] line-clamp-1">
                                {currentNotification.product}
                            </p>
                            <span className="text-[9px] text-slate-400 block font-medium">
                {currentNotification.time}
              </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
