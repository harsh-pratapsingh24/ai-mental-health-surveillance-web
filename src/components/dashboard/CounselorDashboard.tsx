import React from 'react';
import { useApp } from '../../context/AppContext';
import { DashboardHeader } from './DashboardHeader';
import { CaseList } from './CaseList';
import { CaseDetail } from './CaseDetail';
import { CohortView } from './CohortView';
import { SettingsView } from './SettingsView';
import { LiveAlertToast } from './LiveAlertToast';

export const CounselorDashboard: React.FC = () => {
  const { dashboardTab, selectedCaseId } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-[#FAF9F6] transition-colors">
      <DashboardHeader />
      <LiveAlertToast />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {selectedCaseId ? (
          <CaseDetail />
        ) : (
          <>
            {dashboardTab === 'cases' && <CaseList />}
            {dashboardTab === 'cohort' && <CohortView />}
            {dashboardTab === 'settings' && <SettingsView />}
          </>
        )}
      </main>
    </div>
  );
};
