import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/user/DashboardLayout.jsx";
import ViewExpenses from "./pages/user/ViewExpenses.jsx";
import AddExpense from "./pages/user/AddExpense.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import UserHome from "./pages/user/UserHome.jsx";
import {ChatAssistant} from "./pages/user/ChatAssistant.jsx";
// import RecycleBin from "./pages/user/RecycleBin.jsx";
import Setting from "./pages/user/Setting.jsx";
import CategoriesPage from "./pages/user/CategoriesPage.jsx";
import ReportsPage from "./pages/user/ReportPage.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="expenses" element={<h1>This is Expenses page</h1>} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="" element={<UserHome />} />
            <Route path="add-expense" element={<AddExpense />} />
            <Route path="expenses" element={<ViewExpenses />} />
            <Route path="assistant" element={<ChatAssistant/>} />
            {/* <Route path="recycle-bin" element={<RecycleBin/>} /> */}
            <Route path="settings" element={<Setting />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
