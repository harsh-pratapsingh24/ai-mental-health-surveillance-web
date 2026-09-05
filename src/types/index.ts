export type RiskTier = 'low' | 'medium' | 'high';

export type TrendDirection = 'improving' | 'stable' | 'declining';

export interface CheckInLog {
  id: string;
  date: string;
  timestamp: string;
  moodScore: number; // 1 to 10
  riskScore: number; // 0 to 100
  riskTier: RiskTier;
  sentimentSummary: string;
  flaggedKeywords?: string[];
  reviewedByCounselor?: boolean;
  notes?: string;
  skipped?: boolean;
}

export interface CaseRecord {
  id: string; // Anonymized, e.g. "CASE-8941"
  region: string;
  cohort: string;
  enrollmentDate: string;
  lastCheckInDate: string;
  currentRiskTier: RiskTier;
  currentRiskScore: number; // 0 to 100
  trendDirection: TrendDirection;
  reviewed: boolean;
  assignedCounselor: string;
  counselorNotes: string;
  escalated: boolean;
  escalationDate?: string;
  checkInLogs: CheckInLog[];
  demographicHint: string; // e.g., "Displaced Community - Block B"
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedResources?: ResourceItem[];
  isClosingCard?: boolean;
  isHelpPrompt?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'breathing' | 'grounding' | 'helpline' | 'journaling' | 'story';
  description: string;
  phone?: string;
  duration?: string;
  actionType: 'call' | 'open_exercise' | 'read';
}

export interface CounselorUser {
  id: string;
  name: string;
  role: string;
  ngoOrganization: string;
  avatar: string;
  region: string;
}

export interface LiveNotification {
  id: string;
  caseId: string;
  riskTier: RiskTier;
  message: string;
  timestamp: string;
  read: boolean;
  snippet: string;
}
