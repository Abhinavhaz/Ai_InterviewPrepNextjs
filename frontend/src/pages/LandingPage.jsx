import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APP_FEATURES } from "../Utils/data";
import { LuSparkles } from "react-icons/lu";
import Modal from "../components/mODAL.JSX";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

import hero from "../assets/Screenshot (235).png";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-pink-50">
        {/* Soft Floating Blurs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-pink-300 rounded-full blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-[200px] right-[-150px] w-[500px] h-[500px] bg-purple-300 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 pt-6 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-2xl md:text-3xl font-bold text-indigo-700">
              Interview Prep AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-gradient"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / SignUp
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-4 text-sm md:text-base font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200 w-max">
                <LuSparkles /> AI Powered
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Ace Your Interviews <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-text-shine font-extrabold">
                  With AI Power
                </span>
              </h1>
              <p className="text-gray-700 text-sm sm:text-base md:text-base mb-4 leading-snug">
                Our personalized interview prep sessions are designed to help you practice, improve, and excel with confidence. Tailored to your role, experience, and focus areas, each session provides real-world questions, scenario-based exercises, and actionable feedback. You’ll learn to communicate clearly, structure answers effectively, and tackle tricky questions with ease. AI-driven insights ensure your practice stays relevant and efficient, saving you time while maximizing results. By combining structured guidance, targeted exercises, and personalized feedback, these sessions empower you to sharpen your skills, boost your confidence, and approach interviews with a competitive edge.</p>

              <button
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-gradient"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <img
                src={hero}
                alt="Hero"
                className="w-full rounded-2xl shadow-2xl border border-purple-100 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full py-16 bg-gradient-to-t from-pink-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
            Features that Make You Shine
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="backdrop-blur-sm bg-white/50 p-6 rounded-3xl shadow-lg border border-purple-100 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-purple-700">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      {/* How It Works Section */}
<div className="w-full py-20 bg-gradient-to-t from-indigo-50 via-white to-pink-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
      How It Works
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { step: 1, title: "SignUp / Login", desc: "Register or login to start your interview prep journey quickly." },
        { step: 2, title: "Create Session", desc: "Set up personalized interview sessions to practice effectively." },
        { step: 3, title: "Get Questions & Answers", desc: "Receive AI-generated questions and model answers for your practice." },
      ].map((item) => (
        <div key={item.step} className="backdrop-blur-sm bg-white/50 p-6 rounded-3xl shadow-lg border border-purple-100 hover:scale-105 hover:shadow-2xl transition-transform duration-300 text-center">
          <div className="text-4xl font-bold text-purple-700 mb-4">{item.step}</div>
          <h3 className="text-xl font-semibold mb-2 text-purple-700">{item.title}</h3>
          <p className="text-gray-700">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>


      {/* Testimonials Section */}
      <div className="w-full py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Riya", feedback: "The AI sessions helped me improve my confidence and land my first job!" },
              { name: "Abhinav", feedback: "Personalized practice made interviews much easier. Highly recommend!" },
              { name: "Sneha", feedback: "Interactive and smart AI guidance. Love it!" },
            ].map((item, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-purple-100 hover:shadow-2xl transition-shadow duration-300">
                <p className="text-gray-700 mb-4">&quot;{item.feedback}&quot;</p>
                <div className="font-semibold text-purple-700">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="w-full py-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-center rounded-3xl mx-4 md:mx-auto my-10 shadow-2xl hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ace Your Interviews?</h2>
        <p className="text-lg md:text-xl mb-6">Start practicing with AI today and boost your confidence.</p>
        <button
          className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          onClick={handleCTA}
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm py-6 bg-purple-50">
        Made with ❤️ – Happy Coding
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="p-4">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-gradient { background-size: 200% 200%; animation: gradientBG 4s ease infinite; }
        @keyframes gradientBG { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .animate-text-shine { background-size: 200% auto; animation: shine 3s linear infinite; }
        @keyframes shine { to { background-position: 200% center; } }
      `}</style>
    </>
  );
};

export default LandingPage;
