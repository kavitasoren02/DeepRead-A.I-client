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
    <div className="flex flex-col items-center">
      {/* Buttons container */}
      <div className="flex flex-row w-[200px] md:w-[200px] lg:w-[350px] h-[60px] lg:h-[100px] mt-[100px] md:mt-[40px] bg-gray-100 rounded-xl items-center justify-between px-2 lg:px-6">
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
                className="h-5 w-5 lg:h-8 lg:w-8"
              />
            )}
            <p className="text-md lg:text-lg font-semibold">{btn.label}</p>
          </Button>
        ))}
      </div>

      {/* DeepRead-A.I. */}
      <div className="mt-[20px] lg:mt-[50px]">
        <p className="text-[40px] lg:text-[60px] font-bold text-gray-300 mb-[200px] lg:mb-[500px]">
          DeepRead-A.I.
        </p>
      </div>
    </div>
  );
};

export default InitialChat;
