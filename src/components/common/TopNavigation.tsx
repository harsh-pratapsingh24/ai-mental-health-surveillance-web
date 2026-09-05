import React from 'react';
import {
  Monitor,
  Smartphone,
  Columns,
  Moon,
  Sun,
  Shield,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { useApp, ViewMode } from '../../context/AppContext';

export const TopNavigation: React.FC = () => {
  const { viewMode, setViewMode, isDarkMode, toggleDarkMode } = useApp();

  const modes: { id: ViewMode; label: string; icon: any }[] = [
    { id: 'split', label: 'Live Demo (Split-Screen)', icon: Columns },
    { id: 'counselor', label: 'Counselor Dashboard', icon: Monitor },
    { id: 'mobile', label: 'Survivor Mobile App', icon: Smartphone },
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1C1C1A] border-b border-[#EAE8E3] dark:border-[#3A3A36] px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-soft bg-[#0F6E56] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm text-[#2C2C2A] dark:text-white">
                Aashraya Mental Health System
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#7F77DD]/15 text-[#7F77DD] dark:text-[#A7A1F2]">
                SIH Prototype
              </span>
            </div>
            <p className="text-[10px] text-[#5F5E5A] dark:text-[#8E8D88] hidden sm:block">
              Trauma-Informed Non-Clinical Monitoring & Safe Scripted Chatbot
            </p>
          </div>
        </div>

        {/* Surface View Switcher */}
        <div className="inline-flex p-1 bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] rounded-soft shadow-inner">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-soft text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0F6E56] text-white shadow-sm'
                    : 'text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Theme and Safety Status */}
        <div className="flex items-center gap-2">
          {/* Dark / Light toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-soft bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A] dark:hover:text-white transition-colors"
            title={isDarkMode ? 'Switch to Warm Light Mode' : 'Switch to Charcoal Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#7F77DD]" />}
          </button>
        </div>
      </div>
    </div>
  );
};
