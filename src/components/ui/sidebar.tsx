import SideBar from "../../assets/SideBar.svg";
import iconUser from "../../assets/Icon_User.svg";
import newBadge from "../../assets/Badge.svg";
import { HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../ProtectedRoute/AuthProvider";
import { useEffect, useState } from "react";
import { _get } from "../../Service/ApiService";
import type { GroupedHistoryResponse } from "../../Service/interface";
import { GROUPED_HOSTORY } from "../../Service/useApiService";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateHistory: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  updateHistory,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<GroupedHistoryResponse[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await _get<GroupedHistoryResponse[]>(GROUPED_HOSTORY);
        setHistory(data);
      } catch (error: any) {}
    })();
  }, [updateHistory]);

  return (
    <div
      className={`bg-[#202028] h-full fixed md:relative transition-all duration-300 z-20
        ${
          isOpen
            ? "w-[75%] md:w-[35%] lg:w-[25%]"
            : "w-[70px]"
        }
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <div className="p-4 h-[calc(100%-12px)] relative flex flex-col justify-between gap-3">
        {/* LEFT-TOP */}
        <div className="w-full h-[40px] flex flex-row justify-between gap-2 mt-2">
          {/* New Chat Button */}
          {isOpen && (
            <div
              onClick={() => navigate("/upload")}
              className="flex-1 border-2 border-gray-500 text-white text-xl flex items-center gap-2 pl-2 cursor-pointer rounded-md"
            >
              <span className="lg:text-3xl text-xl">+</span>
              <span className="lg:text-xl text-md">New Chat</span>
            </div>
          )}

          {/* Collapse Button */}
          <div className="relative group">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="h-[40px] w-[40px] border-2 border-gray-500 flex justify-center items-center rounded-md cursor-pointer"
            >
              <img src={SideBar} alt="sidebar" className="h-[18px] w-[18px]" />
            </div>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Sidebar
              </div>
          </div>

          {/* Close Icon for Mobile */}
          {isOpen && (
            <div
              className="md:hidden flex justify-center items-center h-[40px] w-[40px] border-2 border-gray-500 rounded-md cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <HiOutlineX className="h-6 w-6 text-white" />
            </div>
          )}
        </div>

        {/* Chat History */}
        {isOpen && (
          <div className="h-full flex flex-col gap-1 overflow-auto">
            {history.map((item) => (
              <Link
                key={item.sessionId}
                to={`/chat/${item.sessionId}`}
                className="text-white p-2 border border-gray-500 w-full block rounded-md hover:bg-gray-500"
              >
                {item.chat.message}
              </Link>
            ))}
          </div>
        )}

        <hr className="hidden md:block left-0 w-full h-0.5 bg-gray-500" />

        {/* LEFT-BOTTOM */}
        <div className="w-full text-white md:mt-0 flex flex-col gap-4">
          {/* Upgrade Section */}
          <div
            className={`flex items-center w-full cursor-pointer rounded-md py-2 transition-all duration-300 ${
              isOpen ? "justify-between px-2" : "justify-center"
            }`}
          >
            <img
              className="h-[35px] w-[35px] rounded-full border border-gray-500 bg-gray-700 lg:h-[50px] lg:w-[50px]"
              src={iconUser}
              alt="iconUser"
            />
            {isOpen && (
              <div className="flex items-center justify-between flex-1 ml-2">
                <span className="text-white lg:text-lg text-sm font-semibold">
                  Upgrade to Plus
                </span>
                <div className="relative flex-shrink-0">
                  <img
                    className="h-[20px] w-[40px] md:h-[27px] md:w-[47px]"
                    src={newBadge}
                    alt="newBadge"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div
            className={`flex items-center w-full cursor-pointer rounded-md ${
              isOpen ? "justify-between" : "justify-center"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="h-[35px] w-[35px] lg:h-[50px] lg:w-[50px] rounded-full border border-gray-500 bg-gray-700 flex items-center justify-center text-white text-lg font-bold">
                {user?.first_name
                  ? user.first_name.charAt(0).toUpperCase()
                  : "G"}
              </div>
              {isOpen && (
                <span className="lg:text-lg text-sm text-white font-semibold">
                  {user?.first_name && user?.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : "Guest User"}
                </span>
              )}
            </div>
            {isOpen && (
              <div className="flex items-center justify-center text-white text-2xl lg:text-4xl font-bold mr-[5px]">
                ...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
