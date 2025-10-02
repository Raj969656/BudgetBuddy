// import { serverBaseURL } from "../config/config";
// import axios from "axios";
// import { axiosInstance } from "../utils/AxiosHelper";

// // get all expenses + filters
// export const getExpenses = async (minPrice = "", maxPrice = "") => {
//   const response = await axiosInstance.get(
//     `/expenses?minPrice=${minPrice}&maxPrice=${maxPrice}`
//   );

//   return response.data;
// };

// //creating expense

// export const createExpense = async (expenseData) => {
//   try {
//     const response = await axiosInstance.post("/expenses", expenseData);
//     return response.data; // success response
//   } catch (error) {
//     // If backend sent a message, show that
//     if (error.response && error.response.data && error.response.data.message) {
//       throw new Error(error.response.data.message);
//     }
//     // Fallback for network or unknown errors
//     throw new Error(error.message || "Something went wrong");
//   }
// };

// //delete expense
// export const deleteExpense = async (expenseId) => {
//   const response = await axiosInstance.delete(`/expenses/${expenseId}`);
//   return response.data;
// };

// // update expense
// export const updateExpense = async (expenseId, expenseData) => {
//   const response = await axiosInstance.put(`/expenses/${expenseId}`, expenseData);
//   return response.data;
// };

import { axiosInstance } from "../utils/AxiosHelper";

// ✅ Get all expenses with filters
export const getExpenses = async (minPrice, maxPrice) => {
  const min = minPrice || 0;
  const max = maxPrice || 999999;

  const response = await axiosInstance.get(
    `/expenses?minPrice=${min}&maxPrice=${max}`
  );
  return response.data;
};

// ✅ Create expense
export const createExpense = async (expenseData) => {
  try {
    const response = await axiosInstance.post("/expenses", expenseData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Something went wrong");
  }
};

// ✅ Delete expense
export const deleteExpense = async (expenseId) => {
  const response = await axiosInstance.delete(`/expenses/${expenseId}`);
  return response.data;
};

// ✅ Update expense
export const updateExpense = async (expenseId, expenseData) => {
  const response = await axiosInstance.put(`/expenses/${expenseId}`, expenseData);
  return response.data;
};
