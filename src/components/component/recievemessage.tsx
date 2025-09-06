import type { MessageProps } from "../../Service/interface";
import { Bot} from "lucide-react";
import { AnimatedLine } from "../../lib/AnimatedLine";
import FormattedMessage from "../../lib/FormattedMessage";

const ReceiverMessage = ({ message }: MessageProps) => {
  return (
    <div className="w-full flex items-start gap-3 py-[20px]">
      <div className="h-10 w-10 overflow-hidden borde flex-shrink-0">

        <Bot size={40} className="text-blue-500 shadow-lg" />
      </div>
      <AnimatedLine>
        <FormattedMessage content={message} />
      </AnimatedLine>
    </div>
  );
};

export default ReceiverMessage;
