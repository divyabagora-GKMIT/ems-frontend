import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { withBaseUrl } from "../config/apiConfig";


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordToggle, setPasswordToggle] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = Cookies.get("token");
    const decoded = jwtDecode(token);

    const userEmail = decoded.email;

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(withBaseUrl("/api/auth/reset"), 
        {
            email: userEmail,newPassword,
      },
      {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
      }
    );

      setMessage(response.data.message || "Password reset successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Reset Password
          </h2>
          <p className="text-gray-600 text-sm">
            Set a new password to continue using the Employee Management System
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={passwordToggle ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-300 bg-white px-10 py-2.5 text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />

              
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <TbLockPassword size={20} />
              </div>

             
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setPasswordToggle(!passwordToggle)}
              >
                {passwordToggle ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
          </div>

         
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={passwordToggle ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-enter new password"
                className="w-full rounded-xl border border-gray-300 bg-white px-10 py-2.5 text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />

            
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <TbLockPassword size={20} />
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="flex items-center justify-center mb-4">
              <p
                className={`text-sm ${
                  message.toLowerCase().includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
