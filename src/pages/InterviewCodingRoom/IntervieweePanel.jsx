const IntervieweePanel = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[220px]">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src="/your-interviewer.png"
          alt="Interviewer"
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute bottom-1 left-1 bg-black text-white text-xs px-2 py-1 rounded">
          You
        </div>
      </div>
      <div className="relative rounded-lg overflow-hidden">
        <img
          src="/your-candidate.png"
          alt="Candidate"
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute bottom-1 left-1 bg-black text-white text-xs px-2 py-1 rounded">
          Candidate
        </div>
      </div>
    </div>
  );
};

export default IntervieweePanel;
