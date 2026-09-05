import React from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { CaseRecord, RiskTier } from '../../types';

export const CaseList: React.FC = () => {
  const {
    cases,
    counselorSearch,
    setCounselorSearch,
    riskFilter,
    setRiskFilter,
    sortBy,
    setSortBy,
    setSelectedCaseId,
  } = useApp();

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(counselorSearch.toLowerCase()) ||
      c.region.toLowerCase().includes(counselorSearch.toLowerCase()) ||
      c.demographicHint.toLowerCase().includes(counselorSearch.toLowerCase());

    const matchesRisk = riskFilter === 'all' ? true : c.currentRiskTier === riskFilter;

    return matchesSearch && matchesRisk;
  });

  // Sort cases
  const sortedCases = [...filteredCases].sort((a, b) => {
    if (sortBy === 'risk') {
      return b.currentRiskScore - a.currentRiskScore;
    }
    return new Date(b.lastCheckInDate).getTime() - new Date(a.lastCheckInDate).getTime();
  });

  const getTrendIcon = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving':
        return (
          <span className="flex items-center gap-1 text-[#639922] dark:text-[#88C63E] text-xs font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>Improving</span>
          </span>
        );
      case 'declining':
        return (
          <span className="flex items-center gap-1 text-[#A32D2D] dark:text-[#E06666] text-xs font-medium">
            <TrendingDown className="w-4 h-4" />
            <span>Heightened Risk</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[#5F5E5A] dark:text-[#AAA9A4] text-xs font-medium">
            <Minus className="w-4 h-4" />
            <span>Stable</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Triage summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setRiskFilter('all')}
          className={`p-3 rounded-soft border transition-all cursor-pointer ${
            riskFilter === 'all'
              ? 'bg-[#0F6E56]/10 border-[#0F6E56] shadow-sm'
              : 'bg-white dark:bg-[#262624] border-[#EAE8E3] dark:border-[#3A3A36] hover:border-[#0F6E56]/40'
          }`}
        >
          <p className="text-[11px] font-medium text-[#5F5E5A] dark:text-[#8E8D88]">Total Active Cases</p>
          <p className="text-xl font-heading font-bold text-[#2C2C2A] dark:text-white mt-0.5">
            {cases.length}
          </p>
        </div>

        <div
          onClick={() => setRiskFilter('high')}
          className={`p-3 rounded-soft border transition-all cursor-pointer ${
            riskFilter === 'high'
              ? 'bg-[#A32D2D]/15 border-[#A32D2D] shadow-sm'
              : 'bg-white dark:bg-[#262624] border-[#EAE8E3] dark:border-[#3A3A36] hover:border-[#A32D2D]/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-[#A32D2D] dark:text-[#F19E9E]">High Priority Tier</p>
            <span className="w-2 h-2 rounded-full bg-[#A32D2D] animate-pulse" />
          </div>
          <p className="text-xl font-heading font-bold text-[#A32D2D] dark:text-[#E06666] mt-0.5">
            {cases.filter((c) => c.currentRiskTier === 'high').length}
          </p>
        </div>

        <div
          onClick={() => setRiskFilter('medium')}
          className={`p-3 rounded-soft border transition-all cursor-pointer ${
            riskFilter === 'medium'
              ? 'bg-[#BA7517]/15 border-[#BA7517] shadow-sm'
              : 'bg-white dark:bg-[#262624] border-[#EAE8E3] dark:border-[#3A3A36] hover:border-[#BA7517]/40'
          }`}
        >
          <p className="text-[11px] font-medium text-[#BA7517] dark:text-[#E49A32]">Moderate Concern</p>
          <p className="text-xl font-heading font-bold text-[#BA7517] dark:text-[#E49A32] mt-0.5">
            {cases.filter((c) => c.currentRiskTier === 'medium').length}
          </p>
        </div>

        <div
          onClick={() => setRiskFilter('low')}
          className={`p-3 rounded-soft border transition-all cursor-pointer ${
            riskFilter === 'low'
              ? 'bg-[#639922]/15 border-[#639922] shadow-sm'
              : 'bg-white dark:bg-[#262624] border-[#EAE8E3] dark:border-[#3A3A36] hover:border-[#639922]/40'
          }`}
        >
          <p className="text-[11px] font-medium text-[#639922] dark:text-[#88C63E]">Low / Steady Tier</p>
          <p className="text-xl font-heading font-bold text-[#639922] dark:text-[#88C63E] mt-0.5">
            {cases.filter((c) => c.currentRiskTier === 'low').length}
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-[#262624] p-3 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shadow-sm">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#5F5E5A] dark:text-[#8E8D88] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Case ID, zone, or demographic hint..."
            value={counselorSearch}
            onChange={(e) => setCounselorSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-soft bg-[#FAF9F6] dark:bg-[#1C1C1A] border border-[#EAE8E3] dark:border-[#3A3A36] text-[#2C2C2A] dark:text-white placeholder-[#5F5E5A] focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
          />
        </div>

        {/* Filter and Sort controls */}
        <div className="flex items-center gap-2">
          {/* Risk filter */}
          <div className="flex items-center gap-1.5 bg-[#FAF9F6] dark:bg-[#1C1C1A] px-2.5 py-1 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36]">
            <Filter className="w-3.5 h-3.5 text-[#5F5E5A]" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="bg-transparent text-xs text-[#2C2C2A] dark:text-[#FAF9F6] focus:outline-none font-medium"
            >
              <option value="all">All Risk Tiers</option>
              <option value="high">High Risk Only</option>
              <option value="medium">Medium Risk Only</option>
              <option value="low">Low Risk Only</option>
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 bg-[#FAF9F6] dark:bg-[#1C1C1A] px-2.5 py-1 rounded-soft border border-[#EAE8E3] dark:border-[#3A3A36]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#5F5E5A]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-[#2C2C2A] dark:text-[#FAF9F6] focus:outline-none font-medium"
            >
              <option value="risk">Sort by Risk Score</option>
              <option value="date">Sort by Last Check-in</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Table / Cards */}
      <div className="bg-white dark:bg-[#262624] rounded-soft-lg border border-[#EAE8E3] dark:border-[#3A3A36] shadow-sm overflow-hidden">
        {sortedCases.length === 0 ? (
          <div className="py-12 text-center text-[#5F5E5A] dark:text-[#8E8D88] space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto opacity-40 text-[#0F6E56]" />
            <p className="text-sm font-medium">No cases found matching the criteria</p>
            <p className="text-xs">Try clearing the search query or selecting "All Risk Tiers".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAE8E3] dark:border-[#3A3A36] bg-[#FAF9F6]/80 dark:bg-[#1C1C1A]/80 text-[11px] font-semibold text-[#5F5E5A] dark:text-[#8E8D88] uppercase tracking-wider">
                  <th className="py-3 px-4">Anonymized Case ID</th>
                  <th className="py-3 px-4">Distress Level</th>
                  <th className="py-3 px-4">Demographic Context</th>
                  <th className="py-3 px-4">Last Check-in</th>
                  <th className="py-3 px-4">7-Day Trajectory</th>
                  <th className="py-3 px-4">Triage Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE8E3] dark:divide-[#3A3A36] text-xs">
                {sortedCases.map((caseItem) => (
                  <tr
                    key={caseItem.id}
                    onClick={() => setSelectedCaseId(caseItem.id)}
                    className="hover:bg-[#FAF9F6] dark:hover:bg-[#1C1C1A] transition-colors cursor-pointer group"
                  >
                    {/* Case ID */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#2C2C2A] dark:text-white flex items-center gap-2">
                      <span>{caseItem.id}</span>
                      {caseItem.escalated && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#A32D2D]/10 text-[#A32D2D] font-sans font-bold">
                          ESCALATED
                        </span>
                      )}
                    </td>

                    {/* Risk Badge */}
                    <td className="py-3.5 px-4">
                      <RiskBadge tier={caseItem.currentRiskTier} score={caseItem.currentRiskScore} />
                    </td>

                    {/* Demographic Context */}
                    <td className="py-3.5 px-4 text-[#5F5E5A] dark:text-[#AAA9A4] max-w-[200px] truncate">
                      <span className="font-medium text-[#2C2C2A] dark:text-[#FAF9F6] block text-xs">
                        {caseItem.region}
                      </span>
                      <span className="text-[11px] text-[#5F5E5A] dark:text-[#8E8D88]">
                        {caseItem.demographicHint}
                      </span>
                    </td>

                    {/* Last Check-in Date */}
                    <td className="py-3.5 px-4 text-[#5F5E5A] dark:text-[#AAA9A4]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 opacity-60" />
                        <span>{caseItem.lastCheckInDate}</span>
                      </div>
                    </td>

                    {/* Trajectory */}
                    <td className="py-3.5 px-4">
                      {getTrendIcon(caseItem.trendDirection)}
                    </td>

                    {/* Reviewed Status */}
                    <td className="py-3.5 px-4">
                      {caseItem.reviewed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#0F6E56] dark:text-[#38B293] font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Reviewed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#BA7517] dark:text-[#E49A32] font-semibold bg-[#BA7517]/10 px-2 py-0.5 rounded-full">
                          Pending Review
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCaseId(caseItem.id);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F6E56] dark:text-[#38B293] group-hover:translate-x-0.5 transition-transform"
                      >
                        Inspect <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
