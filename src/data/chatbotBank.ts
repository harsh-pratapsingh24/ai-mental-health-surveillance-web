import { ResourceItem, RiskTier } from '../types';

export interface ScriptedResponse {
  botReply: string;
  suggestedFollowUpChips?: string[];
  suggestedResources?: ResourceItem[];
  isHighConcern?: boolean;
}

export const COPING_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: '4-7-8 Soothing Breath',
    category: 'breathing',
    description: 'A 2-minute rhythmic breathing exercise to gently calm the nervous system.',
    duration: '2 min',
    actionType: 'open_exercise',
  },
  {
    id: 'res-2',
    title: 'National Crisis Helpline (KIRAN)',
    category: 'helpline',
    description: 'Free, confidential 24/7 mental health support by certified counselors.',
    phone: '1800-599-0019',
    actionType: 'call',
  },
  {
    id: 'res-3',
    title: '5-4-3-2-1 Sensory Grounding',
    category: 'grounding',
    description: 'Connect with your immediate surroundings to bring ease during moments of overwhelm.',
    duration: '3 min',
    actionType: 'open_exercise',
  },
  {
    id: 'res-4',
    title: 'NGO Survivor Community Line (Vandrevala Foundation)',
    category: 'helpline',
    description: 'Compassionate crisis counselors available round-the-clock.',
    phone: '+91 9999 666 555',
    actionType: 'call',
  },
  {
    id: 'res-5',
    title: 'Tele-MANAS Toll-Free Support',
    category: 'helpline',
    description: 'Government 24/7 tele-counseling available in multiple Indian languages.',
    phone: '14416',
    actionType: 'call',
  }
];

// Pre-written, safety-reviewed response banks
export const SCRIPTED_RESPONSES: Record<RiskTier, ScriptedResponse[]> = {
  low: [
    {
      botReply: "Good to hear! Anything on your mind or something gentle you're looking forward to today?",
      suggestedFollowUpChips: ["Just resting", "Had a peaceful walk", "Feeling okay"],
    },
    {
      botReply: "Glad to hear things feel steady today. Taking a few moments for yourself can keep that balance.",
      suggestedFollowUpChips: ["Enjoyed some tea", "Spent time with family", "Taking it slow"],
    },
    {
      botReply: "Thank you for checking in. It's lovely that today feels manageable.",
      suggestedFollowUpChips: ["Feeling calm", "Getting through the day"],
    }
  ],
  medium: [
    {
      botReply: "That sounds tough, and it's completely okay to feel this way. Want to share a bit more, or would you prefer a quiet moment?",
      suggestedFollowUpChips: ["Feeling exhausted", "A bit overwhelmed", "Could use a quiet breath"],
      suggestedResources: [COPING_RESOURCES[0], COPING_RESOURCES[2]],
    },
    {
      botReply: "Thank you for trusting me with that. Healing and rest take time. What is one small thing that feels safe right now?",
      suggestedFollowUpChips: ["Sitting quietly", "Listening to soft sounds", "Just resting"],
      suggestedResources: [COPING_RESOURCES[0]],
    },
    {
      botReply: "I hear you. Days like this can feel heavy. Remember you don't have to carry everything all at once.",
      suggestedFollowUpChips: ["Trying to stay calm", "Need some quiet time"],
      suggestedResources: [COPING_RESOURCES[2]],
    }
  ],
  high: [
    {
      botReply: "That sounds really heavy, and your safety and peace matter deeply. You are not alone in this. Would it help to connect with someone compassionate right now?",
      suggestedFollowUpChips: ["I want to talk to someone", "Try a breathing exercise", "I need immediate help"],
      suggestedResources: [COPING_RESOURCES[1], COPING_RESOURCES[4], COPING_RESOURCES[0]],
      isHighConcern: true,
    },
    {
      botReply: "I hear how much pain or fear you are carrying. Please know there are people ready to listen without any judgment. Here is a direct helpline you can tap to speak to a caring counselor immediately.",
      suggestedFollowUpChips: ["Connect with counselor", "Guide my breathing"],
      suggestedResources: [COPING_RESOURCES[1], COPING_RESOURCES[0]],
      isHighConcern: true,
    }
  ]
};

// Closing cards
export const CLOSING_MESSAGES: Record<RiskTier, string> = {
  low: "Thank you for taking this gentle moment for yourself today. You've completed today's check-in!",
  medium: "Thank you for checking in today. Remember to be gentle with yourself. We've saved a calming breath tool below whenever you need it.",
  high: "Thank you for sharing. Please take care of yourself, and remember that our team and emergency helplines are always here for you whenever you are ready."
};

// On-Device Sentiment / Distress Scoring Engine (Zero external LLM hallucinations)
export function classifyDistress(text: string, quickChipMood?: string): {
  tier: RiskTier;
  score: number;
  flaggedKeywords: string[];
} {
  const normalized = text.toLowerCase();
  
  const highDistressKeywords = [
    'hopeless', 'end it', 'die', 'kill', 'hurt myself', 'can\'t go on', 'cant go on',
    'suicide', 'terrified', 'nightmare', 'reliving', 'panic attack', 'flashback',
    'trauma', 'unsafe', 'attacked', 'danger', 'unbearable', 'severe pain', 'nobody cares'
  ];

  const mediumDistressKeywords = [
    'sad', 'tired', 'exhausted', 'lonely', 'anxious', 'worried', 'heavy', 'tough',
    'struggling', 'crying', 'numb', 'bad day', 'hard', 'not great', 'stressed',
    'scared', 'alone', 'overwhelmed', 'sleepless', 'drained'
  ];

  const positiveKeywords = [
    'good', 'great', 'fine', 'okay', 'peaceful', 'happy', 'better', 'calm',
    'hopeful', 'resting', 'relaxed', 'steady', 'recovering', 'smiling'
  ];

  const flaggedHigh = highDistressKeywords.filter(k => normalized.includes(k));
  const flaggedMedium = mediumDistressKeywords.filter(k => normalized.includes(k));
  const positiveMatches = positiveKeywords.filter(k => normalized.includes(k));

  // Quick chip weighting
  if (quickChipMood === '😔 Not great' || quickChipMood === '😭 Heavy / In Pain') {
    if (flaggedHigh.length > 0) {
      return { tier: 'high', score: 88, flaggedKeywords: flaggedHigh };
    }
    return { tier: 'medium', score: 62, flaggedKeywords: flaggedMedium.length ? flaggedMedium : ['low mood selection'] };
  }

  if (quickChipMood === '🙂 Good' || quickChipMood === '😌 Peaceful') {
    if (flaggedHigh.length === 0) {
      return { tier: 'low', score: 18, flaggedKeywords: [] };
    }
  }

  if (flaggedHigh.length > 0) {
    return {
      tier: 'high',
      score: Math.min(95, 75 + flaggedHigh.length * 10),
      flaggedKeywords: flaggedHigh,
    };
  }

  if (flaggedMedium.length > 0 || normalized.length > 50 && positiveMatches.length === 0) {
    return {
      tier: 'medium',
      score: Math.min(68, 45 + flaggedMedium.length * 8),
      flaggedKeywords: flaggedMedium,
    };
  }

  return {
    tier: 'low',
    score: Math.max(10, 30 - positiveMatches.length * 6),
    flaggedKeywords: [],
  };
}
