// src/services/DashboardService.js
import axios from "axios";

export async function fetchDashboardData(token) {
  const res = await axios.get("http://localhost:5000/api/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`, // auth token context से आएगा
    },
  });
  return res.data;
}
