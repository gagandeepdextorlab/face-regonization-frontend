import React, { useRef, useEffect } from "react";

export default function WebcamCapture({ onCapture }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera error:", err);
        alert("Camera access failed.");
      }
    };
    startCamera();
  }, []);

  const capture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg");
    onCapture(image);
  };

  return (
    <div className="mb-4">
      <div className="border rounded-xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-64 object-cover"
        />
      </div>

      <button
        onClick={capture}
        className="mt-3 bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700"
      >
        Capture
      </button>
    </div>
  );
}
