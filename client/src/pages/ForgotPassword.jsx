import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, message, error]);
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return <>
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* left section */}
      <div className="hidden w-full md:w-1/2 bg-[#A74C4A] text-white md:flex flex-col items-center
       justify-center p-8 rounded-tr-[80px] 
          rounded-br-[80px]">
        <div className="text-center h-[450px]         ">
          <div className="flex justify-center mb-12">
            <img src={logo_with_title} alt="logo" className="mb-12h-44 w-auto" />
          </div>
          <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">"One Stop Library solution."</h3>
        </div>
      </div>
      {/* right section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link
          to={"/login"}
          className="border-2 border-[#A74C4A] rounded-3xl font-bold w-39 py-2
                  px-4 absolute top-5 left-4  text-[#A74C4A] hover:bg-[#A74C4A] hover:text-white transition duration-300 text-right"
        >
          Back
        </Link>
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-12">
            <div className="flex items-center justify-center">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
          </div>
          <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">Forgot Password</h1>
          <p className="text-gray-800 text-center mb-12 font-semibold">
            Please enter your Email
          </p>
          <form onSubmit={handleForgotPassword} >
            <div className="mb-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-md border-slate-500 hover:border-green-400 hover:outline-4
                focus:outline-none transition duration-300" />
            </div>
            <button type="submit" className="border-2 mt-5
                   border-gray-400 w-full font-semibold
                    bg-[#A74C4A] text-white
                    py-2 rounded-lg hover:bg-white
                    hover:text-slate-600 transition"
              disabled={loading ? true : false}>
              RESET PASSWORD
            </button>
          </form>
        </div>

      </div>
    </div>
  </>
};
export default ForgotPassword;