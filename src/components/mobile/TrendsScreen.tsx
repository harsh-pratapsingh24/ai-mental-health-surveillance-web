import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { TrendingUp, Sparkles, Calendar, Heart, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrendsScreen: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const { cases } = useApp();

  const myCase = cases.find((c) => c.id === 'CASE-7821');
  const logs = myCase?.checkInLogs || [];

  // Transform logs for gentle user chart
  const chartData = logs.map((l) => ({
    date: l.date.split('-').slice(1).join('/'),
    moodScore: l.moodScore,
    gentleLabel:
      l.riskTier === 'low'
        ? 'Steady & Peaceful'
        : l.riskTier === 'medium'
        ? 'A bit heavy'
        : 'Holding deep emotion',
  }));

  const latestTier = myCase?.currentRiskTier || 'low';

  const getGentleSummary = () => {
    if (latestTier === 'high') {
      return {
        title: 'You are carrying deep emotions right now',
        desc: 'It takes immense strength to get through tough days. Remember you never have to navigate this alone — your counselor and gentle breathing tools are here.',
        color: 'text-[#A32D2D] dark:text-[#F19E9E]',
        bg: 'bg-[#A32D2D]/10 dark:bg-[#A32D2D]/20 border-[#A32D2D]/20',
      };
    } else if (latestTier === 'medium') {
      return {
        title: 'A few days have felt tough lately',
        desc: 'You have been persevering through some heavy moments. Taking short rest breaks and resting your mind can help bring ease.',
        color: 'text-[#BA7517] dark:text-[#E49A32]',
        bg: 'bg-[#BA7517]/10 dark:bg-[#BA7517]/20 border-[#BA7517]/20',
      };
    } else {
      return {
        title: 'Your days have been steady and gentle',
        desc: 'You are maintaining a peaceful rhythm. Continuing your daily morning reflections will nurture this safe momentum.',
        color: 'text-[#0F6E56] dark:text-[#38B293]',
        bg: 'bg-[#0F6E56]/10 dark:bg-[#0F6E56]/20 border-[#0F6E56]/20',
      };
    }
  };

  const summary = getGentleSummary();

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 text-[#2C2C2A] dark:text-white">
      {/* Top Header with 7d/30d Toggle */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h3 className="font-heading font-bold text-base text-[#2C2C2A] dark:text-white">
            Your Emotional Journey
          </h3>
          <p className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
            Reflecting on your peaceful progress
          </p>
        </div>

        <div className="inline-flex p-0.5 bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] rounded-soft text-xs">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-2.5 py-1 rounded-soft font-semibold transition-all ${
              timeRange === '7d'
                ? 'bg-[#0F6E56] text-white'
                : 'text-[#5F5E5A] dark:text-[#AAA9A4]'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-2.5 py-1 rounded-soft font-semibold transition-all ${
              timeRange === '30d'
                ? 'bg-[#0F6E56] text-white'
                : 'text-[#5F5E5A] dark:text-[#AAA9A4]'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* "How you've been" Plain Language Summary Card */}
      <div className={`p-4 rounded-soft-lg border space-y-1.5 ${summary.bg}`}>
        <div className="flex items-center gap-2">
          <Sparkles className={`w-4 h-4 ${summary.color}`} />
          <h4 className={`font-heading font-semibold text-xs ${summary.color}`}>
            {summary.title}
          </h4>
        </div>
        <p className="text-[11px] text-[#2C2C2A] dark:text-[#E4E3DF] leading-relaxed">
          {summary.desc}
        </p>
      </div>

      {/* User-Facing Mood Rating Graph */}
      <div className="p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#2C2C2A] dark:text-white flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#0F6E56]" /> Daily Mood Balance (1-10)
          </span>
          <span className="text-[10px] text-[#5F5E5A] dark:text-[#8E8D88]">Higher = Brighter</span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="date" stroke="#5F5E5A" fontSize={10} />
              <YAxis domain={[1, 10]} stroke="#5F5E5A" fontSize={10} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2.5 rounded-soft bg-white dark:bg-[#1C1C1A] shadow-md border border-[#EAE8E3] dark:border-[#3A3A36] text-[11px] space-y-0.5">
                        <p className="font-semibold">{label}</p>
                        <p className="text-[#0F6E56] font-bold">Mood: {data.moodScore}/10</p>
                        <p className="text-[#5F5E5A] italic">{data.gentleLabel}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="moodScore"
                stroke="#0F6E56"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#0F6E56', strokeWidth: 1.5, stroke: '#FFFFFF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Past Check-ins List */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-[#2C2C2A] dark:text-[#FAF9F6] flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#0F6E56]" /> Previous Reflections
        </h4>

        <div className="space-y-2">
          {logs
            .slice()
            .reverse()
            .map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-soft bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-medium text-[#2C2C2A] dark:text-white">{log.date}</span>
                  <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] line-clamp-1 mt-0.5">
                    "{log.sentimentSummary}"
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#0F6E56] dark:text-[#38B293]">
                    {log.moodScore}/10
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
