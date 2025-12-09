import React, { useEffect, useState } from "react";
import { API_URL } from "./API";

export default function Attendance() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/attendance`)
      .then((res) => res.json())
      .then((data) => setLogs(data.attendance));
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
      {logs.map((log, i) => (
        <p key={i}>
          {log.name} — {log.timestamp}
        </p>
      ))}
    </div>
  );
}
