import React, { useState } from "react";
import { API_URL } from "./API";
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
      <h2>Recognize Face</h2>

      <WebcamCapture onCapture={(img) => recognizeFace(img)} />

      <div>
        {results.map((r, i) => (
          <p key={i}>
            {r.name} (distance: {r.distance})
          </p>
        ))}
      </div>
    </div>
  );
}
