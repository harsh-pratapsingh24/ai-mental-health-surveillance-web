import React from 'react';
import {
  Flame,
  MessageCircleHeart,
  TrendingUp,
  Wind,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CalendarCheck,
  Heart,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HomeScreen: React.FC = () => {
  const {
    survivorName,
    streakCount,
    setMobileTab,
    setIsBreathingModalOpen,
    cases,
  } = useApp();

  // Find survivor's case (CASE-7821)
  const myCase = cases.find((c) => c.id === 'CASE-7821');
  const lastScore = myCase?.currentRiskScore ?? 45;

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 text-[#2C2C2A] dark:text-white">
      {/* Top Greeting & Streak Badge */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-medium text-[#5F5E5A] dark:text-[#8E8D88] flex items-center gap-1">
            <Heart className="w-3 h-3 text-[#0F6E56] fill-current" /> Safe Space
          </span>
          <h2 className="font-heading font-bold text-xl text-[#2C2C2A] dark:text-white">
            Hi, {survivorName}
          </h2>
        </div>

        {/* Streak Pill */}
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#BA7517]/15 text-[#BA7517] dark:text-[#E49A32] border border-[#BA7517]/25 text-xs font-bold shadow-sm">
          <Flame className="w-4 h-4 fill-current text-[#BA7517]" />
          <span>{streakCount} Day Streak</span>
        </div>
      </div>

      {/* Gentle Affirmation Card */}
      <div className="p-3.5 rounded-soft-lg bg-gradient-to-r from-[#0F6E56]/10 via-[#7F77DD]/10 to-[#FAF9F6] dark:from-[#0F6E56]/20 dark:via-[#7F77DD]/20 dark:to-[#262624] border border-[#0F6E56]/20 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-[#0F6E56] dark:text-[#38B293] shrink-0" />
        <p className="text-xs text-[#2C2C2A] dark:text-[#E4E3DF] leading-relaxed">
          "One breath at a time. Healing is not a race, it is returning home to your own peace."
        </p>
      </div>

      {/* Primary CTA: Large "Check In Today" Button */}
      <div className="p-5 rounded-soft-xl bg-white dark:bg-[#262624] border border-[#0F6E56]/30 shadow-md text-center space-y-3 relative overflow-hidden group">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#0F6E56]/15 text-[#0F6E56] dark:text-[#38B293] flex items-center justify-center transition-transform group-hover:scale-110">
          <MessageCircleHeart className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h3 className="font-heading font-bold text-base text-[#2C2C2A] dark:text-white">
            How are you feeling today?
          </h3>
          <p className="text-xs text-[#5F5E5A] dark:text-[#AAA9A4] max-w-[220px] mx-auto">
            Take 60 seconds for a quiet reflection.
          </p>
        </div>

        <button
          onClick={() => setMobileTab('checkin')}
          className="w-full py-3 rounded-soft-lg bg-[#0F6E56] hover:bg-[#0C5946] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
        >
          <span>Check In Today</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mini Trend Graph Preview Card */}
      <div
        onClick={() => setMobileTab('trends')}
        className="p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm flex items-center justify-between cursor-pointer hover:border-[#0F6E56]/40 transition-colors group"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F6E56] dark:text-[#38B293]">
            <TrendingUp className="w-4 h-4" />
            <span>Weekly Wellness Journey</span>
          </div>
          <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4]">
            {lastScore < 40
              ? 'Your days have felt steady this week.'
              : 'You have been carrying some heavy emotions.'}
          </p>
        </div>

        <span className="p-2 rounded-full bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#5F5E5A] group-hover:text-[#0F6E56] group-hover:translate-x-1 transition-all">
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>

      {/* Quick Calming Tools */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6]">
          Gentle Daily Practices
        </h4>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setIsBreathingModalOpen(true)}
            className="p-3 rounded-soft bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] hover:border-[#0F6E56] text-left transition-all group"
          >
            <Wind className="w-5 h-5 text-[#0F6E56] dark:text-[#38B293] mb-1.5 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-xs text-[#2C2C2A] dark:text-white">4-7-8 Breath</p>
            <p className="text-[10px] text-[#5F5E5A] dark:text-[#8E8D88]">2 min relaxation</p>
          </button>

          <button
            onClick={() => setMobileTab('resources')}
            className="p-3 rounded-soft bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] hover:border-[#7F77DD] text-left transition-all group"
          >
            <ShieldCheck className="w-5 h-5 text-[#7F77DD] dark:text-[#A7A1F2] mb-1.5 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-xs text-[#2C2C2A] dark:text-white">Coping Library</p>
            <p className="text-[10px] text-[#5F5E5A] dark:text-[#8E8D88]">Safe guides & lines</p>
          </button>
        </div>
      </div>
    </div>
  );
};
