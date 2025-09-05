import gptIcon from "../../assets/Vector.svg";
import starIcon from "../../assets/star.svg";
import lockIcon from "../../assets/lock.svg";

const InitialChat = () => {
  return (
    <div className="flex flex-col items-center">

      <div className="relative flex flex-row  w-[200px] lg:w-[300px] h-[60px] lg:h-[80px] mt-[100px] md:mt-[40px] bg-gray-100 rounded-xl items-center">
        {/* GPT-3.5 Box */}
        <div className="absolute  left-[6px] lg:left-[10px] top-1/2 transform -translate-y-1/2 h-[35px] lg:h-[50px] w-[100px] lg:w-[140px] bg-white flex justify-center items-center rounded-xl gap-1  lg:gap-3 font-semibold  text-md lg:text-lg">
          <img src={gptIcon} alt="gptIcon" className=" h-[15px] w-[15px] lg:h-[20px] lg:w-[20px]" />
          <p className="lg:text-lg  text-md font-semibold">GPT-3.5</p>
        </div>

        <div className="absolute left-[110px] lg:left-[160px] top-1/2 transform -translate-y-1/2 flex items-center gap-1 lg:gap-2 font-semibold  lg:text-lg">
          <img src={starIcon} alt="starIcon" className="lg:h-6 lg:w-6 h-4 w-4" />
          <p className="lg:text-lg  text-md font-semibold">Lama</p>
          <img src={lockIcon} alt="lockIcon" className="lg:h-6 lg:w-6 h-4 w-4" />
        </div>
      </div>

      {/* DeepRead-A.I. Text */}
      <div className="mt-[20px] lg:mt-[50px]">
        <p className="text-[40px] lg:text-[60px] font-bold text-gray-300 mb-[200px] lg:mb-[500px]">
          DeepRead-A.I.
        </p>
      </div>
    </div>
  );
};

export default InitialChat;
