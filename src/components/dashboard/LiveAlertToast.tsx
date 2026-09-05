import React from 'react';
import { AlertTriangle, Bell, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';

export const LiveAlertToast: React.FC = () => {
  const { activeToast, dismissToast, setSelectedCaseId, setDashboardTab, setViewMode } = useApp();

  if (!activeToast) return null;

  const isHighRisk = activeToast.riskTier === 'high';

  const handleOpenCase = () => {
    setSelectedCaseId(activeToast.caseId);
    setDashboardTab('cases');
    // If in mobile-only view, switch to split or counselor
    setViewMode('counselor');
    dismissToast();
  };

  return (
    <div className="fixed top-20 right-6 z-50 max-w-md w-full animate-toast-in shadow-xl rounded-soft-lg overflow-hidden border border-[#A32D2D]/30 bg-[#FAF9F6] dark:bg-[#262624] dark:border-[#A32D2D]/40 backdrop-blur-md">
      <div className={`px-4 py-3 flex items-start gap-3 ${isHighRisk ? 'bg-[#A32D2D]/10 dark:bg-[#A32D2D]/20' : 'bg-[#BA7517]/10'}`}>
        <div className={`p-2 rounded-full ${isHighRisk ? 'bg-[#A32D2D]/20 text-[#A32D2D] dark:text-[#E06666]' : 'bg-[#BA7517]/20 text-[#BA7517]'}`}>
          {isHighRisk ? <AlertTriangle className="w-5 h-5 animate-pulse" /> : <Bell className="w-5 h-5" />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-[#2C2C2A] dark:text-[#FAF9F6]">
              Real-time Distress Alert
            </span>
            <RiskBadge tier={activeToast.riskTier} size="sm" />
            <span className="text-xs text-[#5F5E5A] dark:text-[#8E8D88] ml-auto">
              {activeToast.timestamp}
            </span>
          </div>
          <p className="text-xs font-medium text-[#2C2C2A] dark:text-[#E4E3DF] mt-1">
            {activeToast.message}
          </p>
          <p className="text-xs text-[#5F5E5A] dark:text-[#AAA9A4] mt-0.5 line-clamp-2 italic">
            "{activeToast.snippet}"
          </p>

          <div className="mt-2.5 flex items-center gap-3">
            <button
              onClick={handleOpenCase}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F6E56] dark:text-[#38B293] hover:underline"
            >
              Open Case Detail <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button
          onClick={dismissToast}
          className="text-[#5F5E5A] hover:text-[#2C2C2A] dark:hover:text-white p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
