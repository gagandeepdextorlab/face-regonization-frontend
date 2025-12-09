import React, { useRef, useEffect } from "react";

export default function WebcamCapture({ onCapture }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" } // front camera on mobile
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera error:", err);
        alert(
          "Cannot access camera.\n- Check permissions\n- If on mobile, ensure using LAN IP or HTTPS\n- Camera not used by another app"
        );
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
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "640px", height: "480px", backgroundColor: "black" }}
      />
      <br />
      <button onClick={capture}>Capture</button>
    </div>
  );
}
