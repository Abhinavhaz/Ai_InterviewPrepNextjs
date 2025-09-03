import React from 'react';

interface SpinnerLoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({ 
  size = 'medium', 
  color = 'text-white' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center">
      <svg
        className={`${sizeClasses[size]} animate-spin`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        {/* Background track */}
        <circle
          className="text-white-400 opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        {/* Spinning arc */}
        <path
          className={color}
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
