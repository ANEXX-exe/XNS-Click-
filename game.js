const GOOGLE_CLIENT_ID = "890485442762-9ch63tb0ig9lu52h30h9g6o89fgohh92.apps.googleusercontent.com";
const CONFIG = {
    GOOGLE_BONUS: 1000,
    AUTO_SAVE_INTERVAL: 30000,
    PASSIVE_INCOME_TICK: 100
};

let gameState = {
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
    currentShape: 'circle',
    pets: [],
    upgrades: {
        autoClicker: { count: 0, baseCost: 15, baseIncome: 1 },
        megaMiner: { count: 0, baseCost: 150, baseIncome: 8 },
        quantumProcessor: { count: 0, baseCost: 1500, baseIncome: 40 },
        aiDataCenter: { count: 0, baseCost: 15000, baseIncome: 150 },
        neuralNetwork: { count: 0, baseCost: 150000, baseIncome: 800 },
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
            25: 'بطل', 30: 'سيد', 40: 'إمبراطور', 50: 'إله السايبر', 100: 'المطلق'
        },
        upgrades: {
            autoClicker: { name: 'نقرة تلقائية', description: 'ينقر تلقائياً كل ثانية' },
            megaMiner: { name: 'منقب ضخم', description: 'عامل تعدين قوي للغاية' },
            quantumProcessor: { name: 'معالج كمومي', description: 'تقنية كمومية متطورة' },
            aiDataCenter: { name: 'مركز بيانات AI', description: 'ذكاء اصطناعي يعمل 24/7' },
            neuralNetwork: { name: 'شبكة عصبية', description: 'شبكة ذكاء اصطناعي متقدمة' },
            clickMultiplier: { name: 'مضاعف النقرات', description: 'يضاعف قوة كل نقرة ×2' }
        },
        perSecond: 'ثانية/', owned: 'مملوك:', level: 'مستوى:',
        resetConfirm: 'هل أنت متأكد من إعادة تعيين كل التقدم؟',
        shapes: 'الأشكال', pets: 'الحيوانات الأليفة', roadmap: 'مسار المستويات'
    },
    en: {
        levelNames: {
            1: 'Beginner', 5: 'Apprentice', 10: 'Expert', 15: 'Professional', 20: 'Legend',
            25: 'Champion', 30: 'Master', 40: 'Emperor', 50: 'Cyber God', 100: 'Absolute'
        },
        upgrades: {
            autoClicker: { name: 'Auto Clicker', description: 'Clicks automatically every second' },
            megaMiner: { name: 'Mega Miner', description: 'Extremely powerful mining worker' },
            quantumProcessor: { name: 'Quantum Processor', description: 'Advanced quantum technology' },
            aiDataCenter: { name: 'AI Data Center', description: 'Artificial intelligence working 24/7' },
            neuralNetwork: { name: 'Neural Network', description: 'Advanced AI neural network' },
            clickMultiplier: { name: 'Click Multiplier', description: 'Doubles click power ×2' }
        },
        perSecond: '/second', owned: 'Owned:', level: 'Level:',
        resetConfirm: 'Are you sure you want to reset all progress?',
        shapes: 'Shapes', pets: 'Pets', roadmap: 'Level Roadmap'
    }
};

const upgradeDefinitions = {
    autoClicker: { emoji: '🖱️', type: 'passive' },
    megaMiner: { emoji: '⛏️', type: 'passive' },
    quantumProcessor: { emoji: '⚛️', type: 'passive' },
    aiDataCenter: { emoji: '🏢', type: 'passive' },
    neuralNetwork: { emoji: '🧠', type: 'passive' },
    clickMultiplier: { emoji: '💪', type: 'multiplier' }
};

const shapeDefinitions = {
    circle: { emoji: '⭕', unlockLevel: 1, bonus: 1, name_ar: 'دائرة', name_en: 'Circle' },
    square: { emoji: '🟦', unlockLevel: 5, bonus: 1.2, name_ar: 'مربع', name_en: 'Square' },
    star: { emoji: '⭐', unlockLevel: 10, bonus: 1.5, name_ar: 'نجمة', name_en: 'Star' },
    diamond: { emoji: '💠', unlockLevel: 15, bonus: 2, name_ar: 'ماسة', name_en: 'Diamond' },
    heart: { emoji: '💖', unlockLevel: 20, bonus: 2.5, name_ar: 'قلب', name_en: 'Heart' },
    fire: { emoji: '🔥', unlockLevel: 25, bonus: 3, name_ar: 'نار', name_en: 'Fire' },
    lightning: { emoji: '⚡', unlockLevel: 30, bonus: 4, name_ar: 'برق', name_en: 'Lightning' }
};

const petDefinitions = {
    cat: { emoji: '🐱', unlockLevel: 8, bonus: 0.1, name_ar: 'قطة سايبر', name_en: 'Cyber Cat', description_ar: 'تجمع 10% إضافية', description_en: 'Collects 10% extra' },
    dog: { emoji: '🐕', unlockLevel: 12, bonus: 0.15, name_ar: 'كلب رقمي', name_en: 'Digital Dog', description_ar: 'تجمع 15% إضافية', description_en: 'Collects 15% extra' },
    dragon: { emoji: '🐉', unlockLevel: 18, bonus: 0.25, name_ar: 'تنين كمومي', name_en: 'Quantum Dragon', description_ar: 'تجمع 25% إضافية', description_en: 'Collects 25% extra' },
    robot: { emoji: '🤖', unlockLevel: 25, bonus: 0.35, name_ar: 'روبوت AI', name_en: 'AI Robot', description_ar: 'تجمع 35% إضافية', description_en: 'Collects 35% extra' },
    alien: { emoji: '👽', unlockLevel: 35, bonus: 0.5, name_ar: 'فضائي متطور', name_en: 'Advanced Alien', description_ar: 'تجمع 50% إضافية', description_en: 'Collects 50% extra' }
};

const levelRewards = {
    3: { type: 'coins', amount: 500, name_ar: '500 عملة', name_en: '500 Coins' },
    5: { type: 'shape', item: 'square', name_ar: 'شكل مربع', name_en: 'Square Shape' },
    8: { type: 'pet', item: 'cat', name_ar: 'قطة سايبر', name_en: 'Cyber Cat' },
    10: { type: 'shape', item: 'star', name_ar: 'شكل نجمة', name_en: 'Star Shape' },
    12: { type: 'pet', item: 'dog', name_ar: 'كلب رقمي', name_en: 'Digital Dog' },
    15: { type: 'shape', item: 'diamond', name_ar: 'شكل ماسة', name_en: 'Diamond Shape' },
    18: { type: 'pet', item: 'dragon', name_ar: 'تنين كمومي', name_en: 'Quantum Dragon' },
    20: { type: 'shape', item: 'heart', name_ar: 'شكل قلب', name_en: 'Heart Shape' },
    22: { type: 'coins', amount: 10000, name_ar: '10,000 عملة', name_en: '10,000 Coins' },
    25: { type: 'shape', item: 'fire', name_ar: 'شكل نار', name_en: 'Fire Shape' },
    26: { type: 'pet', item: 'robot', name_ar: 'روبوت AI', name_en: 'AI Robot' },
    30: { type: 'shape', item: 'lightning', name_ar: 'شكل برق', name_en: 'Lightning Shape' },
    35: { type: 'pet', item: 'alien', name_ar: 'فضائي متطور', name_en: 'Advanced Alien' },
    40: { type: 'coins', amount: 50000, name_ar: '50,000 عملة', name_en: '50,000 Coins' },
    50: { type: 'coins', amount: 100000, name_ar: '100,000 عملة', name_en: '100,000 Coins' }
};

function formatNumber(num) {
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

function calculateCost(upgrade) {
    return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
}

function getShapeBonus() {
    const shape = shapeDefinitions[gameState.currentShape];
    return shape ? shape.bonus : 1;
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
    return gameState.clickPower * Math.pow(2, multiplier) * gameState.levelBonus * getShapeBonus() * getPetsBonus();
}

function calculatePassiveIncome() {
    let total = 0;
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        if (upgradeDefinitions[key].type === 'passive') {
            total += upgrade.count * upgrade.baseIncome * gameState.levelBonus;
        }
    }
    return total * getPetsBonus();
}

function updateBackgroundForLevel(level) {
    const body = document.body;
    body.className = '';
    if (level <= 10) body.classList.add('level-1-10');
    else if (level <= 20) body.classList.add('level-11-20');
    else if (level <= 30) body.classList.add('level-21-30');
    else if (level <= 40) body.classList.add('level-31-40');
    else if (level <= 50) body.classList.add('level-41-50');
    else body.classList.add('level-51-plus');
}

function updateLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-ar]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    updateUI();
    renderShapes();
    renderPets();
    renderRoadmap();
    localStorage.setItem('cyberClickerLanguage', lang);
}

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.musicGainNode = null;
        this.soundGainNode = null;
        this.init();
    }
    
    init() {
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.musicGainNode = this.audioContext.createGain();
                this.soundGainNode = this.audioContext.createGain();
                this.musicGainNode.connect(this.audioContext.destination);
                this.soundGainNode.connect(this.audioContext.destination);
                this.musicGainNode.gain.value = audioSettings.musicEnabled ? 0.15 : 0;
                this.soundGainNode.gain.value = audioSettings.soundEnabled ? 0.3 : 0;
                this.startBackgroundMusic();
            }
        }, { once: false });
    }
    
    startBackgroundMusic() {
        if (!this.audioContext) return;
        const notes = [
            { freq: 261.63, time: 0 }, { freq: 329.63, time: 2 }, { freq: 392.00, time: 4 },
            { freq: 329.63, time: 6 }, { freq: 293.66, time: 8 }, { freq: 261.63, time: 10 },
            { freq: 246.94, time: 12 }, { freq: 261.63, time: 14 }
        ];
        const playMelody = (startTime) => {
            notes.forEach(note => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                const filter = this.audioContext.createBiquadFilter();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(note.freq, startTime + note.time);
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(800, startTime + note.time);
                filter.Q.setValueAtTime(1, startTime + note.time);
                gainNode.gain.setValueAtTime(0, startTime + note.time);
                gainNode.gain.linearRampToValueAtTime(0.08, startTime + note.time + 0.1);
                gainNode.gain.linearRampToValueAtTime(0, startTime + note.time + 1.8);
                oscillator.connect(filter);
                filter.connect(gainNode);
                gainNode.connect(this.musicGainNode);
                oscillator.start(startTime + note.time);
                oscillator.stop(startTime + note.time + 2);
            });
        };
        const createPad = () => {
            const osc1 = this.audioContext.createOscillator();
            const osc2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            osc1.type = osc2.type = 'sine';
            osc1.frequency.setValueAtTime(130.81, this.audioContext.currentTime);
            osc2.frequency.setValueAtTime(196.00, this.audioContext.currentTime);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(600, this.audioContext.currentTime);
            filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.03, this.audioContext.currentTime + 3);
            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.musicGainNode);
            osc1.start();
            osc2.start();
        };
        createPad();
        const loopMelody = () => {
            playMelody(this.audioContext.currentTime);
            setTimeout(loopMelody, 16000);
        };
        loopMelody();
    }
    
    playClickSound() {
        if (!this.audioContext || !audioSettings.soundEnabled) return;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.soundGainNode);
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }
    
    playUpgradeSound() {
        if (!this.audioContext || !audioSettings.soundEnabled) return;
        [0, 0.1, 0.2].forEach((time, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime([523.25, 659.25, 783.99][i], this.audioContext.currentTime + time);
            gain.gain.setValueAtTime(0.15, this.audioContext.currentTime + time);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + time + 0.3);
            osc.connect(gain);
            gain.connect(this.soundGainNode);
            osc.start(this.audioContext.currentTime + time);
            osc.stop(this.audioContext.currentTime + time + 0.3);
        });
    }
    
    playLevelUpSound() {
        if (!this.audioContext || !audioSettings.soundEnabled) return;
        [523.25, 587.33, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioContext.currentTime + i * 0.1);
            gain.gain.setValueAtTime(0.2, this.audioContext.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + i * 0.1 + 0.3);
            osc.connect(gain);
            gain.connect(this.soundGainNode);
            osc.start(this.audioContext.currentTime + i * 0.1);
            osc.stop(this.audioContext.currentTime + i * 0.1 + 0.3);
        });
    }
    
    toggleMusic() {
        audioSettings.musicEnabled = !audioSettings.musicEnabled;
        if (this.musicGainNode) {
            this.musicGainNode.gain.setValueAtTime(audioSettings.musicEnabled ? 0.15 : 0, this.audioContext.currentTime);
        }
        saveAudioSettings();
    }
    
    toggleSound() {
        audioSettings.soundEnabled = !audioSettings.soundEnabled;
        saveAudioSettings();
    }
}

const audioManager = new AudioManager();

const elements = {
    loginScreen: document.getElementById('loginScreen'),
    gameScreen: document.getElementById('gameScreen'),
    playerNameInput: document.getElementById('playerName'),
    startGameBtn: document.getElementById('startGameBtn'),
    googleLoginBtn: document.getElementById('googleLoginBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    displayPlayerName: document.getElementById('displayPlayerName'),
    clickButton: document.getElementById('clickButton'),
    coinCount: document.getElementById('coinCount'),
    perClick: document.getElementById('perClick'),
    perSecond: document.getElementById('perSecond'),
    totalClicks: document.getElementById('totalClicks'),
    totalEarned: document.getElementById('totalEarned'),
    clickPowerDisplay: document.getElementById('clickPowerDisplay'),
    upgradesContainer: document.getElementById('upgradesContainer'),
    shapesContainer: document.getElementById('shapesContainer'),
    petsContainer: document.getElementById('petsContainer'),
    roadmapContainer: document.getElementById('roadmapContainer'),
    saveButton: document.getElementById('saveButton'),
    resetButton: document.getElementById('resetButton'),
    levelNumber: document.getElementById('levelNumber'),
    levelName: document.getElementById('levelName'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    levelBonus: document.getElementById('levelBonus'),
    levelUpNotification: document.getElementById('levelUpNotification'),
    musicToggle: document.getElementById('musicToggle'),
    soundToggle: document.getElementById('soundToggle')
};

function startGame(playerName, isGoogleUser = false) {
    if (!playerName || playerName.trim() === '') {
        alert(currentLanguage === 'ar' ? 'الرجاء إدخال اسمك!' : 'Please enter your name!');
        return;
    }
    gameState.playerName = playerName.trim();
    gameState.isGoogleUser = isGoogleUser;
    if (isGoogleUser) {
        gameState.coins += CONFIG.GOOGLE_BONUS;
        gameState.totalEarned += CONFIG.GOOGLE_BONUS;
    }
    elements.loginScreen.style.display = 'none';
    elements.gameScreen.style.display = 'block';
    elements.displayPlayerName.textContent = '👤 ' + gameState.playerName;
    saveGame();
    updateUI();
    renderShapes();
    renderPets();
    renderRoadmap();
}

function logout() {
    if (confirm(currentLanguage === 'ar' ? 'هل أنت متأكد من تسجيل الخروج؟' : 'Are you sure you want to logout?')) {
        saveGame();
        location.reload();
    }
}

function handleGoogleLogin() {
    startGame("Google User", true);
}

function checkLevelRewards(level) {
    if (levelRewards[level]) {
        const reward = levelRewards[level];
        if (reward.type === 'coins') {
            gameState.coins += reward.amount;
            gameState.totalEarned += reward.amount;
        } else if (reward.type === 'pet' && !gameState.pets.includes(reward.item)) {
            gameState.pets.push(reward.item);
        }
        renderShapes();
        renderPets();
        renderRoadmap();
    }
}

function addExperience(amount) {
    gameState.experience += amount;
    const requiredExp = getExpForLevel(gameState.level);
    if (gameState.experience >= requiredExp) {
        gameState.experience -= requiredExp;
        gameState.level++;
        gameState.levelBonus = getLevelBonus(gameState.level);
        gameState.passiveIncome = calculatePassiveIncome();
        checkLevelRewards(gameState.level);
        updateBackgroundForLevel(gameState.level);
        showLevelUpNotification();
        audioManager.playLevelUpSound();
    }
    updateLevelUI();
}

function updateLevelUI() {
    elements.levelNumber.textContent = gameState.level;
    elements.levelName.textContent = getLevelName(gameState.level);
    elements.levelBonus.textContent = '×' + gameState.levelBonus.toFixed(1);
    const requiredExp = getExpForLevel(gameState.level);
    const progress = (gameState.experience / requiredExp) * 100;
    elements.progressBar.style.width = progress + '%';
    elements.progressText.textContent = `${formatNumber(gameState.experience)} / ${formatNumber(requiredExp)}`;
}

function showLevelUpNotification() {
    const notification = elements.levelUpNotification;
    document.getElementById('newLevelNumber').textContent = gameState.level;
    document.getElementById('levelUpBonus').textContent = '×' + gameState.levelBonus.toFixed(1) + ' ' + (currentLanguage === 'ar' ? 'مضاعف!' : 'Multiplier!');
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

function handleClick(e) {
    const power = calculateClickPower();
    gameState.coins += power;
    gameState.totalEarned += power;
    gameState.totalClicks++;
    addExperience(1);
    elements.clickButton.classList.add('clicking');
    setTimeout(() => elements.clickButton.classList.remove('clicking'), 300);
    createFloatingNumber(e.clientX, e.clientY, '+' + formatNumber(power));
    audioManager.playClickSound();
    updateUI();
}

function createFloatingNumber(x, y, text) {
    const floatingNum = document.createElement('div');
    floatingNum.className = 'floating-number';
    floatingNum.textContent = text;
    floatingNum.style.left = x + 'px';
    floatingNum.style.top = y + 'px';
    document.body.appendChild(floatingNum);
    setTimeout(() => floatingNum.remove(), 1500);
}

function purchaseUpgrade(upgradeKey) {
    const upgrade = gameState.upgrades[upgradeKey];
    const cost = calculateCost(upgrade);

    if (gameState.coins < cost) return; 

    gameState.coins -= cost;
    upgrade.count++;

    gameState.passiveIncome = calculatePassiveIncome();
    addExperience(Math.floor(cost / 10));

    audioManager.playUpgradeSound();
    updateUI();
}


function selectShape(shapeKey) {
    if (shapeDefinitions[shapeKey].unlockLevel <= gameState.level) {
        gameState.currentShape = shapeKey;
        updateClickButton();
        renderShapes();
        updateUI();
        saveGame();
    }
}

function updateClickButton() {
    const shape = shapeDefinitions[gameState.currentShape];
    if (shape) {
        const buttonText = elements.clickButton.querySelector('.click-text');
        if (buttonText) buttonText.textContent = shape.emoji;
    }
}

function renderShapes() {
    if (!elements.shapesContainer) return;
    elements.shapesContainer.innerHTML = '';
    for (let key in shapeDefinitions) {
        const shape = shapeDefinitions[key];
        const isUnlocked = gameState.level >= shape.unlockLevel;
        const isActive = gameState.currentShape === key;
        const shapeDiv = document.createElement('div');
        shapeDiv.className = `shape-item ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`;
        shapeDiv.innerHTML = `
            <div class="shape-emoji">${shape.emoji}</div>
            <div class="shape-name">${currentLanguage === 'ar' ? shape.name_ar : shape.name_en}</div>
            <div class="shape-bonus">×${shape.bonus}</div>
            ${!isUnlocked ? `<div class="shape-lock">🔒 ${currentLanguage === 'ar' ? 'مستوى' : 'Level'} ${shape.unlockLevel}</div>` : ''}
        `;
        if (isUnlocked) shapeDiv.addEventListener('click', () => selectShape(key));
        elements.shapesContainer.appendChild(shapeDiv);
    }
}

function renderPets() {
    if (!elements.petsContainer) return;
    elements.petsContainer.innerHTML = '';
    for (let key in petDefinitions) {
        const pet = petDefinitions[key];
        const isUnlocked = gameState.pets.includes(key);
        const petDiv = document.createElement('div');
        petDiv.className = `pet-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        petDiv.innerHTML = `
            <div class="pet-emoji">${isUnlocked ? pet.emoji : '❓'}</div>
            <div class="pet-info">
                <div class="pet-name">${currentLanguage === 'ar' ? pet.name_ar : pet.name_en}</div>
                <div class="pet-description">${currentLanguage === 'ar' ? pet.description_ar : pet.description_en}</div>
                ${!isUnlocked ? `<div class="pet-unlock">🔒 ${currentLanguage === 'ar' ? 'يفتح في مستوى' : 'Unlocks at level'} ${pet.unlockLevel}</div>` : ''}
            </div>
        `;
        elements.petsContainer.appendChild(petDiv);
    }
}

function renderRoadmap() {
    if (!elements.roadmapContainer) return;
    elements.roadmapContainer.innerHTML = '';
    const nextRewards = Object.keys(levelRewards).map(Number).sort((a, b) => a - b).filter(level => level > gameState.level).slice(0, 5);
    nextRewards.forEach(level => {
        const reward = levelRewards[level];
        const roadmapItem = document.createElement('div');
        roadmapItem.className = 'roadmap-item';
        let emoji = '🎁';
        if (reward.type === 'coins') emoji = '💎';
        else if (reward.type === 'shape') emoji = shapeDefinitions[reward.item].emoji;
        else if (reward.type === 'pet') emoji = petDefinitions[reward.item].emoji;
        roadmapItem.innerHTML = `
            <div class="roadmap-level">${currentLanguage === 'ar' ? 'مستوى' : 'Level'} ${level}</div>
            <div class="roadmap-reward">
                <span class="roadmap-emoji">${emoji}</span>
                <span class="roadmap-name">${currentLanguage === 'ar' ? reward.name_ar : reward.name_en}</span>
            </div>
        `;
        elements.roadmapContainer.appendChild(roadmapItem);
    });
    if (nextRewards.length === 0) {
        elements.roadmapContainer.innerHTML = `<div class="roadmap-empty">${currentLanguage === 'ar' ? '🎉 لقد فتحت جميع الجوائز المتاحة!' : '🎉 You\'ve unlocked all available rewards!'}</div>`;
    }
}

function renderUpgrades() {
    elements.upgradesContainer.innerHTML = '';
    for (let key in upgradeDefinitions) {
        const def = upgradeDefinitions[key];
        const upgrade = gameState.upgrades[key];
        const cost = calculateCost(upgrade);
        const canAfford = gameState.coins >= cost;
        const trans = translations[currentLanguage].upgrades[key];
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
                <span class="upgrade-stat">×2 ${currentLanguage === 'ar' ? 'قوة الضغطة' : 'Click Power'}</span>
                <span class="upgrade-count">${translations[currentLanguage].level} ${upgrade.count}</span>
            `;
        }
        upgradeDiv.innerHTML = `
    <div class="upgrade-info">
        <div class="upgrade-name">${def.emoji} ${trans.name}</div>
        <div class="upgrade-description">${trans.description}</div>
        <div class="upgrade-stats">${statsHTML}</div>
    </div>
    <button class="upgrade-button"  
            onclick="purchaseUpgrade('${key}')">
        ${formatNumber(cost)} 💎
    </button>
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
}

function saveGame() {
    localStorage.setItem('cyberClickerSave', JSON.stringify(gameState));
    const savedText = currentLanguage === 'ar' ? '✓ تم الحفظ!' : '✓ Saved!';
    elements.saveButton.textContent = savedText;
    elements.saveButton.style.borderColor = '#00ff00';
    elements.saveButton.style.color = '#00ff00';
    setTimeout(() => {
        elements.saveButton.querySelector('span').textContent = currentLanguage === 'ar' ? '💾 حفظ التقدم' : '💾 Save Progress';
        elements.saveButton.style.borderColor = '';
        elements.saveButton.style.color = '';
    }, 2000);
}

function loadGame() {
    const saved = localStorage.getItem('cyberClickerSave');
    if (saved) {
        const loadedState = JSON.parse(saved);
        gameState = { ...gameState, ...loadedState };
        if (!gameState.pets) gameState.pets = [];
        if (!gameState.currentShape) gameState.currentShape = 'circle';
        gameState.passiveIncome = calculatePassiveIncome();
        gameState.levelBonus = getLevelBonus(gameState.level);
        updateBackgroundForLevel(gameState.level);
        if (gameState.playerName) {
            elements.loginScreen.style.display = 'none';
            elements.gameScreen.style.display = 'block';
            elements.displayPlayerName.textContent = '👤 ' + gameState.playerName;
            updateClickButton();
            renderShapes();
            renderPets();
            renderRoadmap();
        }
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
        gameState.coins += income;
        gameState.totalEarned += income;
        addExperience(income / 100);
        updateUI();
    }
}, CONFIG.PASSIVE_INCOME_TICK);

setInterval(saveGame, CONFIG.AUTO_SAVE_INTERVAL);

function createParticles() {
    const particlesContainer = document.getElementById('particles');
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

elements.startGameBtn.addEventListener('click', () => startGame(elements.playerNameInput.value, false));
elements.playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startGame(elements.playerNameInput.value, false);
});
elements.googleLoginBtn.addEventListener('click', handleGoogleLogin);
elements.logoutBtn.addEventListener('click', logout);
elements.clickButton.addEventListener('click', handleClick);
elements.saveButton.addEventListener('click', saveGame);
elements.resetButton.addEventListener('click', resetGame);
elements.musicToggle.addEventListener('click', () => {
    audioManager.toggleMusic();
    updateAudioButtons();
});
elements.soundToggle.addEventListener('click', () => {
    audioManager.toggleSound();
    updateAudioButtons();
});
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
});

loadAudioSettings();
loadLanguage();
loadGame();
updateUI();
createParticles();
