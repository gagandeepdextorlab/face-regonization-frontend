import React, { useState } from "react";
import { API_URL } from "./API";
import WebcamCapture from "./WebCapture";
export default function Register() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const registerUser = async () => {
    const res = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Register Face</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <WebcamCapture onCapture={(img) => setImage(img)} />

      <button onClick={registerUser}>Save</button>
    </div>
  );
}
