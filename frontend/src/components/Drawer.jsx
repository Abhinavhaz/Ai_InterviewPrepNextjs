import { LuX, LuCopy, LuCheck } from "react-icons/lu";
import { useState, useRef } from "react";

const Drawer = ({ isOpen, onClose, title, children }) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  const handleCopy = () => {
    const text = contentRef.current?.innerText || "";
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-[60px] right-0 ${isOpen ? "right-2" : "right-0"} z-40 h-[calc(100dvh-70px)] flex flex-col 
        bg-gradient-to-b from-gray-200 via-white to-gray-100 
        w-full sm:w-[90vw] md:w-[60vw] lg:w-[40vw] 
        max-w-[600px] shadow-xl border border-gray-500 rounded-l-lg
        transform transition-transform duration-300 ease-in-out z-100
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gradient-to-r from-cyan-100 to-white rounded-tl-lg">
          <h5
            id="drawer-right-label"
            className="text-lg font-semibold text-gray-800 tracking-wide"
          >
            {title}
          </h5>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-white hover:bg-red-500 
            rounded-full w-8 h-8 flex items-center justify-center 
            transition-all duration-200"
          >
            <LuX className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar">
          <div
            ref={contentRef}
            className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words"
          >
            {children}
          </div>
        </div>

        {/* Footer with Copy Button */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50 flex justify-end rounded-bl-lg">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
            border border-cyan-600 text-cyan-700 font-medium
            hover:bg-cyan-600 hover:text-white transition-all duration-200 shadow-sm"
          >
            {copied ? <LuCheck /> : <LuCopy />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style>{`
  .custom-scrollbar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE & Edge */
  }
  .custom-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`}</style>

    </>
  );
};

export default Drawer;
