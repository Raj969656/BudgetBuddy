import axios from "axios";
import { serverBaseURL } from "../config/config";
import { axiosInstance } from "../utils/AxiosHelper";

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post(`/auth/login`, loginData);

  return response.data;
};
