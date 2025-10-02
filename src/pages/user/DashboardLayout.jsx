import React from "react";
import SideMenu from "../../components/SideMenu";
import { Navigate, Outlet } from "react-router";
import { getAccessTokenFromLocalStorage } from "../../services/LocalStorageService";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import GradientBackground from "../../components/GradientBackground.jsx";

function DashboardLayout() {
  const accessToken = getAccessTokenFromLocalStorage();

  const { user } = useAuthContext();

  if (!user) {
    if (!accessToken) {
      toast.error("You are not logged in !!");
      return (
        <Navigate to={"/login"} />
        // <div className="mt-20 flex justify-center">
        //   <h1 className="text-3xl">
        //     You are not logged In !! Please login to access the dashboard
        //   </h1>
        // </div>
      );
    }
  }

  return (
    <div className="flex">
      {/* left */}
      <div className="">
        <SideMenu />
      </div>

      {/* right */}
      <div className=" pl-64  min-h-screen  flex-1  bg-gray-200">
        <div className="p-10 ">

           <Outlet />

        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
