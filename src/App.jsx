import React from "react";
import Register from "./Register";
import Recognize from "./Recognize";
import Attendance from "./Attendance";

export default function App() {
  return (
    <div>
      <h1>Face Attendance System</h1>
      <Register />
      <hr />
      <Recognize />
      <hr />
      <Attendance />
    </div>
  );
}
