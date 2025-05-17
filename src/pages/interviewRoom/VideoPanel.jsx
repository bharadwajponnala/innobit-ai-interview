const VideoPanel = () => {
  return (
    <div className="flex flex-1 justify-between gap-4 px-6 py-4 bg-[#0e1b33]">
      <div className="flex-1 bg-white rounded-lg overflow-hidden relative">
        <div className="absolute top-2 left-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
          You
        </div>
        <img
          src="/your-local-image-1.png"
          alt="Interviewer"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 bg-white rounded-lg overflow-hidden relative">
        {/* <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Connected • Candidate
        </div> */}
        <img
          src="/your-local-image-2.png"
          alt="Candidate"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default VideoPanel;
