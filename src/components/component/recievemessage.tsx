import type { MessageProps } from "../../Service/interface";
import { Bot, Play, Pause } from "lucide-react";
import { AnimatedLine } from "../../lib/AnimatedLine";
import FormattedMessage from "../../lib/FormattedMessage";
import { useEffect, useRef, useState } from "react";
import { AUDIO_PATH } from "../../Service/useApiService";

const ReceiverMessage = ({ message, audioPath, isPlaying: isAudioPlaying }: MessageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if(isAudioPlaying) togglePlay()
  }, [isAudioPlaying])

  return (
    <div className="w-full flex items-start gap-3">
      <div className="h-10 w-10 overflow-hidden borde flex-shrink-0">
        <Bot size={40} className="text-blue-500 shadow-lg" />
      </div>
      <AnimatedLine>
        <div>
          <FormattedMessage content={message} />
          {audioPath && (
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
              >
                {isPlaying ? (
                  <Pause className="text-blue-600" size={20} />
                ) : (
                  <Play className="text-blue-600" size={20} />
                )}
              </button>
              <audio
                ref={audioRef}
                src={`${AUDIO_PATH}/${audioPath}`}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          )}
        </div>
      </AnimatedLine>
    </div>
  );
};

export default ReceiverMessage;
