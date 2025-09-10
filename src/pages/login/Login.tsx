import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import type { LoginResponse } from "../../Service/interface";
import { LOGIN } from "../../Service/useApiService";
import { _post } from "../../Service/ApiService";
import { toast } from "react-toastify";
import deepreadAI from "../../assets/deepai.webp";
import Input from "../../components/ui/Input";
import googleIcon from "../../assets/Icon_Google.svg";

const Login: React.FC = () => {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { data } = await _post<LoginResponse>(LOGIN, values);
        toast.success(data.msg);
        navigate("/upload");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Login failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center w-full h-full #FFFFFF">
      <div className=" w-[600px] h-[950px] lg:p-[10px]">
        <div className="logo w-full flex justify-center lg:mt-[20px] font-extrabold">
          <img
            className="h-[100px] w-[100px] mix-blend-multiply"
            src={deepreadAI}
            alt="logo"
          />
        </div>

        <h1 className="text-center mt-[20px] lg:mt-[100px] font-bold lg:text-4xl text-3xl">
          Welcome Back
        </h1>

        <form
          className="w-full flex flex-col items-center lg:mt-[40px] mt-[15px] p-[25px] lg:p-0 "
          onSubmit={formik.handleSubmit}
        >
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.email && formik.errors.email) || ""}
          />

          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.password && formik.errors.password) || ""}
          />

          <button
            type="submit"
            disabled={loading}
            className="  w-full
  max-w-md
  mt-[10px]
  px-4
  py-3
  text-white
bg-gradient-to-r from-green-600 to-green-800  border
  border-[#ACACB1]
  focus:outline-none
  focus:border-black
  focus:ring-2
   focus:ring-black
  placeholder:text-gray-400
  text-lg
  font-bold
  sm:text-base
  cursor-pointer
"
          >
            Login{" "}
          </button>
        </form>
        <div className="lg:mt-[10px] p-[25px]">
          <p className=" w-full flex justify-center text-black">
            Do you have account? &nbsp; &nbsp;
            <Link
              className=" text-[#128455]
              cursor-pointer"
              to="/register"
            >
              SignUp
            </Link>
          </p>
          <div className=" mt-[20px] relative h-[20px]  flex justify-center items-center">
            <p className=" absolute p-2 bg-white px-5 font-black text-xl">OR</p>
            <hr className="h-[10px] w-full max-w-md mx-auto mt-[5px]" />
          </div>

          <div
            onClick={() => (window.location.href = "https://mail.google.com")}
            className="w-full max-w-md mx-auto mt-[20px] flex items-center gap-3 cursor-pointer border border-gray-400  px-4 py-2 bg-white hover:bg-gray-100 "
          >
            <img
              src={googleIcon}
              alt="googleIcon"
              className="w-[40px] h-[40px]"
            />
            <p className="text-gray-700 font-medium text-xl focus:outline-none">
              Continue with Google
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
