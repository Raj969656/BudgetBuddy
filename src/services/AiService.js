// import {axiosInstance} from "../utils/AxiosHelper.js";

// export const getDashboardData = async () => {

//     const response = await axiosInstance.post('/ai/suggestions')
//     return response.data;

// }////////////////////////////////////////////////////////
import { axiosInstance } from "../utils/AxiosHelper.js";

// GET dashboard suggestions
export const getDashboardData = async () => {
  const response = await axiosInstance.get("/ai/suggestions");
  return response.data;
};

// GET AI chat with query
export const chatWithAi = async (query) => {
  const response = await axiosInstance.get("/ai/chat", {
    params: { query },
  });
  return response.data;
};
