import React from 'react';
import { Shield, Users, BarChart3, Settings, Bell, RefreshCw, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardHeader: React.FC = () => {
  const { counselor, dashboardTab, setDashboardTab, cases, resetAllData } = useApp();

  const highRiskCount = cases.filter((c) => c.currentRiskTier === 'high').length;
  const pendingReviewCount = cases.filter((c) => !c.reviewed).length;

  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F6]/90 dark:bg-[#1C1C1A]/90 backdrop-blur-md border-b border-[#EAE8E3] dark:border-[#3A3A36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-soft bg-[#0F6E56] text-white flex items-center justify-center shadow-md shadow-[#0F6E56]/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-bold text-base sm:text-lg text-[#2C2C2A] dark:text-[#FAF9F6]">
                    Aashraya
                  </h1>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#0F6E56]/10 text-[#0F6E56] dark:text-[#38B293]">
                    Counselor Portal
                  </span>
                </div>
                <p className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88] hidden sm:block">
                  Trauma-Informed Distress Monitoring & Early Triage
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-1 border-l border-[#EAE8E3] dark:border-[#3A3A36] pl-6 ml-2">
              <button
                onClick={() => setDashboardTab('cases')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-soft text-xs font-semibold transition-all ${
                  dashboardTab === 'cases'
                    ? 'bg-[#0F6E56] text-white shadow-sm'
                    : 'text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Active Cases
                {pendingReviewCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    dashboardTab === 'cases' ? 'bg-white/20 text-white' : 'bg-[#BA7517]/20 text-[#BA7517]'
                  }`}>
                    {pendingReviewCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setDashboardTab('cohort')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-soft text-xs font-semibold transition-all ${
                  dashboardTab === 'cohort'
                    ? 'bg-[#0F6E56] text-white shadow-sm'
                    : 'text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Cohort Analytics
              </button>

              <button
                onClick={() => setDashboardTab('settings')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-soft text-xs font-semibold transition-all ${
                  dashboardTab === 'settings'
                    ? 'bg-[#0F6E56] text-white shadow-sm'
                    : 'text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                Helplines & Settings
              </button>
            </nav>
          </div>

          {/* Right: Real-time status, high-risk alert pill, Counselor profile */}
          <div className="flex items-center gap-3">
            {/* Live Socket Status */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF9F6] dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4]">
              <span className="w-2 h-2 rounded-full bg-[#639922] animate-pulse" />
              <span>Live Triage Feed</span>
            </div>

            {/* High-risk counter */}
            {highRiskCount > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#A32D2D]/10 dark:bg-[#A32D2D]/20 text-[#A32D2D] dark:text-[#F19E9E] border border-[#A32D2D]/25 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#A32D2D] animate-ping" />
                <span>{highRiskCount} High Concern</span>
              </div>
            )}

            {/* Counselor Avatar & Details */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#EAE8E3] dark:border-[#3A3A36]">
              <img
                src={counselor.avatar}
                alt={counselor.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0F6E56]/30"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] leading-tight">
                  {counselor.name}
                </p>
                <p className="text-[10px] text-[#5F5E5A] dark:text-[#8E8D88] truncate max-w-[140px]">
                  {counselor.role}
                </p>
              </div>

              {/* Reset Demo Data button */}
              <button
                onClick={resetAllData}
                title="Reset mock cases to default"
                className="p-1.5 rounded-soft text-[#5F5E5A] hover:text-[#0F6E56] hover:bg-[#0F6E56]/10 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-[#EAE8E3] dark:border-[#3A3A36]">
          <button
            onClick={() => setDashboardTab('cases')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-soft text-xs font-semibold ${
              dashboardTab === 'cases'
                ? 'bg-[#0F6E56] text-white'
                : 'text-[#5F5E5A] dark:text-[#AAA9A4]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Cases ({cases.length})
          </button>
          <button
            onClick={() => setDashboardTab('cohort')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-soft text-xs font-semibold ${
              dashboardTab === 'cohort'
                ? 'bg-[#0F6E56] text-white'
                : 'text-[#5F5E5A] dark:text-[#AAA9A4]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Cohort
          </button>
          <button
            onClick={() => setDashboardTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-soft text-xs font-semibold ${
              dashboardTab === 'settings'
                ? 'bg-[#0F6E56] text-white'
                : 'text-[#5F5E5A] dark:text-[#AAA9A4]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Settings
          </button>
        </div>
      </div>
    </header>
  );
};
