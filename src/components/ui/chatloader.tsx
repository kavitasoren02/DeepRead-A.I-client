import { Bot } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-start gap-1 py-[20]">
      <div className="h-10 w-10 overflow-hidden borde flex-shrink-0">
        <Bot size={40} className="text-blue-500 shadow-lg" />
      </div>
      <div className="bg-whit p-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <span className="text-gray-500 text-sm ml-2">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
