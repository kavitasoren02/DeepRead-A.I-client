import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/ui/sidebar";
import { HiOutlineMenu } from "react-icons/hi";
import InitialChat from "../../components/component/intialChat";
import ChatInput from "../../components/ui/inputChat";
import SenderMessage from "../../components/component/sendermessage";
import ReceiverMessage from "../../components/component/recievemessage";
import Loader from "../../components/ui/chatloader";

import gptIcon from "../../assets/Vector.svg";
import starIcon from "../../assets/star.svg";
import { useParams } from "react-router-dom";
import { _get } from "../../Service/ApiService";
import { GET_HISTORY } from "../../Service/useApiService";
import type { ChatHistory } from "../../Service/interface";

interface ChatMessage {
  userMessage: string;
  botSummary?: string;
  isLoading?: boolean;
}

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const [updateHistory, setUpdateHistory] = useState<number>(0)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if(id){
      (async () => {
        try{
          setUpdateHistory(0)
          const { data } = await _get<ChatHistory[]>(`${GET_HISTORY}/${id}`);
          setMessages(data.map(item => {
            return {
              userMessage: item.isAIgenerated ? '' : item.message,
              botSummary: item.isAIgenerated ? item.message : '',
              isLoading: false
            }
          }))
        } 
        catch (error: any) {
          // do nothing
        }  
      })()
    }
  }, [id])

  const handleSendMessage = (userMessage: string, botSummary?: string) => {
    setMessages((prev) => {
      if (!botSummary) {
        return [...prev, { userMessage, botSummary: "", isLoading: true }];
      }

      const updated = [...prev];
      const lastIndex = updated.length - 1;

      if (lastIndex >= 0) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          botSummary,
          isLoading: false,
        };
      }

      return updated;
    });
  };

  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden relative bg-gray-100">
      {/* Mobile menu button */}
      {!isOpen && (
        <div
          className="absolute top-4 left-4 md:hidden cursor-pointer bg-gray-800 p-2 rounded-md z-50"
          onClick={() => setIsOpen(true)}
        >
          <HiOutlineMenu className="h-6 w-6 text-white" />
        </div>
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        updateHistory={updateHistory} 
      />

      {/* Main Chat Area */}
      <div className="flex-1 h-full w-full z-10 flex flex-col">
        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          {messages.length === 0 ? (
            <InitialChat
              buttons={[
                {
                  label: "GPT-3.5",
                  icon: gptIcon,
                  active: true,
                  onClick: () => console.log("GPT clicked"),
                },
                {
                  label: "Lama",
                  icon: starIcon,
                  active: false,
                  onClick: () => console.log("Lama clicked"),
                },
              ]}
            />
          ) : (
            <div className="space-y-4 lg:pl-[50px] lg:pt-[20px]">
              {messages.map((msg, index) => (
                <div key={index} className="flex flex-col gap-2">
                  {msg.userMessage && <SenderMessage message={msg.userMessage} />}
                  {msg.isLoading ? (
                    <div className="flex justify-start items-center gap-2">
                      <Loader />
                    </div>
                  ) : (
                    msg.botSummary && <ReceiverMessage message={msg.botSummary} />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="px-4 py-4 flex justify-center">
          <ChatInput 
            onSendMessage={handleSendMessage}
            updateHistory={updateHistory}
            setUpdateHistory={setUpdateHistory} 
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
