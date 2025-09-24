// Signup.jsx
import React, { useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { googleSignIn, signUp } = UserAuth();
  const [name, setName] = useState(""); // 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password, name); // ✅ pass name
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-purple-100">
        <div className="bg-purple-200 p-8 rounded-xl shadow-lg w-96">
          <h2 className="text-center text-2xl font-bold text-purple-700 mb-6">
            Sign Up
          </h2>

          {error && <p className="text-red-600 text-center mb-3">{error}</p>}

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-purple-700 font-semibold mb-1">
                NAME
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-purple-700 font-semibold mb-1">
                E-MAIL
              </label>
              <input
                type="email"
                placeholder="Enter E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex justify-center">
              <GoogleButton onClick={handleGoogleSignIn} />
            </div>

            <button
              type="submit"
              className="bg-purple-500 text-white font-semibold py-2 rounded-md hover:bg-purple-600 transition cursor-pointer"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
