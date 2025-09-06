import { useAuth } from "../../ProtectedRoute/AuthProvider";
import type { MessageProps } from "../../Service/interface";

const SenderMessage = ({ message }: MessageProps) => {
  const { user } = useAuth();

  return (
    <div className="w-full flex items-start gap-4">
      <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full border border-gray-400 bg-gray-700 flex items-center justify-center text-white font-bold">
        {user?.first_name ? user.first_name.charAt(0).toUpperCase() : "G"}
      </div>

      <div className="max-w-[80%] bg-white text-black p-2 rounded-lg shadow-md">
        <p className="text-sm break-words">{message}</p>
      </div>
    </div>
  );
};

export default SenderMessage;
