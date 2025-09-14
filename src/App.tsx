import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./pages/home/home";
import RegistrationForm from "./pages/signup/Signup";
import LoginForm from "./pages/login/Login";
import UploadFile from "./pages/upload/Upload";
import ChatScreen from "./pages/chat/Chat";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoutes>
              <UploadFile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoutes>
              <ChatScreen />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
