import React, { useEffect, useState } from "react";
import { API_URL } from "./API.js";

export default function Attendance() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/attendance`)
      .then((res) => res.json())
      .then((data) => setLogs(data.attendance));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Attendance Logs</h2>

      <div className="space-y-2">
        {logs.map((log, i) => (
          <p
            key={i}
            className="bg-green-100 border border-green-300 p-3 rounded-lg shadow-sm"
          >
            <span className="font-semibold">{log.name}</span> — {log.timestamp}
          </p>
        ))}
      </div>
    </div>
  );
}
