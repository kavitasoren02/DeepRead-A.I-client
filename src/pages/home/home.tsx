import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { FiUploadCloud, FiAlignRight } from "react-icons/fi";
import { AiOutlineRobot, AiOutlineCloseSquare } from "react-icons/ai";
import { LuFileClock } from "react-icons/lu";
import deepreadAI from "../../assets/deepai.webp";
import Contact from "../contact/Contact";
import DemoVideo from "../../components/component/DemoVideo";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false)

  return (
    <div className="font-sans">
      {showVideo && <DemoVideo setShowVideo={setShowVideo} />}
      {/* Navbar */}
      <nav className="w-full h-[70px] backdrop-blur-md bg-white/60 border-b border-gray-200 shadow-md flex items-center justify-between lg:px-12 px-4 sticky top-0 z-50 transition-all">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <img
            className="lg:h-[60px] lg:w-[60px] h-[45px] w-[45px] transition-transform duration-300 group-hover:rotate-12 drop-shadow-md"
            src={deepreadAI}
            alt="logo"
          />
          <span className="text-gray-900 font-extrabold lg:text-3xl text-lg tracking-wide group-hover:text-green-600 transition-all duration-300">
            DeepRead-A.I.
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 lg:text-2xl text-lg font-medium text-gray-700">
          <a href="#home" className="hover:text-green-600 transition-all">
            Home
          </a>
          <a href="#features" className="hover:text-green-600 transition-all">
            Features
          </a>
          <a href="#contact" className="hover:text-green-600 transition-all">
            Contact
          </a>
        </div>

        {/* Desktop Buttons*/}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:scale-105 hover:from-green-700 hover:to-green-800 transition-all cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="border-2 border-green-700 text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition-all cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <AiOutlineCloseSquare className="text-3xl text-green-600 cursor-pointer" />
            ) : (
              <FiAlignRight className="text-3xl text-green-600 cursor-pointer" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-white shadow-lg z-40 flex flex-col items-center gap-6 py-6 animate-slideDown">
          <a
            href="#home"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-800 hover:text-green-600 text-lg font-medium"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-800 hover:text-green-600 text-lg font-medium"
          >
            Features
          </a>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-800 hover:text-green-600 text-lg font-medium"
          >
            Contact
          </a>
          <Link to="/login">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:scale-105 transition-all cursor-pointer"
            >
              Login
            </button>
          </Link>
          <Link to="/register">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="border-2 border-green-600 text-green-600 px-5 py-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all cursor-pointer"
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="w-full h-[calc(100vh-70px)] bg-gradient-to-br from-green-50 via-white to-gray-100 flex justify-center items-center text-center px-5"
      >
        <div className="max-w-3xl">
          <h1 className="lg:text-[70px] text-[36px] font-extrabold text-gray-900 leading-tight mb-6">
            {!showVideo && <ReactTyped
              strings={[
                "Transform Your PDFs into",
                "Interactive Conversations",
                "AI-Powered Document Chat",
              ]}
              typeSpeed={60}
              backSpeed={40}
              loop
            />}
          </h1>
          <p className="text-gray-600 lg:text-2xl text-lg mb-10 font-medium">
            Upload any PDF document and ask questions about its content. <br />
            Our AI assistant provides instant, accurate responses based on your
            document.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/upload">
              <button className="lg:px-10 px-6 lg:py-5 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-300 hover:from-green-700 hover:to-green-900 cursor-pointer">
                Get Started Free
              </button>
            </Link>
            <button 
              className="lg:px-10 px-6 lg:py-5 py-3 border-2 border-green-700 text-green-700 rounded-full font-bold hover:bg-green-700 hover:text-white transition-all duration-300 cursor-pointer"
              onClick={() => setShowVideo(true)}
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50 px-5">
        <div className="text-center mb-16">
          <h2 className="lg:text-5xl text-3xl font-bold text-gray-900 mb-4">
            <ReactTyped
              strings={["Powerful Features"]}
              typeSpeed={70}
              backSpeed={50}
              loop
            />
          </h2>
          <p className="text-gray-600 lg:text-xl text-lg font-medium max-w-2xl mx-auto">
            Discover the amazing capabilities of DeepRead-AI that make your
            workflow seamless and efficient.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 text-center">
            <FiUploadCloud className="text-green-600 text-6xl mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              Easy PDF Upload
            </h3>
            <p className="text-gray-600 text-sm lg:text-base">
              Simply drag and drop or select your PDF files. Instant preview and
              processing.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 text-center">
            <AiOutlineRobot className="text-green-600 text-6xl mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              AI Chat Interface
            </h3>
            <p className="text-gray-600 text-sm lg:text-base">
              Ask questions about your document content and get instant,
              accurate responses.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 text-center">
            <LuFileClock className="text-green-600 text-6xl mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              Chat History
            </h3>
            <p className="text-gray-600 text-sm lg:text-base">
              Access all your previous conversations and document interactions
              anytime.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white px-5">
        <div className="text-center mb-16">
          <h2 className="lg:text-5xl text-3xl font-bold text-gray-900 mb-4">
            <ReactTyped
              strings={["How It Works"]}
              typeSpeed={70}
              backSpeed={50}
              loop
            />
          </h2>
          <p className="text-gray-600 lg:text-xl text-lg font-medium max-w-2xl mx-auto">
            Don’t wait any longer — getting started is easier than ever.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            {
              step: 1,
              label: "Sign Up",
              content: "Create your account with email verification",
            },
            {
              step: 2,
              label: "Upload PDF",
              content: "Upload your document with instant preview",
            },
            {
              step: 3,
              label: "Ask Questions",
              content: "Use predefined prompts or ask custom questions",
            },
            {
              step: 4,
              label: "Get Answers",
              content: "Receive instant AI-powered responses",
            },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl lg:text-3xl font-bold shadow-lg hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
              <h3 className="text-green-700 font-bold text-lg lg:text-xl">
                {item.label}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-24 px-5 text-center">
        <h2 className="lg:text-5xl text-3xl font-bold text-gray-900 mb-6">
          <ReactTyped
            strings={["Ready to Get Started!!"]}
            typeSpeed={70}
            backSpeed={50}
            loop
          />
        </h2>
        <p className="text-gray-700 lg:text-xl text-lg mb-10 max-w-2xl mx-auto">
          Simplify your workflow and unlock the full potential of your documents
          with our powerful, AI-driven platform.
        </p>
        <Link to="/upload">
          <button className="lg:px-12 px-8 lg:py-5 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-full font-bold shadow-lg hover:scale-105 hover:from-green-700 hover:to-green-900 transition-transform duration-300 cursor-pointer">
            Start Free Trial
          </button>
        </Link>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Home;
