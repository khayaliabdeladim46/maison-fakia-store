'use client';

import { useState } from 'react';
import { Plus, Check, ShoppingBag, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const PACK_OPTIONS = [
    { id: 'miel-amandes', nameFr: 'Granola Miel & Amandes', nameAr: 'جرانولا العسل واللوز', image: '/doypack_miel_amandes.png' },
    { id: 'chocolat-noir', nameFr: 'Granola Chocolat Noir', nameAr: 'جرانولا الشوكولاتة السوداء', image: '/doypack_chocolat_noir.png' },
    { id: 'amlou-argan', nameFr: 'Granola Amlou & Argan', nameAr: 'جرانولا أملو وزيت الأركان', image: '/doypack_amlou_argan.png' },
    { id: 'mix-energie', nameFr: 'Mix Fruits Secs Énergie', nameAr: 'فواكه جافة مشكلة طاقة', image: '/doypack_fruits_secs.png' },
    { id: 'energy-balls', nameFr: 'Energy Balls Dattes & Noix', nameAr: 'كرات الطاقة بالتمر والجوز', image: '/doypack_energy_balls.png' },
    { id: 'pro-sport', nameFr: 'Granola Pro-Sport Protéiné', nameAr: 'جرانولا بروتين للرياضيين', image: '/doypack_pro_sport.png' },
];

export default function CustomPackBuilder({ onOrderCustomPack, t, lang = 'fr' }: any) {
    const isAr = lang === 'ar';
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [showAllOptionsMobile, setShowAllOptionsMobile] = useState(false);

    const addItem = (item: any) => {
        if (selectedItems.length < 3) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const removeItem = (index: number) => {
        const newItems = [...selectedItems];
        newItems.splice(index, 1);
        setSelectedItems(newItems);
    };

    const isFull = selectedItems.length === 3;
    const progressPercentage = (selectedItems.length / 3) * 100;

    const handleOrder = () => {
        if (!isFull) return;
        const packObj = {
            id: 'pack-trio-custom',
            nameFr: `Pack Trio Sur-Mesure (${selectedItems.map(i => i.nameFr).join(' + ')})`,
            nameAr: `باك تريو حسب الاختيار (${selectedItems.map(i => i.nameAr).join(' + ')})`,
            price: 210,
            image: selectedItems?.image || '/doypack_3_flavors_lineup.png',
            isPack: true,
            items: selectedItems,
        };
        onOrderCustomPack(packObj);
    };

    return (
        <section className="py-8 sm:py-10 bg-[#1E3A2B] text-white rounded-2xl sm:rounded-3xl border border-[#1E3A2B] p-3.5 sm:p-8 my-6 sm:my-8 shadow-md font-sans">
            <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">

                {/* Header */}
                <div className="text-center space-y-1.5">
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#D97706] bg-white/10 px-2.5 py-0.5 rounded-full inline-block border border-white/15">
            {isAr ? 'عرض خاص • 3 بـ 210 درهم' : 'Offre Spéciale • 3 Pour 210 DH'}
          </span>
                    <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                        {isAr ? 'صوب الباك ديالك (تريو 1.5 كجم)' : 'Composez Votre Pack Trio (3 x 500g)'}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium max-w-md mx-auto leading-relaxed">
                        {isAr ? 'اختار 3 أكياس من أذواقك المفضلين واستافد من توصيل فابور بـ 210 درهم فقط' : 'Choisissez 3 sachets de votre choix et bénéficiez de la livraison gratuite à 210 DH.'}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-xl mx-auto space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-200 px-0.5">
            <span>
              {isAr ? `الأكياس المختارة (${selectedItems.length}/3)` : `Sachets sélectionnés (${selectedItems.length}/3)`}
            </span>
                        <span className="text-[#D97706] text-[10px] sm:text-[11px] font-extrabold">
              {isFull
                  ? (isAr ? 'باك مكتمل 100%' : 'Pack Complété 100%')
                  : `${Math.round(progressPercentage)}%`}
            </span>
                    </div>

                    <div className="w-full bg-white/15 h-2 rounded-full overflow-hidden border border-white/10">
                        <div
                            className="bg-[#D97706] h-full transition-all duration-500 ease-out rounded-full shadow-xs"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* 3 Selected Slots */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto">
                    {[0, 1, 2].map((slotIndex) => {
                        const item = selectedItems[slotIndex];
                        return (
                            <div
                                key={slotIndex}
                                className={`relative rounded-xl sm:rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[105px] sm:min-h-[125px] ${
                                    item
                                        ? 'bg-white text-[#1E3A2B] border-2 border-[#D97706] shadow-md'
                                        : 'border-2 border-dashed border-white/30 bg-white/5'
                                }`}
                            >
                                {item ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(slotIndex)}
                                            className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-xs transition active:scale-95 cursor-pointer"
                                            title={isAr ? 'مسح هاد المنتج' : 'Supprimer'}
                                        >
                                            <Trash2 size={11} />
                                        </button>
                                        <img src={item.image} alt={item.nameFr} className="w-9 h-9 sm:w-12 sm:h-12 object-contain mb-1" />
                                        <span className="text-[9px] sm:text-[11px] font-bold text-[#1E3A2B] leading-tight line-clamp-2">
                      {isAr ? item.nameAr : item.nameFr}
                    </span>
                                        <span className="text-[8px] sm:text-[9px] text-slate-500 font-semibold mt-0.5">(500g)</span>
                                    </>
                                ) : (
                                    <div className="space-y-1 text-slate-300">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-dashed border-white/40 flex items-center justify-center mx-auto text-[10px] sm:text-xs font-bold text-white/80">
                                            {slotIndex + 1}
                                        </div>
                                        <span className="text-[9px] sm:text-[10px] font-bold block text-slate-300">
                      {isAr ? `كيس ${slotIndex + 1}` : `Sachet ${slotIndex + 1}`}
                    </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Option Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
                    {PACK_OPTIONS.map((opt, index) => {
                        const countInPack = selectedItems.filter((i) => i.id === opt.id).length;
                        const isSelected = countInPack > 0;
                        const isHiddenOnMobile = !showAllOptionsMobile && index >= 4;

                        return (
                            <div
                                key={opt.id}
                                className={`border rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 transition duration-200 ${
                                    isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                                } ${
                                    isSelected ? 'border-[#D97706] bg-white text-[#1E3A2B] shadow-xs' : 'border-white/15 bg-white/10 text-white'
                                }`}
                            >
                                <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto min-w-0">
                                    <img src={opt.image} alt={opt.nameFr} className="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0 bg-white/10 rounded-lg p-0.5" />
                                    <div className="min-w-0 flex-1">
                                        <h4 className={`text-[10px] sm:text-xs font-bold leading-tight line-clamp-1 ${isSelected ? 'text-[#1E3A2B]' : 'text-white'}`}>
                                            {isAr ? opt.nameAr : opt.nameFr}
                                        </h4>
                                        <span className={`text-[8px] sm:text-[9px] font-medium block ${isSelected ? 'text-slate-500' : 'text-slate-300'}`}>500g</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => addItem(opt)}
                                    disabled={isFull}
                                    className={`w-full sm:w-auto px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-extrabold flex items-center justify-center gap-1 transition shrink-0 ${
                                        isSelected
                                            ? 'bg-emerald-700 text-white'
                                            : isFull
                                                ? 'bg-white/10 text-slate-400 cursor-not-allowed'
                                                : 'bg-[#D97706] hover:bg-[#b56305] text-white active:scale-95 cursor-pointer'
                                    }`}
                                >
                                    {isSelected ? (
                                        <>
                                            <Check size={10} />
                                            <span>{isAr ? `أضيف (${countInPack})` : `Ajouté (${countInPack})`}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={10} />
                                            <span>{isAr ? 'اختيار' : 'Choisir'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Toggle Button for Mobile */}
                <div className="text-center sm:hidden pt-2">
                    <button
                        type="button"
                        onClick={() => setShowAllOptionsMobile(!showAllOptionsMobile)}
                        className="w-full bg-[#D97706] hover:bg-[#b56305] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-xs transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {showAllOptionsMobile ? (
                            <>
                                <span>{isAr ? 'إخفاء الخيارات الإضافية' : 'Voir moins d\'options'}</span>
                                <ChevronUp size={16} />
                            </>
                        ) : (
                            <>
                                <span>{isAr ? 'عرض جميع الخيارات (6 نكهات)' : 'Voir plus d\'options (Voir Tout)'}</span>
                                <ChevronDown size={16} />
                            </>
                        )}
                    </button>
                </div>

                {/* CTA Button */}
                <div className="pt-2 text-center">
                    <button
                        type="button"
                        onClick={handleOrder}
                        disabled={!isFull}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-extrabold text-xs sm:text-sm transition duration-300 flex items-center justify-center gap-2 shadow-md mx-auto ${
                            isFull
                                ? 'bg-[#D97706] hover:bg-[#b56305] text-white cursor-pointer active:scale-95 shadow-orange-500/20'
                                : 'bg-white/10 text-slate-400 cursor-not-allowed border border-white/10'
                        }`}
                    >
                        <ShoppingBag size={15} />
                        <span>
              {isFull
                  ? isAr
                      ? 'طلب الباك الخاص بي (210 درهم + توصيل فابور) ←'
                      : 'Commander mon Pack (210 DH - Livraison Gratuite) →'
                  : isAr
                      ? `اختار ${3 - selectedItems.length} أكياس أخرى لإكمال الباك`
                      : `Sélectionnez encore ${3 - selectedItems.length} sachet(s)`}
            </span>
                    </button>
                </div>

            </div>
        </section>
    );
}