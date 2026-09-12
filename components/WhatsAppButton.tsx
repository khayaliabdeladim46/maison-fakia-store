'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton({ lang = 'fr' }: { lang?: 'fr' | 'ar' }) {
    // ⚠️ بدّل هاد الرقم برقم الواتساب الحقيقي ديالك (مثال: 212661234567)
    const storeWhatsAppNumber = "212600000000";

    const message = lang === 'ar'
        ? 'السلام عليكم، بغيت نستفسر على منتجات Maison Fakia'
        : 'Bonjour, je souhaite me renseigner sur les produits Maison Fakia';

    const waUrl = `https://api.whatsapp.com/send?phone=${storeWhatsAppNumber}&text=${encodeURIComponent(message)}`;

    return (
        <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border-2 border-white"
            title="WhatsApp Support"
        >
            <MessageCircle size={24} className="fill-white stroke-none" />
        </a>
    );
}
