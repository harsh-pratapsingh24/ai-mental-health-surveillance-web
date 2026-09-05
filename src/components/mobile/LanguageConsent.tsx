import React, { useState } from 'react';
import { Globe, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LanguageConsentProps {
  onComplete: () => void;
}

export const LanguageConsent: React.FC<LanguageConsentProps> = ({ onComplete }) => {
  const { selectedLanguage, setSelectedLanguage, hasConsented, setHasConsented } = useApp();
  const [agreed, setAgreed] = useState(hasConsented);

  const languages = [
    { id: 'English', label: 'English', native: 'English' },
    { id: 'Hindi', label: 'Hindi', native: 'हिंदी' },
    { id: 'Bengali', label: 'Bengali', native: 'বাংলা' },
    { id: 'Assamese', label: 'Assamese', native: 'অসমীয়া' },
    { id: 'Odia', label: 'Odia', native: 'ଓଡ଼ିଆ' },
    { id: 'Tamil', label: 'Tamil', native: 'தமிழ்' },
  ];

  const handleContinue = () => {
    if (agreed) {
      setHasConsented(true);
      onComplete();
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white">
      <div className="space-y-6 pt-2">
        {/* Language Selection */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#0F6E56] dark:text-[#38B293]">
            <Globe className="w-4 h-4" />
            <h3 className="font-heading font-semibold text-sm">Choose Your Language</h3>
          </div>
          <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] mb-3">
            Select the language you feel most comfortable reading and listening in.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setSelectedLanguage(lang.id)}
                className={`p-2.5 rounded-soft border text-left transition-all ${
                  selectedLanguage === lang.id
                    ? 'bg-[#0F6E56]/10 border-[#0F6E56] text-[#0F6E56] dark:text-[#38B293] font-semibold ring-1 ring-[#0F6E56]'
                    : 'bg-white dark:bg-[#262624] border-[#EAE8E3] dark:border-[#3A3A36] text-[#5F5E5A] dark:text-[#AAA9A4]'
                }`}
              >
                <div className="text-xs">{lang.native}</div>
                <div className="text-[10px] opacity-75 font-normal">{lang.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Plain-Language Consent */}
        <div className="space-y-3 p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36]">
          <div className="flex items-center gap-2 text-[#0F6E56] dark:text-[#38B293]">
            <ShieldCheck className="w-4 h-4" />
            <h4 className="font-heading font-semibold text-xs">How We Protect Your Peace & Privacy</h4>
          </div>
          <ul className="space-y-2 text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56] shrink-0 mt-1.5" />
              <span>
                <strong>Your check-ins are private:</strong> Only anonymized distress trends are shared with trained trauma counselors to provide support when needed.
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56] shrink-0 mt-1.5" />
              <span>
                <strong>You are always in control:</strong> You can skip any question or delete your check-in history anytime from profile settings.
              </span>
            </li>
          </ul>

          <label className="flex items-start gap-2 pt-2 border-t border-[#EAE8E3] dark:border-[#3A3A36] cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded text-[#0F6E56] focus:ring-[#0F6E56]"
            />
            <span className="text-[11px] font-medium text-[#2C2C2A] dark:text-white">
              I understand and agree to receive supportive check-in prompts.
            </span>
          </label>
        </div>
      </div>

      <div className="pb-4">
        <button
          onClick={handleContinue}
          disabled={!agreed}
          className={`w-full py-3.5 rounded-soft-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
            agreed
              ? 'bg-[#0F6E56] hover:bg-[#0C5946] text-white shadow-md cursor-pointer'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
