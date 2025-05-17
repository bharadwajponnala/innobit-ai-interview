import React, { useRef, useState, useEffect } from "react";
import { FaIdCard } from "react-icons/fa";

const UploadSection = ({
  title,
  captureLabel,
  uploadLabel,
  onUploadFile,
  onCaptureFile,
}) => {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sampleCanvasRef = useRef(null); // canvas for black frame check

  const [previewUrl, setPreviewUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [isBlackFrame, setIsBlackFrame] = useState(true);

  // New state for image preview modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onUploadFile && onUploadFile(file);
    }
  };

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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        onCaptureFile && onCaptureFile(blob);

        setIsModalOpen(false);
        stopStream();
      }
    }, "image/jpeg");
  };

  const checkIfBlackFrame = () => {
    if (!videoRef.current || !sampleCanvasRef.current) return;

    const video = videoRef.current;
    const canvas = sampleCanvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = 100;
    const height = 100;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, width, height);

    const frame = ctx.getImageData(0, 0, width, height);
    const length = frame.data.length / 4;

    let sum = 0;
    for (let i = 0; i < length; i++) {
      const r = frame.data[i * 4];
      const g = frame.data[i * 4 + 1];
      const b = frame.data[i * 4 + 2];
      const brightness = (r + g + b) / 3;
      sum += brightness;
    }

    const avgBrightness = sum / length;
    setIsBlackFrame(avgBrightness < 20);
  };

  useEffect(() => {
    let interval;
    if (isModalOpen && stream) {
      interval = setInterval(checkIfBlackFrame, 500);
    } else {
      setIsBlackFrame(true);
    }
    return () => clearInterval(interval);
  }, [isModalOpen, stream]);

  useEffect(() => {
    if (!isModalOpen) {
      stopStream();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return (
    <div className="border-dashed border-2 border-gray-300 rounded-md p-4 mb-6">
      <h3 className="text-center font-semibold text-sm mb-2 flex justify-center items-center gap-2">
        <FaIdCard className="text-blue-600" /> {title}
      </h3>
      <p className="text-xs text-center text-gray-500 mb-4">
        Accepted formats: JPEG, PNG
      </p>

      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleUploadClick}
          className="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          {uploadLabel}
        </button>
        <button
          onClick={openCameraModal}
          className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-md text-sm"
        >
          {captureLabel}
        </button>
      </div>

      {/* Preview Image */}
      {previewUrl && (
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => setIsImageModalOpen(true)}
        >
          <img
            src={previewUrl}
            alt="preview"
            className="w-50 h-auto rounded-md border border-gray-300"
          />
        </div>
      )}

      {/* Modal for camera preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-md w-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-md"
            ></video>
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
                disabled={isBlackFrame}
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
            <canvas ref={sampleCanvasRef} style={{ display: "none" }} />
          </div>
        </div>
      )}

      {/* Modal for image preview */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-60"
          onClick={() => setIsImageModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={previewUrl}
            alt="Full preview"
            className="max-h-[90vh] max-w-[90vw] rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent modal close when clicking image
          />
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 hover:bg-opacity-75"
            aria-label="Close image preview"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
