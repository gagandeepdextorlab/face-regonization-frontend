import React, { useRef, useEffect, useState } from "react";

export default function WebcamCapture({ onCapture }) {
  const videoRef = useRef(null);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();

          // Set initial dimensions for canvas capture
          const { videoWidth, videoHeight } = videoRef.current;
          setVideoDimensions({
            width: videoWidth || 640,
            height: videoHeight || 480,
          });
        }
      } catch (err) {
        console.error("Camera error:", err);
        alert(
          "Cannot access camera.\n- Check permissions\n- Use HTTPS on mobile\n- Ensure no other app is using the camera"
        );
      }
    };

    startCamera();
  }, []);

  const capture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoDimensions.width;
    canvas.height = videoDimensions.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg");
    onCapture(image);
  };

  return (
    <div className="mb-4 w-full flex flex-col items-center">
      <div className="w-full relative bg-black overflow-hidden rounded-xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-auto max-h-screen object-cover"
          style={{ aspectRatio: "4/3" }}
        />
      </div>

      <button
        onClick={capture}
        className="mt-3 bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 w-1/2 text-center"
      >
        Capture
      </button>
    </div>
  );
}
