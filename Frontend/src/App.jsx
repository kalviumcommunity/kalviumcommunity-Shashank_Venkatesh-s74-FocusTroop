import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import Solo from "./Pages/Solo";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Account from "./Pages/Account";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div className="min-h-screen bg-[#f0d9fc]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/solo" element={<Solo />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/account" element={<Account/>} />
            
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
