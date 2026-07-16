import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();

  const dispatch = useDispatch();
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const handleResetPassword = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    dispatch(resetPassword(formData, token));
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
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return <>
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* left section */}
      <div className=" hidden w-full md:w-1/2 bg-slate-500 text-white md:flex 
        flex-col items-center justify-center p-8 rounded-tr-[80px]
        rounded-br-[80px]"
      >
        <div className="text-center h-[450px]">
          <div className="flex justify-center mb-12">
            <img src={logo_with_title} alt="logo" className="mb-12h-44 w-auto" />
          </div>
          <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">"One Stop Library solution."</h3>
        </div>
      </div>
      {/* right section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link
          to={"/password/forgot"}
          className="border-2 border-black rounded-3xl font-bold w-52 py-2
        px-4 absolute top-10 -left-24  text-gray-500 hover:bg-slate-500 hover:text-white transition duration-300 text-right"
        >
          Back
        </Link>
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-12">
            <div className="flex items-center justify-center">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
          </div>
          <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">Reset Password</h1>
          <p className="text-gray-800 text-center mb-12">Please enter your Password</p>
          <form onSubmit={handleResetPassword}>
            <div className="mb-2">
              <input type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border border-slate-500 hover:border-red-400 hover:outline-4
                focus:outline-none transition duration-300" />
              {/* <input type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 mb-8 border border-slate-500 rounded-md focus:outline-none" /> */}
            </div>
            <div className="relative mb-8">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-md border border-slate-500 hover:border-red-400 hover:outline-4
                focus:outline-none transition duration-300"/>
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
            <button type="submit" className="border-2
                   border-slate-500 w-full font-semibold
                   bg-slate-500 text-white
                   py-2 rounded-lg hover:bg-white
                   hover:text-slate-600 transition"
              disabled={loading ? true : false}>
              RESET PASSWORD
            </button>
          </form>
        </div>
      </div>

    </div>

















  </>;
};

export default ResetPassword;
