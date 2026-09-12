export interface WeightOption {
    weight: string;
    price: number;
}

export interface Product {
    id: string;
    nameFr: string;
    nameAr: string;
    price: number;
    image: string;
    descriptionFr: string;
    descriptionAr: string;
    weights: WeightOption[];
    ingredientsFr: string[];
    ingredientsAr: string[];
    benefitsFr: string[];
    benefitsAr: string[];
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        nameFr: 'Granola Miel Pur & Amandes',
        nameAr: 'جرانولا العسل الحر واللوز',
        price: 75,
        image: '/doypack_miel_amandes.png',
        descriptionFr: 'Une recette artisanale croustillante préparée au miel pur d oranger du Souss, amandes torréfiées et flocons d avoine bio.',
        descriptionAr: 'وصفة مقرمشة محضرة بعسل الليمون الحر من السوس، اللوز المحمص وحبوب الشوفان العضوية.',
        weights: [
            { weight: '250g', price: 45 },
            { weight: '500g', price: 75 },
            { weight: '1kg', price: 140 },
        ],
        ingredientsFr: ['Flocons d avoine bio', 'Miel pur d oranger 100%', 'Amandes entières grillées', 'Graines de tournesol & courge'],
        ingredientsAr: ['شوفان عضوية', 'عسل الليمون الحر 100%', 'لوز محمص كامل', 'بذور عباد الشمس واليقطين'],
        benefitsFr: ['Riche en fibres naturelles', 'Sans sucre raffiné', 'Énergie longue durée pour le matin'],
        benefitsAr: ['غني بالألياف الطبيعية', 'بدون سكر مكرر', 'طاقة وحيوية للصباح'],
    },
    {
        id: '2',
        nameFr: 'Granola Chocolat Noir 70%',
        nameAr: 'جرانولا الشكولاتة السوداء 70%',
        price: 85,
        image: '/doypack_chocolat_noir.png',
        descriptionFr: 'Le plaisir gourmand d un chocolat noir 70% intense marié au croustillant de l avoine d or et noisettes entières.',
        descriptionAr: 'متعة الشكولاتة السوداء الغنية 70% مع قرمشة الشوفان الذهبي والبندق الكامل.',
        weights: [
            { weight: '250g', price: 50 },
            { weight: '500g', price: 85 },
            { weight: '1kg', price: 160 },
        ],
        ingredientsFr: ['Flocons d avoine bio', 'Chocolat noir 70% pur beurre de cacao', 'Noisettes grillées', 'Miel pur'],
        ingredientsAr: ['شوفان عضوية', 'شكولاتة سوداء 70%', 'بندق محمص', 'عسل حر'],
        benefitsFr: ['Riche en antioxydants', 'Gourmandise 100% naturelle', 'Idéal avec du lait ou yaourt'],
        benefitsAr: ['غني بمضادات الأكسدة', 'لذة طبيعية 100%', 'مثالي مع الحليب واليوغورت'],
    },
    {
        id: '3',
        nameFr: 'Granola Amlou & Argan Bio',
        nameAr: 'جرانولا أملو وزيت الأركان البيو',
        price: 95,
        image: '/doypack_amlou_argan.png',
        descriptionFr: 'L essence des traditions soussies: Amlou artisanal à l huile d Argan bio, amandes et miel d oranger.',
        descriptionAr: 'جوهر التقاليد السوسية: أملو أملس بزيت الأركان العضوي، اللوز وعسل الليمون.',
        weights: [
            { weight: '250g', price: 55 },
            { weight: '500g', price: 95 },
            { weight: '1kg', price: 180 },
        ],
        ingredientsFr: ['Flocons d avoine bio', 'Amlou traditionnel au miel', 'Huile d Argan alimentaire bio', 'Noix de cajou'],
        ingredientsAr: ['شوفان عضوية', 'أملو تقليدي بالعسل', 'زيت أركان للتغذية بيو', 'كاجو كامل'],
        benefitsFr: ['Riche en Vitamine E et Oméga 3', 'Goût authentique du terroir marocain'],
        benefitsAr: ['غني بفيتامين E وأوميغا 3', 'طعم أصيل من التراث المغربي'],
    },
    {
        id: '4',
        nameFr: 'Mix Fruits Secs Énergie',
        nameAr: 'تشكيلة الفواكه الجافة طاقة',
        price: 45,
        image: '/doypack_fruits_secs.png',
        descriptionFr: 'Un mélange équilibré de fruits secs nobles et noix sélectionnées pour un snack rapide au bureau ou au sport.',
        descriptionAr: 'مزيج متوازن من الفواكه الجافة والمكسرات الفاخرة لسناك سريع في العمل أو الرياضة.',
        weights: [
            { weight: '250g', price: 45 },
            { weight: '500g', price: 80 },
            { weight: '1kg', price: 150 },
        ],
        ingredientsFr: ['Amandes décortiquées', 'Noix de Grenoble', 'Raisins secs blonds', 'Noix de cajou', 'Cranberries'],
        ingredientsAr: ['لوز مقشر', 'جوز (كركاع)', 'زبيب أشقر', 'كاجو', 'كرانبيري مجفف'],
        benefitsFr: ['Snack ultra-pratique en sachet zip', 'Riche en magnésium'],
        benefitsAr: ['سناك عملي في كيس محكم', 'غني بالمغنيسيوم'],
    },
    {
        id: '5',
        nameFr: 'Energy Balls Dattes & Cacao',
        nameAr: 'كرات التمر والكاكاو',
        price: 79,
        image: '/doypack_energy_balls.png',
        descriptionFr: 'Bouchées d énergie saines préparées à base de dattes Majhoul, cacao cru et poudre d amandes.',
        descriptionAr: 'كرات طاقة صحية محضرة من تمر المجهول، الكاكاو الخام وبودرة اللوز.',
        weights: [
            { weight: '250g', price: 49 },
            { weight: '500g', price: 79 },
            { weight: '1kg', price: 155 },
        ],
        ingredientsFr: ['Dattes Majhoul marocaines', 'Cacao cru bio', 'Amandes en poudre', 'Graines de chia'],
        ingredientsAr: ['تمر مجهول مغربي', 'كاكاو خام بيو', 'بودرة اللوز', 'بذور الشيا'],
        benefitsFr: ['Coup de fouet énergétique instantané', '100% végétalien et sans gluten'],
        benefitsAr: ['طاقة فورية ومستدامة', 'نباتي 100% وخالي من الغلوتين'],
    },
    {
        id: '6',
        nameFr: 'Granola Pro-Sport & Seeds',
        nameAr: 'جرانولا بروتين وبذور الرياضيين',
        price: 89,
        image: '/doypack_pro_sport.png',
        descriptionFr: 'Formule renforcée en graines de chia, tournesol et courge pour accompagner vos séances de sport et récupération.',
        descriptionAr: 'تركيبة معززة ببذور الشيا، عباد الشمس واليقطين لمرافقة حصصكم الرياضية والاسترجاع.',
        weights: [
            { weight: '250g', price: 50 },
            { weight: '500g', price: 89 },
            { weight: '1kg', price: 170 },
        ],
        ingredientsFr: ['Flocons d avoine bio', 'Graines de chia & lin', 'Graines de courge bio', 'Miel pur'],
        ingredientsAr: ['شوفان عضوية', 'بذور الشيا والكتان', 'بذور اليقطين بيو', 'عسل حر'],
        benefitsFr: ['Apport élevé en protéines végétales', 'Favorise la récupération musculaire'],
        benefitsAr: ['نسبة عالية من البروتين النباتي', 'يدعم الاسترجاع العضلي'],
    },
];