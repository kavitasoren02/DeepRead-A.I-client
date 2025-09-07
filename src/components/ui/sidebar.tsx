import SideBar from "../../assets/SideBar.svg";
import deepreadIcon from "../../assets/deepai.webp";
import iconUser from "../../assets/Icon_User.svg";
import newBadge from "../../assets/Badge.svg";
import { HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../ProtectedRoute/AuthProvider";
import { useEffect, useState } from "react";
import { _get } from "../../Service/ApiService";
import type { GroupedHistoryResponse } from "../../Service/interface";
import { GROUPED_HOSTORY } from "../../Service/useApiService";
import { ClipboardPenLine } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateHistory: number;
  resetToInitial: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  updateHistory,
  resetToInitial,
}) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<GroupedHistoryResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await _get<GroupedHistoryResponse[]>(GROUPED_HOSTORY);
        setHistory(data);
      } catch (error: any) {
        console.error("Error fetching history:", error);
      }
    })();
  }, [updateHistory]);

  return (
    <div
      className={`bg-[#202028] h-full fixed md:relative transition-all duration-300 z-20
        ${isOpen ? "w-[75%] md:w-[35%] lg:w-[25%]" : "w-[100px]"}
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <div className="p-4 h-[calc(100%-12px)] relative flex flex-col justify-between gap-3">
        {/* LEFT-TOP */}
        <div className="w-full flex flex-col gap-2 mt-2 lg:mb-[60px] relative">
          {/* DeepRead Icon*/}
          <div className="lg:h-[50px] lg:w-[50px] flex items-center justify-center cursor-pointer relative md:group hidden md:flex">
            <div
              className="relative group flex items-center justify-center"
              onClick={() => setIsOpen(true)}
            >
              <img
                src={deepreadIcon}
                alt="DeepRead"
                className="h-[40px] w-[40px] lg:h-[50px] lg:w-[50px] hover:scale-105 transition-transform"
              />

              {/* Tooltip text on hover */}
              {!isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Open Sidebar
                </div>
              )}
            </div>
          </div>

          {/* Mobile DeepRead & Close */}
          {isOpen && (
            <div className="md:hidden flex justify-between items-center w-full mb-4">
              <img
                src={deepreadIcon}
                alt="DeepRead"
                className="h-[40px] w-[40px]"
                onClick={() => {
                  resetToInitial();
                  setIsOpen(false);
                }}
              />
              <HiOutlineX
                className="h-6 w-6 text-white cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
          )}

          {/* Pencil Icon */}
          <div className="flex items-center mt-4 gap-2 cursor-pointer">
            <ClipboardPenLine
              onClick={() => navigate("/upload")}
              className={`${
                isOpen ? "lg:h-[50px] lg:w-[50px]" : "lg:w-[50px] lg:h-[50px] "
              } text-white`}
            />
            {isOpen && (
              <span className="lg:text-xl text-lg text-white font-semibold">
                New Chat
              </span>
            )}
          </div>

          {/* Sidebar toggle on right */}
          {isOpen && (
            <div className="absolute top-0 right-0 h-[50px] flex items-center justify-center">
              <div className="relative group">
                <div
                  className="hidden md:flex h-[40px] w-[40px] lg:h-[50px] lg:w-[50px] border-2 border-gray-500 justify-center items-center rounded-md cursor-pointer hover:bg-gray-600 transition"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <img
                    src={SideBar}
                    alt="sidebar"
                    className="h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]"
                  />
                </div>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Sidebar
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CHAT HISTORY */}
        {isOpen && (
          <div className="h-full flex flex-col gap-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {history.map((item) => (
              <Link
                key={item.sessionId}
                to={`/chat/${item.sessionId}`}
                className="text-white p-2 border border-gray-500 w-full block rounded-md hover:bg-gray-600 transition"
              >
                {item.chat.message}
              </Link>
            ))}
          </div>
        )}

        {isOpen && (
          <hr className="hidden md:block left-0 w-full h-0.5 bg-gray-500" />
        )}

        {/* LEFT-BOTTOM */}
        <div className="w-full text-white md:mt-0 flex flex-col gap-4">
          {/* Upgrade Section */}
          <div
            className={`flex items-center w-full cursor-pointer rounded-full py-2 transition-all duration-300 ${
              isOpen ? "justify-between px-2" : "justify-center"
            }`}
          >
            <img
              className="h-[50px] w-[50px] rounded-full border-2 border-gray-500 bg-gray-700 font-bold"
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
              isOpen ? "justify-between px-2" : "justify-center"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="h-[50px] w-[50px] rounded-full border-2 border-gray-500 bg-gray-700 flex items-center justify-center text-white text-lg font-bold">
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
