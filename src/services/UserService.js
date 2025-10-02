import axios from "axios";
import { serverBaseURL } from "../config/config";
import { axiosInstance } from "../utils/AxiosHelper";

// function create user:
export const createUser = async (userObject) => {
  const response = await axiosInstance.post(`/auth/register`, userObject);
  return response.data;
};
