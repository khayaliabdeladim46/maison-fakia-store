'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function HeroSlider({ t }: any) {
    const [current, setCurrent] = useState(0);

    const slides = [
        {
            id: 1,
            badge: "GRANOLA ARTISANAL",
            title: "Granola Miel Pur & Amandes Torréfiées",
            sub: "Avoine croustillante dorée au miel d oranger et amandes grillées en sachet Doypack hermétique.",
            img: "/doypack_miel_amandes.png",
        },
        {
            id: 2,
            badge: "ÉDITION LUXE SOUSS",
            title: "Granola Amlou & Huile d Argan Bio",
            sub: "Recette traditionnelle au véritable Amlou du Souss et noix de cajou croquantes.",
            img: "/doypack_amlou_argan.png",
        },
        {
            id: 3,
            badge: "SNACKS HEALTHY",
            title: "Granola Chocolat Noir 70% & Cacao",
            sub: "Pépites d un chocolat noir intense 70% et noisettes entières sans sucre raffiné.",
            img: "/doypack_chocolat_noir.png",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative w-full h-[500px] md:h-[560px] overflow-hidden rounded-2xl border border-[#1E3A2B]/15 shadow-xl my-4 bg-[#1E3A2B]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-14"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A2B] via-[#1E3A2B]/85 to-transparent z-10"></div>

                    <img
                        src={slides[current].img}
                        alt="Granola Doypack"
                        className="absolute right-0 top-0 h-full w-full md:w-2/3 object-cover object-center opacity-40 md:opacity-90 z-0"
                    />

                    <div className="relative z-20 max-w-xl text-white space-y-4 my-auto">
            <span className="px-3.5 py-1 bg-[#D97706] text-white font-bold text-[10px] rounded-full inline-block uppercase tracking-widest shadow-xs">
              {slides[current].badge}
            </span>

                        <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#FDFBF7]">
                            {slides[current].title}
                        </h1>

                        <p className="text-xs md:text-sm text-[#F4EFEA]/85 font-medium leading-relaxed max-w-lg">
                            {slides[current].sub}
                        </p>

                        <div className="pt-2">
                            <a
                                href="#collection"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs rounded-xl shadow-md transition hover:scale-105 active:scale-95"
                            >
                                {t.heroCta} <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <button
                onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white backdrop-blur-xs hover:bg-black/60 transition z-30"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white backdrop-blur-xs hover:bg-black/60 transition z-30"
            >
                <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all ${current === i ? 'w-8 bg-[#D97706]' : 'w-2 bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}