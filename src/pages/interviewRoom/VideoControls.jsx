import { useNavigate } from "react-router-dom";

const VideoControls = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/interview-coding-room");
  };
  return (
    <div className="flex justify-center gap-4 py-6 bg-[#0e1b33]">
      <button
        onClick={handleStart}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
      >
        <span>&lt;/&gt;</span> Start Problem Solving
      </button>
      <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md">
        ❌ End Interview
      </button>
    </div>
  );
};

export default VideoControls;
