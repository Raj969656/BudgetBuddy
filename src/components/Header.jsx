// import React from "react";
// import {Link, useNavigate} from "react-router";
// import {useAuthContext} from "../context/AuthContext";

// function Header() {
//     const {user, logoutUser} = useAuthContext();
//     useNavigate();
//     const displayName = user?.username || "Guest";
//     const initial = displayName?.charAt(0)?.toUpperCase() || "G";
//     return (
//         <header className="fixed top-0 inset-x-0 z-40 bg-white/85 backdrop-blur border-b border-gray-200">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="h-16 flex items-center justify-between">
//                     {/* Brand */}
//                     <Link to={"/"} className="flex items-center gap-3 min-w-0">
//                         <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center ring-1 ring-indigo-400/50 shadow-sm">
//                        🧮  
//                         </div>
//                         <div className="min-w-0 leading-tight">
//                             <div className="text-base sm:text-lg font-semibold text-gray-900">BudgetBuddy</div>
//                             <div className="hidden sm:block text-[11px] text-gray-500">Track smarter, spend better</div>
//                         </div>
//                     </Link>

//                     {/* Menu Links */}
//                     <nav className="hidden md:flex items-center gap-2">
//                         <Link
//                             to={"/dashboard"}
//                             className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
//                         >
//                             Dashboard
//                         </Link>
//                         <a
//                             href="#"
//                             className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
//                         >
//                             Reports
//                         </a>
//                         <a
//                             href="#"
//                             className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
//                         >
//                             Categories
//                         </a>
                        
//                         <Link to="/dashboard/settings" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">Settings</Link>
//                     </nav>

//                     {/* Auth */}
//                     {!user ? (
//                         <div className="flex items-center gap-2">
//                             <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
//                                 <Link to={"/login"}>Login</Link>
//                             </button>
//                             <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition">
//                                 <Link to={"/signup"}>Signup</Link>
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="flex items-center gap-3">
//                             <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 ring-1 ring-gray-200">
//                                 <div className="h-7 w-7 rounded-full bg-indigo-600 text-white grid place-items-center text-xs font-bold">
//                                     {initial}
//                                 </div>
//                                 <span className="text-sm font-medium text-gray-800 max-w-[10rem] truncate">
//                                     {displayName}
//                                 </span>
//                             </div>
//                             <button className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition">
//                                 <Link
//                                     onClick={(e) => {
//                                         logoutUser();
//                                     }}
//                                     to={"#"}
//                                 >
//                                     Logout
//                                 </Link>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
import { motion } from "framer-motion";

function Header() {
  const { user, logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const displayName = user?.username || "Guest";
  const initial = displayName?.charAt(0)?.toUpperCase() || "G";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
      className="fixed top-0 inset-x-0 z-40 bg-white/85 backdrop-blur border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to={"/"} className="flex items-center gap-3 min-w-0 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center ring-1 ring-indigo-400/50 shadow-md"
            >
              🧮
            </motion.div>
            <div className="min-w-0 leading-tight">
              <div className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                BudgetBuddy
              </div>
              <div className="hidden sm:block text-[11px] text-gray-500 group-hover:text-gray-700 transition">
                Track smarter, spend better
              </div>
            </div>
          </Link>

          {/* Menu Links */}
          <nav className="hidden md:flex items-center gap-4">
            {[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Reports", path: "/dashboard/reports" },
              { name: "Categories", path: "/dashboard/categories" },
              { name: "Settings", path: "/dashboard/settings" },
            ].map((link, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={link.path}
                  className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                >
                  {link.name}
                  {/* Underline animation */}
                  <motion.span
                    className="absolute left-0 bottom-0 h-[2px] bg-indigo-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Auth */}
          {!user ? (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <Link to={"/login"}>Login</Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition"
              >
                <Link to={"/signup"}>Signup</Link>
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* User chip with glowing avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 ring-1 ring-gray-200"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 0px #6366f1", "0 0 12px #6366f1", "0 0 0px #6366f1"] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-7 w-7 rounded-full bg-indigo-600 text-white grid place-items-center text-xs font-bold"
                >
                  {initial}
                </motion.div>
                <span className="text-sm font-medium text-gray-800 max-w-[10rem] truncate">
                  {displayName}
                </span>
              </motion.div>

              {/* Logout button with shake hover */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: [-3, 3, -3, 0] }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition shadow"
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    logoutUser();
                    navigate("/login");
                  }}
                  href="#"
                >
                  Logout
                </a>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
