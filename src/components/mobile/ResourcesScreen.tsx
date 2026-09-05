import React from 'react';
import { Wind, PhoneCall, Sparkles, Eye, Shield, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COPING_RESOURCES } from '../../data/chatbotBank';

export const ResourcesScreen: React.FC = () => {
  const { setIsBreathingModalOpen } = useApp();

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 text-[#2C2C2A] dark:text-white">
      {/* Header */}
      <div className="pt-1">
        <h3 className="font-heading font-bold text-base text-[#2C2C2A] dark:text-white">
          Supportive Care & Helplines
        </h3>
        <p className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
          Gentle exercises and 24/7 human helplines
        </p>
      </div>

      {/* Breathing CTA Banner */}
      <div className="p-4 rounded-soft-xl bg-[#0F6E56] text-white space-y-2 shadow-md relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Wind className="w-4 h-4" /> Quick Anxiety Reset
        </div>
        <h4 className="font-heading font-bold text-sm">
          4-7-8 Calming Breathing Tool
        </h4>
        <p className="text-[11px] text-white/85 leading-relaxed">
          Gently calm physical tension, racing thoughts, and rapid pulse.
        </p>
        <button
          onClick={() => setIsBreathingModalOpen(true)}
          className="mt-1 px-4 py-2 rounded-soft bg-white text-[#0F6E56] text-xs font-bold shadow-sm hover:bg-[#FAF9F6] transition-colors"
        >
          Begin Breathing (2 min)
        </button>
      </div>

      {/* Sensory 5-4-3-2-1 Grounding Card */}
      <div className="p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] space-y-2.5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#7F77DD] dark:text-[#A7A1F2]">
          <Eye className="w-4 h-4" /> 5-4-3-2-1 Sensory Grounding
        </div>
        <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] leading-relaxed">
          When memories or worry feel loud, bring your attention to the present moment:
        </p>
        <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
          <div className="p-2 rounded-soft bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36]">
            <span className="font-bold text-[#0F6E56] block text-xs">5</span>
            <span>Things you see</span>
          </div>
          <div className="p-2 rounded-soft bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36]">
            <span className="font-bold text-[#0F6E56] block text-xs">4</span>
            <span>Things you touch</span>
          </div>
          <div className="p-2 rounded-soft bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36]">
            <span className="font-bold text-[#0F6E56] block text-xs">3</span>
            <span>Sounds you hear</span>
          </div>
          <div className="p-2 rounded-soft bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36]">
            <span className="font-bold text-[#0F6E56] block text-xs">2</span>
            <span>Scents you smell</span>
          </div>
          <div className="p-2 rounded-soft bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36]">
            <span className="font-bold text-[#0F6E56] block text-xs">1</span>
            <span>Deep breath</span>
          </div>
        </div>
      </div>

      {/* 24/7 Helpline Directory */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-[#0F6E56]" /> Free & Confidential Crisis Lines
        </h4>

        <div className="space-y-2">
          {COPING_RESOURCES.filter((r) => r.phone).map((res) => (
            <div
              key={res.id}
              className="p-3.5 rounded-soft bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] flex items-center justify-between gap-3 text-xs shadow-sm"
            >
              <div>
                <p className="font-semibold text-[#2C2C2A] dark:text-white">{res.title}</p>
                <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] mt-0.5">
                  {res.description}
                </p>
                <p className="text-[11px] font-mono text-[#0F6E56] dark:text-[#38B293] font-semibold mt-1">
                  {res.phone}
                </p>
              </div>

              <a
                href={`tel:${res.phone}`}
                className="px-3 py-1.5 rounded-full bg-[#0F6E56] hover:bg-[#0C5946] text-white font-semibold text-xs shrink-0 flex items-center gap-1 shadow-sm"
              >
                <PhoneCall className="w-3 h-3" /> Call
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
