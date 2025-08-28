import { LuCircleAlert } from "react-icons/lu"
;

const DeleteAlertContent = ({ content, onConfirm, onClose }) => {
  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 text-center">
      {/* Warning Icon */}
      <div className="flex justify-center">
        < LuCircleAlert className="text-red-500 text-5xl" />
      </div>

      {/* Title + Message */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Are you sure?
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-1">{content}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-3 mt-3">
        <button
          className="flex-1 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors"
          onClick={onConfirm}
        >
          Delete
        </button>
        <button
          className="flex-1 bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
