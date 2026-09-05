import React, { useState } from 'react';
import { AlertTriangle, X, ShieldAlert, PhoneCall, CheckCircle2 } from 'lucide-react';
import { CaseRecord } from '../../types';
import { RiskBadge } from '../common/RiskBadge';

interface EscalateModalProps {
  caseRecord: CaseRecord;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EscalateModal: React.FC<EscalateModalProps> = ({
  caseRecord,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'field_worker' | 'tele_crisis' | 'ngo_director'>('tele_crisis');
  const [urgencyNote, setUrgencyNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleEscalate = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onConfirm();
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#FAF9F6] dark:bg-[#262624] rounded-soft-lg shadow-2xl border border-[#EAE8E3] dark:border-[#3A3A36] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE8E3] dark:border-[#3A3A36] flex items-center justify-between bg-[#A32D2D]/5 dark:bg-[#A32D2D]/15">
          <div className="flex items-center gap-2.5 text-[#A32D2D] dark:text-[#E06666]">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-heading font-semibold text-lg">Confirm Case Escalation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#5F5E5A] hover:text-[#2C2C2A] dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-soft bg-white dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36]">
            <div>
              <p className="text-xs text-[#5F5E5A] dark:text-[#8E8D88]">Case Identification</p>
              <p className="text-base font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] font-mono">
                {caseRecord.id}
              </p>
            </div>
            <RiskBadge tier={caseRecord.currentRiskTier} score={caseRecord.currentRiskScore} />
          </div>

          <div className="p-3.5 rounded-soft bg-[#A32D2D]/10 dark:bg-[#A32D2D]/20 border border-[#A32D2D]/20 text-[#A32D2D] dark:text-[#F19E9E] text-xs leading-relaxed flex gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              <strong>Protocol Notice:</strong> Escalating this case will immediately notify the emergency response field supervisor and activate tele-crisis counseling for {caseRecord.demographicHint}.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6]">
              Dispatch Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'tele_crisis', label: 'Tele-Crisis Unit', desc: 'Direct Counselor Outbound' },
                { id: 'field_worker', label: 'Field Response', desc: 'On-site Outreach' },
                { id: 'ngo_director', label: 'NGO Supervisor', desc: 'Case Review Tier 2' },
              ].map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => setSelectedChannel(channel.id as any)}
                  className={`p-2.5 text-left rounded-soft border text-xs transition-all ${
                    selectedChannel === channel.id
                      ? 'border-[#0F6E56] bg-[#0F6E56]/10 text-[#0F6E56] dark:text-[#38B293] font-semibold ring-1 ring-[#0F6E56]'
                      : 'border-[#EAE8E3] dark:border-[#3A3A36] bg-white dark:bg-[#1C1C1A] text-[#5F5E5A] dark:text-[#AAA9A4] hover:border-[#0F6E56]/50'
                  }`}
                >
                  <div className="font-medium text-xs">{channel.label}</div>
                  <div className="text-[10px] opacity-75">{channel.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6]">
              Counselor Urgency Memo (Optional)
            </label>
            <textarea
              value={urgencyNote}
              onChange={(e) => setUrgencyNote(e.target.value)}
              placeholder="e.g. Survivor experiencing active panic symptoms; request female counselor for outbound call..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-white dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/5 dark:bg-black/20 border-t border-[#EAE8E3] dark:border-[#3A3A36] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitted}
            className="px-4 py-2 text-xs font-semibold text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A] dark:hover:text-white rounded-soft transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleEscalate}
            disabled={isSubmitted}
            className="px-5 py-2 text-xs font-semibold bg-[#A32D2D] hover:bg-[#852222] text-white rounded-soft shadow-sm transition-all flex items-center gap-1.5"
          >
            {isSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-spin" /> Escalating...
              </>
            ) : (
              <>
                <PhoneCall className="w-4 h-4" /> Confirm & Escalate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
