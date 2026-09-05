import React, { useState } from 'react';
import {
  Home,
  MessageCircle,
  TrendingUp,
  Shield,
  User,
  PhoneCall,
  Wifi,
  Battery,
  Signal,
  HeartHandshake,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SplashScreen } from './SplashScreen';
import { LanguageConsent } from './LanguageConsent';
import { AuthScreen } from './AuthScreen';
import { HomeScreen } from './HomeScreen';
import { ChatCheckin } from './ChatCheckin';
import { TrendsScreen } from './TrendsScreen';
import { ResourcesScreen } from './ResourcesScreen';
import { ProfileScreen } from './ProfileScreen';
import { BreathingExercise } from './BreathingExercise';
import { EmergencyHelpModal } from './EmergencyHelpModal';

interface MobileShellProps {
  isFramed?: boolean;
}

export const MobileShell: React.FC<MobileShellProps> = ({ isFramed = true }) => {
  const {
    mobileTab,
    setMobileTab,
    hasConsented,
    isMobileLoggedIn,
    setIsEmergencyModalOpen,
  } = useApp();

  const [onboardingStep, setOnboardingStep] = useState<'splash' | 'consent' | 'auth' | 'main'>(
    hasConsented && isMobileLoggedIn ? 'main' : 'splash'
  );

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const renderContent = () => {
    if (onboardingStep === 'splash') {
      return <SplashScreen onStart={() => setOnboardingStep('consent')} />;
    }
    if (onboardingStep === 'consent') {
      return <LanguageConsent onComplete={() => setOnboardingStep('auth')} />;
    }
    if (onboardingStep === 'auth' || !isMobileLoggedIn) {
      return <AuthScreen onSuccess={() => setOnboardingStep('main')} />;
    }

    switch (mobileTab) {
      case 'home':
        return <HomeScreen />;
      case 'checkin':
        return <ChatCheckin />;
      case 'trends':
        return <TrendsScreen />;
      case 'resources':
        return <ResourcesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'checkin', label: 'Check-in', icon: MessageCircle },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'resources', label: 'Care', icon: Shield },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div
      className={`mx-auto flex flex-col bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-[#FAF9F6] relative overflow-hidden transition-all ${
        isFramed
          ? 'w-full max-w-[390px] h-[780px] rounded-[44px] shadow-2xl border-[10px] border-[#2C2C2A] dark:border-[#3A3A36] ring-1 ring-black/10'
          : 'w-full min-h-screen'
      }`}
    >
      {/* Smartphone Status Bar */}
      <div className="pt-2 px-6 pb-1 bg-transparent flex items-center justify-between text-[11px] font-semibold text-[#2C2C2A] dark:text-white shrink-0 select-none">
        <span>{currentTime}</span>
        {/* Notch / Dynamic Pill */}
        <div className="w-20 h-4 rounded-full bg-black/80 dark:bg-white/20 mx-auto" />
        <div className="flex items-center gap-1.5 opacity-80">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Screen Body */}
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}

        {/* Floating "I Need Help Now" Button (Omnipresent safety feature) */}
        {onboardingStep === 'main' && (
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="absolute bottom-4 right-4 z-40 px-3.5 py-2 rounded-full bg-[#A32D2D] hover:bg-[#852222] text-white text-xs font-bold shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 animate-pulse-subtle"
            title="Immediate emergency and crisis helpline support"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>I Need Help Now</span>
          </button>
        )}
      </div>

      {/* Bottom Nav Bar (Active during main experience) */}
      {onboardingStep === 'main' && (
        <div className="bg-white/90 dark:bg-[#262624]/90 backdrop-blur-md border-t border-[#EAE8E3] dark:border-[#3A3A36] px-3 py-2 flex items-center justify-around shrink-0 z-30">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = mobileTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setMobileTab(item.id as any)}
                className={`flex flex-col items-center gap-0.5 p-1 rounded-soft transition-all ${
                  isActive
                    ? 'text-[#0F6E56] dark:text-[#38B293] font-semibold scale-105'
                    : 'text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A] dark:hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Global Modals in Mobile Scope */}
      <BreathingExercise />
      <EmergencyHelpModal />
    </div>
  );
};
