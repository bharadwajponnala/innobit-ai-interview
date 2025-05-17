import React, { useRef, useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

const CaptureSection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isBlackFrame, setIsBlackFrame] = useState(true);
  // Add this state at the top
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openCameraModal = async () => {
    setIsModalOpen(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      alert("Could not access camera: " + err.message);
      setIsModalOpen(false);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    // Draw the video frame onto canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Crop to a circle: create a circular clipping path
    // To do this, we create a new canvas with a circle mask

    const circleCanvas = document.createElement("canvas");
    const diameter = Math.min(canvas.width, canvas.height);
    circleCanvas.width = diameter;
    circleCanvas.height = diameter;
    const circleCtx = circleCanvas.getContext("2d");

    // Create circular clipping path
    circleCtx.beginPath();
    circleCtx.arc(diameter / 2, diameter / 2, diameter / 2, 0, Math.PI * 2);
    circleCtx.closePath();
    circleCtx.clip();

    // Draw the relevant part of original canvas into the circle canvas
    // Center crop the image for circle:
    const sx = (canvas.width - diameter) / 2;
    const sy = (canvas.height - diameter) / 2;

    circleCtx.drawImage(
      canvas,
      sx,
      sy,
      diameter,
      diameter,
      0,
      0,
      diameter,
      diameter
    );

    // Convert circle canvas to blob
    circleCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setCapturedPhoto(url);

        // Close modal & stop stream
        setIsModalOpen(false);
        stopStream();
      }
    }, "image/png");
  };

  const checkIfBlackFrame = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = 100; // small sample size for perf
    const height = 100;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, width, height);

    const frame = ctx.getImageData(0, 0, width, height);
    const length = frame.data.length / 4; // number of pixels

    let sum = 0;
    for (let i = 0; i < length; i++) {
      // average brightness = (R + G + B) / 3
      const r = frame.data[i * 4];
      const g = frame.data[i * 4 + 1];
      const b = frame.data[i * 4 + 2];
      const brightness = (r + g + b) / 3;
      sum += brightness;
    }

    const avgBrightness = sum / length;

    // Consider it black if average brightness < threshold, tweak as needed
    setIsBlackFrame(avgBrightness < 20);
  };

  useEffect(() => {
    if (isModalOpen && stream) {
      const interval = setInterval(checkIfBlackFrame, 500); // check every 500ms
      return () => clearInterval(interval);
    }
  }, [isModalOpen, stream]);

  // Cleanup on modal close
  useEffect(() => {
    if (!isModalOpen) {
      stopStream();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return (
    <div className="border-dashed border-2 border-gray-300 rounded-md p-4 mb-6 text-center">
      <h3 className="text-sm font-semibold mb-2 flex justify-center items-center gap-2">
        <FaCamera className="text-blue-600" /> Capture Live Selfie
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        Position your face within the frame
      </p>
      <button
        onClick={openCameraModal}
        className="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
      >
        Start Camera
      </button>

      {/* Show captured photo preview */}
      {capturedPhoto && (
        <div className="mt-4 flex justify-center">
          <img
            src={capturedPhoto}
            alt="Captured Selfie"
            className="w-40 h-40 rounded-full border-4 border-blue-600 object-cover cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          />
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-md w-full">
            {/* Video inside a circle */}
            <div
              style={{
                width: 280,
                height: 280,
                margin: "0 auto",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #7c3aed", // blue border
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  stopStream();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCapturePhoto}
                disabled={isBlackFrame} // disable if black screen
                className={`px-4 py-2 rounded-md text-white ${
                  isBlackFrame
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Capture
              </button>
            </div>

            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        </div>
      )}

      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm w-full text-center">
            <h2 className="text-sm font-semibold mb-4">
              Preview Captured Selfie
            </h2>
            <img
              src={capturedPhoto}
              alt="Full Preview"
              className="w-64 h-64 rounded-full object-cover border-4 border-blue-600 mx-auto"
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptureSection;
