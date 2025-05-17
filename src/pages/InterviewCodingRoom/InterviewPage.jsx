import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DailyProvider, useCallFrame } from "@daily-co/daily-react";
import "./InterviewPage.css";

const VideoCallFrame = forwardRef(({ videoUrl }, ref) => {
  const callRef = useRef(null);
  const callFrame = useCallFrame({
    parentElRef: callRef,
    options: {
      iframeStyle: {
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        border: "0",
      },
      showParticipantsBar: false,
      dailyConfig: {
        activeSpeakerMode: false,
        showFullscreenButton: false,
        showParticipantsBar: false,
        customTrayButtons: {},
        hideDefaultUI: true,
      },
    },
  });

  useImperativeHandle(ref, () => ({
    leaveCall: () => {
      callFrame?.leave();
    },
  }));

  useEffect(() => {
    if (callFrame && videoUrl) {
      callFrame.join({ url: videoUrl, activeSpeakerMode: false });

      callFrame.on("joined-meeting", () => {
        console.log("Joined video call.");
      });

      return () => {
        callFrame.leave();
        callFrame.destroy();
      };
    }
  }, [callFrame, videoUrl]);

  return <div ref={callRef} style={{ width: "100vw", height: "100vh" }} />;
});

const VideoInterview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoUrl = location.state?.videoUrl;

  const videoRef = useRef(null);

  if (!videoUrl) {
    return (
      <div className="error-message">
        Video URL not found. Please try again.
      </div>
    );
  }

  const handleLeave = () => {
    videoRef.current?.leaveCall();
    navigate("/interview-success");
  };

  return (
    <DailyProvider>
      <VideoCallFrame ref={videoRef} videoUrl={videoUrl} />
      <div className="fixed bottom-5 w-full text-right ">
        <button
          className=" absolute bottom-[-10px] right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-5 mt-2"
          onClick={handleLeave}
        >
          Leave
        </button>
      </div>
    </DailyProvider>
  );
};

export default VideoInterview;
