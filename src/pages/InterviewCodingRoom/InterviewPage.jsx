import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { DailyProvider, useCallFrame } from "@daily-co/daily-react";
import "./InterviewPage.css";

// ✅ VideoCallFrame component accepts videoUrl as prop
const VideoCallFrame = ({ videoUrl }) => {
  const callRef = useRef(null);

  const callFrame = useCallFrame({
    parentElRef: callRef,
    // Optional: add iframe styling or options here
  });

  useEffect(() => {
    if (callFrame && videoUrl) {
      callFrame.join({ url: videoUrl });

      callFrame.on("joined-meeting", () => {
        console.log("Joined video call");
      });

      return () => {
        callFrame.leave();
        callFrame.destroy();
      };
    }
  }, [callFrame, videoUrl]);

  return <div ref={callRef} style={{ width: "100vw", height: "100vh" }} />;
};

// ✅ Main VideoInterview component
const VideoInterview = () => {
  const location = useLocation();
  // const videoUrl = location.state?.videoUrl;
  const videoUrl = { conversation_url: "https://tavus.daily.co/c09f1206c82a" };

  console.log("videoUrl", videoUrl);

  if (!videoUrl) {
    return (
      <div className="error-message">
        Video URL not found. Please try again.
      </div>
    );
  }

  return (
    <DailyProvider>
      <VideoCallFrame videoUrl={videoUrl?.conversation_url} />
      <div
        className="controls"
        style={{
          position: "fixed",
          bottom: "20px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* <button
          className="start-btn"
          onClick={() => alert("Problem Solving Started")}
        >
          Start Problem Solving
        </button> */}
      </div>
    </DailyProvider>
  );
};

export default VideoInterview;
