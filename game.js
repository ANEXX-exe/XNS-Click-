const GOOGLE_CLIENT_ID = "890485442762-9ch63tb0ig9lu52h30h9g6o89fgohh92.apps.googleusercontent.com";
const CONFIG = {
    GOOGLE_BONUS: 5000,
    AUTO_SAVE_INTERVAL: 20000,
    PASSIVE_INCOME_TICK: 500
};

let gameState = {
    rebirths: 0,
rebirthMultiplier: 1,
    coins: 0,
    totalEarned: 0,
    totalClicks: 0,
    clickPower: 1,
    passiveIncome: 0,
    level: 1,
    experience: 0,
    levelBonus: 1,
    playerName: '',
    isGoogleUser: false,
    googleEmail: '',
    currentShape: 'circle',
    currentWorld: 'cyber',
    pets: [],
    unlockedWorlds: ['cyber'],
    upgrades: {
        autoClicker: { count: 0, baseCost: 15, baseIncome: 1 },
        megaMiner: { count: 0, baseCost: 150, baseIncome: 8 },
        quantumProcessor: { count: 0, baseCost: 1500, baseIncome: 40 },
        aiDataCenter: { count: 0, baseCost: 15000, baseIncome: 150 },
        neuralNetwork: { count: 0, baseCost: 150000, baseIncome: 800 },
        cosmicGenerator: { count: 0, baseCost: 1500000, baseIncome: 5000 },
        dimensionFactory: { count: 0, baseCost: 15000000, baseIncome: 30000 },
        timeManipulator: { count: 0, baseCost: 150000000, baseIncome: 180000 },
        realityBender: { count: 0, baseCost: 1500000000, baseIncome: 1000000 },
        universalCore: { count: 0, baseCost: 15000000000, baseIncome: 6000000 },
        infinityEngine: { count: 0, baseCost: 150000000000, baseIncome: 35000000 },
        clickMultiplier: { count: 0, baseCost: 750, multiplier: 1 }
    }
};

let currentLanguage = 'ar';
let audioSettings = {
    musicEnabled: true,
    soundEnabled: true
};

const translations = {
    ar: {
        levelNames: {
            1: 'مبتدئ', 5: 'متدرب', 10: 'خبير', 15: 'محترف', 20: 'أسطورة',
            25: 'بطل', 30: 'سيد', 40: 'إمبراطور', 50: 'إله السايبر', 
            60: 'محارب كوني', 70: 'سيد الأبعاد', 80: 'حاكم الزمن',
            90: 'ثاني الواقع', 100: 'المطلق', 120: 'ما وراء اللانهاية'
        },
        upgrades: {
            autoClicker: { name: 'نقرة تلقائية', description: 'ينقر تلقائياً كل ثانية' },
            megaMiner: { name: 'منقب ضخم', description: 'عامل تعدين قوي للغاية' },
            quantumProcessor: { name: 'معالج كمومي', description: 'تقنية كمومية متطورة' },
            aiDataCenter: { name: 'مركز بيانات AI', description: 'ذكاء اصطناعي يعمل 24/7' },
            neuralNetwork: { name: 'شبكة عصبية', description: 'شبكة ذكاء اصطناعي متقدمة' },
            cosmicGenerator: { name: 'مولد كوني', description: 'يسخر طاقة النجوم' },
            dimensionFactory: { name: 'مصنع الأبعاد', description: 'يخلق أبعاد موازية للإنتاج' },
            timeManipulator: { name: 'معالج الزمن', description: 'يتحكم في تدفق الوقت' },
            realityBender: { name: 'ثاني الواقع', description: 'يشكل الواقع حسب إرادته' },
            universalCore: { name: 'نواة الكون', description: 'قلب الكون النابض' },
            infinityEngine: { name: 'محرك اللانهاية', description: 'طاقة لا محدودة من الفراغ' },
            clickMultiplier: { name: 'مضاعف النقرات', description: 'يضاعف قوة كل نقرة ×2' }
        },
        perSecond: '/ث', owned: 'مملوك:', level: 'مستوى:',
        resetConfirm: 'هل أنت متأكد من إعادة تعيين كل التقدم؟',
        logoutConfirm: 'هل تريد تسجيل الخروج؟ سيتم حفظ تقدمك تلقائياً.',
        buy: 'شراء', buy10: 'شراء 10', buy100: 'شراء 100'
    },
    en: {
        levelNames: {
            1: 'Beginner', 5: 'Apprentice', 10: 'Expert', 15: 'Professional', 20: 'Legend',
            25: 'Champion', 30: 'Master', 40: 'Emperor', 50: 'Cyber God', 
            60: 'Cosmic Warrior', 70: 'Dimension Lord', 80: 'Time Ruler',
            90: 'Reality Bender', 100: 'Absolute', 120: 'Beyond Infinity'
        },
        upgrades: {
            autoClicker: { name: 'Auto Clicker', description: 'Clicks automatically every second' },
            megaMiner: { name: 'Mega Miner', description: 'Extremely powerful mining worker' },
            quantumProcessor: { name: 'Quantum Processor', description: 'Advanced quantum technology' },
            aiDataCenter: { name: 'AI Data Center', description: 'Artificial intelligence working 24/7' },
            neuralNetwork: { name: 'Neural Network', description: 'Advanced AI neural network' },
            cosmicGenerator: { name: 'Cosmic Generator', description: 'Harnesses the power of stars' },
            dimensionFactory: { name: 'Dimension Factory', description: 'Creates parallel dimensions for production' },
            timeManipulator: { name: 'Time Manipulator', description: 'Controls the flow of time' },
            realityBender: { name: 'Reality Bender', description: 'Shapes reality at will' },
            universalCore: { name: 'Universal Core', description: 'The beating heart of the universe' },
            infinityEngine: { name: 'Infinity Engine', description: 'Unlimited power from the void' },
            clickMultiplier: { name: 'Click Multiplier', description: 'Doubles click power ×2' }
        },
        perSecond: '/s', owned: 'Owned:', level: 'Level:',
        resetConfirm: 'Are you sure you want to reset all progress?',
        logoutConfirm: 'Do you want to logout? Your progress will be saved automatically.',
        buy: 'Buy', buy10: 'Buy 10', buy100: 'Buy 100'
    }
};

const upgradeDefinitions = {
    autoClicker: { emoji: '🖱️', type: 'passive' },
    megaMiner: { emoji: '⛏️', type: 'passive' },
    quantumProcessor: { emoji: '⚛️', type: 'passive' },
    aiDataCenter: { emoji: '🏢', type: 'passive' },
    neuralNetwork: { emoji: '🧠', type: 'passive' },
    cosmicGenerator: { emoji: '🌟', type: 'passive' },
    dimensionFactory: { emoji: '🌌', type: 'passive' },
    timeManipulator: { emoji: '⏰', type: 'passive' },
    realityBender: { emoji: '🔮', type: 'passive' },
    universalCore: { emoji: '💫', type: 'passive' },
    infinityEngine: { emoji: '♾️', type: 'passive' },
    clickMultiplier: { emoji: '💪', type: 'multiplier' }
};

const shapeDefinitions = {
    circle: { emoji: '⭕', unlockLevel: 1, bonus: 1, name_ar: 'دائرة', name_en: 'Circle' },
    square: { emoji: '🟦', unlockLevel: 5, bonus: 1.2, name_ar: 'مربع', name_en: 'Square' },
    star: { emoji: '⭐', unlockLevel: 10, bonus: 1.5, name_ar: 'نجمة', name_en: 'Star' },
    diamond: { emoji: '💠', unlockLevel: 15, bonus: 2, name_ar: 'ماسة', name_en: 'Diamond' },
    heart: { emoji: '💖', unlockLevel: 20, bonus: 2.5, name_ar: 'قلب', name_en: 'Heart' },
    fire: { emoji: '🔥', unlockLevel: 25, bonus: 3, name_ar: 'نار', name_en: 'Fire' },
    lightning: { emoji: '⚡', unlockLevel: 30, bonus: 4, name_ar: 'برق', name_en: 'Lightning' },
    galaxy: { emoji: '🌌', unlockLevel: 40, bonus: 5, name_ar: 'مجرة', name_en: 'Galaxy' },
    infinity: { emoji: '♾️', unlockLevel: 50, bonus: 7, name_ar: 'لا نهائي', name_en: 'Infinity' },
    supernova: { emoji: '💥', unlockLevel: 60, bonus: 10, name_ar: 'سوبرنوفا', name_en: 'Supernova' },
    blackhole: { emoji: '🕳️', unlockLevel: 75, bonus: 15, name_ar: 'ثقب أسود', name_en: 'Black Hole' },
    cosmos: { emoji: '🌠', unlockLevel: 90, bonus: 25, name_ar: 'الكون', name_en: 'Cosmos' }
};

const worldDefinitions = {
    cyber: { emoji: '💻', unlockLevel: 1, bonus: 1, name_ar: 'عالم السايبر', name_en: 'Cyber World', description_ar: 'العالم الرقمي الأساسي', description_en: 'The basic digital world', gradient: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a1f 50%, #0a0a0f 100%)' },
    ocean: { emoji: '🌊', unlockLevel: 12, bonus: 1.5, name_ar: 'عالم المحيطات', name_en: 'Ocean World', description_ar: 'أعماق البحار المضيئة', description_en: 'Glowing ocean depths', gradient: 'linear-gradient(135deg, #001a33 0%, #004d66 50%, #001a33 100%)' },
    volcano: { emoji: '🌋', unlockLevel: 20, bonus: 2, name_ar: 'عالم البراكين', name_en: 'Volcano World', description_ar: 'حمم متوهجة وطاقة لا محدودة', description_en: 'Glowing lava and unlimited energy', gradient: 'linear-gradient(135deg, #1a0a00 0%, #4d1400 50%, #1a0a00 100%)' },
    forest: { emoji: '🌲', unlockLevel: 28, bonus: 2.5, name_ar: 'الغابة السحرية', name_en: 'Magic Forest', description_ar: 'غابة مليئة بالطاقة الطبيعية', description_en: 'Forest full of natural energy', gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a331a 50%, #0a1a0a 100%)' },
    space: { emoji: '🚀', unlockLevel: 35, bonus: 3, name_ar: 'عالم الفضاء', name_en: 'Space World', description_ar: 'النجوم والكواكب البعيدة', description_en: 'Stars and distant planets', gradient: 'linear-gradient(135deg, #000014 0%, #1a0033 50%, #000014 100%)' },
    desert: { emoji: '🏜️', unlockLevel: 42, bonus: 3.5, name_ar: 'الصحراء الذهبية', name_en: 'Golden Desert', description_ar: 'كنوز مخفية تحت الرمال', description_en: 'Hidden treasures under the sands', gradient: 'linear-gradient(135deg, #1a1400 0%, #332800 50%, #1a1400 100%)' },
    crystal: { emoji: '💎', unlockLevel: 48, bonus: 4, name_ar: 'عالم الكريستال', name_en: 'Crystal World', description_ar: 'بلورات متلألئة من طاقة نقية', description_en: 'Sparkling crystals of pure energy', gradient: 'linear-gradient(135deg, #0f0a1a 0%, #2d1a4d 50%, #0f0a1a 100%)' },
    ice: { emoji: '❄️', unlockLevel: 54, bonus: 4.5, name_ar: 'عالم الجليد', name_en: 'Ice World', description_ar: 'بلورات جليدية نادرة', description_en: 'Rare ice crystals', gradient: 'linear-gradient(135deg, #0a1a1a 0%, #1a4d4d 50%, #0a1a1a 100%)' },
    cosmic: { emoji: '🌌', unlockLevel: 60, bonus: 5, name_ar: 'العالم الكوني', name_en: 'Cosmic World', description_ar: 'مجرات وثقوب سوداء', description_en: 'Galaxies and black holes', gradient: 'linear-gradient(135deg, #1a001a 0%, #33004d 50%, #1a001a 100%)' },
    neon: { emoji: '🎆', unlockLevel: 66, bonus: 6, name_ar: 'عالم النيون', name_en: 'Neon World', description_ar: 'أضواء وألوان متوهجة', description_en: 'Glowing lights and colors', gradient: 'linear-gradient(135deg, #1a0a1a 0%, #4d1a4d 50%, #1a0a1a 100%)' },
    rainbow: { emoji: '🌈', unlockLevel: 72, bonus: 7, name_ar: 'عالم قوس قزح', name_en: 'Rainbow World', description_ar: 'ألوان متعددة الأبعاد', description_en: 'Multi-dimensional colors', gradient: 'linear-gradient(135deg, #1a0a14 0%, #2e1a28 50%, #1a0a14 100%)' },
    electric: { emoji: '⚡', unlockLevel: 78, bonus: 8, name_ar: 'عالم الكهرباء', name_en: 'Electric World', description_ar: 'طاقة كهربائية نقية', description_en: 'Pure electric energy', gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a4d 50%, #0a0a1a 100%)' },
    shadow: { emoji: '🌑', unlockLevel: 84, bonus: 10, name_ar: 'عالم الظلال', name_en: 'Shadow World', description_ar: 'قوة الظلام الغامضة', description_en: 'Mysterious dark power', gradient: 'linear-gradient(135deg, #050505 0%, #0f0f0f 50%, #050505 100%)' },
    light: { emoji: '✨', unlockLevel: 90, bonus: 12, name_ar: 'عالم النور', name_en: 'Light World', description_ar: 'نور خالص ومتألق', description_en: 'Pure and radiant light', gradient: 'linear-gradient(135deg, #1a1a14 0%, #4d4d28 50%, #1a1a14 100%)' },
    plasma: { emoji: '🔆', unlockLevel: 96, bonus: 15, name_ar: 'عالم البلازما', name_en: 'Plasma World', description_ar: 'طاقة بلازما فائقة', description_en: 'Super plasma energy', gradient: 'linear-gradient(135deg, #1a140a 0%, #4d2814 50%, #1a140a 100%)' },
    quantum: { emoji: '⚛️', unlockLevel: 102, bonus: 20, name_ar: 'العالم الكمومي', name_en: 'Quantum World', description_ar: 'أبعاد كمومية متشابكة', description_en: 'Entangled quantum dimensions', gradient: 'linear-gradient(135deg, #0a141a 0%, #14284d 50%, #0a141a 100%)' },
    dimension: { emoji: '🔮', unlockLevel: 108, bonus: 25, name_ar: 'عالم الأبعاد', name_en: 'Dimension World', description_ar: 'أبعاد متعددة ومتوازية', description_en: 'Multiple parallel dimensions', gradient: 'linear-gradient(135deg, #14001a 0%, #28004d 50%, #14001a 100%)' },
    ethereal: { emoji: '👻', unlockLevel: 114, bonus: 35, name_ar: 'العالم الأثيري', name_en: 'Ethereal World', description_ar: 'عالم الأرواح والطاقة', description_en: 'World of spirits and energy', gradient: 'linear-gradient(135deg, #0a1a14 0%, #1a4d28 50%, #0a1a14 100%)' },
    celestial: { emoji: '🌟', unlockLevel: 120, bonus: 50, name_ar: 'العالم السماوي', name_en: 'Celestial World', description_ar: 'قوة الآلهة القديمة', description_en: 'Power of ancient gods', gradient: 'linear-gradient(135deg, #1a1a0a 0%, #4d4d14 50%, #1a1a0a 100%)' },
    infinity: { emoji: '♾️', unlockLevel: 150, bonus: 100, name_ar: 'عالم اللانهاية', name_en: 'Infinity World', description_ar: 'ما وراء الفهم البشري', description_en: 'Beyond human understanding', gradient: 'linear-gradient(135deg, #1a0a1a 0%, #4d144d 50%, #1a0a1a 100%)' }
};

const petDefinitions = {
    cat: { emoji: '🐱', unlockLevel: 8, bonus: 0.1, name_ar: 'قطة سايبر', name_en: 'Cyber Cat', description_ar: '+10% إنتاج', description_en: '+10% production' },
    dog: { emoji: '🐕', unlockLevel: 12, bonus: 0.15, name_ar: 'كلب رقمي', name_en: 'Digital Dog', description_ar: '+15% إنتاج', description_en: '+15% production' },
    rabbit: { emoji: '🐰', unlockLevel: 16, bonus: 0.2, name_ar: 'أرنب سريع', name_en: 'Speed Rabbit', description_ar: '+20% إنتاج', description_en: '+20% production' },
    dragon: { emoji: '🐉', unlockLevel: 20, bonus: 0.25, name_ar: 'تنين كمومي', name_en: 'Quantum Dragon', description_ar: '+25% إنتاج', description_en: '+25% production' },
    robot: { emoji: '🤖', unlockLevel: 24, bonus: 0.3, name_ar: 'روبوت AI', name_en: 'AI Robot', description_ar: '+30% إنتاج', description_en: '+30% production' },
    owl: { emoji: '🦉', unlockLevel: 28, bonus: 0.35, name_ar: 'بومة حكيمة', name_en: 'Wise Owl', description_ar: '+35% إنتاج', description_en: '+35% production' },
    fox: { emoji: '🦊', unlockLevel: 32, bonus: 0.4, name_ar: 'ثعلب ذكي', name_en: 'Smart Fox', description_ar: '+40% إنتاج', description_en: '+40% production' },
    wolf: { emoji: '🐺', unlockLevel: 36, bonus: 0.45, name_ar: 'ذئب قوي', name_en: 'Strong Wolf', description_ar: '+45% إنتاج', description_en: '+45% production' },
    alien: { emoji: '👽', unlockLevel: 40, bonus: 0.5, name_ar: 'فضائي متطور', name_en: 'Advanced Alien', description_ar: '+50% إنتاج', description_en: '+50% production' },
    phoenix: { emoji: '🦅', unlockLevel: 44, bonus: 0.6, name_ar: 'طائر الفينيق', name_en: 'Phoenix', description_ar: '+60% إنتاج', description_en: '+60% production' },
    unicorn: { emoji: '🦄', unlockLevel: 48, bonus: 0.7, name_ar: 'يونيكورن سحري', name_en: 'Magic Unicorn', description_ar: '+70% إنتاج', description_en: '+70% production' },
    panda: { emoji: '🐼', unlockLevel: 52, bonus: 0.8, name_ar: 'باندا نادر', name_en: 'Rare Panda', description_ar: '+80% إنتاج', description_en: '+80% production' },
    whale: { emoji: '🐋', unlockLevel: 56, bonus: 0.9, name_ar: 'حوت كوني', name_en: 'Cosmic Whale', description_ar: '+90% إنتاج', description_en: '+90% production' },
    dolphin: { emoji: '🐬', unlockLevel: 60, bonus: 1.0, name_ar: 'دولفين ذكي', name_en: 'Smart Dolphin', description_ar: '+100% إنتاج', description_en: '+100% production' },
    butterfly: { emoji: '🦋', unlockLevel: 64, bonus: 1.1, name_ar: 'فراشة الأبعاد', name_en: 'Dimension Butterfly', description_ar: '+110% إنتاج', description_en: '+110% production' },
    tiger: { emoji: '🐯', unlockLevel: 68, bonus: 1.2, name_ar: 'نمر البرق', name_en: 'Lightning Tiger', description_ar: '+120% إنتاج', description_en: '+120% production' },
    lion: { emoji: '🦁', unlockLevel: 72, bonus: 1.3, name_ar: 'أسد المجرة', name_en: 'Galaxy Lion', description_ar: '+130% إنتاج', description_en: '+130% production' },
    eagle: { emoji: '🦅', unlockLevel: 76, bonus: 1.4, name_ar: 'نسر الفضاء', name_en: 'Space Eagle', description_ar: '+140% إنتاج', description_en: '+140% production' },
    bear: { emoji: '🐻', unlockLevel: 80, bonus: 1.5, name_ar: 'دب قوي', name_en: 'Strong Bear', description_ar: '+150% إنتاج', description_en: '+150% production' },
    penguin: { emoji: '🐧', unlockLevel: 84, bonus: 1.6, name_ar: 'بطريق الجليد', name_en: 'Ice Penguin', description_ar: '+160% إنتاج', description_en: '+160% production' },
    koala: { emoji: '🐨', unlockLevel: 88, bonus: 1.7, name_ar: 'كوالا لطيف', name_en: 'Cute Koala', description_ar: '+170% إنتاج', description_en: '+170% production' },
    pegasus: { emoji: '🦄', unlockLevel: 92, bonus: 2.0, name_ar: 'بيجاسوس الكريستال', name_en: 'Crystal Pegasus', description_ar: '+200% إنتاج', description_en: '+200% production' },
    serpent: { emoji: '🐍', unlockLevel: 96, bonus: 2.5, name_ar: 'ثعبان قديم', name_en: 'Ancient Serpent', description_ar: '+250% إنتاج', description_en: '+250% production' },
    kraken: { emoji: '🐙', unlockLevel: 100, bonus: 3.0, name_ar: 'كراكن البحار', name_en: 'Sea Kraken', description_ar: '+300% إنتاج', description_en: '+300% production' },
    chimera: { emoji: '🦁', unlockLevel: 105, bonus: 3.5, name_ar: 'خيميرا أسطورية', name_en: 'Mythical Chimera', description_ar: '+350% إنتاج', description_en: '+350% production' },
    hydra: { emoji: '🐲', unlockLevel: 110, bonus: 4.0, name_ar: 'هيدرا متعددة الرؤوس', name_en: 'Multi-headed Hydra', description_ar: '+400% إنتاج', description_en: '+400% production' },
    cerberus: { emoji: '🐕', unlockLevel: 115, bonus: 5.0, name_ar: 'سيربيروس حارس الجحيم', name_en: 'Cerberus Hell Guardian', description_ar: '+500% إنتاج', description_en: '+500% production' },
    titan: { emoji: '🗿', unlockLevel: 120, bonus: 7.0, name_ar: 'تايتن قديم', name_en: 'Ancient Titan', description_ar: '+700% إنتاج', description_en: '+700% production' },
    leviathan: { emoji: '🐋', unlockLevel: 130, bonus: 10.0, name_ar: 'لوياثان العظيم', name_en: 'Great Leviathan', description_ar: '+1000% إنتاج', description_en: '+1000% production' },
    celestial: { emoji: '⭐', unlockLevel: 150, bonus: 20.0, name_ar: 'كائن سماوي', name_en: 'Celestial Being', description_ar: '+2000% إنتاج', description_en: '+2000% production' }
};

function formatNumber(num) {
    if (num >= 1e24) return (num / 1e24).toFixed(2) + 'Sp';
    if (num >= 1e21) return (num / 1e21).toFixed(2) + 'Sx';
    if (num >= 1e18) return (num / 1e18).toFixed(2) + 'Qi';
    if (num >= 1e15) return (num / 1e15).toFixed(2) + 'Qa';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toString();
}

function getLevelName(level) {
    const names = translations[currentLanguage].levelNames;
    let name = names[1];
    for (let threshold in names) {
        if (level >= parseInt(threshold)) name = names[threshold];
    }
    return name;
}

function getExpForLevel(level) {
    return Math.floor(100 * Math.pow(1.5, level - 1));
}

function getLevelBonus(level) {
    return 1 + (level - 1) * 0.1;
}

function calculateCost(upgrade, quantity = 1) {
    let totalCost = 0;
    for (let i = 0; i < quantity; i++) {
        totalCost += Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count + i));
    }
    return totalCost;
}

function getShapeBonus() {
    const shape = shapeDefinitions[gameState.currentShape];
    return shape ? shape.bonus : 1;
}

function getWorldBonus() {
    const world = worldDefinitions[gameState.currentWorld];
    return world ? world.bonus : 1;
}

function getPetsBonus() {
    let bonus = 1;
    gameState.pets.forEach(petKey => {
        if (petDefinitions[petKey]) bonus += petDefinitions[petKey].bonus;
    });
    return bonus;
}

function calculateClickPower() {
    const multiplier = gameState.upgrades.clickMultiplier.count;

    return gameState.clickPower *
        Math.pow(2, multiplier) *
        gameState.levelBonus *
        getShapeBonus() *
        getWorldBonus() *
        getPetsBonus() *
        gameState.rebirthMultiplier;
}


function calculatePassiveIncome() {
    let total = 0;
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        if (upgradeDefinitions[key] && upgradeDefinitions[key].type === 'passive') {
            total += upgrade.count * upgrade.baseIncome * gameState.levelBonus;
        }
    }
    return total * getPetsBonus() * getWorldBonus();
}

function updateBackgroundForWorld() {
    const world = worldDefinitions[gameState.currentWorld];
    if (world) {
        document.body.style.background = world.gradient;
    }
}

function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('cyberClickerLanguage', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.querySelectorAll('[data-ar]').forEach(elem => {
        elem.textContent = elem.dataset[lang];
    });
    updateUI();
    renderShapes();
    renderPets();
    renderRoadmap();
    renderWorlds();
}

const elements = {
    loginScreen: document.getElementById('loginScreen'),
    gameScreen: document.getElementById('gameScreen'),
    playerNameInput: document.getElementById('playerName'),
    displayPlayerName: document.getElementById('displayPlayerName'),
    startGameBtn: document.getElementById('startGameBtn'),
    googleLoginBtn: document.getElementById('googleLoginBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    clickButton: document.getElementById('clickButton'),
    coinCount: document.getElementById('coinCount'),
    perClick: document.getElementById('perClick'),
    perSecond: document.getElementById('perSecond'),
    totalClicks: document.getElementById('totalClicks'),
    totalEarned: document.getElementById('totalEarned'),
    clickPowerDisplay: document.getElementById('clickPowerDisplay'),
    levelNumber: document.getElementById('levelNumber'),
    levelName: document.getElementById('levelName'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    levelBonus: document.getElementById('levelBonus'),
    shapesContainer: document.getElementById('shapesContainer'),
    petsContainer: document.getElementById('petsContainer'),
    roadmapContainer: document.getElementById('roadmapContainer'),
    upgradesContainer: document.getElementById('upgradesContainer'),
    saveButton: document.getElementById('saveButton'),
    resetButton: document.getElementById('resetButton'),
    musicToggle: document.getElementById('musicToggle'),
    soundToggle: document.getElementById('soundToggle'),
    levelUpNotification: document.getElementById('levelUpNotification'),
    worldsContainer: document.getElementById('worldsContainer')
};

const audioManager = {
    clickSound: null,
    levelUpSound: null,
    purchaseSound: null,
    lastClickSound: 0,

    
    init() {
        this.clickSound = this.createSound(200, 0.1, 'sine');
        this.levelUpSound = this.createSound(400, 0.3, 'square');
        this.purchaseSound = this.createSound(300, 0.2, 'triangle');
    },
    
    createSound(frequency, duration, type = 'sine') {
        return { frequency, duration, type };
    },
    
    playSound(sound) {
        if (!audioSettings.soundEnabled || !sound) return;
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = sound.frequency;
            oscillator.type = sound.type;
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + sound.duration);
        } catch (e) {
            console.log('Audio not supported');
        }
    },
    
    toggleMusic() {
        audioSettings.musicEnabled = !audioSettings.musicEnabled;
        saveAudioSettings();
    },
    
    toggleSound() {
        audioSettings.soundEnabled = !audioSettings.soundEnabled;
        saveAudioSettings();
    }
};


function initGoogleSignIn() {
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse
        });
        
        google.accounts.id.renderButton(
            document.getElementById('googleLoginBtn'),
            { 
                theme: 'filled_blue',
                size: 'large',
                text: 'signin_with',
                width: '100%',
                locale: currentLanguage
            }
        );
    }
}

function handleGoogleResponse(response) {
    try {
        const responsePayload = parseJwt(response.credential);
        
        gameState.playerName = responsePayload.name || responsePayload.email.split('@')[0];
        gameState.googleEmail = responsePayload.email;
        gameState.isGoogleUser = true;
        gameState.coins += CONFIG.GOOGLE_BONUS;
        gameState.totalEarned += CONFIG.GOOGLE_BONUS;
        
        startGameAfterLogin();
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        alert(currentLanguage === 'ar' ? 'حدث خطأ في تسجيل الدخول' : 'Login error occurred');
    }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function handleClick(e) {
    const power = calculateClickPower();
    gameState.coins += power;
    gameState.totalClicks++;
    gameState.totalEarned += power;
    addExperience(power / 10);
    
    audioManager.playSound(audioManager.clickSound);
    
    showFloatingNumber(power, e ? e.clientX : window.innerWidth/2, e ? e.clientY : window.innerHeight/2);
    updateUI();
}

function showFloatingNumber(value, x, y) {
    const floatingNum = document.createElement('div');
    floatingNum.className = 'floating-number';
    floatingNum.textContent = '+' + formatNumber(value);
    floatingNum.style.left = x + 'px';
    floatingNum.style.top = y + 'px';
    document.body.appendChild(floatingNum);
    
    setTimeout(() => floatingNum.remove(), 1500);
}

function purchaseUpgrade(upgradeKey, quantity) {
    const upgrade = gameState.upgrades[upgradeKey];
    const cost = calculateCost(upgrade, quantity);
    
    if (gameState.coins >= cost) {
        gameState.coins -= cost;
        upgrade.count += quantity;
        gameState.passiveIncome = calculatePassiveIncome();
        audioManager.playSound(audioManager.purchaseSound);
        updateUI();
    }
}

function addExperience(amount) {
    gameState.experience += amount;
    const requiredExp = getExpForLevel(gameState.level);
    
    if (gameState.experience >= requiredExp) {
        levelUp();
    }
    updateLevelUI();
}

function levelUp() {
    gameState.level++;
    gameState.experience = 0;
    gameState.levelBonus = getLevelBonus(gameState.level);
    gameState.passiveIncome = calculatePassiveIncome();
    
    updateBackgroundForWorld();
    
    for (let key in worldDefinitions) {
        const world = worldDefinitions[key];
        if (gameState.level >= world.unlockLevel && !gameState.unlockedWorlds.includes(key)) {
            gameState.unlockedWorlds.push(key);
        }
    }
    
    for (let key in petDefinitions) {
        const pet = petDefinitions[key];
        if (gameState.level >= pet.unlockLevel && !gameState.pets.includes(key)) {
            gameState.pets.push(key);
        }
    }
    
    audioManager.playSound(audioManager.levelUpSound);
    showLevelUpNotification();
    renderShapes();
    renderPets();
    renderRoadmap();
    renderWorlds();
    updateUI();
}

function showLevelUpNotification() {
    const levelName = getLevelName(gameState.level);
    document.getElementById('newLevelNumber').textContent = gameState.level + ' - ' + levelName;
    document.getElementById('levelUpBonus').textContent = '×' + gameState.levelBonus.toFixed(1);
    
    elements.levelUpNotification.classList.add('show');
    setTimeout(() => {
        elements.levelUpNotification.classList.remove('show');
    }, 3000);
}

function updateLevelUI() {
    elements.levelNumber.textContent = gameState.level;
    elements.levelName.textContent = getLevelName(gameState.level);
    elements.levelBonus.textContent = '×' + gameState.levelBonus.toFixed(1);
    
    const requiredExp = getExpForLevel(gameState.level);
    const progress = (gameState.experience / requiredExp) * 100;
    elements.progressBar.style.width = Math.min(progress, 100) + '%';
    elements.progressText.textContent = formatNumber(gameState.experience) + ' / ' + formatNumber(requiredExp);
}

function updateClickButton() {
    const shape = shapeDefinitions[gameState.currentShape];
    if (shape) {
        const clickText = elements.clickButton.querySelector('.click-text');
        const existingEmoji = elements.clickButton.querySelector('.shape-emoji-display');
        if (existingEmoji) {
            existingEmoji.textContent = shape.emoji;
        } else {
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'shape-emoji-display';
            emojiSpan.style.fontSize = '4rem';
            emojiSpan.textContent = shape.emoji;
            elements.clickButton.insertBefore(emojiSpan, clickText);
        }
    }
}

function selectShape(shapeKey) {
    const shape = shapeDefinitions[shapeKey];
    if (gameState.level >= shape.unlockLevel) {
        gameState.currentShape = shapeKey;
        updateClickButton();
        renderShapes();
        updateUI();
    }
}

function selectWorld(worldKey) {
    const world = worldDefinitions[worldKey];
    if (gameState.unlockedWorlds.includes(worldKey)) {
        gameState.currentWorld = worldKey;
        updateBackgroundForWorld();
        renderWorlds();
        updateUI();
    }
}

function renderShapes() {
    elements.shapesContainer.innerHTML = '';
    for (let key in shapeDefinitions) {
        const shape = shapeDefinitions[key];
        const isUnlocked = gameState.level >= shape.unlockLevel;
        const isActive = gameState.currentShape === key;
        
        const shapeDiv = document.createElement('div');
        shapeDiv.className = 'shape-item';
        if (isActive) shapeDiv.classList.add('active');
        if (!isUnlocked) shapeDiv.classList.add('locked');
        
        shapeDiv.innerHTML = `
            <div class="shape-emoji">${shape.emoji}</div>
            <div class="shape-name">${currentLanguage === 'ar' ? shape.name_ar : shape.name_en}</div>
            <div class="shape-bonus">×${shape.bonus}</div>
            ${!isUnlocked ? `<div class="shape-lock">${currentLanguage === 'ar' ? 'مستوى' : 'Level'} ${shape.unlockLevel}</div>` : ''}
        `;
        
        if (isUnlocked) {
            shapeDiv.onclick = () => selectShape(key);
        }
        
        elements.shapesContainer.appendChild(shapeDiv);
    }
}

function renderWorlds() {
    if (!elements.worldsContainer) return;
    
    elements.worldsContainer.innerHTML = '';
    for (let key in worldDefinitions) {
        const world = worldDefinitions[key];
        const isUnlocked = gameState.unlockedWorlds.includes(key);
        const isActive = gameState.currentWorld === key;
        
        const worldDiv = document.createElement('div');
        worldDiv.className = 'world-item';
        if (isActive) worldDiv.classList.add('active');
        if (!isUnlocked) worldDiv.classList.add('locked');
        
        worldDiv.innerHTML = `
            <div class="world-emoji">${world.emoji}</div>
            <div class="world-info">
                <div class="world-name">${currentLanguage === 'ar' ? world.name_ar : world.name_en}</div>
                <div class="world-description">${currentLanguage === 'ar' ? world.description_ar : world.description_en}</div>
                <div class="world-bonus">×${world.bonus} ${currentLanguage === 'ar' ? 'مكافأة' : 'Bonus'}</div>
                ${!isUnlocked ? `<div class="world-lock">🔒 ${currentLanguage === 'ar' ? 'مستوى' : 'Level'} ${world.unlockLevel}</div>` : ''}
            </div>
        `;
        
        if (isUnlocked) {
            worldDiv.onclick = () => selectWorld(key);
        }
        
        elements.worldsContainer.appendChild(worldDiv);
    }
}

function renderPets() {
    elements.petsContainer.innerHTML = '';
    for (let key in petDefinitions) {
        const pet = petDefinitions[key];
        const isUnlocked = gameState.pets.includes(key);
        const canUnlock = gameState.level >= pet.unlockLevel;
        
        const petDiv = document.createElement('div');
        petDiv.className = 'pet-item';
        if (isUnlocked) petDiv.classList.add('unlocked');
        if (!canUnlock) petDiv.classList.add('locked');
        
        petDiv.innerHTML = `
            <div class="pet-emoji">${pet.emoji}</div>
            <div class="pet-info">
                <div class="pet-name">${currentLanguage === 'ar' ? pet.name_ar : pet.name_en}</div>
                <div class="pet-description">${currentLanguage === 'ar' ? pet.description_ar : pet.description_en}</div>
                ${!isUnlocked ? `<div class="pet-unlock">🔒 ${currentLanguage === 'ar' ? 'مستوى' : 'Level'} ${pet.unlockLevel}</div>` : '<div class="pet-unlock">✓ ' + (currentLanguage === 'ar' ? 'مفتوح' : 'Unlocked') + '</div>'}
            </div>
        `;
        
        elements.petsContainer.appendChild(petDiv);
    }
}

function renderRoadmap() {
    elements.roadmapContainer.innerHTML = '';
    const nextLevels = [];
    
    for (let i = gameState.level + 1; i <= gameState.level + 10; i++) {
        let rewards = [];
        
        for (let key in petDefinitions) {
            if (petDefinitions[key].unlockLevel === i) {
                rewards.push({ emoji: petDefinitions[key].emoji, name_ar: petDefinitions[key].name_ar, name_en: petDefinitions[key].name_en });
            }
        }
        
        for (let key in worldDefinitions) {
            if (worldDefinitions[key].unlockLevel === i) {
                rewards.push({ emoji: worldDefinitions[key].emoji, name_ar: worldDefinitions[key].name_ar, name_en: worldDefinitions[key].name_en });
            }
        }
        
        if (rewards.length > 0) {
            nextLevels.push({ level: i, rewards: rewards });
        }
    }
    
    nextLevels.slice(0, 5).forEach(item => {
        item.rewards.forEach(reward => {
            const roadmapItem = document.createElement('div');
            roadmapItem.className = 'roadmap-item';
            roadmapItem.innerHTML = `
                <div class="roadmap-level">${currentLanguage === 'ar' ? 'مستوى' : 'Level'} ${item.level}</div>
                <div class="roadmap-reward">
                    <span class="roadmap-emoji">${reward.emoji}</span>
                    <span class="roadmap-name">${currentLanguage === 'ar' ? reward.name_ar : reward.name_en}</span>
                </div>
            `;
            elements.roadmapContainer.appendChild(roadmapItem);
        });
    });
    
    if (nextLevels.length === 0) {
        elements.roadmapContainer.innerHTML = `<div class="roadmap-empty">${currentLanguage === 'ar' ? '🎉 استمر في اللعب لفتح المزيد!' : '🎉 Keep playing to unlock more!'}</div>`;
    }
}

function renderUpgrades() {
    if (!elements.upgradesContainer) return;
    
    elements.upgradesContainer.innerHTML = '';
    
    for (let key in upgradeDefinitions) {
        const def = upgradeDefinitions[key];
        const upgrade = gameState.upgrades[key];
        const cost1 = calculateCost(upgrade, 1);
        const cost10 = calculateCost(upgrade, 10);
        const cost100 = calculateCost(upgrade, 100);
        const trans = translations[currentLanguage].upgrades[key];
        
        const canAfford1 = gameState.coins >= cost1;
        const canAfford10 = gameState.coins >= cost10;
        const canAfford100 = gameState.coins >= cost100;
        
        const upgradeDiv = document.createElement('div');
        upgradeDiv.className = 'upgrade-item';
        
        let statsHTML = '';
        if (def.type === 'passive') {
            const income = upgrade.baseIncome * gameState.levelBonus;
            statsHTML = `
                <span class="upgrade-stat">+${formatNumber(income)}${translations[currentLanguage].perSecond}</span>
                <span class="upgrade-count">${translations[currentLanguage].owned} ${upgrade.count}</span>
            `;
        } else if (def.type === 'multiplier') {
            statsHTML = `
                <span class="upgrade-stat">×2 ${currentLanguage === 'ar' ? 'قوة النقر' : 'Click Power'}</span>
                <span class="upgrade-count">${translations[currentLanguage].level} ${upgrade.count}</span>
            `;
        }
        
        upgradeDiv.innerHTML = `
            <div class="upgrade-header">
                <div class="upgrade-icon">${def.emoji}</div>
                <div class="upgrade-info">
                    <div class="upgrade-name">${trans.name}</div>
                    <div class="upgrade-description">${trans.description}</div>
                    <div class="upgrade-stats">${statsHTML}</div>
                </div>
            </div>
            <div class="upgrade-buttons-container">
                <button class="upgrade-btn upgrade-btn-1 ${!canAfford1 ? 'disabled' : ''}" 
                        data-upgrade="${key}" data-quantity="1">
                    <span class="btn-label">${translations[currentLanguage].buy}</span>
                    <span class="btn-cost">${formatNumber(cost1)} 💎</span>
                </button>
                <button class="upgrade-btn upgrade-btn-10 ${!canAfford10 ? 'disabled' : ''}" 
                        data-upgrade="${key}" data-quantity="10">
                    <span class="btn-label">×10</span>
                    <span class="btn-cost">${formatNumber(cost10)} 💎</span>
                </button>
                <button class="upgrade-btn upgrade-btn-100 ${!canAfford100 ? 'disabled' : ''}" 
                        data-upgrade="${key}" data-quantity="100">
                    <span class="btn-label">×100</span>
                    <span class="btn-cost">${formatNumber(cost100)} 💎</span>
                </button>
            </div>
        `;
        
        elements.upgradesContainer.appendChild(upgradeDiv);
    }
    

}

function updateUI() {
    elements.coinCount.textContent = formatNumber(gameState.coins);
    elements.perClick.textContent = formatNumber(calculateClickPower());
    elements.perSecond.textContent = formatNumber(gameState.passiveIncome);
    elements.totalClicks.textContent = formatNumber(gameState.totalClicks);
    elements.totalEarned.textContent = formatNumber(gameState.totalEarned);
    elements.clickPowerDisplay.textContent = formatNumber(calculateClickPower());
    renderUpgrades();
    updateLevelUI();
    updateRebirthButton();
    updateRebirthCount();

}

function startGame(name, isGoogle) {
    if (!name || name.trim() === '') {
        alert(currentLanguage === 'ar' ? 'الرجاء إدخال اسمك' : 'Please enter your name');
        return;
    }
    
    name = name.trim().substring(0, 20);
    const cleanName = name.replace(/[<>]/g, '');
    
    gameState.playerName = cleanName;
    gameState.isGoogleUser = isGoogle;
    
    if (isGoogle) {
        gameState.coins += CONFIG.GOOGLE_BONUS;
        gameState.totalEarned += CONFIG.GOOGLE_BONUS;
    }
    
    startGameAfterLogin();
}

function startGameAfterLogin() {
    elements.loginScreen.style.display = 'none';
    elements.gameScreen.style.display = 'block';
    elements.displayPlayerName.textContent = '👤 ' + gameState.playerName;
    
    updateClickButton();
    renderShapes();
    renderPets();
    renderRoadmap();
    renderWorlds();
    updateUI();
    saveGame();
}

function logout() {
    if (confirm(translations[currentLanguage].logoutConfirm)) {
        
        saveGame();
        
        
        if (gameState.isGoogleUser && typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.disableAutoSelect();
        }
        
        
        localStorage.removeItem('cyberClickerSave');
        
        
        window.location.reload();
    }
}

function saveGame() {
    try {
        localStorage.setItem('cyberClickerSave', JSON.stringify(gameState));
        const savedText = currentLanguage === 'ar' ? '✓ تم الحفظ!' : '✓ Saved!';
        if (elements.saveButton && elements.saveButton.querySelector('span')) {
            elements.saveButton.querySelector('span').textContent = savedText;
            elements.saveButton.style.borderColor = '#00ff00';
            elements.saveButton.style.color = '#00ff00';
            setTimeout(() => {
                elements.saveButton.querySelector('span').textContent = currentLanguage === 'ar' ? '💾 حفظ التقدم' : '💾 Save Progress';
                elements.saveButton.style.borderColor = '';
                elements.saveButton.style.color = '';
            }, 2000);
        }
    } catch (e) {
        console.error('Save failed:', e);
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem('cyberClickerSave');
        if (saved) {
            const loadedState = JSON.parse(saved);
            gameState = { ...gameState, ...loadedState };
            if (!gameState.pets) gameState.pets = [];
            if (!gameState.currentShape) gameState.currentShape = 'circle';
            if (!gameState.currentWorld) gameState.currentWorld = 'cyber';
            if (!gameState.unlockedWorlds) gameState.unlockedWorlds = ['cyber'];
            gameState.passiveIncome = calculatePassiveIncome();
            gameState.levelBonus = getLevelBonus(gameState.level);
            updateBackgroundForWorld();
            if (gameState.playerName) {
                elements.loginScreen.style.display = 'none';
                elements.gameScreen.style.display = 'block';
                elements.displayPlayerName.textContent = '👤 ' + gameState.playerName;
                updateClickButton();
                renderShapes();
                renderPets();
                renderRoadmap();
                renderWorlds();
            }
        }
    } catch (e) {
        console.error('Load failed:', e);
    }
}

function saveAudioSettings() {
    localStorage.setItem('cyberClickerAudio', JSON.stringify(audioSettings));
}

function loadAudioSettings() {
    const saved = localStorage.getItem('cyberClickerAudio');
    if (saved) {
        audioSettings = JSON.parse(saved);
        updateAudioButtons();
    }
}

function loadLanguage() {
    const saved = localStorage.getItem('cyberClickerLanguage');
    if (saved) {
        currentLanguage = saved;
        updateLanguage(saved);
    }
}

function updateAudioButtons() {
    elements.musicToggle.classList.toggle('muted', !audioSettings.musicEnabled);
    elements.musicToggle.textContent = '🎵';
    elements.soundToggle.classList.toggle('muted', !audioSettings.soundEnabled);
    elements.soundToggle.textContent = audioSettings.soundEnabled ? '🔊' : '🔇';
}

function resetGame() {
    if (confirm(translations[currentLanguage].resetConfirm)) {
        localStorage.removeItem('cyberClickerSave');
        location.reload();
    }
}

setInterval(() => {
    if (gameState.passiveIncome > 0) {
        const income = gameState.passiveIncome / 10;
        gameState.coins += income * gameState.rebirthMultiplier;
        gameState.totalEarned += income;
        addExperience(income / 100);
        updateUI();
    }
}, CONFIG.PASSIVE_INCOME_TICK);

setInterval(saveGame, CONFIG.AUTO_SAVE_INTERVAL);

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        const colors = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-purple)', 'var(--neon-blue)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particlesContainer.appendChild(particle);
    }
}


if (elements.startGameBtn) elements.startGameBtn.addEventListener('click', () => startGame(elements.playerNameInput.value, false));
if (elements.playerNameInput) elements.playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startGame(elements.playerNameInput.value, false);
});
if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', logout);
if (elements.clickButton) elements.clickButton.addEventListener('pointerdown', handleClick);
if (elements.saveButton) elements.saveButton.addEventListener('click', saveGame);
if (elements.resetButton) elements.resetButton.addEventListener('click', resetGame);
if (elements.musicToggle) elements.musicToggle.addEventListener('click', () => {
    audioManager.toggleMusic();
    updateAudioButtons();
});
if (elements.soundToggle) elements.soundToggle.addEventListener('click', () => {
    audioManager.toggleSound();
    updateAudioButtons();
});
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
});
if (elements.upgradesContainer) {
    elements.upgradesContainer.addEventListener('click', function(e) {
        const button = e.target.closest('.upgrade-btn');
        if (!button || button.classList.contains('disabled')) return;

        const upgradeKey = button.getAttribute('data-upgrade');
        const quantity = parseInt(button.getAttribute('data-quantity'));

        purchaseUpgrade(upgradeKey, quantity);
    });
}



audioManager.init();
loadAudioSettings();
loadLanguage();
loadGame();
updateUI();
createParticles();


window.onload = function() {
    setTimeout(initGoogleSignIn, 100);
};
 
function rebirth() {
    const cost = getRebirthCost();

    if (gameState.coins < cost) {
        alert("تحتاج " + formatNumber(cost) + " عملة للـ Rebirth");
        return;
    }

    if (!confirm("هل تريد عمل Rebirth؟")) return;

    gameState.rebirths++;
    gameState.rebirthMultiplier = 1 + gameState.rebirths * 0.5;

    gameState.coins = 0;
    gameState.totalEarned = 0;
    gameState.totalClicks = 0;
    gameState.clickPower = 1;
    gameState.level = 1;
    gameState.experience = 0;
    gameState.levelBonus = 1;

    for (let key in gameState.upgrades) {
        gameState.upgrades[key].count = 0;
    }

    gameState.passiveIncome = calculatePassiveIncome();

    saveGame();
    updateUI();
    updateRebirthButton();
}


document.getElementById("rebirthBtn")
    .addEventListener("click", rebirth);

 function getRebirthCost() {
return 100000 * Math.pow(10, gameState.rebirths);
}

function updateRebirthButton() {
    const btn = document.getElementById("rebirthBtn");
    if (!btn) return;

    const cost = getRebirthCost();
    btn.textContent = `Rebirth (${formatNumber(cost)} 💎)`;
}
function updateRebirthCount() {
    const el = document.getElementById("rebirthCount");
    if (!el) return;

    el.textContent = "Rebirths: " + gameState.rebirths;
}



