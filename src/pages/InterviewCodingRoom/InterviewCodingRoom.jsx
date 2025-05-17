import HeaderBar from "./HeaderBar";
import IntervieweePanel from "./IntervieweePanel";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";

const InterviewCodingRoom = () => {
  return (
    <div className="h-screen flex flex-col">
      <HeaderBar />
      <div className="flex flex-1 p-6 gap-6 bg-gray-50">
        <IntervieweePanel />
        <div className="flex-1 flex flex-col">
          <ProblemStatement />
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default InterviewCodingRoom;
