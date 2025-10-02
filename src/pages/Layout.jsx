import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

function Layout() {
    return (
        <div>
            <ToastContainer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Header />
            <div className={'pt-16 '}>
                <Outlet />

            </div>
        </div>
    );
}

export default Layout;
