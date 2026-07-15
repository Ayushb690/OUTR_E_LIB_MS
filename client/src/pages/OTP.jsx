import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  otpVerification,
  resetAuthSlice,
} from "../store/slices/authSlice";

import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();

  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } =
    useSelector((state) => state.auth);

  const handleOtpVerification = (e) => {
    e.preventDefault();

    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen ">

        {/* LEFT SIDE */}
        <div
          className="w-full md:w-full flex items-center justify-center p-8 relative "
        >

          <Link
            to={"/register"}
            className="border-2 border-black rounded-3xl font-bold w-52 py-2
            px-4 absolute top-10 -left-24  text-gray-500 hover:bg-slate-500 hover:text-white transition duration-300 text-right"
          >
            Back
          </Link>

          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-half flex items-center justify-center">
                <img src={logo} alt="logo" className="h-28 w-auto" />
              </div>
            </div>

            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden text-gray-500">
              Check your Mailbox
            </h1>

            <p className="text-gray-700 text-center mb-12">
              Please enter the otp to proceed
            </p>

            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <input
                  type="password"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-500 rounded-md focus:outline-none"
                  placeholder="OTP"
                />
              </div>
              <button type="submit" className="border-2 mt-5
                   border-gray-400 w-full font-semibold
                    bg-slate-500 text-white
                    py-2 rounded-lg hover:bg-white
                    hover:text-slate-500 transition"> VERIFY</button>

            </form>
          </div>

        </div>
        {/* right side */}
        <div className="hidden w-full md:w-1/2 bg-slate-500 text-white md:flex flex-col items-center justify-center
        p-8 rounded-tl-[80px] rounded-bl-[80px]">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img src={logo_with_title} alt="logo" className="mb-12 h-28 w-auto" />
            </div>
            <p className="text-gray-300 mb-12">New to Platform?Sign up now.</p>
            <Link to={"/register"} className="border-2 mt-5
                   border-white px-8 w-full font-semibold
                    bg-white text-slate-500
                    py-2 rounded-lg
                    hover:text-white transition hover:bg-slate-500">SIGN UP</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;