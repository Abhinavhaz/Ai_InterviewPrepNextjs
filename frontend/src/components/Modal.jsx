const Modal = ({ isOpen, onClose, children, hideHeader, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 w-full h-full bg-black/40">
            {/* modal content */}
            <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
                {!hideHeader && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="md:text-lg font-medium text-gray-800">{title}</h3>
                    </div>
                )}

                {/* Modal body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>

                {/* Close button */}
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2 right-2"
                    onClick={onClose}
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Modal;
