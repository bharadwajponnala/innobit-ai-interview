import React, { useState } from "react";
import Logo from "../Logo";
import UploadSection from "./UploadSection";
import CaptureSection from "./CaptureSection";
import ConsentCheckbox from "./ConsentCheckbox";
import ProceedButton from "./ProceedButton";
import { useNavigate } from "react-router-dom";

function UploadProof() {
  const [consent, setConsent] = useState(false);
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!frontFile || !backFile) {
      alert("Please upload or capture both front and back images.");
      return;
    }
    fetchDataAndDelay();
  };

  const fetchDataAndDelay = async () => {
    try {
      const postData = {
        replica_id: "rb17cf590e15",
        conversation_name: "InnobitAI intro",
        conversational_context: "Hi Manoj, welcome to Innobit AI.\n\n...",
      };

      const [response, _] = await Promise.all([
        fetch("http://127.0.0.1:8000/conversation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }).then((res) => res.json()),

        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      // ✅ Extract videoUrl from response
      if (response.videoUrl) {
        navigate("/interview-room", { state: { videoUrl: response.videoUrl } });
      } else {
        console.error("No videoUrl found in response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <Logo />
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            Welcome to the AI-Powered Interview Platform
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Please complete the verification steps to begin your interview.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-red-50 border border-red-400 text-red-600 p-3 text-sm rounded-md mb-6 font-medium">
            Identity theft is a crime. Using another person’s ID is strictly
            prohibited.
          </div>

          <UploadSection
            title="Upload Government ID (Front)"
            uploadLabel="Upload Front"
            captureLabel="Capture Front"
            onUploadFile={(file) => setFrontFile(file)}
            onCaptureFile={(file) => setFrontFile(file)}
          />

          <UploadSection
            title="Upload Government ID (Back)"
            uploadLabel="Upload Back"
            captureLabel="Capture Back"
            onUploadFile={(file) => setBackFile(file)}
            onCaptureFile={(file) => setBackFile(file)}
          />
          <CaptureSection onStartCamera={() => alert("Start Camera")} />

          <ConsentCheckbox
            isChecked={consent}
            onChange={() => setConsent(!consent)}
          />

          <ProceedButton disabled={!consent} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default UploadProof;
