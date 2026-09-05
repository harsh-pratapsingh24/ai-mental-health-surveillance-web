import React from 'react';
import { MobileShell } from '../mobile/MobileShell';
import { CaseList } from '../dashboard/CaseList';
import { CaseDetail } from '../dashboard/CaseDetail';
import { LiveAlertToast } from '../dashboard/LiveAlertToast';
import { useApp } from '../../context/AppContext';
import { Shield, Sparkles, Smartphone, MonitorCheck, ArrowRight } from 'lucide-react';

export const SplitDemoView: React.FC = () => {
  const { selectedCaseId } = useApp();

  return (
    <div className="space-y-4">
      {/* Interactive Demonstration Banner */}
      <div className="p-4 rounded-soft-lg bg-gradient-to-r from-[#0F6E56]/15 via-[#7F77DD]/15 to-transparent border border-[#0F6E56]/30 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-soft bg-[#0F6E56] text-white shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-heading font-bold text-sm text-[#2C2C2A] dark:text-white">
              End-to-End Live Interactive Demonstration
            </h4>
            <p className="text-[#5F5E5A] dark:text-[#AAA9A4] leading-relaxed">
              <strong>Try it now:</strong> Complete a check-in on the <strong>Survivor Mobile App (Left)</strong> using phrases like <em>"I feel terrified and had a bad flashback"</em>. Watch the <strong>Counselor Triage Feed (Right)</strong> receive an instant real-time live alert and update longitudinal risk trajectory!
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Dual Surface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Survivor Mobile App Companion (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#EAE8E3] dark:border-[#3A3A36] text-xs">
            <span className="font-semibold text-[#0F6E56] dark:text-[#38B293] flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" /> Survivor Mobile Experience
            </span>
            <span className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
              Non-Clinical Daily Companion
            </span>
          </div>
          <MobileShell isFramed={true} />
        </div>

        {/* Right Column: Counselor Triage Dashboard (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#262624] p-5 rounded-soft-xl border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm min-h-[780px]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAE8E3] dark:border-[#3A3A36] text-xs">
            <div className="flex items-center gap-2">
              <MonitorCheck className="w-4 h-4 text-[#0F6E56]" />
              <h3 className="font-heading font-bold text-sm text-[#2C2C2A] dark:text-white">
                NGO Clinical & Field Triage View
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F6E56] dark:text-[#38B293]">
              <span className="w-2 h-2 rounded-full bg-[#0F6E56] animate-pulse" />
              <span>Real-Time WebSocket Feed Active</span>
            </div>
          </div>

          <LiveAlertToast />

          {selectedCaseId ? <CaseDetail /> : <CaseList />}
        </div>
      </div>
    </div>
  );
};
