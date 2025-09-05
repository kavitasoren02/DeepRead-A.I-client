import { Link } from "react-router-dom";
import deepreadAI from "../../assets/deepai.webp";

const Home = () => {
  return (
    <nav className="w-screen h-[70px] bg-gray-300 shadow-xl flex items-center justify-between px-6">
      {/* left side */}
      <div className="flex items-center gap-3">
        <img
          className="h-[60px] w-[60px] mix-blend-multiply"
          src={deepreadAI}
          alt="logo"
        />
        <div className="text-black font-bold text-3xl">DeepRead-A.I.</div>
      </div>

      {/* right side */}
      <div>
        <Link to="/login">
          <button className="bg-[#128455] hover:bg-[#0e5739] text-white px-8 py-3 rounded-lg font-medium cursor-pointer transition duration-300">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Home;
