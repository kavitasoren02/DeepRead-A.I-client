import type { MessageProps } from "../../Service/interface";
import deepreadAI from "../../assets/deepai.webp";

const ReceiverMessage = ({ message }: MessageProps) => {
  return (
    <div className="w-full flex items-start gap-3 ">
      {/* Bot Icon */}
      <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-400 flex-shrink-0">
        <img
          src={deepreadAI}
          alt="DeepRead AI"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Bot Summary with HTML */}
      <div
        className="max-w-[80%] bg-[#ACACB1] text-black p-4 rounded-lg shadow-md prose prose-sm prose-headings:font-bold prose-headings:text-lg prose-p:mb-2 prose-ul:list-disc prose-ul:pl-5"
        dangerouslySetInnerHTML={{ __html: message }} // Render HTML safely
      />
    </div>
  );
};

export default ReceiverMessage;
