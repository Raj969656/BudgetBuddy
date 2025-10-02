import React, { useState } from "react";
import {
  FaHome,
  FaPlusCircle,
  FaListUl,
  FaRobot,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";

function SideMenu() {
  const [menuItems] = useState([
    { name: "Home", icon: <FaHome />, path: "/dashboard" },
    { name: "Add Expense", icon: <FaPlusCircle />, path: "/dashboard/add-expense" },
    { name: "View Expense", icon: <FaListUl />, path: "/dashboard/expenses" },
    { name: "Assistant", icon: <FaRobot />, path: "/dashboard/assistant" },
    { name: "Recycle Bin", icon: <MdDelete />, path: "/dashboard/recycle-bin" },
  ]);

  const { user } = useAuthContext();
  const location = useLocation();

  const displayName = user?.username || "User";
  const initial = displayName?.charAt(0)?.toUpperCase() || "U";

  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
      className="fixed top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-gray-950 to-gray-900 text-white border-r border-white/10 shadow-xl flex flex-col"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex-col justify-between gap-5">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="h-9 w-9 rounded-lg bg-white/10 grid place-items-center ring-1 ring-white/15"
            >
              <span className="text-lg">🧮</span>
            </motion.div>
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm font-semibold leading-tight"
              >
                Dashboard
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[11px] text-gray-400 leading-tight"
              >
                Track and manage spending
              </motion.div>
            </div>
          </div>

          {/* User chip */}
          <motion.div
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="inline-flex mt-3 items-center gap-2 rounded-full bg-white/5 px-2.5 py-1.5 ring-1 ring-white/10"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="h-6 w-6 rounded-full bg-white/10 grid place-items-center text-[11px] font-bold"
            >
              {initial}
            </motion.div>
            <span className="text-xs text-gray-200 max-w-[7rem] truncate">{displayName}</span>
          </motion.div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <AnimatePresence>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.96 }}
                className="relative"
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1 bottom-1 w-1 rounded-r bg-indigo-400"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}

                <Link
                  to={item.path}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${isActive
                      ? "bg-white/10 text-white ring-1 ring-white/15"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`h-9 w-9 rounded-md grid place-items-center ${isActive ? "bg-white/15" : "bg-white/5"} text-lg`}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="text-sm font-medium truncate">{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </nav>

      {/* Footer */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-3 py-3 border-t border-white/10"
      >
        <Link
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-red-400 transition relative"
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1], color: ["#ccc", "#f87171", "#ccc"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-9 w-9 rounded-md grid place-items-center bg-white/5"
          >
            <BiLogOut />
          </motion.span>
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default SideMenu;
