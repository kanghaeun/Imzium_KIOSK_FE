import { useState, useRef } from "react";
import { FiMic } from "react-icons/fi";
import styled from "styled-components";

const Speech = ({ onSpeechComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorder = useRef(null);
  const [isRed, setIsRed] = useState(false);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        await handleSendAudio(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setIsRed(true); // Set the button color to red
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsRed(false); // Reset the button color
      audioChunks.current = [];
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSendAudio = async (audioBlob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");

      const response = await fetch("http://43.200.171.25/api/audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onSpeechComplete(data.transcription);
    } catch (error) {
      console.error("Error uploading recording:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <VoiceContainer>
      <VoiceBtn
        onClick={toggleRecording}
        disabled={isProcessing}
        isRed={isRed} // Pass the isRed prop to style based on the recording state
        className={`ml-2 p-2 rounded-md transition-colors ${
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FiMic size={"3rem"} color="#fff" />
      </VoiceBtn>
      <Voice>원하시는 메뉴를 말씀해 주시면 주문 도와드리겠습니다.</Voice>
    </VoiceContainer>
  );
};

export default Speech;

const VoiceContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
`;

const VoiceBtn = styled.div`
  margin-top: 2rem;
  border: 2px solid #fff;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  background-color: ${({ isRed }) =>
    isRed
      ? "red"
      : "none"}; /* Change background color based on recording state */
`;

const Voice = styled.div`
  margin-top: 1.5rem;
  font-size: 25px;
  color: #fff;
  font-weight: 100;
`;
