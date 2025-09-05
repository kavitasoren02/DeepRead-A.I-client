import React, { useState } from "react";
import * as Yup from "yup";
import type {
  RegisterResponse,
  UserRegistration,
} from "../../Service/interface";
import { useNavigate } from "react-router-dom";
import { useFormik, type FormikHelpers } from "formik";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import { REGISTER } from "../../Service/useApiService";
import { _post } from "../../Service/ApiService";
import deepreadAI from "../../assets/deepai.webp";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/Icon_Google.svg";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .max(50, "First name cannot exceed 50 characters")
      .required("First name is required"),

    last_name: Yup.string()
      .min(3, "Last name must be atleast 3 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .required("Last Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),

    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password mus match")
      .required("Confirm password is required"),
  });

  const formik = useFormik<UserRegistration>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (
      values: UserRegistration,
      actions: FormikHelpers<UserRegistration>
    ) => {
      setLoading(true);
      try {
        const { confirmPassword, ...payload } = values;
        const { data } = await _post<RegisterResponse>(REGISTER, payload);
        toast.success(data.msg);
        navigate("api/auth/login");
      } catch (error: any) {
        setLoading(false);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
        actions.setSubmitting(false);
      }
    },
  });
  return (
    <div className="min-h-screen flex justify-center items-center w-full h-full #FFFFFF">
      <div className=" w-[600px] h-[950px] p-[10px]">
        <div className="logo w-full flex justify-center lg:mt-[20px] font-extrabold">
          <img
            className="h-[100px] w-[100px] mix-blend-multiply"
            src={deepreadAI}
            alt="logo"
          />
        </div>

        <h1 className="text-center lg:mt-[60px] mt-[15px] font-bold lg:text-4xl text-3xl">
          Create your account
        </h1>
        <p className="text-center lg:mt-[20px] mt-3 lg:text-[20px]">
          Note that phone verification may be required for <br /> signup. Your
          number will only be used to verify <br /> your identity for security
          purposes.
        </p>

        <form
          className="w-full flex flex-col items-center p-[25px] "
          onSubmit={formik.handleSubmit}
        >
          <div className="flex gap-[10px]">
            <Input
              placeholder="First Name"
              type="text"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.first_name && formik.errors.first_name) || ""
              }
            />

            <Input
              placeholder="Last Name"
              type="text"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.last_name && formik.errors.last_name) || ""
              }
            />
          </div>

          <div className="flex gap-[10px]">
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
              placeholder="Mobile No"
              type="tel"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={(formik.touched.mobile && formik.errors.mobile) || ""}
            />
          </div>

          <div className="flex gap-[10px]">
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={(formik.touched.password && formik.errors.password) || ""}
            />

            <Input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.confirmPassword &&
                  formik.errors.confirmPassword) ||
                ""
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="  w-full
  max-w-md
  mt-[10px]
  px-4
  py-3
  text-white
  bg-[#128455]
  border
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="lg:mt-[10px] p-[25px]">
          <p className=" w-full flex justify-center text-black">
            Already have an account? &nbsp; &nbsp;
            <Link
              className=" text-[#128455]
              cursor-pointer"
              to="/login"
            >
              Login
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

export default RegistrationForm;
