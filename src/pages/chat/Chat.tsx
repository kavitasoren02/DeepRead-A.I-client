import SideBar from "../../assets/SideBar.svg";
import iconUser from "../../assets/Icon_User.svg";
import newBadge from "../../assets/Badge.svg";

const Chat = () => {
  return (
    <div className="h-screen w-full flex flex-row overflow-hidden">
        
      {/* LEFT SIDE */}
      <div className="w-[25%] h-full bg-[#202028] relative">
        <div className="m-4 h-[calc(100%-32px)] relative flex flex-col justify-between">
          
          {/* LEFT-TOP */}
          <div className="w-full h-[60px] flex flex-row justify-between gap-2 mt-2">
            <div className="w-[90%] border-2 border-gray-500 text-white text-xl flex items-center gap-2 pl-2 cursor-pointer rounded-md">
              <span className="text-3xl">+</span>
              <span>New Chat</span>
            </div>

            <div className="w-[15%] border-2 border-gray-500 flex justify-center items-center rounded-md mr-[10px]">
              <img src={SideBar} alt="sidebar" className="h-[18px] w-[18px]" />
            </div>
          </div>

          {/* Divider fixed at 80% height */}
          <hr className="absolute top-[80%] left-0 w-full h-0.5 bg-gray-500" />

          {/* LEFT-BOTTOM */}
          <div className="w-full text-white px-3">
            {/* Upgrade Section */}
            <div className="w-full flex items-center justify-between text-white text-lg font-semibold cursor-pointer rounded-md py-2 px-2 mb-3 hover:bg-gray-700">
              <div className="flex items-center gap-3">
                <img
                  className="h-[50px] w-[50px]"
                  src={iconUser}
                  alt="iconUser"
                />
                <span>Upgrade to Plus</span>
              </div>

              {/* Badge aligned properly */}
              <img
                className="h-[27px] w-[47px] mr-[10px]"
                src={newBadge}
                alt="newBadge"
              />
            </div>

            {/* Profile Section */}
            <div className="flex items-center justify-between px-2 py-2 w-full mb-4 cursor-pointer rounded-md hover:bg-gray-700">
              <div className="flex items-center gap-3">
                <img
                  // src={ProfileImg}
                  alt="profile"
                  className="h-[50px] w-[50px] rounded-full border border-gray-500"
                />
                <span className="text-lg text-white font-semibold">
                  Kavita Soren
                </span>
              </div>

              {/* Three Dots Menu */}
              <div className="flex items-center justify-center text-white text-4xl font-bold mr-[10px]">
                ...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[75%] h-full bg-white"></div>
    </div>
  );
};

export default Chat;
