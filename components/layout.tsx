import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Maison Fakia — Granola & Healthy Food Maroc',
    description: 'Artisanal Moroccan Granola, Amlou, Miel Pur & Healthy Provisions.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className={`${playfair.variable} ${jakarta.variable}`}>
        <body className="bg-[#FDFBF7] text-[#1E3A2B] font-sans selection:bg-[#D97706] selection:text-white">
        {children}
        </body>
        </html>
    );
}
