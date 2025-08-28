import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="h-16 sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-700 hover:text-purple-600 transition-colors duration-300">
            Interview Prep AI
          </h2>
          <span className="hidden md:inline-block text-sm text-gray-500 font-medium">
            Ace Your Interviews
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              onClick={() => setUser(null)} // Replace with actual login modal trigger
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Login / SignUp
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
