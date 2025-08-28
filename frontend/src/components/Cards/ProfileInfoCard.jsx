import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
      {/* Profile Avatar */}
      <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <img
          src={user.profileImageUrl || "/default-avatar.png"}
          alt="profile"
          className="w-full h-full rounded-full object-cover bg-gray-200"
        />
      </div>

      {/* Username and Logout */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900 truncate max-w-[100px]">
          {user.name || ""}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs text-pink-500 font-semibold hover:text-purple-600 transition-colors duration-300"
        >
          <LuLogOut className="text-sm" /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
