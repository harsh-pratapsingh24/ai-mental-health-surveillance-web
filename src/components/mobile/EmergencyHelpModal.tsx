import React, { useState } from 'react';
import { PhoneCall, HeartHandshake, ShieldAlert, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { eventBus } from '../../services/eventBus';

export const EmergencyHelpModal: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, setIsBreathingModalOpen } = useApp();
  const [requestedCounselor, setRequestedCounselor] = useState(false);

  if (!isEmergencyModalOpen) return null;

  const handleRequestOutbound = () => {
    setRequestedCounselor(true);
    eventBus.publishFlaggedCase(
      'CASE-7821',
      'high',
      'Survivor pressed "Request Urgent Counselor Call" in Emergency Support'
    );
  };

  const handleOpenBreathing = () => {
    setIsEmergencyModalOpen(false);
    setIsBreathingModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-[#FAF9F6] dark:bg-[#262624] rounded-soft-xl shadow-2xl border border-[#A32D2D]/30 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#A32D2D]/10 dark:bg-[#A32D2D]/20 border-b border-[#A32D2D]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#A32D2D] dark:text-[#F19E9E]">
            <HeartHandshake className="w-6 h-6" />
            <div>
              <h3 className="font-heading font-bold text-base">You Are Not Alone</h3>
              <p className="text-[11px] opacity-85">Help and care are available right now</p>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="p-1 rounded-full text-[#5F5E5A] hover:text-[#2C2C2A] dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          <p className="text-[#2C2C2A] dark:text-[#FAF9F6] leading-relaxed">
            If you are feeling overwhelmed, unsafe, or in intense distress, please tap below to connect with a kind counselor immediately.
          </p>

          {/* Quick Helplines */}
          <div className="space-y-2">
            <a
              href="tel:18005990019"
              className="w-full p-3 rounded-soft bg-white dark:bg-[#1C1C1A] border border-[#0F6E56]/30 hover:border-[#0F6E56] flex items-center justify-between transition-all group shadow-sm"
            >
              <div>
                <p className="font-semibold text-[#0F6E56] dark:text-[#38B293] text-xs">
                  KIRAN National 24/7 Helpline
                </p>
                <p className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
                  Toll-Free • Free & Confidential
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-[#0F6E56] text-white font-semibold text-xs flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" /> Call 1800-599-0019
              </span>
            </a>

            <a
              href="tel:14416"
              className="w-full p-3 rounded-soft bg-white dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36] hover:border-[#0F6E56] flex items-center justify-between transition-all group"
            >
              <div>
                <p className="font-semibold text-[#2C2C2A] dark:text-white text-xs">
                  Tele-MANAS Government Line
                </p>
                <p className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
                  Available in all Indian Languages
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-[#0F6E56]/10 text-[#0F6E56] dark:text-[#38B293] font-semibold text-xs flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" /> Call 14416
              </span>
            </a>
          </div>

          {/* Direct Outbound Counselor Request */}
          <div className="p-3 rounded-soft bg-[#7F77DD]/10 dark:bg-[#7F77DD]/20 border border-[#7F77DD]/25 space-y-2">
            <p className="font-semibold text-[#7F77DD] dark:text-[#A7A1F2] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Request Outbound Counselor Call
            </p>
            <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] leading-relaxed">
              Prefer someone from our rehabilitation team to call you quietly? Tap below to alert Dr. Ananya.
            </p>
            {requestedCounselor ? (
              <div className="p-2 rounded bg-[#0F6E56]/10 text-[#0F6E56] dark:text-[#38B293] font-medium text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Request received. Counselor will reach out shortly.
              </div>
            ) : (
              <button
                onClick={handleRequestOutbound}
                className="w-full py-2 rounded-soft bg-[#7F77DD] hover:bg-[#6E66CD] text-white font-semibold text-xs transition-colors"
              >
                Notify Counselor for Check-in
              </button>
            )}
          </div>

          {/* Fast Grounding Breathing Alternative */}
          <button
            onClick={handleOpenBreathing}
            className="w-full py-2.5 rounded-soft border border-[#0F6E56] text-[#0F6E56] dark:text-[#38B293] hover:bg-[#0F6E56]/10 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            Start Gentle 4-7-8 Breathing Instead
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 bg-black/5 dark:bg-black/20 border-t border-[#EAE8E3] dark:border-[#3A3A36] text-center">
          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="text-xs text-[#5F5E5A] hover:text-[#2C2C2A] dark:hover:text-white"
          >
            Close this dialog
          </button>
        </div>
      </div>
    </div>
  );
};
