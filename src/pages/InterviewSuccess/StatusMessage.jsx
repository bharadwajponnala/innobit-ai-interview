import { FaCheckCircle } from "react-icons/fa";

const StatusMessage = () => (
  <div className="text-center mb-6">
    <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-2" />
    <h2 className="text-2xl font-bold">Interview Completed Successfully!</h2>
    <p className="text-gray-600 text-sm mt-2">
      Thank you for participating in our AI-powered interview session.
    </p>
  </div>
);

export default StatusMessage;
