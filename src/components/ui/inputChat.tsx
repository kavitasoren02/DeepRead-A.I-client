import { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import micIcon from "../../assets/mic.svg";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import type { ChatResponseProps } from "../../Service/interface";
import { _post } from "../../Service/ApiService";
import { CHATSUMMARY } from "../../Service/useApiService";

interface ChatInputProps {
  onSendMessage: (userMessage: string, botSummary?: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const { id: session_Id } = useParams<{ id: string }>();

  const handleSend = async () => {
    if (!message.trim()) return;

    const currentMessage = message;
    setMessage(""); 

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

      // Update last message with bot response
      onSendMessage(currentMessage, data.summary);
    } catch (error) {
      toast.error("Error during sending message");
      console.error(error);
      onSendMessage(currentMessage, "Error occurred");
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-center mt-2 px-4 w-full max-w-[700px] lg:max-w-[1000px]">
      {/* Input box */}
      <div className="relative flex-1">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="h-[45px] lg:h-[55px] w-full px-4 pr-12 rounded-2xl border-2 border-[#ACACB1] shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-[#635e5e]"
          type="text"
          placeholder="Send a message"
        />
        
        <span
          onClick={handleSend}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-xl cursor-pointer ${message.trim() ? " text-gray-300 cursor-not-allowed" : "text-[#8C8C8C]"}`}
        >
          <RiSendPlane2Fill className="h-[25px] w-[25px] " />
        </span>
      </div>

      {/* Mic button */}
      <div className="h-[45px] lg:h-[55px] w-[45px] lg:w-[55px] border-2 border-[#ACACB1] flex justify-center items-center rounded-2xl shadow-lg cursor-pointer">
        <img src={micIcon} alt="micIcon" className="h-[23px] w-[23px]" />
      </div>
    </div>
  );
};

export default ChatInput;
