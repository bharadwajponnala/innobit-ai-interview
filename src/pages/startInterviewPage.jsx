import React, { useState } from "react";
import {
  DailyProvider,
  useCallObject,
  useDailyEvent,
  useParticipantIds,
  DailyVideo,
  useDaily,
} from "@daily-co/daily-react";
import "./index.css";

const VideoTile = ({ id, name, isLocal }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-sm bg-gray-700 px-2 py-1 rounded-full mb-2">
        {isLocal ? "You" : name || "Participant"}
      </div>
      <div className="w-full h-[400px] bg-gray-900 rounded-lg overflow-hidden">
        <DailyVideo
          sessionId={id}
          mirror={isLocal}
          autoPlay
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

const CustomVideoLayout = () => {
  const participantIds = useParticipantIds();
  const [participants, setParticipants] = useState({});

  useDailyEvent("participant-joined", (ev) => {
    setParticipants((prev) => ({
      ...prev,
      [ev.participant.session_id]: ev.participant,
    }));
  });

  useDailyEvent("participant-updated", (ev) => {
    setParticipants((prev) => ({
      ...prev,
      [ev.participant.session_id]: ev.participant,
    }));
  });

  useDailyEvent("participant-left", (ev) => {
    setParticipants((prev) => {
      const updated = { ...prev };
      delete updated[ev.participant.session_id];
      return updated;
    });
  });

  // Find local and remote participants
  const localEntry = Object.entries(participants).find(
    ([, p]) => p.local === true
  );
  const remoteEntries = Object.entries(participants).filter(
    ([, p]) => !p.local
  );

  return (
    <div className="flex w-full h-full p-4 bg-[#0D1B2A] text-white">
      {/* Left Panel - You */}
      <div className="w-1/2 p-4 flex flex-col items-center justify-center bg-gray-800 rounded-xl mr-4">
        {localEntry ? (
          <VideoTile
            id={localEntry[0]}
            name={localEntry[1].user_name}
            isLocal
          />
        ) : (
          <p>No local video</p>
        )}
      </div>

      {/* Right Panel - Remote Participants */}
      <div className="w-1/2 p-4 flex flex-col items-center justify-center bg-gray-800 rounded-xl">
        {remoteEntries.length > 0 ? (
          remoteEntries.map(([id, p]) => (
            <VideoTile key={id} id={id} name={p.user_name} />
          ))
        ) : (
          <div className="w-full h-[400px] bg-gray-900 rounded-lg flex items-center justify-center">
            <p className="text-sm">Waiting for participant...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Controls = () => {
  const callObject = useDaily();

  const handleLeave = () => {
    callObject?.leave();
  };

  return (
    <div className="flex justify-center mt-6 space-x-4">
      <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm">
        <span className="mr-2">&lt;/&gt;</span> Start Problem Solving
      </button>
      <button
        className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm"
        onClick={handleLeave}
      >
        &#x2716; End Interview
      </button>
    </div>
  );
};

const StartInteview = () => {
  // useCallObject manages creation and cleanup internally
  const callObject = useCallObject();

  React.useEffect(() => {
    if (!callObject) return;

    // Join the call once the callObject is ready
    callObject.join({ url: "https://tavus.daily.co/c0f701162110" });

    return () => {
      callObject.leave();
    };
  }, [callObject]);

  if (!callObject) return <div>Loading...</div>;

  return (
    <DailyProvider callObject={callObject}>
      <div className="min-h-screen bg-[#0D1B2A] p-8">
        <div className="flex justify-between items-center text-white mb-4">
          <h1 className="text-xl font-bold">InnobitAI</h1>
          <span className="text-sm">99:50</span>
        </div>
        <CustomVideoLayout />
        <Controls />
      </div>
    </DailyProvider>
  );
};

export default StartInteview;
