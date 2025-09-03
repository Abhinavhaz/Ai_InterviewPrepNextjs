'use client';

import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '@/utils/helper';

interface SummaryCardProps {
  colors: { bgcolor?: string; gradient?: string };
  role: string;
  topicsToFocus: string | string[];
  experience: number | string;
  questions: any[];
  lastUpdated: string;
  description: string;
  onDelete: () => void;
  onSelect: () => void;
  onEdit?: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  lastUpdated,
  description,
  onDelete,
  onSelect,
  onEdit,
}) => {
  const topicsText = Array.isArray(topicsToFocus) ? topicsToFocus.join(', ') : topicsToFocus;

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={onSelect}
    >
      {/* Header with gradient */}
      <div
        className="p-5 relative flex items-start"
        style={{
          background: `linear-gradient(135deg, ${colors.bgcolor || '#6366F1'}, ${colors.gradient || '#A78BFA'})`,
        }}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
          <span className="text-lg font-semibold text-gray-800">{getInitials(role)}</span>
        </div>

        {/* Info */}
        <div className="ml-4 flex-1">
          <h2 className="text-lg font-semibold text-white drop-shadow-sm">{role}</h2>
          <p className="text-xs text-gray-100 mt-1">{topicsText}</p>
        </div>

        {/* Delete Button */}
        <button
          className="hidden group-hover:flex items-center gap-1.5 text-xs text-rose-600 font-medium bg-white/80 px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-white absolute top-3 right-3"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-indigo-700 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200">
            Experience: {experience} {String(experience) === '1' ? 'year' : 'years'}
          </span>

          <span className="text-[11px] font-medium text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            {Array.isArray(questions) ? `${questions.length} Q&A` : '0 Q&A'}
          </span>

          <span className="text-[11px] font-medium text-amber-700 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mt-3">{description}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
