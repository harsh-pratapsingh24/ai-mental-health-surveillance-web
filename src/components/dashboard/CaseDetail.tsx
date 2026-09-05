import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Save,
  PhoneCall,
  Shield,
  Activity,
  Tag,
  Check,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { EscalateModal } from './EscalateModal';

export const CaseDetail: React.FC = () => {
  const {
    selectedCaseId,
    setSelectedCaseId,
    cases,
    updateCaseNote,
    toggleCaseReviewed,
    escalateCase,
  } = useApp();

  const caseData = cases.find((c) => c.id === selectedCaseId);

  const [noteText, setNoteText] = useState(caseData?.counselorNotes || '');
  const [noteSaved, setNoteSaved] = useState(false);
  const [isEscalateOpen, setIsEscalateOpen] = useState(false);

  if (!caseData) {
    return (
      <div className="p-8 text-center text-[#5F5E5A]">
        <p>Case not found or unselected.</p>
        <button
          onClick={() => setSelectedCaseId(null)}
          className="mt-3 text-xs font-semibold text-[#0F6E56] underline"
        >
          Return to Case List
        </button>
      </div>
    );
  }

  // Format chart data
  const chartData = caseData.checkInLogs.map((log) => ({
    date: log.date.split('-').slice(1).join('/'),
    fullDate: log.date,
    riskScore: log.riskScore,
    moodScore: log.moodScore,
    tier: log.riskTier,
  }));

  const handleSaveNote = () => {
    updateCaseNote(caseData.id, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleConfirmEscalation = () => {
    escalateCase(caseData.id);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Back button, reviewed toggle, Escalate button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EAE8E3] dark:border-[#3A3A36]">
        <button
          onClick={() => setSelectedCaseId(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#0F6E56] dark:hover:text-[#38B293] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Cases
        </button>

        <div className="flex items-center gap-2.5">
          {/* Mark as reviewed */}
          <button
            onClick={() => toggleCaseReviewed(caseData.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-soft text-xs font-semibold transition-all ${
              caseData.reviewed
                ? 'bg-[#0F6E56] text-white shadow-sm'
                : 'border border-[#0F6E56] text-[#0F6E56] dark:text-[#38B293] hover:bg-[#0F6E56]/10'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {caseData.reviewed ? 'Marked as Reviewed' : 'Mark as Reviewed'}
          </button>

          {/* Escalate button - Outlined per spec */}
          <button
            onClick={() => setIsEscalateOpen(true)}
            disabled={caseData.escalated}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-soft text-xs font-semibold transition-all border ${
              caseData.escalated
                ? 'border-[#A32D2D]/40 text-[#A32D2D] bg-[#A32D2D]/10 cursor-default opacity-80'
                : 'border-[#A32D2D] text-[#A32D2D] dark:text-[#F19E9E] hover:bg-[#A32D2D]/10 shadow-sm'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            {caseData.escalated ? 'Escalated Active' : 'Escalate Now'}
          </button>
        </div>
      </div>

      {/* Case Header Card */}
      <div className="bg-white dark:bg-[#262624] p-5 rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-heading font-bold text-xl text-[#2C2C2A] dark:text-white font-mono">
              {caseData.id}
            </h2>
            <RiskBadge tier={caseData.currentRiskTier} score={caseData.currentRiskScore} size="lg" />
            {caseData.escalated && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#A32D2D] text-white">
                Escalated on {caseData.escalationDate}
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#5F5E5A] dark:text-[#AAA9A4]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#0F6E56]" />
              {caseData.region} ({caseData.demographicHint})
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#0F6E56]" />
              Enrolled: {caseData.enrollmentDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0F6E56]" />
              Latest Check-in: {caseData.lastCheckInDate}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-soft bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36] text-xs">
          <p className="font-semibold text-[#2C2C2A] dark:text-white">Assigned Primary Care</p>
          <p className="text-[#0F6E56] dark:text-[#38B293] font-medium mt-0.5">{caseData.assignedCounselor}</p>
          <p className="text-[10px] text-[#5F5E5A] dark:text-[#8E8D88]">{caseData.cohort}</p>
        </div>
      </div>

      {/* Recharts Longitudinal Risk Score Trend Line with Risk-Zone Bands */}
      <div className="bg-white dark:bg-[#262624] p-5 rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-sm text-[#2C2C2A] dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0F6E56]" /> Longitudinal Distress Trajectory
            </h3>
            <p className="text-xs text-[#5F5E5A] dark:text-[#8E8D88]">
              Risk score index over time (0 = High Stability, 100 = Severe Concern)
            </p>
          </div>
        </div>

        {/* Chart Area with Risk Zone Background Bands */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E3" opacity={0.6} />
              
              {/* Risk Zone Background Shading */}
              <ReferenceArea y1={70} y2={100} fill="#A32D2D" fillOpacity={0.08} />
              <ReferenceArea y1={35} y2={70} fill="#BA7517" fillOpacity={0.06} />
              <ReferenceArea y1={0} y2={35} fill="#639922" fillOpacity={0.06} />

              <XAxis dataKey="date" stroke="#5F5E5A" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#5F5E5A" fontSize={11} />
              
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 rounded-soft bg-white dark:bg-[#1C1C1A] shadow-xl border border-[#EAE8E3] dark:border-[#3A3A36] text-xs space-y-1">
                        <p className="font-semibold text-[#2C2C2A] dark:text-white">
                          Date: {data.fullDate}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[#5F5E5A] dark:text-[#AAA9A4]">Distress Score:</span>
                          <span className="font-bold text-[#0F6E56] dark:text-[#38B293]">
                            {data.riskScore}/100
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#5F5E5A] dark:text-[#AAA9A4]">Self Mood Rating:</span>
                          <span className="font-semibold">{data.moodScore}/10</span>
                        </div>
                        <RiskBadge tier={data.tier} size="sm" />
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="riskScore"
                stroke="#0F6E56"
                strokeWidth={3}
                dot={{ r: 5, fill: '#0F6E56', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 7, fill: '#0F6E56', stroke: '#7F77DD', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Color Legend below chart */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 border-t border-[#EAE8E3] dark:border-[#3A3A36] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#639922]/30 border border-[#639922]" />
            <span className="text-[#5F5E5A] dark:text-[#AAA9A4]">Low Concern Zone (0 - 35)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#BA7517]/30 border border-[#BA7517]" />
            <span className="text-[#5F5E5A] dark:text-[#AAA9A4]">Moderate Concern Zone (35 - 70)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#A32D2D]/30 border border-[#A32D2D]" />
            <span className="text-[#5F5E5A] dark:text-[#AAA9A4]">High Distress Zone (70 - 100)</span>
          </div>
        </div>
      </div>

      {/* Grid: Check-in Logs List & Counselor Private Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check-in Log List */}
        <div className="bg-white dark:bg-[#262624] p-5 rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAE8E3] dark:border-[#3A3A36]">
            <h3 className="font-heading font-semibold text-sm text-[#2C2C2A] dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0F6E56]" /> Check-In Journal Summary
            </h3>
            <span className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
              {caseData.checkInLogs.length} Records
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {caseData.checkInLogs
              .slice()
              .reverse()
              .map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-soft bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#2C2C2A] dark:text-white">{log.date}</span>
                      <span className="text-[#5F5E5A] dark:text-[#8E8D88]">{log.timestamp}</span>
                    </div>
                    <RiskBadge tier={log.riskTier} score={log.riskScore} size="sm" />
                  </div>

                  <p className="text-[#2C2C2A] dark:text-[#E4E3DF] leading-relaxed">
                    {log.sentimentSummary}
                  </p>

                  {/* Flagged keywords if any */}
                  {log.flaggedKeywords && log.flaggedKeywords.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <Tag className="w-3 h-3 text-[#A32D2D] opacity-70" />
                      <span className="text-[10px] text-[#5F5E5A] dark:text-[#8E8D88]">Flagged cues:</span>
                      {log.flaggedKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-[#A32D2D]/10 text-[#A32D2D] dark:text-[#F19E9E]"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Counselor Private Notes */}
        <div className="bg-white dark:bg-[#262624] p-5 rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE8E3] dark:border-[#3A3A36]">
              <h3 className="font-heading font-semibold text-sm text-[#2C2C2A] dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0F6E56]" /> Counselor Clinical & Follow-Up Notes
              </h3>
              <span className="text-[10px] text-[#0F6E56] font-semibold bg-[#0F6E56]/10 px-2 py-0.5 rounded-full">
                Confidential
              </span>
            </div>

            <p className="text-xs text-[#5F5E5A] dark:text-[#8E8D88] my-2">
              Private notes are encrypted and accessible only to authorized relief supervisors and assigned trauma counselors.
            </p>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Record clinical observations, trauma stabilization plans, support network contacts, and scheduled check-in reminders..."
              rows={9}
              className="w-full text-xs p-3 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6] dark:bg-[#1C1C1A] text-[#2C2C2A] dark:text-white placeholder-[#5F5E5A] focus:outline-none focus:ring-2 focus:ring-[#0F6E56] leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#EAE8E3] dark:border-[#3A3A36]">
            <span className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
              {noteSaved ? (
                <span className="text-[#3B6D11] dark:text-[#68B227] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Note saved successfully
                </span>
              ) : (
                'Last updated: Today'
              )}
            </span>

            <button
              onClick={handleSaveNote}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-soft text-xs font-semibold bg-[#0F6E56] hover:bg-[#0C5946] text-white shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" /> Save Note
            </button>
          </div>
        </div>
      </div>

      {/* Escalation Modal */}
      <EscalateModal
        caseRecord={caseData}
        isOpen={isEscalateOpen}
        onClose={() => setIsEscalateOpen(false)}
        onConfirm={handleConfirmEscalation}
      />
    </div>
  );
};
