"use client";

import React from "react";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-10 text-center max-w-xl w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          Welcome to Universal Health Care Client
        </h1>
        {user ? (
          <p className="text-lg text-gray-700">
            Hello, <span className="font-semibold">{user.email}</span>! You're
            logged in.
          </p>
        ) : (
          <p className="text-lg text-gray-600">
            Please log in to access your dashboard.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
