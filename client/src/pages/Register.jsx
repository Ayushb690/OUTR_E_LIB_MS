import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";

import { register, resetAuthSlice } from "../store/slices/authSlice";

import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  
  const { loading, error, message, user, isAuthenticated } =
  useSelector((state) => state.auth);
  
  const navigateTo = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);

    dispatch(register(data));
  };

  useEffect(() => {
    if (message) {
      navigateTo(`/otp-verification/${email}`);
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message, email, navigateTo]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* LEFT SIDE */}
        <div className="hidden w-full md:w-1/2 bg-slate-500 text-white md:flex items-center justify-center flex-col
        p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className=" text-center h-[376px]">
            <div className="flex justify-center mb-12">
              <img src={logo_with_title} alt="logo" className="mb-12 h-28 w-auto" />
            </div>

            <p className="text-gray-100 mb-12">Already have Account? Sign in now.</p>

            <Link to={"/login"} className="border-2 rounded-lg font-semibold border-white py-2 px-8
            hover:bg-white hover:text-slate-500 transition"> SIGN IN</Link>
          </div>
        </div>
        {/* right side */}
        <div className="w-full md:w-1/2 flex items-center
      justify-center bg-white p-8">
          <div className="w-full  max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
                <h3 className="font-medium text-4xl overflow-hidden">Sign up</h3>
                <img src={logo} alt="logo" className="h-auto w-24 object-cover" />
              </div>
            </div>
            <p className="text-gray-700 text-center">
              Please provide your information to sign up.
            </p>
            <br />
            <form onSubmit={handleRegister}
            >
              <div className="mb-2">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none" />
              </div>
              <div className="mb-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none" />
              </div>
              <div className="mb-2">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-full px-4 py-3 border border-gray-400  rounded-md focus:outline-none" />
              </div>
              <div className=" block md:hidden font-semibold mt-5">
                <p>
                  Already have an acoount?
                  <Link to="/login" className="text-sm text-gray-300 hover:underline"> Sign In</Link>
                </p>

              </div>
              <button type="submit" className="border-2 mt-5
                   border-gray-400 w-full font-semibold
                    bg-slate-500 text-white
                    py-2 rounded-lg hover:bg-white
                    hover:text-slate-500 "> SIGN UP</button>
            </form>
          </div>
        </div>
      </div>
      I
    </>
  );
};

export default Register;
