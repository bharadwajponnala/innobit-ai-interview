import SummaryRow from "./SummaryRow";
import { FaCode, FaClock, FaInfoCircle } from "react-icons/fa";

const InterviewSummaryCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mx-auto mb-6">
      <SummaryRow
        icon={<FaCode className="text-indigo-600 mt-1" />}
        label="Code Submission Summary"
        value="All code submissions have been received and verified"
      />
      <SummaryRow
        icon={<FaClock className="text-indigo-600 mt-1" />}
        label="Interview Duration"
        value="Total Duration: 45 minutes"
      />
      <SummaryRow
        icon={<FaInfoCircle className="text-indigo-600 mt-1" />}
        label="Interview Status: Complete"
        date="May 14, 2025"
      />
    </div>
  );
};

export default InterviewSummaryCard;
