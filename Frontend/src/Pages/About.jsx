import React from "react";
import { FaUserFriends, FaUser, FaClock } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";

export default function About() {
  const handleBack = () => {
    window.history.back(); // or use navigate(-1) if using react-router
  };

  return (
    <div className="min-h-screen bg-[#f0d9fc] text-gray-700 flex flex-col items-center">
      {/* Navbar */}
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-3 bg-white shadow-md">
        <h1 className="flex items-center gap-2 font-bold text-purple-700">
          <span className="italic text-base">FocusTroop</span>
        </h1>

        <button
          onClick={handleBack}
          className="bg-gray-200 text-purple-700 font-bold italic px-4 py-1 rounded-md cursor-pointer hover:bg-[#8d66da] hover:text-white transition">
          BACK
        </button>
      </div>

      {/* Cards stacked vertically */}
      <div className="flex flex-col gap-6 mt-8 px-4 md:px-6 w-full max-w-3xl">
        {/* Pomodoro */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full h-auto">
          <h2 className="text-base font-bold flex items-center gap-2">
            <MdOutlineTimer className="text-purple-700" />
            What is Pomodoro?
          </h2>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
            The Pomodoro Technique is a time management method. You work for 25
            minutes, then take a short break to rest your mind. This work timer
            may vary from user to user thus you can edit it in settings.
          </p>
        </div>

        {/* Short Break */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full h-auto">
          <h2 className="text-base font-bold flex items-center gap-2">
            <FaClock className="text-purple-700" />
            What is a Short Break?
          </h2>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
            After one Pomodoro (25 mins focus), you take a 5-minute short break.
            It helps relax your brain before jumping into the next session. This
            break timer may vary from user to user thus you can edit it in
            settings.
          </p>
        </div>

        {/* Long Break */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full h-auto">
          <h2 className="text-base font-bold flex items-center gap-2">
            <FiRefreshCw className="text-purple-700" />
            What is a Long Break?
          </h2>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
            After completing 4 Pomodoros, you take a longer break (15–30 mins).
            This gives your mind time to fully recharge and avoid burnout.
          </p>
        </div>

        {/* Solo Mode */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full h-auto">
          <h2 className="text-base font-bold flex items-center gap-2">
            <FaUser className="text-purple-700" />
            Solo Mode
          </h2>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
            Solo Mode is your personal focus zone. You work alone using the
            classic Pomodoro timer and breaks.
          </p>
        </div>

        {/* Group Mode */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full h-auto">
          <h2 className="text-base font-bold flex items-center gap-2">
            <FaUserFriends className="text-purple-700" />
            Group Mode
          </h2>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
            Group Mode lets you work together with friends in real-time.
            Everyone joins the same timer and stays focused as a team.
          </p>
        </div>

        {/* Theme */}
        <div className="bg-purple-700 text-white p-5 rounded-xl shadow-md w-full h-auto">
          <h2 className="text-base font-bold mb-2">THEME</h2>
          <p className="italic mb-3 text-sm">"Minimal, Modern & Mindful."</p>
          <p className="text-xs leading-relaxed">
            A clean and distraction-free workspace designed to help individuals
            and groups stay focused through the Pomodoro technique — with a
            social twist.
          </p>
        </div>
      </div>
    </div>
  );
}
