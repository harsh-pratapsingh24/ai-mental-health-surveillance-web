import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, Wind, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BreathingExercise: React.FC = () => {
  const { isBreathingModalOpen, setIsBreathingModalOpen } = useApp();
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [counter, setCounter] = useState(4);
  const [cycleCount, setCycleCount] = useState(1);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isBreathingModalOpen || !isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase transitions: Inhale (4s) -> Hold (7s) -> Exhale (8s)
        if (phase === 'inhale') {
          setPhase('hold');
          return 7;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 8;
        } else {
          setPhase('inhale');
          setCycleCount((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingModalOpen, isActive, phase]);

  if (!isBreathingModalOpen) return null;

  const phaseInstruction = {
    inhale: {
      text: 'Gently breathe in through your nose...',
      circleScale: 'scale-125 bg-[#0F6E56]/20 border-[#0F6E56]',
      color: 'text-[#0F6E56] dark:text-[#38B293]',
      label: 'INHALE',
      totalSec: 4,
    },
    hold: {
      text: 'Hold your breath gently and rest in this stillness...',
      circleScale: 'scale-125 bg-[#7F77DD]/25 border-[#7F77DD]',
      color: 'text-[#7F77DD] dark:text-[#A7A1F2]',
      label: 'HOLD',
      totalSec: 7,
    },
    exhale: {
      text: 'Slowly release all tension through your mouth...',
      circleScale: 'scale-90 bg-[#639922]/15 border-[#639922]',
      color: 'text-[#639922] dark:text-[#88C63E]',
      label: 'EXHALE',
      totalSec: 8,
    },
  }[phase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-[#FAF9F6] dark:bg-[#1C1C1A] rounded-soft-xl shadow-2xl border border-[#EAE8E3] dark:border-[#3A3A36] p-6 text-center space-y-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsBreathingModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-[#5F5E5A] hover:text-[#2C2C2A] dark:hover:text-white hover:bg-black/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F6E56]/10 text-[#0F6E56] dark:text-[#38B293] text-xs font-semibold">
            <Wind className="w-3.5 h-3.5" /> 4-7-8 Calming Breath
          </div>
          <h3 className="font-heading font-bold text-lg text-[#2C2C2A] dark:text-white">
            Nervous System Reset
          </h3>
          <p className="text-xs text-[#5F5E5A] dark:text-[#8E8D88]">
            Cycle {cycleCount} • Allow your shoulders to drop
          </p>
        </div>

        {/* Dynamic Breathing Circle Visualizer */}
        <div className="py-6 flex items-center justify-center relative">
          {/* Outer Ripple */}
          <div
            className={`w-56 h-56 rounded-full border-2 transition-all duration-1000 ease-in-out flex items-center justify-center shadow-inner ${phaseInstruction.circleScale}`}
          >
            {/* Inner Core */}
            <div className="w-36 h-36 rounded-full bg-white dark:bg-[#262624] shadow-lg flex flex-col items-center justify-center p-4 border border-[#EAE8E3] dark:border-[#3A3A36] transition-transform duration-700">
              <span className={`text-xs uppercase font-bold tracking-widest ${phaseInstruction.color}`}>
                {phaseInstruction.label}
              </span>
              <span className={`text-4xl font-heading font-extrabold ${phaseInstruction.color} my-1`}>
                {counter}
              </span>
              <span className="text-[10px] text-[#5F5E5A] dark:text-[#8E8D88]">seconds</span>
            </div>
          </div>
        </div>

        {/* Instruction copy */}
        <div className="min-h-[44px]">
          <p className="text-xs font-medium text-[#2C2C2A] dark:text-[#E4E3DF] leading-relaxed">
            {phaseInstruction.text}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-[#EAE8E3] dark:border-[#3A3A36]">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-4 py-2 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] text-xs font-semibold text-[#5F5E5A] dark:text-white hover:bg-black/5"
          >
            {isActive ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={() => setIsBreathingModalOpen(false)}
            className="px-6 py-2 rounded-soft bg-[#0F6E56] hover:bg-[#0C5946] text-white text-xs font-semibold shadow-sm"
          >
            I Feel Calmer Now
          </button>
        </div>
      </div>
    </div>
  );
};
