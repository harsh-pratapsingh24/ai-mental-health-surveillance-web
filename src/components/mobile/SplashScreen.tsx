import React from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#FAF9F6] via-[#F2F1FD] to-[#E6F4F0] dark:from-[#1C1C1A] dark:via-[#262624] dark:to-[#1C1C1A] text-center">
      <div className="pt-12 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-soft-xl bg-[#0F6E56] text-white flex items-center justify-center shadow-lg shadow-[#0F6E56]/20">
          <Heart className="w-8 h-8 text-white fill-white/20" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-[#2C2C2A] dark:text-white">
          Aashraya
        </h2>
        <p className="text-xs text-[#5F5E5A] dark:text-[#AAA9A4] max-w-[240px] mx-auto leading-relaxed">
          A safe, gentle space for your daily peace and recovery.
        </p>
      </div>

      <div className="space-y-4 py-8">
        <div className="p-4 rounded-soft-lg bg-white/70 dark:bg-[#262624]/70 backdrop-blur-sm border border-[#EAE8E3] dark:border-[#3A3A36] space-y-2 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F6E56] dark:text-[#38B293]">
            <Sparkles className="w-4 h-4" /> Always Safe & Private
          </div>
          <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] leading-relaxed">
            Take a 1-minute gentle check-in whenever you feel ready. No pressure, no tests, always with care.
          </p>
        </div>
      </div>

      <div className="pb-4">
        <button
          onClick={onStart}
          className="w-full py-3.5 rounded-soft-lg bg-[#0F6E56] hover:bg-[#0C5946] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
