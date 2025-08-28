const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="w-5 h-5 animate-spin"
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
          className="text-white"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
