/**
 * Aashraya — User-Centric Mental Health & Recovery Portal
 * Complete JavaScript Application Logic
 */

// ==========================================
// 1. Initial State & User Profile
// ==========================================
const STATE = {
  portalRole: 'user', // 'user' (Survivor Portal) | 'counselor' (Counselor Triage View)
  userTab: 'home',    // 'home' | 'checkin' | 'trends' | 'care' | 'profile'
  theme: 'light',
  
  // User / Survivor Profile
  userName: 'Meera',
  streakCount: 5,
  userLanguage: 'English',
  notificationTime: '09:00',
  
  // Deterministic Chat Check-in State
  chatMessages: [
    {
      id: 'init',
      sender: 'bot',
      text: 'Hey Meera, how are you feeling today? Take all the time you need.',
      time: 'Just now'
    }
  ],
  chatStep: 1, // 1 = opening reply, 2 = closing
  isRecordingVoice: false,
  isCheckinCompleted: false,

  // 4-7-8 Breathing State
  isBreathingActive: false,
  breathingPhase: 'inhale', // 'inhale' | 'hold' | 'exhale'
  breathingSeconds: 4,
  breathingInterval: null,

  // Trends & Check-In History for Meera
  userLogs: [
    { date: '08/28', fullDate: '2026-08-28', moodScore: 7, riskScore: 35, riskTier: 'low', summary: 'Felt relatively peaceful after attending morning community tea.' },
    { date: '08/30', fullDate: '2026-08-30', moodScore: 5, riskScore: 52, riskTier: 'medium', summary: 'Mentioned restlessness, difficulty sleeping, feeling isolated.' },
    { date: '09/02', fullDate: '2026-09-02', moodScore: 4, riskScore: 68, riskTier: 'medium', summary: 'Reported heightened anxiety and physical tension.' },
    { date: '09/04', fullDate: '2026-09-04', moodScore: 3, riskScore: 84, riskTier: 'high', summary: 'Severe distress trigger. Expressed fear and feeling unsafe.' }
  ],

  // Counselor Triage Mirror (For authorized counselor view)
  counselorSelectedCase: 'CASE-7821',
  counselorTab: 'cases',
  counselorNotes: 'Survivor reported recurring acute panic episodes and sleeplessness following community disruption. Needs urgent check-in and trauma-informed grounding follow-up.'
};

// ==========================================
// 2. Part 3: Deterministic Safe Chatbot Engine
// ==========================================
const SCRIPTED_RESPONSES = {
  low: [
    {
      reply: "Good to hear! Anything on your mind or something gentle you're looking forward to today?",
      chips: ["Just resting", "Had a peaceful walk", "Feeling steady"]
    },
    {
      reply: "Glad to hear things feel steady today. Taking a few moments for yourself can nurture that calm rhythm.",
      chips: ["Enjoyed some tea", "Spent time with family", "Taking it slow"]
    }
  ],
  medium: [
    {
      reply: "That sounds tough, and it's completely okay to feel this way. Want to share a bit more, or would you prefer a quiet breath?",
      chips: ["Feeling exhausted", "A bit overwhelmed", "Could use a quiet breath"],
      suggestResource: 'breathing'
    },
    {
      reply: "Thank you for trusting me with that. Healing and rest take time. What is one small thing that feels safe right now?",
      chips: ["Sitting quietly", "Listening to soft sounds", "Just resting"],
      suggestResource: 'breathing'
    }
  ],
  high: [
    {
      reply: "That sounds really heavy, and your safety and peace matter deeply. You are not alone in this. Would it help to connect with someone compassionate right now?",
      chips: ["I want to talk to someone", "Try a breathing exercise", "I need immediate help"],
      suggestResource: 'helpline',
      isHighDistress: true
    },
    {
      reply: "I hear how much pain or fear you are carrying. Please know there are people ready to listen without any judgment. Here is a direct helpline you can tap to speak with a caring counselor immediately.",
      chips: ["Connect with counselor", "Guide my breathing"],
      suggestResource: 'helpline',
      isHighDistress: true
    }
  ]
};

function classifyDistress(text, chipMood) {
  const norm = (text || '').toLowerCase();
  const highKw = ['hopeless', 'end it', 'die', 'kill', 'hurt myself', 'cant go on', "can't go on", 'suicide', 'terrified', 'nightmare', 'reliving', 'panic attack', 'flashback', 'trauma', 'unsafe', 'danger', 'unbearable', 'severe pain'];
  const medKw = ['sad', 'tired', 'exhausted', 'lonely', 'anxious', 'worried', 'heavy', 'tough', 'struggling', 'crying', 'numb', 'bad day', 'hard', 'not great', 'stressed', 'scared', 'alone', 'overwhelmed', 'sleepless', 'drained'];
  
  const matchedHigh = highKw.filter(k => norm.includes(k));
  const matchedMed = medKw.filter(k => norm.includes(k));

  if (chipMood && chipMood.includes('Heavy')) {
    return { tier: 'high', score: 88, mood: 2 };
  }
  if (chipMood && chipMood.includes('Not great')) {
    return { tier: 'medium', score: 64, mood: 4 };
  }
  if (chipMood && (chipMood.includes('Good') || chipMood.includes('Peaceful'))) {
    if (!matchedHigh.length) return { tier: 'low', score: 18, mood: 8 };
  }

  if (matchedHigh.length > 0) {
    return { tier: 'high', score: Math.min(95, 75 + matchedHigh.length * 10), mood: 2 };
  }
  if (matchedMed.length > 0 || norm.length > 50) {
    return { tier: 'medium', score: Math.min(68, 45 + matchedMed.length * 8), mood: 5 };
  }
  return { tier: 'low', score: 20, mood: 8 };
}

// ==========================================
// 3. Navigation & Tab Switching
// ==========================================
function switchUserTab(tab) {
  STATE.userTab = tab;
  STATE.portalRole = 'user';
  updateNavHeader();
  renderPortal();
}

function togglePortalRole() {
  STATE.portalRole = STATE.portalRole === 'user' ? 'counselor' : 'user';
  updateNavHeader();
  renderPortal();
}

function updateNavHeader() {
  const isUser = STATE.portalRole === 'user';
  const roleBadge = document.getElementById('role-badge');
  const roleToggleText = document.getElementById('role-toggle-text');
  const userNav = document.getElementById('user-primary-nav');
  const streakPill = document.getElementById('nav-streak-pill');

  if (roleBadge) {
    roleBadge.innerText = isUser ? 'Survivor Space' : 'Counselor Portal';
    roleBadge.className = `badge-pill ${isUser ? 'badge-primary' : 'badge-lavender'}`;
  }

  if (roleToggleText) {
    roleToggleText.innerText = isUser ? 'Switch to Counselor View →' : '← Back to Survivor Space';
  }

  if (userNav) {
    userNav.style.display = isUser ? 'flex' : 'none';
  }

  if (streakPill) {
    streakPill.style.display = isUser ? 'flex' : 'none';
  }

  document.querySelectorAll('.user-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === `nav-btn-${STATE.userTab}`);
  });
}

function toggleTheme() {
  const body = document.body;
  const sun = document.getElementById('theme-sun-icon');
  const moon = document.getElementById('theme-moon-icon');

  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    STATE.theme = 'light';
    if (sun) sun.style.display = 'none';
    if (moon) moon.style.display = 'block';
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    STATE.theme = 'dark';
    if (sun) sun.style.display = 'block';
    if (moon) moon.style.display = 'none';
  }
}

// ==========================================
// 4. Main Portal Render Dispatcher
// ==========================================
function renderPortal() {
  const content = document.getElementById('portal-content');
  if (!content) return;

  if (STATE.portalRole === 'counselor') {
    content.innerHTML = renderCounselorTriageView();
    return;
  }

  switch (STATE.userTab) {
    case 'home':
      content.innerHTML = renderUserHomeHtml();
      break;
    case 'checkin':
      content.innerHTML = renderUserChatCheckinHtml();
      break;
    case 'trends':
      content.innerHTML = renderUserTrendsHtml();
      break;
    case 'care':
      content.innerHTML = renderUserCareHtml();
      break;
    case 'profile':
      content.innerHTML = renderUserProfileHtml();
      break;
    default:
      content.innerHTML = renderUserHomeHtml();
  }
}

// ==========================================
// 5. Survivor Home Screen
// ==========================================
function renderUserHomeHtml() {
  const latestMood = STATE.userLogs[STATE.userLogs.length - 1];

  return `
    <div style="display:flex; flex-direction:column; gap:24px;">
      <!-- Hero Greeting Banner -->
      <div class="user-hero-banner">
        <div>
          <span style="font-size:11.5px; font-weight:700; color:var(--primary); text-transform:uppercase; letter-spacing:0.04em;">Safe Support Space</span>
          <h2 class="user-hero-title">Welcome home, ${STATE.userName}</h2>
          <p class="user-hero-quote">
            "You are safe here. Take a gentle breath, be kind to yourself, and remember that healing happens one moment at a time."
          </p>
        </div>

        <div style="display:flex; align-items:center; gap:12px;">
          <div class="streak-pill" style="font-size:14px; padding:8px 18px;">
            <span>🔥 ${STATE.streakCount} Day Reflection Streak</span>
          </div>
        </div>
      </div>

      <!-- Main Daily Check-in CTA Card -->
      <div class="checkin-hero-card">
        <div class="checkin-icon-circle">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div>
          <h3 style="font-size:20px; font-weight:700;">How is your heart feeling today?</h3>
          <p style="font-size:13.5px; color:var(--text-secondary); max-width:440px; margin:4px auto 0;">
            Take 60 seconds for a private, gentle conversation. No pressure, no judgment.
          </p>
        </div>
        <button class="btn-primary" style="padding:12px 32px; font-size:14px; margin-top:6px;" onclick="switchUserTab('checkin')">
          <span>Begin Daily Check-in</span> &rarr;
        </button>
      </div>

      <!-- Quick Calming & Care Tools -->
      <div>
        <h4 style="font-size:16px; font-weight:700; margin-bottom:14px;">Gentle Daily Practices</h4>
        <div class="home-tools-grid">
          <!-- 4-7-8 Breath -->
          <div class="tool-card" onclick="openBreathingModal()">
            <div>
              <div style="font-size:26px; margin-bottom:6px;">🌬️</div>
              <h5 style="font-size:15px; font-weight:700;">4-7-8 Calming Breath</h5>
              <p style="font-size:12.5px; color:var(--text-secondary); margin-top:4px;">
                A 2-minute rhythmic breathing exercise to lower heart rate and soothe physical tension.
              </p>
            </div>
            <span style="font-size:12px; font-weight:700; color:var(--primary);">Start Breathing &rarr;</span>
          </div>

          <!-- Sensory Grounding -->
          <div class="tool-card" onclick="switchUserTab('care')">
            <div>
              <div style="font-size:26px; margin-bottom:6px;">🌿</div>
              <h5 style="font-size:15px; font-weight:700;">5-4-3-2-1 Sensory Grounding</h5>
              <p style="font-size:12.5px; color:var(--text-secondary); margin-top:4px;">
                Bring your awareness back to safe surroundings when memories or thoughts feel overwhelming.
              </p>
            </div>
            <span style="font-size:12px; font-weight:700; color:var(--secondary);">Explore Grounding &rarr;</span>
          </div>

          <!-- Crisis Helplines -->
          <div class="tool-card" onclick="openEmergencyModal()">
            <div>
              <div style="font-size:26px; margin-bottom:6px;">❤️</div>
              <h5 style="font-size:15px; font-weight:700;">24/7 Human Helplines</h5>
              <p style="font-size:12.5px; color:var(--text-secondary); margin-top:4px;">
                Free, confidential, and compassionate crisis counselors available toll-free in Indian languages.
              </p>
            </div>
            <span style="font-size:12px; font-weight:700; color:var(--risk-high);">View Crisis Lines &rarr;</span>
          </div>
        </div>
      </div>

      <!-- Recent Reflection Preview -->
      <div class="card-panel" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="font-size:12px; font-weight:700; color:var(--primary); text-transform:uppercase;">Recent Reflection &bull; ${latestMood.fullDate}</div>
          <p style="font-size:13.5px; color:var(--text-primary); margin-top:4px;">"${latestMood.summary}"</p>
        </div>
        <button class="btn-outline" onclick="switchUserTab('trends')">
          View Emotional Journey &rarr;
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// 6. Survivor Safe Chat Check-in (Web Interface)
// ==========================================
function renderUserChatCheckinHtml() {
  return `
    <div style="max-width:880px; margin:0 auto; display:flex; flex-direction:column; gap:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h2 style="font-size:22px; font-weight:700;">Daily Safe Check-in</h2>
          <p style="font-size:12.5px; color:var(--text-secondary);">Your safe space &bull; Zero generative hallucinations &bull; Completely confidential</p>
        </div>
        <button onclick="skipCheckIn()" style="background:none; border:none; font-size:12.5px; color:var(--primary); cursor:pointer; text-decoration:underline;">
          Skip for today
        </button>
      </div>

      <div class="chat-window-card">
        <!-- Messages Feed -->
        <div class="chat-feed" id="user-chat-box">
          ${STATE.chatMessages.map(m => `
            <div class="chat-bubble ${m.sender}">
              <p>${m.text}</p>
              <span class="chat-time">${m.time}</span>
            </div>
          `).join('')}
        </div>

        <!-- Quick Reply Chips -->
        ${STATE.chatStep === 1 && !STATE.isCheckinCompleted ? `
          <div class="quick-chips-wrapper">
            <button class="quick-chip-btn" onclick="handleUserChatMessage('🙂 Feeling Peaceful & Good today', '🙂 Good')">🙂 Good / Peaceful</button>
            <button class="quick-chip-btn" onclick="handleUserChatMessage('😐 Feeling Okay, taking it steady', '😐 Okay')">😐 Okay / Steady</button>
            <button class="quick-chip-btn" onclick="handleUserChatMessage('😔 Not great, feeling tired and heavy', '😔 Not great')">😔 Not great</button>
            <button class="quick-chip-btn" onclick="handleUserChatMessage('😭 Heavy / Feeling deep emotional pain and fear', '😭 Heavy')">😭 Heavy / In Pain</button>
          </div>
        ` : ''}

        <!-- Input Bar -->
        <div class="chat-input-row">
          <button id="btn-voice-mic" class="voice-mic-btn ${STATE.isRecordingVoice ? 'recording' : ''}" onclick="toggleVoiceRecord()" title="Voice journaling">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          </button>
          <input type="text" id="user-chat-input" placeholder="Type your thoughts quietly here..." onkeydown="if(event.key==='Enter') submitUserChat()">
          <button class="send-action-btn" onclick="submitUserChat()">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleUserChatMessage(text, chipMood) {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  STATE.chatMessages.push({ id: 'u-' + Date.now(), sender: 'user', text, time: now });

  renderPortal();

  setTimeout(() => {
    const box = document.getElementById('user-chat-box');
    if (box) box.scrollTop = box.scrollHeight;
  }, 50);

  const analysis = classifyDistress(text, chipMood);

  setTimeout(() => {
    const responseBank = SCRIPTED_RESPONSES[analysis.tier];
    const script = responseBank[Math.floor(Math.random() * responseBank.length)];

    STATE.chatMessages.push({
      id: 'b-' + Date.now(),
      sender: 'bot',
      text: script.reply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    STATE.chatStep = 2;
    STATE.streakCount++;

    // Add to user logs
    STATE.userLogs.push({
      date: '09/04',
      fullDate: '2026-09-04',
      moodScore: analysis.mood,
      riskScore: analysis.score,
      riskTier: analysis.tier,
      summary: text
    });

    renderPortal();

    if (analysis.tier === 'high') {
      pushLiveDistressAlert('CASE-7821', 'high', text);
    }
  }, 900);
}

function submitUserChat() {
  const input = document.getElementById('user-chat-input');
  if (!input || !input.value.trim()) return;
  const val = input.value.trim();
  input.value = '';
  handleUserChatMessage(val);
}

function toggleVoiceRecord() {
  STATE.isRecordingVoice = !STATE.isRecordingVoice;
  const btn = document.getElementById('btn-voice-mic');
  if (btn) btn.classList.toggle('recording', STATE.isRecordingVoice);

  if (STATE.isRecordingVoice) {
    setTimeout(() => {
      STATE.isRecordingVoice = false;
      if (btn) btn.classList.remove('recording');
      handleUserChatMessage("I am having bad flashbacks and feeling unsafe tonight...");
    }, 2800);
  }
}

function skipCheckIn() {
  handleUserChatMessage("Checked in quietly for today.");
  switchUserTab('home');
}

// ==========================================
// 7. My Journey & Mood Trends (User View)
// ==========================================
function renderUserTrendsHtml() {
  const latestLog = STATE.userLogs[STATE.userLogs.length - 1];

  return `
    <div style="display:flex; flex-direction:column; gap:24px;">
      <div>
        <h2 style="font-size:22px; font-weight:700;">Your Emotional Journey</h2>
        <p style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">
          Reflecting gently on your daily emotional balance and recovery rhythm.
        </p>
      </div>

      <!-- Plain Language Emotional Summary -->
      <div class="card-panel" style="background:var(--risk-low-bg); border-color:var(--risk-low-border); padding:20px 24px;">
        <div style="font-weight:700; font-size:15px; color:var(--risk-low);">
          ${latestLog.moodScore >= 6 ? '🌱 You have felt steady and peaceful' : '🌧️ You have been carrying some heavy emotions'}
        </div>
        <p style="font-size:13px; color:var(--text-primary); margin-top:4px; line-height:1.5;">
          ${latestLog.moodScore >= 6 
            ? 'Your daily reflections show a calm momentum. Continuing morning check-ins supports your peace.' 
            : 'Remember that it takes immense strength to navigate difficult days. Your breathing tools and support team are always right here.'}
        </p>
      </div>

      <!-- Longitudinal Mood Rating Line Graph (1-10 Scale) -->
      <div class="card-panel">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h4 style="font-size:15px; font-weight:700;">Daily Mood Balance (1 to 10)</h4>
            <p style="font-size:11.5px; color:var(--text-secondary);">Higher score represents brighter, calmer emotional state</p>
          </div>
        </div>

        <div style="width:100%; height:230px;">
          ${renderUserMoodSvg()}
        </div>
      </div>

      <!-- Past Reflections List -->
      <div class="card-panel">
        <h4 style="font-size:15px; font-weight:700; margin-bottom:14px;">Previous Reflections</h4>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${STATE.userLogs.slice().reverse().map(l => `
            <div style="padding:14px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; gap:16px;">
              <div>
                <strong style="font-size:13.5px;">${l.fullDate}</strong>
                <p style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">"${l.summary}"</p>
              </div>
              <span style="font-size:14px; font-weight:700; color:var(--primary);">${l.moodScore} / 10</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderUserMoodSvg() {
  const data = STATE.userLogs;
  const w = 700;
  const h = 200;
  const padX = 50;
  const padY = 24;

  const stepX = (w - padX * 2) / Math.max(data.length - 1, 1);
  const points = data.map((d, i) => {
    const x = padX + i * stepX;
    const y = padY + (1 - d.moodScore / 10) * (h - padY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');

  return `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="100%">
      <!-- Grid -->
      <line x1="${padX}" y1="${padY}" x2="${w - padX}" y2="${padY}" stroke="var(--border-color)" stroke-dasharray="3 3"/>
      <line x1="${padX}" y1="${h/2}" x2="${w - padX}" y2="${h/2}" stroke="var(--border-color)" stroke-dasharray="3 3"/>
      <line x1="${padX}" y1="${h - padY}" x2="${w - padX}" y2="${h - padY}" stroke="var(--border-color)"/>

      <text x="${padX - 10}" y="${padY + 4}" font-size="11" fill="var(--text-secondary)" text-anchor="end">10</text>
      <text x="${padX - 10}" y="${h/2 + 4}" font-size="11" fill="var(--text-secondary)" text-anchor="end">5</text>
      <text x="${padX - 10}" y="${h - padY + 4}" font-size="11" fill="var(--text-secondary)" text-anchor="end">1</text>

      <path d="${pathD}" fill="none" stroke="var(--primary)" stroke-width="3"/>

      ${points.map(p => `
        <circle cx="${p.x}" cy="${p.y}" r="6" fill="var(--primary)" stroke="#fff" stroke-width="2"/>
        <text x="${p.x}" y="${h - padY + 16}" font-size="11" fill="var(--text-secondary)" text-anchor="middle">${p.date}</text>
        <text x="${p.x}" y="${p.y - 10}" font-size="12" font-weight="700" fill="var(--primary)" text-anchor="middle">${p.moodScore}</text>
      `).join('')}
    </svg>
  `;
}

// ==========================================
// 8. Care & Calming Tools (User View)
// ==========================================
function renderUserCareHtml() {
  return `
    <div style="display:flex; flex-direction:column; gap:24px;">
      <div>
        <h2 style="font-size:22px; font-weight:700;">Care, Grounding & Crisis Support</h2>
        <p style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">
          Evidence-based exercises to reset your nervous system and access confidential care.
        </p>
      </div>

      <!-- Breathing Tool Hero Banner -->
      <div class="card-panel" style="background:var(--primary); color:#fff; padding:28px 32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
        <div style="max-width:560px;">
          <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; opacity:0.85;">Immediate Calm</span>
          <h3 style="font-size:22px; font-weight:700; margin-top:2px;">4-7-8 Rhythmic Breathing Visualizer</h3>
          <p style="font-size:13px; opacity:0.9; margin-top:4px; line-height:1.5;">
            Inhale for 4 seconds, hold gently for 7 seconds, exhale for 8 seconds. Resets heart rate and eases anxiety.
          </p>
        </div>
        <button onclick="openBreathingModal()" style="background:#fff; color:var(--primary); border:none; border-radius:var(--radius-md); padding:12px 28px; font-size:13.5px; font-weight:700; cursor:pointer;">
          Begin Breathing Exercise &rarr;
        </button>
      </div>

      <!-- Sensory Grounding Cards -->
      <div class="card-panel">
        <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;">5-4-3-2-1 Sensory Grounding Technique</h4>
        <p style="font-size:12.5px; color:var(--text-secondary); margin-bottom:16px;">When racing thoughts or flashbacks arise, engage your five senses:</p>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; text-align:center;">
          <div style="padding:16px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md);">
            <div style="font-size:24px; font-weight:800; color:var(--primary);">5</div>
            <div style="font-size:12px; font-weight:700; margin-top:2px;">Things you see</div>
            <p style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Look around your space</p>
          </div>
          <div style="padding:16px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md);">
            <div style="font-size:24px; font-weight:800; color:var(--primary);">4</div>
            <div style="font-size:12px; font-weight:700; margin-top:2px;">Things you touch</div>
            <p style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Feel the texture of clothing</p>
          </div>
          <div style="padding:16px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md);">
            <div style="font-size:24px; font-weight:800; color:var(--primary);">3</div>
            <div style="font-size:12px; font-weight:700; margin-top:2px;">Sounds you hear</div>
            <p style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Listen to ambient breeze</p>
          </div>
          <div style="padding:16px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md);">
            <div style="font-size:24px; font-weight:800; color:var(--primary);">2</div>
            <div style="font-size:12px; font-weight:700; margin-top:2px;">Things you smell</div>
            <p style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Notice scents in the air</p>
          </div>
          <div style="padding:16px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md);">
            <div style="font-size:24px; font-weight:800; color:var(--primary);">1</div>
            <div style="font-size:12px; font-weight:700; margin-top:2px;">Deep breath</div>
            <p style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Slow exhale of release</p>
          </div>
        </div>
      </div>

      <!-- 24/7 Helpline Directory -->
      <div class="card-panel">
        <h4 style="font-size:16px; font-weight:700; margin-bottom:14px;">Free & Confidential Crisis Support</h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px;">
          <div style="padding:18px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="font-size:14px;">KIRAN National Helpline</strong>
              <p style="font-size:11.5px; color:var(--text-secondary); margin-top:2px;">24/7 Government Support</p>
              <div style="font-family:monospace; font-weight:700; color:var(--primary); margin-top:4px;">1800-599-0019</div>
            </div>
            <a href="tel:18005990019" class="btn-primary" style="padding:8px 18px; font-size:12.5px;">Call</a>
          </div>

          <div style="padding:18px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="font-size:14px;">Tele-MANAS Hotline</strong>
              <p style="font-size:11.5px; color:var(--text-secondary); margin-top:2px;">Multi-lingual counselors</p>
              <div style="font-family:monospace; font-weight:700; color:var(--primary); margin-top:4px;">14416</div>
            </div>
            <a href="tel:14416" class="btn-primary" style="padding:8px 18px; font-size:12.5px;">Call</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 9. Profile & Data Privacy (User View)
// ==========================================
function renderUserProfileHtml() {
  return `
    <div style="max-width:760px; margin:0 auto; display:flex; flex-direction:column; gap:24px;">
      <div>
        <h2 style="font-size:22px; font-weight:700;">Profile & Data Privacy</h2>
        <p style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">
          Manage your personal alias, language comfort, and data deletion rights.
        </p>
      </div>

      <div class="card-panel" style="display:flex; flex-direction:column; gap:16px;">
        <h4 style="font-size:15px; font-weight:700;">Account Preferences</h4>
        
        <div>
          <label style="font-weight:600; font-size:12.5px;">Preferred Name or Alias</label>
          <input type="text" value="${STATE.userName}" onchange="STATE.userName=this.value" style="width:100%; padding:10px 14px; border:1px solid var(--border-color); border-radius:var(--radius-md); background:var(--bg-app); color:var(--text-primary); margin-top:4px;">
        </div>

        <div>
          <label style="font-weight:600; font-size:12.5px;">Preferred Language</label>
          <select onchange="STATE.userLanguage=this.value" style="width:100%; padding:10px 14px; border:1px solid var(--border-color); border-radius:var(--radius-md); background:var(--bg-app); color:var(--text-primary); margin-top:4px; font-weight:600;">
            <option value="English" ${STATE.userLanguage === 'English' ? 'selected' : ''}>English</option>
            <option value="Hindi" ${STATE.userLanguage === 'Hindi' ? 'selected' : ''}>Hindi (हिंदी)</option>
            <option value="Bengali" ${STATE.userLanguage === 'Bengali' ? 'selected' : ''}>Bengali (বাংলা)</option>
            <option value="Assamese" ${STATE.userLanguage === 'Assamese' ? 'selected' : ''}>Assamese (অসমীয়া)</option>
          </select>
        </div>

        <button class="btn-primary" style="margin-top:6px; align-self:flex-start;" onclick="alert('Profile saved safely.')">
          Save Preferences
        </button>
      </div>

      <!-- Data Sovereignty & Purge -->
      <div class="card-panel" style="border-left:5px solid var(--risk-high);">
        <h4 style="font-size:15px; font-weight:700; color:var(--risk-high);">Data Sovereignty & Permanent Erase</h4>
        <p style="font-size:12.5px; color:var(--text-secondary); margin:6px 0 14px; line-height:1.5;">
          You hold total ownership over your data. Tapping below permanently purges all past check-in reflections and local scores.
        </p>
        <button class="btn-danger-outline" onclick="if(confirm('Are you sure you want to permanently erase all reflections?')) { STATE.userLogs = []; renderPortal(); alert('Data erased.'); }">
          Delete My Reflection History
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// 10. Counselor Triage View (For NGO Staff)
// ==========================================
function renderCounselorTriageView() {
  return `
    <div style="display:flex; flex-direction:column; gap:22px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <span class="badge-pill badge-lavender">NGO Counselor Triage Portal</span>
          <h2 style="font-size:22px; font-weight:700; margin-top:2px;">Distress Prediction & Case Inspection</h2>
        </div>
        <button class="btn-outline" onclick="togglePortalRole()">
          &larr; Return to Survivor Space
        </button>
      </div>

      <div class="card-panel" style="padding:20px 24px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-family:monospace; font-size:20px; font-weight:700;">CASE-7821 (Meera)</div>
          <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Displaced Camp 3 &bull; Lead Counselor: Dr. Ananya Sharma</p>
        </div>
        <span class="risk-badge high">HIGH DISTRESS TIER (84/100)</span>
      </div>

      <div class="card-panel">
        <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">Longitudinal Risk Score Trajectory (0-100)</h4>
        <div style="width:100%; height:220px; margin-top:10px;">
          ${renderUserMoodSvg()}
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 11. Modals: 4-7-8 Breathing & Emergency Support
// ==========================================
function openBreathingModal() {
  const modalCont = document.getElementById('modal-container');
  if (!modalCont) return;

  STATE.isBreathingActive = true;
  STATE.breathingPhase = 'inhale';
  STATE.breathingSeconds = 4;

  modalCont.innerHTML = `
    <div class="modal-backdrop" onclick="closeBreathingModal()">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div style="font-size:11px; font-weight:700; color:var(--primary); text-transform:uppercase;">
          🌬️ 4-7-8 Calming Breath
        </div>
        <h3 style="font-size:20px; font-weight:700; margin-top:4px;">Nervous System Reset</h3>
        <p style="font-size:12px; color:var(--text-secondary);">Gently lower body tension & heart rate</p>

        <div id="breathing-circle-wrap" class="breathing-circle-outer inhale">
          <div class="breathing-circle-inner">
            <span id="breathing-label" style="font-size:12px; font-weight:700; color:var(--primary); text-transform:uppercase;">INHALE</span>
            <span id="breathing-sec" class="breathing-number">4</span>
            <span style="font-size:10px; color:var(--text-muted);">seconds</span>
          </div>
        </div>

        <p id="breathing-text" style="font-size:13px; font-weight:600; min-height:36px;">
          Breathe in gently through your nose...
        </p>

        <div style="display:flex; justify-content:center; gap:8px; margin-top:18px;">
          <button class="btn-primary" style="padding:10px 28px;" onclick="closeBreathingModal()">
            I Feel Calmer Now
          </button>
        </div>
      </div>
    </div>
  `;

  startBreathingLoop();
}

function startBreathingLoop() {
  if (STATE.breathingInterval) clearInterval(STATE.breathingInterval);

  STATE.breathingInterval = setInterval(() => {
    if (!STATE.isBreathingActive) return;

    STATE.breathingSeconds--;
    if (STATE.breathingSeconds <= 0) {
      if (STATE.breathingPhase === 'inhale') {
        STATE.breathingPhase = 'hold';
        STATE.breathingSeconds = 7;
      } else if (STATE.breathingPhase === 'hold') {
        STATE.breathingPhase = 'exhale';
        STATE.breathingSeconds = 8;
      } else {
        STATE.breathingPhase = 'inhale';
        STATE.breathingSeconds = 4;
      }
    }

    updateBreathingDom();
  }, 1000);
}

function updateBreathingDom() {
  const circle = document.getElementById('breathing-circle-wrap');
  const label = document.getElementById('breathing-label');
  const sec = document.getElementById('breathing-sec');
  const text = document.getElementById('breathing-text');

  if (!circle || !sec) return;

  sec.innerText = STATE.breathingSeconds;
  circle.className = 'breathing-circle-outer ' + STATE.breathingPhase;

  if (STATE.breathingPhase === 'inhale') {
    label.innerText = 'INHALE';
    label.style.color = 'var(--primary)';
    sec.style.color = 'var(--primary)';
    if (text) text.innerText = 'Breathe in gently through your nose...';
  } else if (STATE.breathingPhase === 'hold') {
    label.innerText = 'HOLD';
    label.style.color = 'var(--secondary)';
    sec.style.color = 'var(--secondary)';
    if (text) text.innerText = 'Hold your breath gently and rest in this stillness...';
  } else {
    label.innerText = 'EXHALE';
    label.style.color = 'var(--risk-low)';
    sec.style.color = 'var(--risk-low)';
    if (text) text.innerText = 'Slowly release all tension through your mouth...';
  }
}

function closeBreathingModal() {
  STATE.isBreathingActive = false;
  if (STATE.breathingInterval) clearInterval(STATE.breathingInterval);
  const modalCont = document.getElementById('modal-container');
  if (modalCont) modalCont.innerHTML = '';
}

function openEmergencyModal() {
  const modalCont = document.getElementById('modal-container');
  if (!modalCont) return;

  modalCont.innerHTML = `
    <div class="modal-backdrop" onclick="closeEmergencyModal()">
      <div class="modal-card" style="border-top:5px solid var(--risk-high);" onclick="event.stopPropagation()">
        <div style="font-size:28px; margin-bottom:4px;">❤️</div>
        <h3 style="font-size:20px; font-weight:700;">You Are Not Alone</h3>
        <p style="font-size:12.5px; color:var(--text-secondary); margin-bottom:16px;">Immediate, confidential human help is ready for you right now.</p>

        <div style="display:flex; flex-direction:column; gap:10px; text-align:left;">
          <div style="padding:12px 16px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:700; font-size:13px;">KIRAN Crisis Hotline</div>
              <div style="font-size:11px; color:var(--text-secondary);">24/7 Free & Confidential</div>
              <div style="font-family:monospace; font-weight:700; color:var(--primary); margin-top:2px;">1800-599-0019</div>
            </div>
            <a href="tel:18005990019" class="btn-primary" style="padding:8px 16px; font-size:12px;">Call</a>
          </div>

          <div style="padding:12px 16px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:700; font-size:13px;">Tele-MANAS Helpline</div>
              <div style="font-size:11px; color:var(--text-secondary);">Multi-lingual counseling</div>
              <div style="font-family:monospace; font-weight:700; color:var(--primary); margin-top:2px;">14416</div>
            </div>
            <a href="tel:14416" class="btn-primary" style="padding:8px 16px; font-size:12px;">Call</a>
          </div>

          <div style="padding:12px 14px; border-radius:var(--radius-md); background:var(--secondary-light); border:1px solid rgba(127,119,221,0.3); font-size:12px;">
            <strong>Request Outbound Counselor Call:</strong> Tap below to notify Dr. Ananya Sharma to call your phone directly.
            <button class="btn-outline" style="width:100%; margin-top:8px;" onclick="requestCounselorCall()">
              Request Outbound Counselor Call
            </button>
          </div>
        </div>

        <button onclick="closeEmergencyModal()" style="background:none; border:none; color:var(--text-secondary); font-size:12px; margin-top:16px; cursor:pointer;">
          Close this dialog
        </button>
      </div>
    </div>
  `;
}

function requestCounselorCall() {
  alert('Request received. Dr. Ananya Sharma has been alerted via triage feed.');
  closeEmergencyModal();
}

function closeEmergencyModal() {
  const modalCont = document.getElementById('modal-container');
  if (!modalCont) return;
  modalCont.innerHTML = '';
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  renderPortal();
});
