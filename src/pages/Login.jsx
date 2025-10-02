import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/AuthService";
import { saveLoginData } from "../services/LocalStorageService";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import GradientBackground from "../components/GradientBackground.jsx";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { setUser, setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const submitData = async (event) => {
    event.preventDefault();

    if (loginData.email.trim() === "") {
      toast.error("Email required !!");
      return;
    }
    if (loginData.password.trim() === "") {
      toast.error("Password required !!");
      return;
    }

    try {
      const responseData = await loginUser(loginData);
      console.log(responseData);

      // Save to localStorage
      saveLoginData(responseData);
      setUser(responseData.user);
      setAccessToken(responseData.accessToken);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.status === 403) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error in login!!");
      }
    }
  };

  return (
    <GradientBackground>
      <div className="max-w-md shadow rounded-3xl p-10 mx-auto mt-2 md:mt-10 bg-white">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login Here
        </h1>
        <form noValidate onSubmit={submitData}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-2">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-2 mt-3">
            <button
              type="submit"
              className="bg-blue-700 cursor-pointer text-white px-3 rounded py-2 hover:bg-blue-800 transition"
            >
              Login
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={() =>
                setLoginData({
                  email: "",
                  password: "",
                })
              }
              className="bg-orange-700 text-white px-3 rounded py-2 hover:bg-orange-800 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </GradientBackground>
  );
}

export default Login;
