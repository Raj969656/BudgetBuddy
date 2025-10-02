import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAccessTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeLoginData,
} from "../services/LocalStorageService";
import { useNavigate } from "react-router";

const AuthContent = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDashboardData, setLoadingDashboardData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(getAccessTokenFromLocalStorage());
    setUser(getUserFromLocalStorage());
  }, []);

  function logoutUser() {
    setUser(null);
    setAccessToken(null);
    removeLoginData();
    setDashboardData(null);
    setLoadingDashboardData(false);
  }

  async function loadDashboardData() {
    try {
      setLoadingDashboardData(true);
      const res = await fetch("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      });
      const json = await res.json();
      setDashboardData(json);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoadingDashboardData(false);
    }
  }

  return (
    <AuthContent.Provider
      value={{
        user,
        accessToken,
        setUser,
        setAccessToken,
        logoutUser,
        dashboardData,
        setDashboardData,
        loadingDashboardData,
        setLoadingDashboardData,
        loadDashboardData, // ✅ expose function
      }}
    >
      {children}
    </AuthContent.Provider>
  );
};

// ✅ Correct export
export const useAuthContext = () => useContext(AuthContent);
