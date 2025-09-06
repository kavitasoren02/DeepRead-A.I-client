import type { MessageProps } from "../../Service/interface";
// import deepreadAI from "../../assets/deepai.webp";
import { Bot} from "lucide-react";
import { AnimatedLine } from "../../lib/AnimatedLine";
import FormattedMessage from "../../lib/FormattedMessage";

const ReceiverMessage = ({ message }: MessageProps) => {
  return (
    <div className="w-full flex items-start gap-3 py-[20px]">
      {/* Bot Icon */}
      <div className="h-10 w-10 overflow-hidden borde flex-shrink-0">
        {/* <img
          src={deepreadAI}
          alt="DeepRead AI"
          className="h-full w-full object-cover"
        /> */}
        <Bot size={40} className="text-blue-500 shadow-lg" />
      </div>

      {/* Bot Summary with HTML */}
      {/* <div
        className="max-w-[80%] bg-[#ACACB1] text-black p-4 rounded-lg shadow-md prose prose-sm prose-headings:font-bold prose-headings:text-lg prose-p:mb-2 prose-ul:list-disc prose-ul:pl-5"
        dangerouslySetInnerHTML={{ __html: message }} 
      /> */}
      <AnimatedLine>
        <FormattedMessage content={message} />
      </AnimatedLine>
    </div>
  );
};

export default ReceiverMessage;
