import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewLink = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(previewLink);
      }
      setPreviewUrl(previewLink);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (setPreview) {
      setPreview(null);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleImageChange}
      />

      {!image ? (
        <div
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 
          flex items-center justify-center bg-snow-100 rounded-full relative cursor-pointer 
          border-2 border-dashed border-cyan-600 transition-transform duration-300"
        >
          <LuUser className="text-2xl md:text-4xl text-cyan-500" />
          <button
            type="button"
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center 
            bg-gradient-to-r from-indigo-500 to-blue-400 
            rounded-full text-white shadow-md hover:shadow-lg 
            hover:scale-110 transition-all absolute bottom-0 -right-1"
            onClick={onChooseFile}
          >
            <LuUpload size={14} className="md:size-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 
            rounded-full object-cover border border-orange-200 shadow-sm transition-transform duration-300"
          />
          <button
            type="button"
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center 
            bg-gradient-to-r from-red-500 to-red-600 
            rounded-full text-white shadow-md hover:shadow-lg 
            hover:scale-110 transition-all absolute bottom-0 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash size={14} className="md:size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
