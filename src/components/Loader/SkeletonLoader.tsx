'use client';

import React from 'react';

interface SkeletonLoaderProps {
  lines?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ lines = 5 }) => {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          {index % 2 === 0 && <div className="h-4 bg-gray-200 rounded w-3/4"></div>}
          {index % 3 === 0 && <div className="h-4 bg-gray-200 rounded w-1/2"></div>}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
