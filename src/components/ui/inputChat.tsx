import React, { useRef, useState, type SetStateAction } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import micIcon from "../../assets/mic.svg";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import type { AudioResponse, ChatResponseProps } from "../../Service/interface";
import { _post } from "../../Service/ApiService";
import { AUDIO_CHAT, CHATSUMMARY } from "../../Service/useApiService";
import Lottie from "lottie-react";
import AudioWave from "../../assets/quVtt5d3e6.json";

interface ChatInputProps {
  onSendMessage: (userMessage: string, botSummary?: string, audioPath?: string) => void;
  updateHistory: number;
  setUpdateHistory: React.Dispatch<SetStateAction<number>>;
}

const ChatInput = ({
  onSendMessage,
  updateHistory,
  setUpdateHistory,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const { id: session_Id } = useParams<{ id: string }>();
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const silenceTimeoutRef = useRef<number | null>(null);

  const handleSend = async () => {
    if (!message.trim()) return; // prevent empty message

    const currentMessage = message.trim();
    setMessage(""); // Clear input immediately

    onSendMessage(currentMessage);

    if (!session_Id) {
      toast.error("Session ID is missing from the URL!");
      return;
    }

    try {
      const { data } = await _post<ChatResponseProps>(CHATSUMMARY, {
        session_id: session_Id,
        prompt: currentMessage,
      });

      onSendMessage("", data.message);
      if (updateHistory === 0) {
        setUpdateHistory((prev) => prev + 1);
      }
    } catch (error) {
      toast.error("Error during sending message");
      console.error(error);
      onSendMessage(currentMessage, "Error occurred");
    }
  };

  const sendAudioToAPI = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
    formData.append('session_id', session_Id ?? "");

    try{
      onSendMessage("")
      const { data } = await _post<AudioResponse>(AUDIO_CHAT, formData, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });

      onSendMessage("", data.message, data.audioPath);
    }
    catch (error) {
      // do nothing
    }
  };

  const onClickAudioSendHandler = () => {
    setIsAudio(false);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }
  };

  const startAudioChat = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      setIsAudio(true);

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          await sendAudioToAPI(audioBlob);
          audioChunksRef.current = [];
        }
      };

      mediaRecorder.start();

      // Auto-stop after 5s
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      silenceTimeoutRef.current = setTimeout(() => {
        onClickAudioSendHandler();
      }, 5000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-center mt-2 px-4 w-full max-w-[700px] lg:max-w-[1000px]">
      {/* Input box */}
      {isAudio ? (
        <div className="relative flex-1">
          <Lottie className="h-[50px]" animationData={AudioWave} loop={true} />
        </div>
      ) : (
        <div className="relative flex-1">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="h-[45px] lg:h-[55px] w-full px-4 pr-12 rounded-2xl border-2 border-[#ACACB1] shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-[#635e5e]"
            type="text"
            placeholder="Ask anything..."
          />

          {/* Send Button */}
          <span
            onClick={() => message.trim() && handleSend()}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-xl cursor-pointer 
            ${
              !message.trim()
                ? "text-gray-300 cursor-not-allowed"
                : "text-[#8C8C8C]"
            }`}
          >
            <RiSendPlane2Fill className="h-[25px] w-[25px]" />
          </span>
        </div>
      )}
      {/* Mic button */}
      <div className="h-[45px] lg:h-[55px] w-[45px] lg:w-[55px] border-2 border-[#ACACB1] flex justify-center items-center rounded-2xl shadow-lg cursor-pointer">
        {isAudio ? (
          <RiSendPlane2Fill
            className="h-[25px] w-[25px] text-[#8C8C8C]"
            onClick={onClickAudioSendHandler}
          />
        ) : (
          <img
            src={micIcon}
            alt="micIcon"
            className="h-[23px] w-[23px]"
            onClick={startAudioChat}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInput;
