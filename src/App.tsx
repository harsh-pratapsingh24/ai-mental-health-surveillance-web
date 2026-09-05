import React from 'react';
import { useApp } from './context/AppContext';
import { TopNavigation } from './components/common/TopNavigation';
import { CounselorDashboard } from './components/dashboard/CounselorDashboard';
import { MobileShell } from './components/mobile/MobileShell';
import { SplitDemoView } from './components/demo/SplitDemoView';

export const App: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-[#FAF9F6] transition-colors flex flex-col">
      <TopNavigation />

      <main className="flex-1">
        {viewMode === 'split' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SplitDemoView />
          </div>
        )}

        {viewMode === 'counselor' && <CounselorDashboard />}

        {viewMode === 'mobile' && (
          <div className="max-w-md mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-60px)]">
            <MobileShell isFramed={true} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
