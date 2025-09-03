'use client';

import React from 'react';

interface RoleInfoHeaderProps {
  role: string;
  topicsToFocus: string | string[];
  experience: string;
  questions: number;
  description: string;
  lastUpdated: string;
}

const RoleInfoHeader: React.FC<RoleInfoHeaderProps> = ({ 
  role, 
  topicsToFocus, 
  experience, 
  questions, 
  description, 
  lastUpdated 
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300 opacity-90"></div>

      {/* Floating Blobs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-cyan-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 py-10">
        {/* Title & Topics */}
        <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm">
          {role}
        </h2>
        <p className="text-sm md:text-base text-gray-100 mt-2 opacity-90">
          {Array.isArray(topicsToFocus) ? topicsToFocus.join(', ') : topicsToFocus}
        </p>

        {/* Info Badges */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <div className="px-4 py-1.5 text-xs font-semibold text-white/90 bg-white/20 rounded-full backdrop-blur-md shadow-md">
            Experience: {experience} {experience === "1" ? "year" : "years"}
          </div>

          <div className="px-4 py-1.5 text-xs font-semibold text-white/90 bg-white/20 rounded-full backdrop-blur-md shadow-md">
            {questions} Q&A
          </div>

          <div className="px-4 py-1.5 text-xs font-semibold text-white/90 bg-white/20 rounded-full backdrop-blur-md shadow-md">
            Last Updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="mt-6 text-sm md:text-base text-white/90 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoleInfoHeader;
