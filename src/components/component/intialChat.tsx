import { useState } from "react";
import type { InitialChatProps } from "../../Service/interface";
import Button from "../ui/button";

const InitialChat = ({ buttons }: InitialChatProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number, onClick?: () => void) => {
    setActiveIndex(index);
    if (onClick) onClick();
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-0">
      {/* Buttons container */}
      <div className="flex flex-row w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[500px] h-14 sm:h-16 lg:h-24 mt-20 sm:mt-16 lg:mt-24 bg-gray-100 rounded-xl items-center justify-center gap-x-2 sm:gap-x-3 lg:gap-x-4 px-2 sm:px-4 lg:px-6">
        {buttons?.map((btn, index) => (
          <Button
            key={index}
            active={activeIndex === index}
            onClick={() => handleClick(index, btn.onClick)}
          >
            {btn.icon && (
              <img
                src={btn.icon}
                alt={btn.label}
                className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8"
              />
            )}
            <p className="text-xs sm:text-sm lg:text-lg font-semibold">
              {btn.label}
            </p>
          </Button>
        ))}
      </div>

      {/* DeepRead-A.I. */}
      <div className="mt-6 sm:mt-10 lg:mt-16">
        <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-300 text-center mb-32 sm:mb-48 lg:mb-72">
          DeepRead-A.I.
        </p>
      </div>
    </div>
  );
};

export default InitialChat;
