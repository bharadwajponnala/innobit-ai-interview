import { useState } from "react";
import ChecklistItem from "./ChecklistItem";
import { FaDesktop, FaTv, FaEthernet, FaPlug } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChecklistCard = () => {
  const navigate = useNavigate();
  const [checkboxStates, setCheckboxStates] = useState({
    restart: false,
    display: false,
    network: false,
    power: false,
  });

  const handleNextStep = () => {
    navigate("/system-test");
  };

  const allChecked = Object.values(checkboxStates).every(Boolean);

  const items = [
    {
      key: "restart",
      icon: <FaDesktop size={18} />,
      title: "Restart Your Computer",
      description:
        "Ensure your computer is freshly restarted for optimal performance",
    },
    {
      key: "display",
      icon: <FaTv size={18} />,
      title: "Single Display Screen",
      description: "Use only one display screen during the interview",
    },
    {
      key: "network",
      icon: <FaEthernet size={18} />,
      title: "Wired Internet Connection",
      description: "Connect to a stable, wired internet connection",
    },
    {
      key: "power",
      icon: <FaPlug size={18} />,
      title: "Power Connection",
      description: "Ensure your device is connected to a power source",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Welcome to the AI-Powered Interview Platform
      </h2>
      <p className="text-gray-600 mb-6">
        Please complete the verification steps to begin your interview.
      </p>

      <div className="space-y-4 mb-6 text-left">
        {items.map((item) => (
          <ChecklistItem
            key={item.key}
            id={item.key}
            icon={item.icon}
            title={item.title}
            description={item.description}
            checkboxStates={checkboxStates}
            setCheckboxStates={setCheckboxStates}
          />
        ))}
      </div>

      <button
        onClick={handleNextStep}
        disabled={!allChecked}
        className={`${
          allChecked
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-300 cursor-not-allowed"
        } text-white font-medium px-6 py-2 rounded-lg transition duration-200`}
      >
        Next Step
      </button>
    </div>
  );
};

export default ChecklistCard;
