import React, { useState } from "react";
import Logo from "../Logo";
import UploadSection from "./UploadSection";
import CaptureSection from "./CaptureSection";
import ConsentCheckbox from "./ConsentCheckbox";
import ProceedButton from "./ProceedButton";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";

function UploadProof() {
  const { queryParams } = useAppContext();
  const [consent, setConsent] = useState(false);
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    console.log("Email in Upload:", queryParams.email);
    console.log("Job ID in Upload:", queryParams.jobId);
    if (!frontFile || !backFile) {
      alert("Please upload or capture both front and back images.");
      return;
    }
    fetchDataAndDelay();
  };

  const fetchDataAndDelay = async () => {
    const { email, jobId } = queryParams;

    if (!email || !jobId) {
      alert("Invalid session. Please start over.");
      return;
    }

    setLoading(true); // ⏳ Start loading

    try {
      const [response] = await Promise.all([
        axios.post(
          "https://tavus-conversation-app-main-901971977632.us-central1.run.app/conversation",
          { email, jobId }
        ),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      const data = response.data;

      if (data.conversation_url) {
        navigate("/interview-room", {
          state: { videoUrl: data.conversation_url },
        });
      } else {
        console.error("No conversation_url found in response:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // ✅ Stop loading (optional if you navigate away)
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
          <ProceedButton
            disabled={!consent}
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadProof;
