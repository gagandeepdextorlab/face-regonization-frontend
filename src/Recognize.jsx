import React, { useState } from "react";
import { API_URL } from "./API.js";
import WebcamCapture from "./WebCapture";

export default function Recognize() {
  const [results, setResults] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success"); // success | error

  const recognizeFace = async (image) => {
    try {
      const res = await fetch(`${API_URL}/api/recognize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();
      setResults(data.results || []);

      if (data.results && data.results.length > 0) {
        setAlertMsg(`Match found: ${data.results[0].name}`);
        setAlertType("success");
      } else {
        setAlertMsg("No match found!");
        setAlertType("error");
      }

      setTimeout(() => setAlertMsg(""), 3000);
    } catch (err) {
      setAlertMsg("Recognition failed!");
      setAlertType("error");
      setTimeout(() => setAlertMsg(""), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Recognize Face</h2>

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


      <WebcamCapture onCapture={(img) => recognizeFace(img)} />

      <div className="mt-4 space-y-2">
        {results.map((r, i) => (
          <p
            key={i}
            className="bg-gray-100 p-3 rounded-lg shadow-sm border"
          >
            <span className="font-semibold">{r.name}</span>
            <span className="text-gray-500"> (distance: {r.distance})</span>
          </p>
        ))}
      </div>
    </div>
  );
}
