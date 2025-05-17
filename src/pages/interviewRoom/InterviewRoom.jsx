import HeaderBar from "./HeaderBar";
import VideoPanel from "./VideoPanel";
import VideoControls from "./VideoControls";

const InterviewRoom = () => {
  return (
    <div className="flex flex-col h-screen bg-[#0e1b33] text-white">
      <HeaderBar />
      <VideoPanel />
      <VideoControls />
    </div>
  );
};

export default InterviewRoom;
