import { Routes, Route, useLocation } from "react-router-dom";
import InterviewSuccess from "./pages/InterviewSuccess/successPage";
import Landing from "./pages/instruction-pages/landing";
import InstructionPage from "./pages/instruction-pages/instructionPage";
import SystemTest from "./pages/system-test/systemTest";
import UploadProof from "./pages/upload-proof/UploadProof";
import InterviewRoom from "./pages/interviewRoom/InterviewRoom";
import InterviewCodingRoom from "./pages/InterviewCodingRoom/InterviewCodingRoom";
import { useEffect } from "react";
import PreventNavigation from "./pages/PreventNavigation";
import VideoInterview from "./pages/InterviewCodingRoom/InterviewPage";

function App() {
  return (
    <div>
      {/* <PreventNavigation /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/interview/success" element={<InterviewSuccess />} />
        <Route path="/" element={<Landing />} />
        <Route path="/instructions" element={<InstructionPage />} />
        <Route path="/system-test" element={<SystemTest />} />
        <Route path="/upload-proof" element={<UploadProof />} />
        {/* <Route path="/interview-room" element={<InterviewRoom />} /> */}
        <Route path="/interview-room" element={<VideoInterview />} />
        <Route
          path="/interview-coding-room"
          element={<InterviewCodingRoom />}
        />
      </Routes>
    </div>
  );
}

export default App;
