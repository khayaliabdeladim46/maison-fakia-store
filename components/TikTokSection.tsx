'use client';

import { motion } from 'framer-motion';
import { Play, Heart, Eye } from 'lucide-react';

export default function TikTokSection({ t, lang }: any) {
    const tiktokVideos = [
        {
            id: 1,
            creator: "@sarah.healthy.cook",
            title: lang === 'ar' ? "فطور صحي بجرانولا أملو والعسل الحر 🍯" : "Bowl Granola Amlou & Yaourt Grec 🍯",
            views: "142.5K",
            likes: "18.2K",
            img: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 2,
            creator: "@youssef.fitness.maroc",
            title: lang === 'ar' ? "Unboxing Pack Trio Maison Fakia 📦" : "Unboxing Pack Trio Granola Maison Fakia 📦",
            views: "98.1K",
            likes: "12.4K",
            img: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 3,
            creator: "@amina_lifestyle_rabat",
            title: lang === 'ar' ? "أحسن سناك للخدمة والقراية 🍫" : "Mon Snack Healthy préféré au bureau 🍫",
            views: "215.3K",
            likes: "29.8K",
            img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 4,
            creator: "@moroccan.foodie",
            title: lang === 'ar' ? "تذوق جرانولا العسل واللوز المحمر 🥜" : "Taste-test Granola Miel Pur & Amandes 🥜",
            views: "184.9K",
            likes: "22.1K",
            img: "https://images.unsplash.com/photo-1536591375315-1b836814d689?auto=format&fit=crop&w=600&q=80",
        },
    ];

    return (
        <section className="py-14 my-10 bg-[#1E3A2B] text-[#FDFBF7] rounded-3xl p-6 md:p-10 shadow-2xl border border-emerald-900 overflow-hidden">
            <div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
        <span className="px-4 py-1 bg-[#D97706] text-white font-extrabold text-[10px] rounded-full uppercase tracking-widest shadow-md">
          {t.tiktokBadge}
        </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">{t.tiktokTitle}</h2>
                <p className="text-xs text-[#F4EFEA]/80 font-medium">
                    {t.tiktokSub}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {tiktokVideos.map((video, idx) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        whileHover={{ y: -6 }}
                        className="bg-[#142A1E] border border-emerald-800/60 rounded-2xl overflow-hidden shadow-lg group relative cursor-pointer"
                    >
                        {/* Video Thumbnail with Overlay */}
                        <div className="relative h-72 overflow-hidden bg-[#1E3A2B]">
                            <img
                                src={video.img}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#142A1E] via-transparent to-black/30"></div>

                            {/* Play Button Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-4 rounded-full bg-[#D97706]/90 text-white backdrop-blur-md group-hover:scale-110 transition duration-300 shadow-xl">
                                    <Play size={22} className="fill-white translate-x-0.5" />
                                </div>
                            </div>

                            {/* View Counter Badge */}
                            <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                                <Eye size={12} /> {video.views}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4 space-y-2">
                            <span className="text-[11px] font-extrabold text-[#D97706] block">{video.creator}</span>
                            <p className="text-xs font-bold text-white line-clamp-2 leading-snug">{video.title}</p>

                            <div className="flex items-center gap-1 text-[10px] text-emerald-300/80 font-semibold pt-2 border-t border-emerald-800/60">
                                <Heart size={12} className="text-red-400 fill-red-400" />
                                <span>{video.likes} J'aime</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}