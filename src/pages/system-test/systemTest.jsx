import React, { useState, useRef, useEffect } from "react";
import EquipmentCheckCard from "./EquipmentCheckCard";
import FooterProgress from "./FooterProgress";
import Logo from "../Logo";
import {
  FaVideo,
  FaMicrophone,
  FaVolumeUp,
  FaCamera,
  FaWaveSquare,
  FaMusic,
} from "react-icons/fa";

function SystemTest() {
  const [camera, setCamera] = useState("");
  const [mic, setMic] = useState("");
  const [speaker, setSpeaker] = useState("");
  const streamRef = useRef(null); // replace useState for stream

  const videoRef = useRef(null);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [cameras, setCameras] = useState([]);
  const [selectedCamId, setSelectedCamId] = useState("");
  const [stream, setStream] = useState(null);
  const [cameraPassed, setCameraPassed] = useState(false);

  const [mics, setMics] = useState([]);
  const [selectedMicId, setSelectedMicId] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [micPassed, setMicPassed] = useState(null); // null initially
  const recordingIntervalRef = useRef(null);
  const [recordingTime, setRecordingTime] = useState(10);
  const [audioPlayed, setAudioPlayed] = useState(false); // detect audio end

  const [speakers, setSpeakers] = useState([]);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState("");
  const [speakerPassed, setSpeakerPassed] = useState(null); // null initially
  const [showSpeakerButtons, setShowSpeakerButtons] = useState(false);
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(5);
  const [isMicTestCompleted, setIsMicTestCompleted] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [selectedCamLabel, setSelectedCamLabel] = useState("");
  const [selectedMicLabel, setSelectedMicLabel] = useState("");
  const [selectedSpeakerLabel, setSelectedSpeakerLabel] = useState("");

  const handleCameraPreview = async () => {
    if (!cameraOn) {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: camera },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          streamRef.current = newStream;
          setCameraOn(true);
          setCameraPassed(true);
        }
      } catch (error) {
        console.error("Camera access error:", error);
        setCameraPassed(false);
      }
    } else {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setCameraOn(false);
      setCameraPassed(false);
    }
  };
  const stopAllMedia = () => {
    // 🔴 Stop camera video stream
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }

    // 🔴 Stop shared camera stream (if stored)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    // 🔴 Stop microphone MediaRecorder stream (if still live)
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    // 🔴 Stop microphone tracks (if media recorder has input stream)
    if (mediaRecorderRef.current?.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    // 🔴 Clean up audio resources
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    setAudioURL(null);
    setIsRecording(false);
    clearInterval(recordingIntervalRef.current);

    // Reset state
    setCameraOn(false);
    setCameraPassed(false);
  };

  const handleMicTest = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: mic },
        });

        audioChunksRef.current = [];
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (e) =>
          audioChunksRef.current.push(e.data);

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
          setIsMicTestCompleted(true);
          setRecordingTimeLeft(5);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);

        let timeLeft = 5;
        setRecordingTimeLeft(timeLeft);

        recordingIntervalRef.current = setInterval(() => {
          timeLeft -= 1;
          setRecordingTimeLeft(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(recordingIntervalRef.current);
            mediaRecorderRef.current.stop();
            setIsRecording(false);
          }
        }, 1000);
      } catch (error) {
        console.error("Microphone access error:", error);
      }
    } else {
      // If already recording, stop immediately
      clearInterval(recordingIntervalRef.current);
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSpeakerTest = () => {
    const audio = new Audio("./test.mp3"); // Ensure this file exists in your `public` folder
    audio.play().catch((e) => console.error("Speaker test failed:", e));
    setSpeakerPassed(true);
  };

  // useEffect(() => {
  //   const getDevices = async () => {
  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     const cams = devices.filter((d) => d.kind === "videoinput");
  //     const micList = devices.filter((d) => d.kind === "audioinput");
  //     const speakerList = devices.filter((d) => d.kind === "audiooutput");

  //     setCameras(cams);
  //     setMics(micList);
  //     setSpeakers(speakerList);

  //     if (cams.length > 0) {
  //       setCamera(cams[0].deviceId);
  //       setSelectedCamId(cams[0].deviceId);
  //       setSelectedCamLabel(cams[0].label);
  //     }

  //     if (micList.length > 0) {
  //       setMic(micList[0].deviceId);
  //       setSelectedMicId(micList[0].deviceId);
  //       setSelectedMicLabel(micList[0].label);
  //     }

  //     if (speakerList.length > 0) {
  //       setSpeaker(speakerList[0].deviceId);
  //       setSelectedSpeakerId(speakerList[0].deviceId);
  //       setSelectedSpeakerLabel(speakerList[0].label);
  //     }
  //   };

  //   getDevices();
  // }, []);

  useEffect(() => {
    const getInitialPermissionsAndDevices = async () => {
      try {
        // Request camera and microphone access just once
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter((d) => d.kind === "videoinput");
        const micList = devices.filter((d) => d.kind === "audioinput");
        const speakerList = devices.filter((d) => d.kind === "audiooutput");

        setCameras(cams);
        setMics(micList);
        setSpeakers(speakerList);

        // Default camera
        if (cams.length > 0) {
          setCamera(cams[0].deviceId);
          setSelectedCamId(cams[0].deviceId);
          setSelectedCamLabel(cams[0].label);
        }

        // Default microphone
        if (micList.length > 0) {
          setMic(micList[0].deviceId);
          setSelectedMicId(micList[0].deviceId);
          setSelectedMicLabel(micList[0].label);
        }

        // Default speaker
        if (speakerList.length > 0) {
          setSpeaker(speakerList[0].deviceId);
          setSelectedSpeakerId(speakerList[0].deviceId);
          setSelectedSpeakerLabel(speakerList[0].label);
        }
      } catch (error) {
        console.error("Media device access error:", error);
      }
    };

    getInitialPermissionsAndDevices();

    return () => {
      stopAllMedia(); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cams = devices.filter((d) => d.kind === "videoinput");
      const micList = devices.filter((d) => d.kind === "audioinput");
      const speakerList = devices.filter((d) => d.kind === "audiooutput");

      setCameras(cams);
      setMics(micList);
      setSpeakers(speakerList);

      setSelectedMicId(micList[0]?.deviceId || "");
      setSelectedSpeakerId(speakerList[0]?.deviceId || "");
    };

    getDevices();
  }, []);

  useEffect(() => {
    if (audioURL) {
      const audioElement = new Audio(audioURL);
      audioElement.onended = () => {
        setMicPassed(true);
      };
      audioElement.play();
    }
  }, [audioURL]);

  useEffect(() => {
    return () => {
      stopAllMedia(); // cleanup everything on unmount
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <Logo />
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          System Test: Diagnostics – Equipment Checks
        </h2>
        <p className="text-gray-600 mt-1">
          Please verify your equipment before proceeding with the interview
        </p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center items-center px-4">
        <EquipmentCheckCard
          title="Camera Check"
          icon={<FaVideo />}
          options={cameras}
          selectedOption={camera}
          onOptionChange={(e) => {
            const selected = cameras.find((c) => c.deviceId === e.target.value);
            setCamera(e.target.value);
            setSelectedCamLabel(selected?.label || "");
          }}
          buttonLabel={cameraOn ? "Stop Camera" : "Start Camera"}
          onButtonClick={handleCameraPreview}
          previewIcon={
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          }
        />

        <EquipmentCheckCard
          title="Microphone Check"
          icon={<FaMicrophone />}
          options={mics}
          selectedOption={mic}
          onOptionChange={(e) => {
            const selected = mics.find((m) => m.deviceId === e.target.value);
            setMic(e.target.value);
            setSelectedMicLabel(selected?.label || "");
          }}
          buttonLabel={
            isRecording
              ? `Stop Recording (${recordingTimeLeft}s)`
              : "Start Recording Test"
          }
          onButtonClick={handleMicTest}
          previewIcon={
            audioURL ? (
              <audio
                controls
                src={audioURL}
                onEnded={() => setMicPassed(true)}
                className="w-full"
              />
            ) : (
              <FaWaveSquare />
            )
          }
        />

        <EquipmentCheckCard
          title="Speaker Check"
          icon={<FaVolumeUp />}
          options={speakers} // Speaker selection is limited in browsers
          selectedOption={speaker}
          onOptionChange={(e) => {
            const selected = speakers.find(
              (s) => s.deviceId === e.target.value
            );
            setSpeaker(e.target.value);
            setSelectedSpeakerLabel(selected?.label || "");
          }}
          buttonLabel="Test Speaker"
          onButtonClick={handleSpeakerTest}
          previewIcon={<FaMusic />}
        />
      </div>

      <FooterProgress
        cameraPassed={cameraPassed}
        micPassed={micPassed}
        speakerPassed={speakerPassed}
        onProceed={stopAllMedia}
      />
    </div>
  );
}

export default SystemTest;
