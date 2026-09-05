import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { BarChart3, TrendingDown, Users, ShieldAlert, HeartHandshake } from 'lucide-react';
import { COHORT_TREND_7D, COHORT_TREND_30D } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const CohortView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const { cases } = useApp();

  const activeData = timeRange === '7d' ? COHORT_TREND_7D : COHORT_TREND_30D;

  const totalCases = cases.length;
  const highRisk = cases.filter((c) => c.currentRiskTier === 'high').length;
  const medRisk = cases.filter((c) => c.currentRiskTier === 'medium').length;
  const lowRisk = cases.filter((c) => c.currentRiskTier === 'low').length;

  const avgRisk = Math.round(
    cases.reduce((sum, c) => sum + c.currentRiskScore, 0) / (totalCases || 1)
  );

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm">
          <div className="flex items-center justify-between text-[#5F5E5A] dark:text-[#8E8D88] text-xs">
            <span>Overall Population Avg</span>
            <Users className="w-4 h-4 text-[#0F6E56]" />
          </div>
          <p className="text-2xl font-heading font-bold text-[#0F6E56] dark:text-[#38B293] mt-1">
            {avgRisk} <span className="text-xs font-normal text-[#5F5E5A]">/ 100</span>
          </p>
          <p className="text-[11px] text-[#639922] mt-1 font-medium flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" /> 4.2% lower distress vs last month
          </p>
        </div>

        <div className="p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm">
          <div className="flex items-center justify-between text-[#5F5E5A] dark:text-[#8E8D88] text-xs">
            <span>High Concern Proportion</span>
            <ShieldAlert className="w-4 h-4 text-[#A32D2D]" />
          </div>
          <p className="text-2xl font-heading font-bold text-[#A32D2D] dark:text-[#E06666] mt-1">
            {Math.round((highRisk / totalCases) * 100)}%
          </p>
          <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] mt-1">
            {highRisk} active flagged survivors
          </p>
        </div>

        <div className="p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm">
          <div className="flex items-center justify-between text-[#5F5E5A] dark:text-[#8E8D88] text-xs">
            <span>Moderate Concern Proportion</span>
            <HeartHandshake className="w-4 h-4 text-[#BA7517]" />
          </div>
          <p className="text-2xl font-heading font-bold text-[#BA7517] dark:text-[#E49A32] mt-1">
            {Math.round((medRisk / totalCases) * 100)}%
          </p>
          <p className="text-[11px] text-[#5F5E5A] dark:text-[#AAA9A4] mt-1">
            {medRisk} survivors monitored weekly
          </p>
        </div>

        <div className="p-4 rounded-soft-lg bg-white dark:bg-[#262624] border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm">
          <div className="flex items-center justify-between text-[#5F5E5A] dark:text-[#8E8D88] text-xs">
            <span>Stable / Low Risk</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#639922]" />
          </div>
          <p className="text-2xl font-heading font-bold text-[#639922] dark:text-[#88C63E] mt-1">
            {Math.round((lowRisk / totalCases) * 100)}%
          </p>
          <p className="text-[11px] text-[#639922] mt-1 font-medium">
            {lowRisk} survivors in maintenance
          </p>
        </div>
      </div>

      {/* Aggregate Trend Chart with Time Toggle */}
      <div className="bg-white dark:bg-[#262624] p-5 rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-semibold text-sm text-[#2C2C2A] dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#0F6E56]" /> Aggregated Longitudinal Distress Index
            </h3>
            <p className="text-xs text-[#5F5E5A] dark:text-[#8E8D88]">
              Mean anonymized distress scores across all survivor cohorts
            </p>
          </div>

          {/* Time range toggle */}
          <div className="inline-flex p-1 bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36] rounded-soft">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 text-xs font-semibold rounded-soft transition-all ${
                timeRange === '7d'
                  ? 'bg-[#0F6E56] text-white shadow-sm'
                  : 'text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A]'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 text-xs font-semibold rounded-soft transition-all ${
                timeRange === '30d'
                  ? 'bg-[#0F6E56] text-white shadow-sm'
                  : 'text-[#5F5E5A] dark:text-[#AAA9A4] hover:text-[#2C2C2A]'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F6E56" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0F6E56" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E3" opacity={0.6} />
              <XAxis dataKey="date" stroke="#5F5E5A" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#5F5E5A" fontSize={11} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 rounded-soft bg-white dark:bg-[#1C1C1A] shadow-xl border border-[#EAE8E3] dark:border-[#3A3A36] text-xs space-y-1">
                        <p className="font-semibold text-[#2C2C2A] dark:text-white">{label}</p>
                        <p className="text-[#0F6E56] dark:text-[#38B293] font-bold">
                          Avg Distress Index: {data.avgRiskScore}/100
                        </p>
                        <div className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88] pt-1 border-t border-[#EAE8E3] dark:border-[#3A3A36]">
                          <span>High: {data.highRiskCount}</span> •{' '}
                          <span>Med: {data.medRiskCount}</span> •{' '}
                          <span>Low: {data.lowRiskCount}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="avgRiskScore"
                stroke="#0F6E56"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorAvg)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cohort Breakdown & Regional Resilience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#262624] p-5 rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm space-y-3">
          <h3 className="font-heading font-semibold text-sm text-[#2C2C2A] dark:text-white">
            Cohort Distribution by Severity
          </h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E3" opacity={0.6} />
                <XAxis dataKey="date" stroke="#5F5E5A" fontSize={10} />
                <YAxis stroke="#5F5E5A" fontSize={10} />
                <Tooltip />
                <Bar dataKey="highRiskCount" fill="#A32D2D" name="High Risk Cases" radius={[4, 4, 0, 0]} />
                <Bar dataKey="medRiskCount" fill="#BA7517" name="Moderate Cases" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lowRiskCount" fill="#639922" name="Low Risk Cases" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#262624] p-5 rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm space-y-3">
          <h3 className="font-heading font-semibold text-sm text-[#2C2C2A] dark:text-white">
            Regional Cluster Vulnerability Heatmap
          </h3>
          <div className="space-y-3 text-xs">
            {[
              { region: 'North-East Relief Zone', cases: 14, high: 2, status: 'Active Watch' },
              { region: 'Western Transit Cluster', cases: 8, high: 0, status: 'Stable' },
              { region: 'Central Rehabilitation Center', cases: 18, high: 0, status: 'Rehabilitation Phase' },
              { region: 'Southern Community Outreach', cases: 6, high: 0, status: 'Low Risk' },
            ].map((reg, idx) => (
              <div
                key={idx}
                className="p-3 rounded-soft bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36] flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-[#2C2C2A] dark:text-white">{reg.region}</p>
                  <p className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
                    {reg.cases} enrolled survivors
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    reg.high > 0 ? 'bg-[#A32D2D]/10 text-[#A32D2D]' : 'bg-[#639922]/10 text-[#639922]'
                  }`}>
                    {reg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
