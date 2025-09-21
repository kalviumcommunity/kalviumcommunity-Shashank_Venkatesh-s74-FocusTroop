import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import Solo from "./Pages/Solo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/solo" element={<Solo />} />
      </Routes>
    </Router>
  );
};

export default App;
