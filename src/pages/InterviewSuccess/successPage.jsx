import StatusMessage from "./StatusMessage";
import InterviewSummaryCard from "./InterviewSummaryCard";
import ActionButtons from "./ActionButtons";
import Logo from "../Logo";

const InterviewSuccess = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 flex flex-col items-center">
      <Logo />
      <StatusMessage />
      <InterviewSummaryCard />
      <ActionButtons />
      <p className="text-xs text-gray-400 mt-8 mb-4">
        © 2025 InnobitAI. All rights reserved.
      </p>
    </div>
  );
};

export default InterviewSuccess;
