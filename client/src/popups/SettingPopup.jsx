import React, { useState } from 'react'
import closeIcon from "../assets/close-square.png";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../store/slices/authSlice";
import settingIcon from "../assets/setting.png"
import { toggleSettingPopup } from '../store/slices/popUpSlice';

const SettingPopup = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("currentPassword", currentPassword);
    data.append("newPassword", newPassword);
    data.append("confirmNewPassword", confirmNewPassword);
    dispatch(updatePassword(data));
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3">
        <div className="p-6">
          <header className="flex justify-between items-center mb-7 pb-5 border-b-[1px] border-black">

            <div className="flex items-center gap-3">
              <img src={settingIcon} alt="settingIcon" className="bg-gray-300 p-5 rounded-lg" />
              <h3 className=" text-xl font-bold">
                Change Credentials
              </h3>
            </div>
            <img src={closeIcon}
              alt="close-icon"
              onClick={() => dispatch(toggleSettingPopup())} />
          </header>

          <form onSubmit={handleUpdatePassword} className="mt-8">

            <div className="space-y-6">

              {/* Current Password */}
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                <label className="font-medium text-gray-800">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3
        outline-none hover:border-black  hover:ring-black
        transition"
                />
              </div>

              {/* New Password */}
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                <label className="font-medium text-gray-800">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3
        outline-none hover:border-black  hover:ring-black
        transition"
                />
              </div>

              {/* Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                <label className="font-medium text-gray-800">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3
        outline-none hover:border-black  hover:ring-black
        transition"
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-10 flex justify-end gap-4">

              <button
                type="button"
                onClick={() => dispatch(toggleSettingPopup())}
                className="rounded-lg bg-gray-200 px-8 py-3 font-medium
      transition hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-black px-8 py-3 font-medium text-white
      transition hover:bg-gray-800 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Confirm"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default SettingPopup
