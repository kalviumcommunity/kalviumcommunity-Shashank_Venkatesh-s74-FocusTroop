import React from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const { googleSignIn, logOut, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      console.log("Google Sign-In successful!");
    } catch (err) {
      console.error("Google Sign-In error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out!");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleBack = () => {
    window.history.back(); // simple back navigation
  };

  // Show welcome screen if logged in
  if (user) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="flex justify-between items-center w-full px-4 md:px-8 py-3 bg-white shadow-md">
          <h1 className="flex items-center gap-2 font-bold text-purple-700">
            <span className="italic text-base">FocusTroop</span>
          </h1>
          <button
            onClick={handleBack}
            className="bg-gray-200 text-purple-700 font-bold italic px-4 py-1 rounded-md cursor-pointer hover:bg-[#8d66da] hover:text-white transition"
          >
            BACK
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center bg-green-100">
          <div className="bg-green-200 p-8 rounded-xl shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Welcome, {user.displayName || "User"} 🎉
            </h2>
            <p className="text-green-800 mb-4">You are logged in with Google.</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show sign in form if not logged in
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-3 bg-white shadow-md">
        <h1 className="flex items-center gap-2 font-bold text-purple-700">
          <span className="italic text-base">FocusTroop</span>
        </h1>
        <button
          onClick={handleBack}
          className="bg-gray-200 text-purple-700 font-bold italic px-4 py-1 rounded-md cursor-pointer hover:bg-[#8d66da] hover:text-white transition"
        >
          BACK
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center bg-purple-100">
        <div className="bg-purple-200 p-8 rounded-xl shadow-lg w-96">
          {/* Title */}
          <h2 className="text-center text-2xl font-bold text-purple-700 mb-6">
            Sign In
          </h2>

          {/* Form */}
          <form
            className="flex flex-col space-y-4"
            onSubmit={(e) => e.preventDefault()} // prevent page reload
          >
            {/* Email */}
            <div>
              <label className="block text-purple-700 font-semibold mb-1">
                E-MAIL
              </label>
              <input
                type="email"
                placeholder="Enter E-mail"
                className="w-full p-2 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-purple-700 font-semibold mb-1">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-2 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Sign in with Google */}
            <div className="flex justify-center">
              <GoogleButton onClick={handleGoogleSignIn} />
            </div>

            {/* Login button */}
            <button
              type="button"
              className="bg-purple-500 text-white font-semibold py-2 rounded-md hover:bg-purple-600 transition cursor-pointer"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
