import { Bot } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-start gap-2 p-3">
      {/* Bot Icon */}
      <div className="h-10 w-10 flex items-center justify-center bg-white shadow-md rounded-full">
        <Bot size={28} className="text-blue-500" />
      </div>

      {/* AI Thinking with Dots */}
      <div className="bg-white p-3 rounded-xl shadow-md">
        <div className="flex items-center gap-2">
          {/* Animated Dots */}
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.15s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
          </div>

          {/* Text */}
          <span className="text-gray-600 text-sm">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
