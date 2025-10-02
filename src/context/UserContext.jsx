import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This effect runs once when the app starts to check if a user is already logged in.
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser({ ...decodedUser, token });
      } catch (error) {
        console.error("Invalid token found in storage:", error);
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  // This function is called by the Login component after a successful API call.
  const login = (responseData) => {
    const { accessToken, user: userInfo } = responseData;
    localStorage.setItem("accessToken", accessToken);
    setUser({ ...userInfo, token: accessToken });
  };

  // This function clears the user state and removes the token from storage.
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  // The value object contains the state and functions that will be available to all components.
  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a Custom Hook for easily accessing the context
export const useAuthContext = () => {
  return useContext(AuthContext);
};
