import { FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleStartVerification = () => {
    navigate("/instructions");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="flex items-center mb-10">
        <img
          src="/Innobit-logo.png"
          alt="InnobitAI Logo"
          className="w-50 mr-2"
        />
        {/* <h1 className="text-2xl font-bold text-violet-600">InnobitAI</h1> */}
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Welcome to the AI-Powered
          <br />
          Interview Platform
        </h2>
        <p className="text-gray-600 mb-6">
          Please complete the verification steps to begin your interview.
        </p>

        {/* Dots */}
        <div className="flex justify-center mb-6 space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>

        {/* Button */}
        <button
          onClick={handleStartVerification}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-200"
        >
          Start Verification →
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center mt-6 text-sm text-gray-500">
        <FaShieldAlt className="mr-1" />
        Secure &amp; Encrypted Platform
      </div>
    </div>
  );
};

export default Landing;
