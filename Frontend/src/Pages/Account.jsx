// Account.jsx
import React from "react";
import { UserAuth } from "../context/AuthContext";

const Account = () => {
  const { user, userName } = UserAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Account Page</h1>
      {user ? (
        <p>Welcome, {userName || "User"} 🎉</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Account;
