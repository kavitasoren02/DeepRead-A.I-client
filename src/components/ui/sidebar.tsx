import SideBar from "../../assets/SideBar.svg";
import iconUser from "../../assets/Icon_User.svg";
import newBadge from "../../assets/Badge.svg";
import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ProtectedRoute/AuthProvider";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  console.log("USER", user);

  const navigate = useNavigate();
  return (
    <div
      className={`bg-[#202028] w-[75%] md:w-[35%] lg:w-[25%] h-full fixed md:relative transition-transform duration-300 z-20
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="m-4 h-[calc(100%-32px)] relative flex flex-col justify-between">
        {/* Close Icon*/}
        <div
          className="absolute top-2 right-2 md:hidden flex justify-center items-center h-[40px] w-[40px] border-2 border-gray-500 rounded-md cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <HiOutlineX className="h-6 w-6 items-center text-white" />
        </div>

        {/* LEFT-TOP*/}
        <div className="w-[90%] h-[40px] lg:h-[60px] flex flex-row justify-between lg:gap-2 gap-2 mt-2 md:w-full">
          {/* New Chat Button */}
          <div
            onClick={() => navigate("/upload")}
            className="w-[70%] md:w-full lg:w-[100%] border-2 border-gray-500 text-white text-xl flex items-center gap-2 pl-2 cursor-pointer rounded-md"
          >
            <span className="lg:text-3xl text-xl">+</span>
            <span className="lg:text-xl text-md">New Chat</span>
          </div>

          <div className="w-[20%] border-2 border-gray-500 flex justify-center items-center rounded-md mr-[35px] lg:mr-[20px] cursor-pointer">
            <img src={SideBar} alt="sidebar" className="h-[18px] w-[18px]" />
          </div>
        </div>

        <hr className="hidden md:block absolute top-[80%] left-0 w-full h-0.5 bg-gray-500" />

        {/* LEFT-BOTTOM */}
        <div className="w-full text-white md:mt-0 flex flex-col gap-4">
          {/* Upgrade Section */}
          <div className="w-full flex items-center justify-between text-white lg:text-lg text-sm font-semibold cursor-pointer rounded-md py-2 hover:bg-gray-700">
            <div className="flex items-center gap-2 lg:gap-4">
              <img
                className="h-[35px] w-[35px] lg:h-[50px] lg:w-[50px]"
                src={iconUser}
                alt="iconUser"
              />
              <span>Upgrade to Plus</span>
            </div>

            <img
              className="h-[20px] w-[40px] md:h-[27px] md:w-[47px] mr-[5px]"
              src={newBadge}
              alt="newBadge"
            />
          </div>

          {/* Profile Section */}
          <div className="flex items-center justify-between w-full cursor-pointer rounded-md hover:bg-gray-700">
            <div className="flex items-center gap-4">
              <div className="h-[35px] w-[35px] lg:h-[50px] lg:w-[50px] rounded-full border border-gray-500 bg-gray-700 flex items-center justify-center text-white text-lg font-bold">
                {user?.first_name
                  ? user.first_name.charAt(0).toUpperCase()
                  : "G"}
              </div>

              <span className="lg:text-lg text-sm text-white font-semibold">
                {user?.first_name && user?.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : "Guest User"}
              </span>
            </div>

            <div className="flex items-center justify-center text-white text-2xl lg:text-4xl font-bold mr-[5px]">
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
