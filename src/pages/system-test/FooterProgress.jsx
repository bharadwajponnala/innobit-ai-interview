import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const FooterProgress = ({
  cameraPassed,
  micPassed,
  speakerPassed,
  onProceed,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      name: "Camera Check",
      isPassed: false,
    },
    {
      id: 2,
      name: "Microphone Check",
      isPassed: false,
    },
    {
      id: 3,
      name: "Speaker Check",
      isPassed: false,
    },
  ]);

  useEffect(() => {
    setData([
      {
        id: 1,
        name: "Camera Check",
        isPassed: cameraPassed,
      },
      {
        id: 2,
        name: "Microphone Check",
        isPassed: micPassed,
      },
      {
        id: 3,
        name: "Speaker Check",
        isPassed: speakerPassed,
      },
    ]);
  }, [cameraPassed, micPassed, speakerPassed]);

  const handleNextStep = () => {};

  const handleProceed = () => {
    if (onProceed) onProceed(); // kill camera
    // Navigate to interview page or next step
    navigate("/upload-proof");
  };

  const allPassed = data.every((item) => item.isPassed);

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      <div className="flex gap-6">
        {data.map((row) => (
          <label
            key={row.id}
            className="flex items-center space-x-2 text-sm text-gray-600"
          >
            {row.isPassed ? (
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            ) : (
              <XCircleIcon className="w-5 h-5 text-gray-400" />
            )}
            <span>{row.name}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleProceed}
        disabled={!allPassed}
        className={`px-6 py-2 rounded-md font-medium ${
          allPassed ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        Proceed to Interview
      </button>
    </div>
  );
};

export default FooterProgress;
