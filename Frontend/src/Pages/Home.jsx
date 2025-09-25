import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logOut } = UserAuth();
  const [showAuthMessage, setShowAuthMessage] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out!");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleGroupModeClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowAuthMessage(true);
      // Hide message after 5 seconds
      setTimeout(() => setShowAuthMessage(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0d9fc] flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-purple-800 tracking-wide">
          <span className="ml-2 italic text-lg bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            FocusTroop
          </span>
        </h1>

        <div className="flex items-center space-x-4">
          {/* If user is logged in */}
          {user ? (
            <>
              {/* Profile */}
              <Link
                to="/account"
                className="text-purple-700 hover:text-[#8d66da] transition-all duration-200 text-2xl hover:scale-110 transform"
              >
                <FaUserCircle />
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-gray-200 to-gray-300 text-purple-700 font-bold italic px-4 py-1 rounded-lg cursor-pointer hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              {/* Show login & signup only when not logged in */}
              <Link
                to="/login"
                className="bg-gradient-to-r from-gray-200 to-gray-300 text-purple-700 font-bold italic px-4 py-1 rounded-lg cursor-pointer hover:from-[#8d66da] hover:to-[#7f61f3] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold italic px-4 py-1 rounded-lg cursor-pointer hover:from-[#8d66da] hover:to-[#7f61f3] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                SIGNUP
              </Link>
            </>
          )}

          {/* About is always shown */}
          <Link
            to="/about"
            className="bg-gradient-to-r from-gray-200 to-gray-300 text-purple-700 font-bold italic px-4 py-1 rounded-lg cursor-pointer hover:from-[#8d66da] hover:to-[#7f61f3] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            ABOUT
          </Link>
        </div>
      </div>

      {/* Authentication Message */}
      {showAuthMessage && (
        <div className="mx-4 mt-4 relative">
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 shadow-lg rounded-lg px-6 py-4 animate-pulse">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.876c1.38 0 2.227-1.519 1.494-2.748L13.494 4.748c-.707-1.19-2.281-1.19-2.988 0L3.568 16.252C2.835 17.481 3.682 19 5.062 19z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-bold text-red-800">
                  🔒 Authentication Required!
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  You need to log in or sign up in order to use Group Mode. 
                  <span className="font-medium"> Join the community to collaborate with friends!</span>
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  className="inline-flex text-red-400 hover:text-red-600 transition-colors duration-200"
                  onClick={() => setShowAuthMessage(false)}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode Selection */}
      <div className="flex flex-1 items-center justify-center gap-10 px-4 py-12">
        {/* Solo Mode */}
        <div className="bg-white p-8 rounded-2xl w-80 shadow-2xl text-center flex flex-col justify-between transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-purple-100 hover:border-purple-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold italic text-purple-800 mb-3 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
              SOLO MODE
            </h2>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              Focus on your own tasks using the Pomodoro technique. Add tasks,
              track progress, and maintain focus with timed work sessions.
            </p>
            <div className="text-5xl mb-6 animate-bounce">🎯</div>
          </div>
          <div className="relative z-10">
            <Link to="/solo">
              <button className="bg-gradient-to-r from-[#7f61f3] to-[#6c4de3] text-white font-bold italic px-8 py-3 rounded-xl hover:from-[#6c4de3] hover:to-[#5a3cc7] transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl w-full">
                START SOLO SESSION
              </button>
            </Link>
          </div>
        </div>

        {/* Group Mode */}
        <div className={`bg-white p-8 rounded-2xl w-80 shadow-2xl text-center flex flex-col justify-between transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-purple-100 hover:border-purple-300 relative overflow-hidden ${!user ? 'opacity-60 cursor-not-allowed' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50"></div>
          {!user && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-30 z-5"></div>
          )}
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-3">
              <h2 className="text-xl font-bold italic text-purple-800 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                GROUP MODE
              </h2>
              {!user && (
                <svg className="w-5 h-5 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              Focus with your friends using the Pomodoro technique. Add tasks,
              track progress, and maintain focus with timed work sessions.
            </p>
            <div className="text-5xl mb-6 animate-pulse">👥</div>
          </div>
          <div className="relative z-10">
            {user ? (
              <Link to="/group">
                <button className="bg-gradient-to-r from-[#7f61f3] to-[#6c4de3] text-white font-bold italic px-8 py-3 rounded-xl hover:from-[#6c4de3] hover:to-[#5a3cc7] transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl w-full">
                  START GROUP SESSION
                </button>
              </Link>
            ) : (
              <button 
                onClick={handleGroupModeClick}
                className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold italic px-8 py-3 rounded-xl hover:from-red-400 hover:to-red-500 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl w-full relative"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  LOGIN REQUIRED
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-black font-semibold italic bg-gradient-to-r from-purple-100 to-purple-200 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-2xl">🍅</span>
          <span className="bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
            FocusTroop - Stay productive with the Pomodoro technique
          </span>
          <span className="text-2xl">🎯</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;