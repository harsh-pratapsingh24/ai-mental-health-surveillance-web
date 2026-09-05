import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  Heart,
  PhoneCall,
  Wind,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { ChatMessage, ResourceItem, RiskTier } from '../../types';
import {
  SCRIPTED_RESPONSES,
  CLOSING_MESSAGES,
  classifyDistress,
  COPING_RESOURCES,
} from '../../data/chatbotBank';
import { useApp } from '../../context/AppContext';

export const ChatCheckin: React.FC = () => {
  const {
    survivorName,
    addSurvivorCheckIn,
    setMobileTab,
    setIsBreathingModalOpen,
    setIsEmergencyModalOpen,
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: `Hey ${survivorName}, how are you feeling today? Take all the time you need.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<number>(1); // 1 = opening, 2 = follow up, 3 = closing
  const [currentTier, setCurrentTier] = useState<RiskTier>('low');
  const [selectedQuickChip, setSelectedQuickChip] = useState<string | null>(null);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Voice recording simulation
  const toggleVoiceRecording = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setTimeout(() => {
        setIsRecordingVoice(false);
        setInputText("I have been having bad dreams and feeling restless tonight...");
      }, 3000);
    } else {
      setIsRecordingVoice(false);
    }
  };

  const handleSendMessage = (userText: string, chipLabel?: string) => {
    if (!userText.trim() && !chipLabel) return;
    const finalUserText = userText.trim() || chipLabel || '';

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: finalUserText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setSelectedQuickChip(null);
    setIsTyping(true);

    // 2. Classify Distress using deterministic on-device engine
    const analysis = classifyDistress(finalUserText, chipLabel);
    setCurrentTier(analysis.tier);

    // 3. Bot responds from vetted script bank
    setTimeout(() => {
      setIsTyping(false);

      if (step === 1) {
        const responseBank = SCRIPTED_RESPONSES[analysis.tier];
        const selectedScript = responseBank[Math.floor(Math.random() * responseBank.length)];

        const botReplyMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: selectedScript.botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedResources: selectedScript.suggestedResources,
        };

        setMessages((prev) => [...prev, botReplyMsg]);
        setStep(2);
      } else {
        // Step 2 -> Closing card
        const closingText = CLOSING_MESSAGES[analysis.tier];
        const closingMsg: ChatMessage = {
          id: `bot-close-${Date.now()}`,
          sender: 'bot',
          text: closingText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isClosingCard: true,
          suggestedResources: analysis.tier !== 'low' ? [COPING_RESOURCES[0], COPING_RESOURCES[1]] : undefined,
        };

        setMessages((prev) => [...prev, closingMsg]);
        setIsCompleted(true);
        setStep(3);

        // Commit to state and broadcast real-time triage event
        addSurvivorCheckIn(
          analysis.tier === 'low' ? 8 : analysis.tier === 'medium' ? 5 : 2,
          analysis.score,
          analysis.tier,
          finalUserText,
          analysis.flaggedKeywords
        );
      }
    }, 1200);
  };

  const handleSkip = () => {
    addSurvivorCheckIn(7, 20, 'low', 'User elected gentle skip for the day', []);
    setMobileTab('home');
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#FAF9F6] dark:bg-[#1C1C1A] relative text-[#2C2C2A] dark:text-white">
      {/* Top Header */}
      <div className="px-4 py-3 border-b border-[#EAE8E3] dark:border-[#3A3A36] bg-white/70 dark:bg-[#262624]/70 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7F77DD]/20 text-[#7F77DD] dark:text-[#A7A1F2] flex items-center justify-center">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-xs text-[#2C2C2A] dark:text-white">
              Daily Safe Check-in
            </h3>
            <p className="text-[10px] text-[#5F5E5A] dark:text-[#8E8D88]">
              Private • Non-judgmental
            </p>
          </div>
        </div>

        {/* Skip action */}
        <button
          onClick={handleSkip}
          className="text-xs text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#0F6E56] dark:hover:text-[#38B293] underline decoration-dotted"
        >
          Skip for today
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} animate-slide-up`}
            >
              {/* Bubble */}
              <div
                className={`max-w-[85%] p-3.5 rounded-soft-lg text-xs leading-relaxed ${
                  isBot
                    ? 'bg-[#F2F1FD] dark:bg-[#2F2C4A] text-[#2C2C2A] dark:text-[#FAF9F6] border border-[#7F77DD]/20 rounded-tl-none'
                    : 'bg-[#0F6E56] text-white rounded-tr-none shadow-sm'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1.5 ${
                    isBot ? 'text-[#7F77DD] dark:text-[#AAA4F8]' : 'text-white/75'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {/* Contextual Inline Coping / Helpline Resources */}
              {msg.suggestedResources && msg.suggestedResources.length > 0 && (
                <div className="mt-2.5 max-w-[90%] space-y-2">
                  {msg.suggestedResources.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 rounded-soft bg-white dark:bg-[#262624] border border-[#7F77DD]/30 shadow-sm flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-[#0F6E56] dark:text-[#38B293] flex items-center gap-1.5">
                          {res.category === 'breathing' ? (
                            <Wind className="w-3.5 h-3.5" />
                          ) : (
                            <PhoneCall className="w-3.5 h-3.5" />
                          )}
                          <span>{res.title}</span>
                        </div>
                        <p className="text-[10px] text-[#5F5E5A] dark:text-[#AAA9A4] line-clamp-1">
                          {res.description}
                        </p>
                      </div>

                      {res.category === 'breathing' ? (
                        <button
                          onClick={() => setIsBreathingModalOpen(true)}
                          className="px-2.5 py-1 rounded-full bg-[#0F6E56] text-white font-semibold text-[11px] shrink-0"
                        >
                          Start
                        </button>
                      ) : (
                        <a
                          href={`tel:${res.phone}`}
                          className="px-2.5 py-1 rounded-full bg-[#A32D2D] text-white font-semibold text-[11px] shrink-0 flex items-center gap-1"
                        >
                          Call
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Closing check-in complete card */}
              {msg.isClosingCard && (
                <div className="mt-3 p-3.5 rounded-soft-lg bg-[#0F6E56]/10 border border-[#0F6E56]/30 text-center space-y-2 w-full">
                  <CheckCircle2 className="w-6 h-6 text-[#0F6E56] dark:text-[#38B293] mx-auto" />
                  <p className="text-xs font-semibold text-[#0F6E56] dark:text-[#38B293]">
                    Check-in Completed
                  </p>
                  <button
                    onClick={() => setMobileTab('home')}
                    className="w-full py-2 rounded-soft bg-[#0F6E56] text-white text-xs font-semibold"
                  >
                    Return Home
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-soft-lg bg-[#F2F1FD] dark:bg-[#2F2C4A] border border-[#7F77DD]/20 w-16">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7F77DD] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7F77DD] animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7F77DD] animate-bounce [animation-delay:0.4s]" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice recording live wave simulation */}
      {isRecordingVoice && (
        <div className="p-3 bg-[#A32D2D]/10 border-t border-[#A32D2D]/20 flex items-center justify-between px-4 animate-pulse text-xs text-[#A32D2D]">
          <div className="flex items-center gap-2 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A32D2D] animate-ping" />
            <span>Listening to your voice journal...</span>
          </div>
          <button
            onClick={() => setIsRecordingVoice(false)}
            className="text-xs underline font-semibold"
          >
            Stop
          </button>
        </div>
      )}

      {/* Quick Reply Chips (Contextual) */}
      {!isCompleted && step === 1 && (
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto border-t border-[#EAE8E3] dark:border-[#3A3A36] bg-white/50 dark:bg-[#262624]/50">
          {[
            { emoji: '🙂', label: '🙂 Good / Peaceful' },
            { emoji: '😐', label: '😐 Okay / Steady' },
            { emoji: '😔', label: '😔 Not great' },
            { emoji: '😭', label: '😭 Heavy / In Pain' },
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.label, chip.label)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-[#1C1C1A] border border-[#7F77DD]/30 hover:border-[#0F6E56] hover:bg-[#0F6E56]/10 text-xs font-medium text-[#2C2C2A] dark:text-white shrink-0 transition-all shadow-sm"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Input Area */}
      {!isCompleted ? (
        <div className="p-3 border-t border-[#EAE8E3] dark:border-[#3A3A36] bg-white dark:bg-[#262624] space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex items-center gap-2"
          >
            {/* Voice toggle button */}
            <button
              type="button"
              onClick={toggleVoiceRecording}
              className={`p-2.5 rounded-full border transition-all ${
                isRecordingVoice
                  ? 'bg-[#A32D2D] text-white border-[#A32D2D]'
                  : 'bg-[#FAF9F6] dark:bg-[#1C1C1A] border-[#EAE8E3] dark:border-[#3A3A36] text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#0F6E56]'
              }`}
              title="Voice journal"
            >
              {isRecordingVoice ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your thoughts quietly here..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white placeholder-[#5F5E5A] focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2.5 rounded-full transition-all ${
                inputText.trim()
                  ? 'bg-[#0F6E56] hover:bg-[#0C5946] text-white shadow-sm cursor-pointer'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="p-4 bg-white dark:bg-[#262624] border-t border-[#EAE8E3] dark:border-[#3A3A36] text-center">
          <p className="text-xs text-[#5F5E5A] dark:text-[#AAA9A4]">
            Your check-in has been saved quietly.
          </p>
        </div>
      )}
    </div>
  );
};
