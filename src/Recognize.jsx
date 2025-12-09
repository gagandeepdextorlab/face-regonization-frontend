import React, { useState } from "react";
import { API_URL } from "./API.js";
import WebcamCapture from "./WebCapture";

export default function Recognize() {
  const [results, setResults] = useState([]);

  const recognizeFace = async (image) => {
    const res = await fetch(`${API_URL}/api/recognize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });

    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Recognize Face</h2>

      <WebcamCapture onCapture={(img) => recognizeFace(img)} />

      <div className="mt-4 space-y-2">
        {results.map((r, i) => (
          <p
            key={i}
            className="bg-gray-100 p-3 rounded-lg shadow-sm border"
          >
            <span className="font-semibold">{r.name}</span>
            <span className="text-gray-500">
              {" "} (distance: {r.distance})
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
