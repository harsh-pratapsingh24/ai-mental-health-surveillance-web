import React from 'react';
import { RiskTier } from '../../types';

interface RiskBadgeProps {
  tier: RiskTier;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  tier,
  score,
  size = 'md',
  showLabel = true,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  const config = {
    low: {
      bg: 'bg-[#639922]/10 dark:bg-[#639922]/20',
      text: 'text-[#639922] dark:text-[#88C63E]',
      border: 'border-[#639922]/25 dark:border-[#639922]/40',
      dot: 'bg-[#639922]',
      label: 'Low Risk',
    },
    medium: {
      bg: 'bg-[#BA7517]/10 dark:bg-[#BA7517]/20',
      text: 'text-[#BA7517] dark:text-[#E49A32]',
      border: 'border-[#BA7517]/25 dark:border-[#BA7517]/40',
      dot: 'bg-[#BA7517]',
      label: 'Medium Risk',
    },
    high: {
      bg: 'bg-[#A32D2D]/10 dark:bg-[#A32D2D]/20',
      text: 'text-[#A32D2D] dark:text-[#E06666]',
      border: 'border-[#A32D2D]/25 dark:border-[#A32D2D]/40',
      dot: 'bg-[#A32D2D]',
      label: 'High Risk',
    },
  };

  const current = config[tier];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClasses[size]} transition-all`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} ${tier === 'high' ? 'animate-pulse' : ''}`} />
      {showLabel && current.label}
      {score !== undefined && (
        <span className="opacity-75 font-normal ml-0.5">({score})</span>
      )}
    </span>
  );
};
