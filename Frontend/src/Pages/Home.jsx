import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logOut } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out!");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0d9fc] flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-purple-800 tracking-wide">
          <span className="ml-2 italic text-lg">FocusTroop</span>
        </h1>

        <div className="flex items-center space-x-4">
          {/* If user is logged in */}
          {user ? (
            <>
              {/* Profile */}
              <Link
                to="/account"
                className="text-purple-700 hover:text-[#8d66da] transition text-2xl"
              >
                <FaUserCircle />
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-purple-700 font-bold italic px-4 py-1 rounded-md cursor-pointer hover:bg-red-500 hover:text-white transition"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              {/* Show login & signup only when not logged in */}
              <Link
                to="/login"
                className="bg-gray-200 text-purple-700 font-bold italic px-4 py-1 rounded-md cursor-pointer hover:bg-[#8d66da] hover:text-white transition"
              >
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="bg-gray-200 text-purple-700 font-bold italic px-4 py-1 rounded-md cursor-pointer hover:bg-[#8d66da] hover:text-white transition"
              >
                SIGNUP
              </Link>
            </>
          )}

          {/* About is always shown */}
          <Link
            to="/about"
            className="bg-gray-200 text-purple-700 font-bold italic px-4 py-1 rounded-md cursor-pointer hover:bg-[#8d66da] hover:text-white transition"
          >
            ABOUT
          </Link>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex flex-1 items-center justify-center gap-10 px-4 py-12">
        {/* Solo Mode */}
        <div className="bg-white p-6 rounded-md w-80 shadow-lg text-center">
          <h2 className="text-lg font-bold italic text-purple-800 mb-2">
            SOLO MODE
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Focus on your own tasks using the Pomodoro technique. Add tasks,
            track progress, and maintain focus with timed work sessions.
          </p>
          <div className="text-4xl mb-4">👤</div>
          <Link to="/solo">
            <button className="bg-[#7f61f3] text-white font-bold italic px-6 py-2 rounded-sm hover:bg-[#6c4de3] transition cursor-pointer">
              SOLO SESSION
            </button>
          </Link>
        </div>

        {/* Group Mode */}
        <div className="bg-white p-6 rounded-md w-80 shadow-lg text-center">
          <h2 className="text-lg font-bold italic text-purple-800 mb-2">
            GROUP MODE
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Join friends or colleagues to focus together. Create or join a
            room, set shared goals, and stay connected while you all work.
          </p>
          <div className="text-4xl mb-4">👥</div>
          <Link to="/group">
            <button className="bg-[#a078f0] text-white font-bold italic px-6 py-2 rounded-sm hover:bg-[#8d66da] transition cursor-pointer">
              GROUP SESSION
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-black font-semibold italic">
        FocusTroop - Stay productive with the Pomodoro technique
      </footer>
    </div>
  );
};

export default Home;
