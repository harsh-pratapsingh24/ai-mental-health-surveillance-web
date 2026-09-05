/**
 * AegisMind — Human-Crafted Mental Health Sanctuary
 * Complete Interactive Application Controller with Ambient Soundscapes,
 * Dynamic Greetings, Gratitude Board, Empathetic Voice & Text Journaling,
 * and 1-on-1 Counselor Care.
 */

// ==============================================================================
// 1. Warm Bilingual Localization Dictionary (Empathetic & Human-Crafted)
// ==============================================================================
const I18N = {
    en: {
        tagline: "Your Quiet Sanctuary for Mental Well-Being",
        zkBadgeShort: "100% Private & Safe",
        quickTriage: "Daily Comfort Tools",
        searchPlaceholder: "Search thoughts, breathing exercises, notes...",
        tierCritical: "Heavy Load / Deep Distress",
        tierModerate: "Moderate Emotional Weight",
        tierLow: "Grounded & Peaceful",
        liveCalculated: "Live calculated reflection",
        trajectoryVelocity: "Emotional Shift",
        cognitiveRigidity: "Fixed Thinking Pattern",
        advisoryCritical: "You seem to be carrying a lot today. Please remember you don't have to carry this alone. Gentle breathing exercises and a compassionate listener are right here for you.",
        advisoryModerate: "You might be feeling some tension or fatigue. Taking a brief 5-minute pause or trying the 4-7-8 breathing exercise can bring gentle relief.",
        advisoryLow: "Your state of mind appears calm and grounded today. Take a moment to appreciate this quiet peace.",
        dualCheckinTitle: "Daily Emotional Check-In",
        dualCheckinDesc: "How is your heart feeling today?",
        sosTitle: "Free Helpline (14416)",
        rolling7DayTitle: "Your Emotional Rhythm Over the Past 7 Days",
        groundingTitle: "4-7-8 Breathing Pacer",
        vagalStim: "A Gentle Reminder:",
        vagalDesc: "Healing isn't a straight line. Having a heavy day doesn't erase any of your progress. Take one slow breath right now.",
        communityPulseTitle: "Community Circle",
        viewAll: "Explore Circle",
        checkinHeading: "Daily Emotional Check-In",
        checkinSub: "Take a few quiet moments to check in with how you are feeling inside.",
        sliderStepTitle: "1. Mood & Energy Balance",
        valenceTitle: "How does your mood feel?",
        valLow: "1: Very Heavy",
        valMid: "3: Balanced",
        valHigh: "5: Peaceful",
        arousalTitle: "How is your internal energy?",
        aroLow: "1: Exhausted",
        aroMid: "3: Steady",
        aroHigh: "5: Racing / Overstimulated",
        journalStepTitle: "2. Private Journal Entry",
        journalHelper: "Write whatever is on your heart right now. No one is grading you, and your reflections remain completely private.",
        journalPlaceholder: "What felt heavy or peaceful today? Express your thoughts freely...",
        voiceStepTitle: "3. Speak Your Mind (Voice Note)",
        micReady: "Ready",
        micRecording: "Listening gently...",
        micDone: "Voice note recorded",
        cadenceScore: "Tone Cadence",
        pitchVar: "Rhythm",
        discardVoice: "Discard",
        submitCheckinBtn: "Save My Reflection",
        evalTitle: "Reflection Summary",
        dpiScore: "Emotional Index",
        pronounLabel: "Inward Focus",
        absolutistLabel: "Fixed Thinking",
        crisisRegexHit: "We noticed expressions of deep pain. Please let us connect you with a supportive counselor.",
        clinicalRec: "Support Suggestion:",
        trajectoryHeading: "Weekly Patterns & Emotional Rhythm",
        trajectorySub: "See how your thoughts, energy, and feelings evolve over time.",
        sparklineSlope: "Emotional Curve (7 Days)",
        baselineAvg: "7-Day Average",
        currentSlope: "Weekly Shift",
        lingMarkersTitle: "Thought Reflections",
        pronounDensity: "Inward Reflection ('I', 'me', 'my')",
        pronounSub: "Higher self-focus often appears when we feel isolated or carrying burdens alone.",
        absolutistWords: "All-or-Nothing Phrasing ('never', 'always')",
        absolutistSub: "Absolutist phrasing can reflect feeling stuck in a rigid state of mind.",
        clinicalNotesTitle: "Instant Free Helplines",
        trajSummaryDesc: "Your reflections over the last 48 hours show increased stress. Try scheduling 10 minutes of screen-free downtime today.",
        forumHeading: "Anonymous Community Circle",
        forumSub: "A safe, welcoming circle to share words of encouragement with others.",
        currentAlias: "Your Warm Handle",
        forumPlaceholder: "Share words of comfort, a small victory, or what helped you through today...",
        safetyScanned: "Safe & supportive community space",
        postBtn: "Post Thought",
        counselorHeading: "Talk with a Caring Listener",
        counselorSub: "Confidential 1-on-1 counselor reviews and instant supportive sessions.",
        needHelpNow: "Need to Talk?",
        navHome: "Overview",
        navCheckin: "Daily Check-In",
        navTrajectory: "Emotional Rhythm",
        navCommunity: "Community Circle",
        navCounselor: "Care Desk",
        consentTitle: "Your Privacy & Sanctuary",
        consentSubtitle: "How AegisMind protects your private reflections",
        clause1Title: "1. Completely Confidential & Private",
        clause1Desc: "Your reflections and voice notes are processed in secure memory and never tied to your personal identity.",
        clause2Title: "2. Thoughtful Pattern Insights",
        clause2Desc: "We gently observe trends in your journal entries to help you understand your emotional changes over time.",
        clause3Title: "3. Immediate Crisis Support",
        clause3Desc: "If you ever express feeling overwhelmed or in crisis, we will immediately connect you with free national helplines and counselor care.",
        consentAccept: "Enter Sanctuary",
        sosOverlayTitle: "We are here with you",
        sosOverlaySubtitle: "You are safe. Free, confidential support is available right now.",
        pacerHeader: "4-7-8 Calming Breathing Pacer",
        startPacer: "Start Pacer",
        stopPacer: "Pause Pacer",
        breatheIn: "Breathe In Gently",
        holdBreath: "Hold Softly",
        breatheOut: "Release Slowly",
        sev1Title: "Please take a gentle moment",
        sev1Sub: "We noticed high distress in your check-in. Your well-being is what matters most.",
        sev1Desc: "A caring human is ready to listen. Please reach out to one of our free confidential helplines or connect with a counselor right now:",
        callTeleManas: "Call Tele-MANAS (14416)",
        joinLiveCounselor: "Speak with a Live Counselor",
        ackSafetyProtocol: "I am feeling safe right now • Continue",
        reportModalTitle: "Flag for Review",
        reportModalSub: "Help us keep this community kind and safe.",
        cancel: "Cancel",
        submitReport: "Submit",
        endCall: "Leave Session"
    },
    hi: {
        tagline: "मानसिक शांति एवं आत्म-देखभाल का आपका सुरक्षित स्थान",
        zkBadgeShort: "100% निजी एवं सुरक्षित",
        quickTriage: "दैनिक राहत उपकरण",
        searchPlaceholder: "विचार, श्वास पेसर और नोट्स खोजें...",
        tierCritical: "अत्यधिक तनाव / भारी मन",
        tierModerate: "मध्यम तनाव",
        tierLow: "शांत एवं संतुलित",
        liveCalculated: "सक्रिय आत्म-चिंतन",
        trajectoryVelocity: "भावनात्मक बदलाव",
        cognitiveRigidity: "कठोर विचार पैटर्न",
        advisoryCritical: "आज आप काफी भारीपन महसूस कर रहे हैं। याद रखें, आपको यह अकेले नहीं सहना है। शांत श्वास व्यायाम और एक हमदर्द साथी आपके साथ हैं।",
        advisoryModerate: "हल्की थकावट या तनाव महसूस हो सकता है। 5 मिनट का विराम लें या 4-7-8 श्वास व्यायाम करें।",
        advisoryLow: "आज आपका मन शांत और स्थिर लग रहा है। इस शांति का आनंद लें।",
        dualCheckinTitle: "दैनिक भावनात्मक चेक-इन",
        dualCheckinDesc: "आज आपका दिल कैसा महसूस कर रहा है?",
        sosTitle: "मुफ्त हेल्पलाइन (14416)",
        rolling7DayTitle: "पिछले 7 दिनों में आपकी भावनात्मक लय",
        groundingTitle: "4-7-8 श्वास पेसर",
        vagalStim: "एक प्यारा सा विचार:",
        vagalDesc: "सुधार एक सीधी रेखा नहीं है। एक भारी दिन आपकी पिछली प्रगति को कम नहीं करता। अभी एक गहरी सांस लें।",
        communityPulseTitle: "अनाम साथी समूह",
        viewAll: "मंच देखें",
        checkinHeading: "दैनिक भावनात्मक चेक-इन",
        checkinSub: "कुछ शांत पल निकालकर महसूस करें कि आपका मन कैसा है।",
        sliderStepTitle: "1. भावना व आंतरिक ऊर्जा संतुलन",
        valenceTitle: "आपकी मनोदशा कैसी है?",
        valLow: "1: बहुत भारी",
        valMid: "3: संतुलित",
        valHigh: "5: अत्यंत शांत",
        arousalTitle: "आपकी ऊर्जा का स्तर कैसा है?",
        aroLow: "1: थका हुआ",
        aroMid: "3: स्थिर",
        aroHigh: "5: अत्यधिक बेचैन",
        journalStepTitle: "2. निजी डायरी",
        journalHelper: "अपने दिल की बात बिना किसी झिझक के लिखें। यह पूरी तरह गोपनीय है।",
        journalPlaceholder: "आज क्या भारी या सुखद लगा? अपने विचार खुलकर लिखें...",
        voiceStepTitle: "3. अपनी बात बोलें (वॉयस नोट)",
        micReady: "तैयार",
        micRecording: "प्यार से सुन रहे हैं...",
        micDone: "वॉयस नोट रिकॉर्ड हुआ",
        cadenceScore: "आवाज की लय",
        pitchVar: "सुर",
        discardVoice: "हटाएं",
        submitCheckinBtn: "चिंतन सुरक्षित करें",
        evalTitle: "चिंतन सारांश",
        dpiScore: "तनाव सूचकांक",
        pronounLabel: "आंतरिक ध्यान",
        absolutistLabel: "कठोर सोच",
        crisisRegexHit: "हमने गहरे दर्द की अभिव्यक्ति महसूस की। कृपया किसी परामर्शदाता से बात करें।",
        clinicalRec: "मददगार सुझाव:",
        trajectoryHeading: "साप्ताहिक पैटर्न व भावनात्मक लय",
        trajectorySub: "देखें कि समय के साथ आपकी ऊर्जा और भावनाएँ कैसे बदलती हैं।",
        sparklineSlope: "भावनात्मक वक्र (7 दिन)",
        baselineAvg: "7-दिवसीय औसत",
        currentSlope: "साप्ताहिक बदलाव",
        lingMarkersTitle: "विचारों के पैटर्न",
        pronounDensity: "आंतरिक चिंतन ('मैं', 'मुझे', 'मेरा')",
        pronounSub: "अकेलापन या बोझ महसूस होने पर आंतरिक शब्दों का प्रयोग बढ़ जाता है।",
        absolutistWords: "कठोर शब्द ('हमेशा', 'कभी नहीं')",
        absolutistSub: "यह दर्शाता है कि मन किसी निश्चित विचार में अटका हुआ है।",
        clinicalNotesTitle: "मुफ्त हेल्पलाइन",
        trajSummaryDesc: "पिछले 48 घंटों में तनाव बढ़ा है। आज स्क्रीन से 10 मिनट दूर रहने का प्रयास करें।",
        forumHeading: "अनाम साथी समूह",
        forumSub: "एक-दूसरे को हौसला और सहानुभूति देने का सुरक्षित स्थान।",
        currentAlias: "आपका उपनाम",
        forumPlaceholder: "सहानुभूति, छोटी जीत या हौसले के शब्द साझा करें...",
        safetyScanned: "सुरक्षित व संयमित समुदाय",
        postBtn: "विचार साझा करें",
        counselorHeading: "परामर्शदाता से बात करें",
        counselorSub: "गोपनीय 1-on-1 परामर्श और तत्काल सहायता।",
        needHelpNow: "मदद चाहिए?",
        navHome: "अवलोकन",
        navCheckin: "दैनिक चेक-इन",
        navTrajectory: "भावनात्मक लय",
        navCommunity: "साथी समूह",
        navCounselor: "देखभाल डेस्क",
        consentTitle: "आपकी गोपनीयता व सुरक्षा",
        consentSubtitle: "एजिसमाइंड आपके विचारों को कैसे सुरक्षित रखता है",
        clause1Title: "1. पूर्णतः गोपनीय एवं निजी",
        clause1Desc: "आपकी डायरी और आवाज सुरक्षित मेमोरी में रहती है और कभी किसी पहचान से नहीं जुड़ती।",
        clause2Title: "2. आत्मीय पैटर्न अंतर्दृष्टि",
        clause2Desc: "हम आपके भावनात्मक बदलावों को समझने में आपकी मदद के लिए केवल प्रवृत्तियों को देखते हैं।",
        clause3Title: "3. तत्काल संकट सहायता",
        clause3Desc: "यदि आप कभी बहुत संकट महसूस करते हैं, तो हम तुरंत मुफ्त राष्ट्रीय हेल्पलाइन से जोड़ेंगे।",
        consentAccept: "प्रवेश करें",
        sosOverlayTitle: "हम आपके साथ हैं",
        sosOverlaySubtitle: "आप सुरक्षित हैं। 24/7 मुफ्त और गोपनीय सहायता तुरंत उपलब्ध है।",
        pacerHeader: "4-7-8 शांत श्वास पेसर",
        startPacer: "पेसर शुरू करें",
        stopPacer: "रोकें",
        breatheIn: "धीरे से सांस अंदर लें",
        holdBreath: "सहजता से रोकें",
        breatheOut: "धीरे-धीरे छोड़ें",
        sev1Title: "कृपया एक शांत पल लें",
        sev1Sub: "आपके चेक-इन में गहरा तनाव देखा गया। आपकी भलाई सबसे महत्वपूर्ण है।",
        sev1Desc: "एक हमदर्द साथी सुनने के लिए तैयार है। कृपया हमारी मुफ्त हेल्पलाइन से संपर्क करें:",
        callTeleManas: "टेली-मानस (14416) पर कॉल करें",
        joinLiveCounselor: "लाइव परामर्शदाता से जुड़ें",
        ackSafetyProtocol: "मैं अभी सुरक्षित महसूस कर रहा/रही हूँ • जारी रखें",
        reportModalTitle: "समीक्षा हेतु रिपोर्ट करें",
        reportModalSub: "इस समुदाय को सुरक्षित और दयालु बनाए रखने में मदद करें।",
        cancel: "रद्द करें",
        submitReport: "सबमिट करें",
        endCall: "सत्र समाप्त करें"
    }
};

// ==============================================================================
// 2. Application State Management
// ==============================================================================
const AppState = {
    lang: localStorage.getItem("aegismind_lang") || "en",
    theme: localStorage.getItem("aegismind_theme") || "light",
    consentGiven: localStorage.getItem("aegismind_consent") === "true",
    currentView: "view-home",
    userToken: "USR-8941",
    userAlias: "GentleBreeze_74",
    
    // Check-in Inputs
    valence: 3,
    arousal: 3,
    journalText: "",
    voiceCadence: null,
    voiceVariance: null,
    
    // Audio recording state
    isRecording: false,
    audioTimer: 0,
    timerInterval: null,
    
    // Breathing Pacer state
    pacerActive: false,
    pacerTimer: null,
    pacerPhase: "inhale", // 'inhale' (4s), 'hold' (7s), 'exhale' (8s)
    pacerCycleCount: 0,
    
    // Ambient Soundscape state
    audioCtx: null,
    soundscapeActive: false,
    soundscapeType: "rain", // 'rain', 'waves', 'forest', 'fire'
    soundGainNode: null,
    soundNodes: [],
    
    // Active Case in View
    selectedCaseId: "CASE-8941",
    
    // Sparkline history cache
    rollingHistory: [
        { date: "15 Sep", dpi: 0.28 },
        { date: "25 Oct", dpi: 0.32 },
        { date: "5 Nov", dpi: 0.39 },
        { date: "15 Nov", dpi: 0.44 },
        { date: "25 Nov", dpi: 0.58 },
        { date: "15 Dec", dpi: 0.72 },
        { date: "23 Dec", dpi: 0.84 }
    ]
};

// ==============================================================================
// 3. Initialization & Lifecycle
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLanguage();
    initConsent();
    initNavigation();
    initGreetingAndDate();
    initCheckInForm();
    initVoiceRecorder();
    initBreathingPacer();
    initCrisisModals();
    initCommunityForum();
    initCounselorDesk();
    initSparkline();
    initGratitudeBoard();
    initSoundscapePlayer();
    
    // Render initial Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
});

// ==============================================================================
// 4. Dynamic Greeting & Today's Date (Human-Crafted)
// ==============================================================================
function initGreetingAndDate() {
    const greetingEl = document.getElementById("dynamicGreeting");
    const dateEl = document.getElementById("currentDateDisplay");
    
    const now = new Date();
    const hour = now.getHours();
    
    let greetingText = "Welcome back, friend";
    if (hour >= 5 && hour < 12) {
        greetingText = "Good morning, friend 🌿";
    } else if (hour >= 12 && hour < 17) {
        greetingText = "Good afternoon, friend 🌤️";
    } else if (hour >= 17 && hour < 22) {
        greetingText = "Good evening, friend 🌙";
    } else {
        greetingText = "Quiet night, friend ✨";
    }
    
    if (greetingEl) greetingEl.textContent = greetingText;
    
    if (dateEl) {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString(AppState.lang === "hi" ? 'hi-IN' : 'en-US', options);
    }
}

// ==============================================================================
// 5. Web Audio Ambient Soundscapes (Rain, Ocean, Forest Breeze)
// ==============================================================================
function initSoundscapePlayer() {
    const soundPill = document.getElementById("topbarSoundPill");
    const toggleBtn = document.getElementById("btnToggleAudio");
    const dockBtn = document.getElementById("btnDockAmbient");
    
    const toggleHandler = () => {
        if (!AppState.soundscapeActive) {
            startAmbientSound();
        } else {
            stopAmbientSound();
        }
    };
    
    if (toggleBtn) toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleHandler();
    });
    
    if (soundPill) soundPill.addEventListener("click", toggleHandler);
    if (dockBtn) dockBtn.addEventListener("click", toggleHandler);
}

function startAmbientSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        if (!AppState.audioCtx) {
            AppState.audioCtx = new AudioContext();
        }
        
        if (AppState.audioCtx.state === "suspended") {
            AppState.audioCtx.resume();
        }
        
        // Generate soothing pink-noise rain simulation
        const bufferSize = 2 * AppState.audioCtx.sampleRate;
        const noiseBuffer = AppState.audioCtx.createBuffer(1, bufferSize, AppState.audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
            b6 = white * 0.115926;
        }
        
        const whiteNoise = AppState.audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        
        // Lowpass filter for soft soothing rainfall sound
        const filter = AppState.audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, AppState.audioCtx.currentTime);
        
        const gainNode = AppState.audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.01, AppState.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.35, AppState.audioCtx.currentTime + 1.5);
        
        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(AppState.audioCtx.destination);
        
        whiteNoise.start(0);
        
        AppState.soundNodes = [whiteNoise, filter];
        AppState.soundGainNode = gainNode;
        AppState.soundscapeActive = true;
        
        updateSoundUI(true);
    } catch (e) {
        console.warn("Web Audio ambient player:", e);
    }
}

function stopAmbientSound() {
    if (AppState.soundGainNode && AppState.audioCtx) {
        AppState.soundGainNode.gain.exponentialRampToValueAtTime(0.001, AppState.audioCtx.currentTime + 0.5);
        setTimeout(() => {
            AppState.soundNodes.forEach(node => {
                try { node.stop(); } catch(e){}
            });
            AppState.soundNodes = [];
            AppState.soundscapeActive = false;
            updateSoundUI(false);
        }, 500);
    } else {
        AppState.soundscapeActive = false;
        updateSoundUI(false);
    }
}

function updateSoundUI(isPlaying) {
    const soundPill = document.getElementById("topbarSoundPill");
    const playIcon = document.getElementById("soundPlayPauseIcon");
    const dockIcon = document.getElementById("dockSoundIcon");
    
    if (soundPill) {
        if (isPlaying) {
            soundPill.classList.add("playing");
        } else {
            soundPill.classList.remove("playing");
        }
    }
    
    if (playIcon) {
        playIcon.setAttribute("data-lucide", isPlaying ? "pause" : "play");
    }
    
    if (dockIcon) {
        dockIcon.setAttribute("data-lucide", isPlaying ? "volume-x" : "volume-2");
    }
    
    if (window.lucide) window.lucide.createIcons();
}

function playGentleChime(freq = 440) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.3);
    } catch(e) {}
}

// ==============================================================================
// 6. Gratitude Board & Kindness Notes
// ==============================================================================
function initGratitudeBoard() {
    const input = document.getElementById("gratitudeInput");
    const btnPin = document.getElementById("btnPinGratitude");
    const container = document.getElementById("gratitudePinsList");
    
    if (!btnPin || !input || !container) return;
    
    const addPin = () => {
        const text = input.value.trim();
        if (!text) return;
        
        const chip = document.createElement("div");
        chip.className = "gratitude-chip";
        chip.innerHTML = `
            <i data-lucide="sparkle" class="icon-xs text-purple"></i>
            <span>"${text}"</span>
        `;
        container.prepend(chip);
        input.value = "";
        
        if (window.lucide) window.lucide.createIcons();
    };
    
    btnPin.addEventListener("click", addPin);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addPin();
    });
}

// ==============================================================================
// 7. Theme & Language Controls
// ==============================================================================
function initTheme() {
    document.documentElement.setAttribute("data-theme", AppState.theme);
    updateThemeIcons();

    const toggleBtn = document.getElementById("themeToggleBtn");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            AppState.theme = AppState.theme === "dark" ? "light" : "dark";
            localStorage.setItem("aegismind_theme", AppState.theme);
            document.documentElement.setAttribute("data-theme", AppState.theme);
            updateThemeIcons();
            initSparkline();
        });
    }
}

function updateThemeIcons() {
    const sunIcon = document.getElementById("themeIconSun");
    const moonIcon = document.getElementById("themeIconMoon");
    if (!sunIcon || !moonIcon) return;
    if (AppState.theme === "dark") {
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
    } else {
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
    }
}

function initLanguage() {
    applyLanguageStrings();
    const langBtn = document.getElementById("langToggleBtn");
    const langLabel = document.getElementById("currentLangLabel");

    if (langBtn && langLabel) {
        langBtn.addEventListener("click", () => {
            AppState.lang = AppState.lang === "en" ? "hi" : "en";
            localStorage.setItem("aegismind_lang", AppState.lang);
            langLabel.textContent = AppState.lang === "en" ? "HI" : "EN";
            applyLanguageStrings();
            initGreetingAndDate();
        });
    }
}

function applyLanguageStrings() {
    const dict = I18N[AppState.lang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key]) {
            el.setAttribute("placeholder", dict[key]);
        }
    });

    updateValenceLabels();
}

// ==============================================================================
// 8. Informed Consent Protocol
// ==============================================================================
function initConsent() {
    const modal = document.getElementById("consentModal");
    const acceptBtn = document.getElementById("btnAcceptConsent");

    if (modal) {
        if (!AppState.consentGiven) {
            modal.classList.remove("hidden");
        } else {
            modal.classList.add("hidden");
        }
    }

    if (acceptBtn) {
        acceptBtn.addEventListener("click", async () => {
            AppState.consentGiven = true;
            localStorage.setItem("aegismind_consent", "true");
            if (modal) modal.classList.add("hidden");

            try {
                await fetch("/api/telemetry/consent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ consent: true })
                });
            } catch (e) {
                console.warn("Consent telemetry broadcast offline:", e);
            }
        });
    }
}

// ==============================================================================
// 9. Navigation & View Routing
// ==============================================================================
function initNavigation() {
    document.querySelectorAll(".dock-nav-btn, .topbar-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            switchView(target);
        });
    });

    const brandBtn = document.getElementById("dockBrandBtn");
    if (brandBtn) {
        brandBtn.addEventListener("click", () => switchView("view-home"));
    }

    const dockSos = document.getElementById("btnDockSos");
    if (dockSos) dockSos.addEventListener("click", openCrisisModal);

    const headerSos = document.getElementById("btnHeaderSos");
    if (headerSos) headerSos.addEventListener("click", openCrisisModal);

    const btnGoCheckin = document.getElementById("btnGoCheckin");
    if (btnGoCheckin) btnGoCheckin.addEventListener("click", () => switchView("view-checkin"));

    const btnOpenBreathingQuick = document.getElementById("btnOpenBreathingQuick");
    if (btnOpenBreathingQuick) btnOpenBreathingQuick.addEventListener("click", openCrisisModal);

    const btnQuickSos = document.getElementById("btnQuickSos");
    if (btnQuickSos) btnQuickSos.addEventListener("click", openCrisisModal);
}

function switchView(viewId) {
    document.querySelectorAll(".dashboard-view").forEach(v => v.classList.remove("active"));
    document.querySelectorAll(".dock-nav-btn").forEach(d => d.classList.remove("active"));
    document.querySelectorAll(".topbar-tab").forEach(t => t.classList.remove("active"));

    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add("active");
        AppState.currentView = viewId;
    }

    const targetDock = document.querySelector(`.dock-nav-btn[data-target="${viewId}"]`);
    if (targetDock) targetDock.classList.add("active");

    const targetTab = document.querySelector(`.topbar-tab[data-target="${viewId}"]`);
    if (targetTab) targetTab.classList.add("active");

    if (viewId === "view-trajectory") {
        renderTrajectoryChart();
    } else if (viewId === "view-counselor") {
        fetchCounselorQueue();
    } else if (viewId === "view-community") {
        fetchCommunityPosts();
    } else if (viewId === "view-home") {
        renderHomeSparkline();
    }

    const mainContainer = document.getElementById("mainContainer");
    if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: "smooth" });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// ==============================================================================
// 10. Check-In Form & Reflective Submission
// ==============================================================================
function initCheckInForm() {
    const valInput = document.getElementById("inputValence");
    const aroInput = document.getElementById("inputArousal");
    const journalTextarea = document.getElementById("journalText");
    const wordCountEl = document.getElementById("journalWordCount");
    const submitBtn = document.getElementById("btnSubmitCheckin");

    if (valInput) {
        valInput.addEventListener("input", (e) => {
            AppState.valence = parseInt(e.target.value);
            updateValenceLabels();
        });
    }

    if (aroInput) {
        aroInput.addEventListener("input", (e) => {
            AppState.arousal = parseInt(e.target.value);
            updateValenceLabels();
        });
    }

    if (journalTextarea && wordCountEl) {
        journalTextarea.addEventListener("input", (e) => {
            AppState.journalText = e.target.value;
            const words = e.target.value.trim().split(/\s+/).filter(w => w.length > 0);
            wordCountEl.textContent = `${words.length} words`;
        });
    }

    // Quick prompt chips
    document.querySelectorAll(".quick-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            const prompt = chip.getAttribute("data-prompt");
            if (journalTextarea && wordCountEl) {
                journalTextarea.value = prompt;
                AppState.journalText = prompt;
                const words = prompt.trim().split(/\s+/).filter(w => w.length > 0);
                wordCountEl.textContent = `${words.length} words`;
            }
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener("click", async () => {
            await executeCheckInTriage();
        });
    }
}

function updateValenceLabels() {
    const valValence = document.getElementById("valValenceLabel");
    const valArousal = document.getElementById("valArousalLabel");
    if (!valValence || !valArousal) return;
    const isHi = AppState.lang === "hi";

    const valenceDescriptions = isHi
        ? ["1: बहुत भारी", "2: असंतुलित", "3: संतुलित (3/5)", "4: सुखद", "5: अत्यंत शांत"]
        : ["1: Very Heavy", "2: Unsettled", "3: Balanced (3/5)", "4: Gentle Relief", "5: Peaceful"];

    const arousalDescriptions = isHi
        ? ["1: अत्यधिक थकान", "2: शांत", "3: मध्यम (3/5)", "4: ऊर्जावान", "5: अत्यधिक बेचैन"]
        : ["1: Exhausted", "2: Steady", "3: Moderate (3/5)", "4: Alert", "5: Racing / Overstimulated"];

    valValence.textContent = valenceDescriptions[AppState.valence - 1];
    valArousal.textContent = arousalDescriptions[AppState.arousal - 1];
}

async function executeCheckInTriage() {
    const submitBtn = document.getElementById("btnSubmitCheckin");
    if (!submitBtn) return;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="icon-sm spin"></i> <span>Saving Reflection...</span>`;
    if (window.lucide) window.lucide.createIcons();

    try {
        const payload = {
            valence: AppState.valence,
            arousal: AppState.arousal,
            text: AppState.journalText,
            voice_cadence: AppState.voiceCadence
        };

        const res = await fetch("/api/checkin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.status === "success") {
            displayCheckInResults(data.analysis, data.velocity);
            if (data.rolling_history) {
                AppState.rollingHistory = data.rolling_history.map(item => ({
                    date: item.date,
                    dpi: item.dpi
                }));
                initSparkline();
            }

            // Trigger Gentle Care Modal if Heavy Distress
            if (data.analysis.tier === "Critical" || data.analysis.crisis_intercept) {
                const lockModal = document.getElementById("sev1LockModal");
                if (lockModal) lockModal.classList.remove("hidden");
            }
        }
    } catch (e) {
        console.error("Checkin submission failed:", e);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="heart" class="icon-sm"></i> <span>${I18N[AppState.lang].submitCheckinBtn}</span>`;
        if (window.lucide) window.lucide.createIcons();
    }
}

function displayCheckInResults(analysis, velocity) {
    const card = document.getElementById("checkinResultCard");
    const tierBadge = document.getElementById("resultTierBadge");
    const resDpi = document.getElementById("resDpi");
    const resPronouns = document.getElementById("resPronouns");
    const resAbsolutist = document.getElementById("resAbsolutist");
    const crisisBanner = document.getElementById("resultCrisisBanner");
    const recText = document.getElementById("resultRecText");

    if (!card) return;
    card.classList.remove("hidden");
    if (resDpi) resDpi.textContent = analysis.dpi.toFixed(2);
    if (resPronouns) resPronouns.textContent = `${analysis.pronoun_density}%`;
    if (resAbsolutist) resAbsolutist.textContent = `${analysis.absolutist_ratio}%`;
    if (recText) recText.textContent = analysis.recommendation;

    if (tierBadge) {
        const tierName = analysis.tier === "Critical" ? "High Emotional Load" : (analysis.tier === "Moderate" ? "Moderate Load" : "Gentle & Grounded");
        tierBadge.textContent = tierName;
        tierBadge.className = analysis.tier === "Critical" ? "stat-pill pill-red" : (analysis.tier === "Moderate" ? "stat-pill pill-lavender" : "stat-pill pill-purple");
    }

    if (crisisBanner) {
        if (analysis.crisis_intercept) {
            crisisBanner.classList.remove("hidden");
        } else {
            crisisBanner.classList.add("hidden");
        }
    }

    const homeDpiBig = document.getElementById("homeDpiBig");
    if (homeDpiBig) homeDpiBig.textContent = `${analysis.dpi.toFixed(2)}`;
    
    const homeVelocityTag = document.getElementById("homeVelocityTag");
    if (homeVelocityTag) homeVelocityTag.textContent = `${velocity} Shift`;

    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ==============================================================================
// 11. Simulated Voice Note Journal & Waveform
// ==============================================================================
function initVoiceRecorder() {
    const recordBtn = document.getElementById("btnRecordToggle");
    const box = document.getElementById("voiceRecorderBox");
    const timerEl = document.getElementById("recordingTimer");
    const statusPill = document.getElementById("voiceStatusPill");
    const cadenceText = document.getElementById("cadenceScoreText");
    const pitchText = document.getElementById("pitchVarianceText");
    const discardBtn = document.getElementById("btnDiscardVoice");
    const micIcon = document.getElementById("recordIconMic");
    const stopIcon = document.getElementById("recordIconStop");
    const recordLabel = document.getElementById("recordBtnLabel");

    if (!recordBtn) return;

    recordBtn.addEventListener("click", () => {
        if (!AppState.isRecording) {
            // Start Recording Simulation
            AppState.isRecording = true;
            if (box) box.classList.add("voice-recording");
            if (micIcon) micIcon.classList.add("hidden");
            if (stopIcon) stopIcon.classList.remove("hidden");
            if (recordLabel) recordLabel.textContent = "Done Speaking";
            if (statusPill) statusPill.textContent = I18N[AppState.lang].micRecording;
            if (discardBtn) discardBtn.classList.remove("hidden");

            AppState.audioTimer = 0;
            if (timerEl) timerEl.textContent = "00:00";
            AppState.timerInterval = setInterval(() => {
                AppState.audioTimer++;
                const mins = String(Math.floor(AppState.audioTimer / 60)).padStart(2, "0");
                const secs = String(AppState.audioTimer % 60).padStart(2, "0");
                if (timerEl) timerEl.textContent = `${mins}:${secs}`;
            }, 1000);

        } else {
            // Stop Recording & Compute Scores
            AppState.isRecording = false;
            clearInterval(AppState.timerInterval);
            if (box) box.classList.remove("voice-recording");
            if (micIcon) micIcon.classList.remove("hidden");
            if (stopIcon) stopIcon.classList.add("hidden");
            if (recordLabel) recordLabel.textContent = "Record Another Note";
            if (statusPill) statusPill.textContent = I18N[AppState.lang].micDone;

            const baseCadence = Math.max(0.45, Math.min(0.92, 0.78 - (AppState.audioTimer * 0.02) + (AppState.valence * 0.04)));
            const pitchVariance = (12.4 + (AppState.arousal * 3.1)).toFixed(1);

            AppState.voiceCadence = parseFloat(baseCadence.toFixed(2));
            AppState.voiceVariance = parseFloat(pitchVariance);

            if (cadenceText) cadenceText.textContent = `${I18N[AppState.lang].cadenceScore}: ${AppState.voiceCadence}`;
            if (pitchText) pitchText.textContent = `${I18N[AppState.lang].pitchVar}: ${AppState.voiceVariance} Hz`;
        }
        if (window.lucide) window.lucide.createIcons();
    });

    if (discardBtn) {
        discardBtn.addEventListener("click", () => {
            AppState.isRecording = false;
            clearInterval(AppState.timerInterval);
            if (box) box.classList.remove("voice-recording");
            if (micIcon) micIcon.classList.remove("hidden");
            if (stopIcon) stopIcon.classList.add("hidden");
            if (recordLabel) recordLabel.textContent = "Record a 30s Note";
            if (statusPill) statusPill.textContent = I18N[AppState.lang].micReady;
            if (timerEl) timerEl.textContent = "00:00";
            discardBtn.classList.add("hidden");
            AppState.voiceCadence = null;
            if (cadenceText) cadenceText.textContent = `${I18N[AppState.lang].cadenceScore}: --`;
            if (pitchText) pitchText.textContent = `${I18N[AppState.lang].pitchVar}: --`;
            if (window.lucide) window.lucide.createIcons();
        });
    }
}

// ==============================================================================
// 12. Smooth Emotional Trend Curve SVG Renderer
// ==============================================================================
function initSparkline() {
    renderHomeSparkline();
    renderTrajectoryChart();
}

function renderHomeSparkline() {
    const container = document.getElementById("homeSparklineContainer");
    if (!container) return;
    const history = AppState.rollingHistory;
    const width = 800;
    const height = 130;
    const padding = 28;

    const points = history.map((item, idx) => {
        const x = padding + (idx * ((width - 2 * padding) / (history.length - 1)));
        const y = height - padding - (item.dpi * (height - 2 * padding));
        return { x, y, dpi: item.dpi, date: item.date };
    });

    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX = (p0.x + p1.x) / 2;
        pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    const lastPoint = points[points.length - 1];
    const areaD = `${pathD} L ${lastPoint.x} ${height - 6} L ${points[0].x} ${height - 6} Z`;

    const svg = `
        <svg class="svg-sparkline" viewBox="0 0 ${width} ${height}">
            <defs>
                <linearGradient id="curveGradPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.28"/>
                    <stop offset="100%" stop-color="#7C3AED" stop-opacity="0.0"/>
                </linearGradient>
            </defs>
            <path d="${areaD}" fill="url(#curveGradPurple)" />
            <path d="${pathD}" fill="none" stroke="#7C3AED" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            ${points.map((p, idx) => {
                const color = p.dpi >= 0.70 ? "#E11D48" : (p.dpi >= 0.40 ? "#F59E0B" : "#10B981");
                const isLast = idx === points.length - 1;
                return `
                    <circle cx="${p.x}" cy="${p.y}" r="${isLast ? 6 : 4}" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
                    <text x="${p.x}" y="${height - 4}" font-size="10" fill="var(--text-secondary)" text-anchor="middle" font-family="var(--font-mono)">${p.date}</text>
                    ${isLast ? `
                        <g transform="translate(${p.x - 45}, ${p.y - 34})">
                            <rect width="90" height="24" rx="12" fill="#0C0817" />
                            <text x="45" y="16" font-size="10" font-weight="bold" fill="#EDE9FE" text-anchor="middle" font-family="var(--font-mono)">${p.dpi.toFixed(2)} Load</text>
                        </g>
                    ` : ''}
                `;
            }).join("")}
        </svg>
    `;

    container.innerHTML = svg;
}

function renderTrajectoryChart() {
    const container = document.getElementById("trajectoryFullChart");
    if (!container) return;
    const history = AppState.rollingHistory;
    const width = 840;
    const height = 210;
    const padding = 34;

    const points = history.map((item, idx) => {
        const x = padding + (idx * ((width - 2 * padding) / (history.length - 1)));
        const y = height - padding - (item.dpi * (height - 2 * padding));
        return { x, y, dpi: item.dpi, date: item.date };
    });

    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX = (p0.x + p1.x) / 2;
        pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    const lastPoint = points[points.length - 1];
    const areaD = `${pathD} L ${lastPoint.x} ${height - 10} L ${points[0].x} ${height - 10} Z`;

    const svg = `
        <svg class="svg-sparkline" viewBox="0 0 ${width} ${height}">
            <defs>
                <linearGradient id="fullCurveGradPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.0"/>
                </linearGradient>
            </defs>
            <line x1="${padding}" y1="${height - padding - (0.70 * (height - 2 * padding))}" x2="${width - padding}" y2="${height - padding - (0.70 * (height - 2 * padding))}" stroke="#E11D48" stroke-dasharray="4,4" stroke-width="1.5" opacity="0.6"/>
            <line x1="${padding}" y1="${height - padding - (0.40 * (height - 2 * padding))}" x2="${width - padding}" y2="${height - padding - (0.40 * (height - 2 * padding))}" stroke="#F59E0B" stroke-dasharray="4,4" stroke-width="1.5" opacity="0.6"/>

            <path d="${areaD}" fill="url(#fullCurveGradPurple)" />
            <path d="${pathD}" fill="none" stroke="#8B5CF6" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
            ${points.map((p, idx) => {
                const color = p.dpi >= 0.70 ? "#E11D48" : (p.dpi >= 0.40 ? "#F59E0B" : "#10B981");
                const isLast = idx === points.length - 1;
                return `
                    <circle cx="${p.x}" cy="${p.y}" r="${isLast ? 6.5 : 4.5}" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
                    <text x="${p.x}" y="${height - 6}" font-size="11" fill="var(--text-secondary)" text-anchor="middle" font-family="var(--font-mono)">${p.date}</text>
                    <text x="${p.x}" y="${p.y - 10}" font-size="10" font-weight="bold" fill="${color}" text-anchor="middle" font-family="var(--font-mono)">${p.dpi.toFixed(2)}</text>
                `;
            }).join("")}
        </svg>
    `;

    container.innerHTML = svg;
}

// ==============================================================================
// 13. 4-7-8 Breathing Pacer & Crisis Modals
// ==============================================================================
function initCrisisModals() {
    const crisisModal = document.getElementById("crisisOverlayModal");
    const closeCrisisBtn = document.getElementById("btnCloseCrisisModal");

    if (closeCrisisBtn && crisisModal) {
        closeCrisisBtn.addEventListener("click", () => {
            crisisModal.classList.add("hidden");
            stopBreathingPacer();
        });
    }

    const btnSev1Ack = document.getElementById("btnSev1Acknowledge");
    if (btnSev1Ack) {
        btnSev1Ack.addEventListener("click", () => {
            const sev1Modal = document.getElementById("sev1LockModal");
            if (sev1Modal) sev1Modal.classList.add("hidden");
        });
    }

    const btnSev1Jitsi = document.getElementById("btnSev1OpenJitsi");
    if (btnSev1Jitsi) {
        btnSev1Jitsi.addEventListener("click", () => {
            const sev1Modal = document.getElementById("sev1LockModal");
            if (sev1Modal) sev1Modal.classList.add("hidden");
            openJitsiModal("CASE-8941");
        });
    }

    // Jitsi Close
    const btnCloseJitsi = document.getElementById("btnCloseJitsiModal");
    const btnEndJitsi = document.getElementById("btnEndConsultation");
    const jitsiModal = document.getElementById("jitsiModal");

    if (btnCloseJitsi && jitsiModal) {
        btnCloseJitsi.addEventListener("click", () => {
            jitsiModal.classList.add("hidden");
            const iframe = document.getElementById("jitsiIframe");
            if (iframe) iframe.src = "about:blank";
        });
    }

    if (btnEndJitsi && jitsiModal) {
        btnEndJitsi.addEventListener("click", () => {
            jitsiModal.classList.add("hidden");
            const iframe = document.getElementById("jitsiIframe");
            if (iframe) iframe.src = "about:blank";
        });
    }
}

function openCrisisModal() {
    const modal = document.getElementById("crisisOverlayModal");
    if (modal) {
        modal.classList.remove("hidden");
        startBreathingPacer();
    }
}

function initBreathingPacer() {
    const btnPacer = document.getElementById("btnStartPacer");
    if (btnPacer) {
        btnPacer.addEventListener("click", () => {
            if (AppState.pacerActive) {
                stopBreathingPacer();
            } else {
                startBreathingPacer();
            }
        });
    }
}

function startBreathingPacer() {
    AppState.pacerActive = true;
    AppState.pacerCycleCount = 0;
    
    const btnText = document.getElementById("pacerBtnText");
    const playIcon = document.getElementById("pacerPlayIcon");
    if (btnText) btnText.textContent = I18N[AppState.lang].stopPacer;
    if (playIcon) playIcon.setAttribute("data-lucide", "pause");
    if (window.lucide) window.lucide.createIcons();

    runPacerPhase("inhale", 4);
}

function stopBreathingPacer() {
    AppState.pacerActive = false;
    clearTimeout(AppState.pacerTimer);
    
    const circle = document.getElementById("pacerCircle");
    const outerGlow = document.getElementById("pacerOuterGlow");
    const insText = document.getElementById("pacerInstructionText");
    const timerText = document.getElementById("pacerTimerCount");
    const btnText = document.getElementById("pacerBtnText");
    const playIcon = document.getElementById("pacerPlayIcon");

    if (circle) circle.className = "pacer-circle-orb";
    if (outerGlow) outerGlow.className = "pacer-halo";
    if (insText) insText.textContent = I18N[AppState.lang].breatheIn;
    if (timerText) timerText.textContent = "4";
    if (btnText) btnText.textContent = I18N[AppState.lang].startPacer;
    if (playIcon) playIcon.setAttribute("data-lucide", "play");
    if (window.lucide) window.lucide.createIcons();
}

function runPacerPhase(phase, durationSecs) {
    if (!AppState.pacerActive) return;

    AppState.pacerPhase = phase;
    const circle = document.getElementById("pacerCircle");
    const outerGlow = document.getElementById("pacerOuterGlow");
    const insText = document.getElementById("pacerInstructionText");
    const timerText = document.getElementById("pacerTimerCount");
    const cycleText = document.getElementById("pacerCycleCount");

    if (phase === "inhale") {
        playGentleChime(392); // G4
        if (circle) circle.className = "pacer-circle-orb inhale";
        if (outerGlow) outerGlow.className = "pacer-halo expand";
        if (insText) insText.textContent = I18N[AppState.lang].breatheIn;
    } else if (phase === "hold") {
        playGentleChime(523.25); // C5
        if (circle) circle.className = "pacer-circle-orb hold";
        if (outerGlow) outerGlow.className = "pacer-halo hold";
        if (insText) insText.textContent = I18N[AppState.lang].holdBreath;
    } else if (phase === "exhale") {
        playGentleChime(329.63); // E4
        if (circle) circle.className = "pacer-circle-orb exhale";
        if (outerGlow) outerGlow.className = "pacer-halo shrink";
        if (insText) insText.textContent = I18N[AppState.lang].breatheOut;
    }

    let remaining = durationSecs;
    if (timerText) timerText.textContent = remaining;

    const interval = setInterval(() => {
        if (!AppState.pacerActive) {
            clearInterval(interval);
            return;
        }
        remaining--;
        if (timerText) timerText.textContent = remaining;

        if (remaining <= 0) {
            clearInterval(interval);
            if (phase === "inhale") {
                runPacerPhase("hold", 7);
            } else if (phase === "hold") {
                runPacerPhase("exhale", 8);
            } else if (phase === "exhale") {
                AppState.pacerCycleCount++;
                if (cycleText) cycleText.textContent = `Cycles: ${AppState.pacerCycleCount}`;
                runPacerPhase("inhale", 4);
            }
        }
    }, 1000);
}

// ==============================================================================
// 14. Community Forum Circle
// ==============================================================================
function initCommunityForum() {
    const refreshAliasBtn = document.getElementById("btnRefreshAlias");
    const postSubmitBtn = document.getElementById("btnSubmitPost");
    const postInput = document.getElementById("communityPostInput");

    if (refreshAliasBtn) {
        refreshAliasBtn.addEventListener("click", () => {
            const adjectives = ["Gentle", "Warm", "Quiet", "Tranquil", "Calm", "Peaceful", "Radiant", "Serene"];
            const nouns = ["River", "Breeze", "Meadow", "Sky", "Haven", "Dawn", "Willow", "Cloud"];
            const randomNum = Math.floor(10 + Math.random() * 89);
            const newAlias = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}_${randomNum}`;
            
            AppState.userAlias = newAlias;
            const aliasEl = document.getElementById("userEphemeralAlias");
            if (aliasEl) aliasEl.textContent = newAlias;
        });
    }

    if (postSubmitBtn && postInput) {
        postSubmitBtn.addEventListener("click", async () => {
            const content = postInput.value.trim();
            if (!content) return;

            try {
                postSubmitBtn.disabled = true;
                const res = await fetch("/api/community/posts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        author_alias: AppState.userAlias,
                        content: content
                    })
                });
                const data = await res.json();
                if (data.status === "success") {
                    postInput.value = "";
                    fetchCommunityPosts();
                }
            } catch (e) {
                console.error("Community post failed:", e);
            } finally {
                postSubmitBtn.disabled = false;
            }
        });
    }
}

async function fetchCommunityPosts() {
    const container = document.getElementById("communityFeedContainer");
    if (!container) return;

    try {
        const res = await fetch("/api/community/posts");
        const data = await res.json();
        if (data.status === "success") {
            renderCommunityPosts(data.posts);
        }
    } catch (e) {
        console.warn("Using sample community posts:", e);
    }
}

function renderCommunityPosts(posts) {
    const container = document.getElementById("communityFeedContainer");
    if (!container) return;

    container.innerHTML = posts.map(post => `
        <div class="community-post-card" id="post-${post.id}">
            <div class="post-header-row">
                <div class="post-author-meta">
                    <div class="avatar-circle avatar-purple">
                        <i data-lucide="user" class="icon-xs text-purple"></i>
                    </div>
                    <div>
                        <strong class="author-name">${post.author_alias}</strong>
                        <span class="post-time">${post.timestamp}</span>
                    </div>
                </div>
                <button class="btn-clean-ghost btn-flag-post" data-id="${post.id}" title="Flag for review">
                    <i data-lucide="flag" class="icon-xs"></i>
                </button>
            </div>

            <p class="post-text-content">${post.content}</p>

            <div class="post-actions-footer">
                <div class="reactions-row">
                    <button class="reaction-btn" onclick="reactPost('${post.id}', 'solidarity')">
                        <span>🫂 Sending a Hug</span>
                        <span class="r-count">${post.reactions.solidarity || 0}</span>
                    </button>
                    <button class="reaction-btn" onclick="reactPost('${post.id}', 'care')">
                        <span>💜 With You</span>
                        <span class="r-count">${post.reactions.care || 0}</span>
                    </button>
                    <button class="reaction-btn" onclick="reactPost('${post.id}', 'grounding')">
                        <span>☕ Holding Space</span>
                        <span class="r-count">${post.reactions.grounding || 0}</span>
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".btn-flag-post").forEach(btn => {
        btn.addEventListener("click", () => {
            const reportModal = document.getElementById("reportModal");
            if (reportModal) reportModal.classList.remove("hidden");
        });
    });

    const btnCancelReport = document.getElementById("btnCancelReport");
    const btnConfirmReport = document.getElementById("btnConfirmReport");
    const reportModal = document.getElementById("reportModal");

    if (btnCancelReport && reportModal) {
        btnCancelReport.onclick = () => reportModal.classList.add("hidden");
    }
    if (btnConfirmReport && reportModal) {
        btnConfirmReport.onclick = () => {
            reportModal.classList.add("hidden");
            alert("Thank you. Our moderation team will review this post.");
        };
    }

    if (window.lucide) window.lucide.createIcons();
}

window.reactPost = async function(postId, reactionType) {
    try {
        const res = await fetch(`/api/community/posts/${postId}/react`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: reactionType })
        });
        const data = await res.json();
        if (data.status === "success") {
            fetchCommunityPosts();
        }
    } catch (e) {
        console.error("Reaction failed:", e);
    }
};

// ==============================================================================
// 15. Counselor Desk & Live Video Launcher
// ==============================================================================
function initCounselorDesk() {
    // Loaded upon tab activation
}

async function fetchCounselorQueue() {
    const container = document.getElementById("counselorQueueContainer");
    if (!container) return;

    try {
        const res = await fetch("/api/cases");
        const data = await res.json();
        if (data.status === "success") {
            renderCounselorCases(data.cases);
        }
    } catch (e) {
        console.warn("Counselor cases error:", e);
    }
}

function renderCounselorCases(cases) {
    const container = document.getElementById("counselorQueueContainer");
    if (!container) return;

    container.innerHTML = cases.map(c => {
        const isCritical = c.tier === "Critical";
        const badgeClass = isCritical ? "pill-red" : (c.tier === "Moderate" ? "pill-lavender" : "pill-purple");
        const tierName = isCritical ? "High Emotional Load" : (c.tier === "Moderate" ? "Moderate Load" : "Gentle & Grounded");
        return `
            <div class="counselor-case-card ${isCritical ? 'case-critical' : ''}">
                <div class="case-header-row">
                    <div>
                        <span class="case-id-badge">${c.id}</span>
                        <span class="stat-pill ${badgeClass}">${tierName}</span>
                    </div>
                    <span class="case-time-text">${c.timestamp}</span>
                </div>

                <div class="case-metrics-bar">
                    <div class="cm-item">
                        <span class="cm-val">${c.dpi.toFixed(2)}</span>
                        <span class="cm-lbl">Index</span>
                    </div>
                    <div class="cm-item">
                        <span class="cm-val text-lavender">${c.pronoun_density}%</span>
                        <span class="cm-lbl">Inward Words</span>
                    </div>
                    <div class="cm-item">
                        <span class="cm-val text-amber">${c.absolutist_ratio}%</span>
                        <span class="cm-lbl">Fixed Words</span>
                    </div>
                </div>

                <div class="case-journal-preview">
                    <strong>Journal Snippet:</strong>
                    <p>"${c.recent_text}"</p>
                </div>

                <div class="case-actions-row">
                    <button class="btn-primary-sm" onclick="openJitsiModal('${c.id}')">
                        <i data-lucide="video" class="icon-xs"></i>
                        <span>Start 1-on-1 Room</span>
                    </button>
                    <a href="tel:14416" class="btn-danger-sm">
                        <i data-lucide="phone" class="icon-xs"></i>
                        <span>Tele-MANAS</span>
                    </a>
                </div>
            </div>
        `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
}

window.openJitsiModal = function(caseId) {
    const jitsiModal = document.getElementById("jitsiModal");
    const iframe = document.getElementById("jitsiIframe");
    const titleEl = document.getElementById("jitsiModalTitle");
    const subEl = document.getElementById("jitsiModalSubtitle");

    if (titleEl) titleEl.textContent = `Confidential 1-on-1 Session (${caseId})`;
    if (subEl) subEl.textContent = `Encrypted Private Care Room • AegisMind Sanctuary`;

    if (iframe) {
        const roomName = `AegisMind-Care-${caseId.replace(/[^a-zA-Z0-9]/g, "")}`;
        iframe.src = `https://meet.jit.si/${roomName}#config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=false`;
    }

    if (jitsiModal) {
        jitsiModal.classList.remove("hidden");
    }
};
