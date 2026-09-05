import React, { createContext, useContext, useState, useEffect } from 'react';
import { CaseRecord, CounselorUser, LiveNotification, RiskTier } from '../types';
import { INITIAL_CASES, CURRENT_COUNSELOR } from '../data/mockData';
import { eventBus } from '../services/eventBus';

export type ViewMode = 'counselor' | 'mobile' | 'split';
export type DashboardTab = 'cases' | 'cohort' | 'settings';
export type MobileTab = 'home' | 'checkin' | 'trends' | 'resources' | 'profile';

interface AppContextType {
  // Global View & Theme
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Counselor Dashboard State
  counselor: CounselorUser;
  cases: CaseRecord[];
  selectedCaseId: string | null;
  setSelectedCaseId: (id: string | null) => void;
  dashboardTab: DashboardTab;
  setDashboardTab: (tab: DashboardTab) => void;
  updateCaseNote: (caseId: string, note: string) => void;
  toggleCaseReviewed: (caseId: string) => void;
  escalateCase: (caseId: string) => void;
  notifications: LiveNotification[];
  activeToast: LiveNotification | null;
  dismissToast: () => void;
  counselorSearch: string;
  setCounselorSearch: (q: string) => void;
  riskFilter: 'all' | RiskTier;
  setRiskFilter: (f: 'all' | RiskTier) => void;
  sortBy: 'risk' | 'date';
  setSortBy: (s: 'risk' | 'date') => void;

  // Mobile App State
  mobileTab: MobileTab;
  setMobileTab: (tab: MobileTab) => void;
  survivorName: string;
  setSurvivorName: (name: string) => void;
  streakCount: number;
  incrementStreak: () => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  hasConsented: boolean;
  setHasConsented: (c: boolean) => void;
  isMobileLoggedIn: boolean;
  setIsMobileLoggedIn: (val: boolean) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isBreathingModalOpen: boolean;
  setIsBreathingModalOpen: (open: boolean) => void;
  addSurvivorCheckIn: (moodScore: number, riskScore: number, riskTier: RiskTier, summary: string, keywords: string[]) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Counselor State
  const [counselor] = useState<CounselorUser>(CURRENT_COUNSELOR);
  const [cases, setCases] = useState<CaseRecord[]>(() => {
    const saved = localStorage.getItem('aashraya_cases');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('cases');
  const [notifications, setNotifications] = useState<LiveNotification[]>([]);
  const [activeToast, setActiveToast] = useState<LiveNotification | null>(null);
  const [counselorSearch, setCounselorSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | RiskTier>('all');
  const [sortBy, setSortBy] = useState<'risk' | 'date'>('risk');

  // Mobile State
  const [mobileTab, setMobileTab] = useState<MobileTab>('home');
  const [survivorName, setSurvivorName] = useState<string>('Meera');
  const [streakCount, setStreakCount] = useState<number>(5);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [hasConsented, setHasConsented] = useState<boolean>(true);
  const [isMobileLoggedIn, setIsMobileLoggedIn] = useState<boolean>(true);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState<boolean>(false);

  // Sync cases to local storage
  useEffect(() => {
    localStorage.setItem('aashraya_cases', JSON.stringify(cases));
  }, [cases]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Real-time WebSocket subscriber
  useEffect(() => {
    const unsubscribe = eventBus.subscribe((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setActiveToast(notification);

      // Auto dismiss after 6 seconds
      setTimeout(() => {
        setActiveToast((current) => (current?.id === notification.id ? null : current));
      }, 6000);
    });

    return unsubscribe;
  }, []);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const updateCaseNote = (caseId: string, note: string) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, counselorNotes: note } : c))
    );
  };

  const toggleCaseReviewed = (caseId: string) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, reviewed: !c.reviewed } : c))
    );
  };

  const escalateCase = (caseId: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              escalated: true,
              escalationDate: new Date().toISOString().split('T')[0],
              reviewed: true,
            }
          : c
      )
    );
  };

  const dismissToast = () => setActiveToast(null);

  const incrementStreak = () => setStreakCount((prev) => prev + 1);

  const addSurvivorCheckIn = (
    moodScore: number,
    riskScore: number,
    riskTier: RiskTier,
    summary: string,
    keywords: string[]
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const newLog = {
      id: `chk-live-${Date.now()}`,
      date: today,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      moodScore,
      riskScore,
      riskTier,
      sentimentSummary: summary,
      flaggedKeywords: keywords,
      reviewedByCounselor: false,
    };

    // Update survivor's active case (CASE-7821) in the cases list
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === 'CASE-7821') {
          return {
            ...c,
            lastCheckInDate: today,
            currentRiskTier: riskTier,
            currentRiskScore: riskScore,
            trendDirection:
              riskScore > c.currentRiskScore
                ? 'declining'
                : riskScore < c.currentRiskScore
                ? 'improving'
                : 'stable',
            reviewed: false,
            checkInLogs: [...c.checkInLogs, newLog],
          };
        }
        return c;
      })
    );

    incrementStreak();

    // Push real-time event to Counselor Triage
    eventBus.publishFlaggedCase('CASE-7821', riskTier, summary);
  };

  const resetAllData = () => {
    setCases(INITIAL_CASES);
    localStorage.removeItem('aashraya_cases');
    setStreakCount(5);
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        isDarkMode,
        toggleDarkMode,
        counselor,
        cases,
        selectedCaseId,
        setSelectedCaseId,
        dashboardTab,
        setDashboardTab,
        updateCaseNote,
        toggleCaseReviewed,
        escalateCase,
        notifications,
        activeToast,
        dismissToast,
        counselorSearch,
        setCounselorSearch,
        riskFilter,
        setRiskFilter,
        sortBy,
        setSortBy,
        mobileTab,
        setMobileTab,
        survivorName,
        setSurvivorName,
        streakCount,
        incrementStreak,
        selectedLanguage,
        setSelectedLanguage,
        hasConsented,
        setHasConsented,
        isMobileLoggedIn,
        setIsMobileLoggedIn,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isBreathingModalOpen,
        setIsBreathingModalOpen,
        addSurvivorCheckIn,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
