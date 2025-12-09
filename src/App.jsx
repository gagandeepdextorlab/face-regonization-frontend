import React, { useState } from "react";
import Register from "./Register";
import Recognize from "./Recognize";
import Attendance from "./Attendance";

export default function App() {
  const [activeTab, setActiveTab] = useState("register");

  const tabs = [
    { id: "register", label: "Register" },
    { id: "recognize", label: "Recognize" },
    { id: "attendance", label: "Attendance" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Face Attendance System
      </h1>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 -mb-px font-medium text-sm rounded-t-lg focus:outline-none transition ${
                activeTab === tab.id
                  ? "bg-white border-t border-l border-r border-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {activeTab === "register" && <Register />}
        {activeTab === "recognize" && <Recognize />}
        {activeTab === "attendance" && <Attendance />}
      </div>
    </div>
  );
}
