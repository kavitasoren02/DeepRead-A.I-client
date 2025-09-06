import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/ui/sidebar";
import { HiOutlineMenu } from "react-icons/hi";
import InitialChat from "../../components/ui/intialChat";
import ChatInput from "../../components/ui/inputChat";
import SenderMessage from "../../components/component/sendermessage";
import ReceiverMessage from "../../components/component/recievemessage";
import Loader from "../../components/ui/chatloader";

interface ChatMessage {
  userMessage: string;
  botSummary?: string;
  isLoading?: boolean;
}

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="h-screen w-full flex flex-row overflow-hidden relative bg-gray-100">
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
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Chat Area */}
      <div className="flex-1 h-full z-10 flex flex-col">
        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          {messages.length === 0 ? (
            <InitialChat />
          ) : (
            <div className="space-y-4 lg:ml-[50px] lg:mt-[20px] ">
              {messages.map((msg, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <SenderMessage message={msg.userMessage} />

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
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
