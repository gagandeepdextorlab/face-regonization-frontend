import React, { useState } from "react";
import { API_URL } from "./API.js";
import WebcamCapture from "./WebCapture";

export default function Register() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success"); // success | error

  const registerUser = async () => {
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image }),
      });

      const data = await res.json();
      setAlertMsg(data.message);
      setAlertType(data.success ? "success" : "error");

      // Auto-hide alert after 3 seconds
      setTimeout(() => setAlertMsg(""), 3000);
    } catch (err) {
      setAlertMsg("Registration failed!");
      setAlertType("error");
      setTimeout(() => setAlertMsg(""), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Register Face</h2>

      {alertMsg && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            alertType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alertMsg}
        </div>
      )}

      <input
        type="text"
        placeholder="Enter name"
        className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <WebcamCapture onCapture={(img) => setImage(img)} />

      <button
        onClick={registerUser}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  );
}
