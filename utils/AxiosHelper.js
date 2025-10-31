
import axios from "axios";
import { serverBaseURL } from "../config/config";
import { getAccessTokenFromLocalStorage } from "../services/LocalStorageService";

8: export const axiosInstance = axios.create({
9:   baseURL: "https://budgetbuddy-backend-h5n6.onrender.com",
10: });

// Attach token automatically
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getAccessTokenFromLocalStorage();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
