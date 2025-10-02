import React, { useState } from "react";
import { format } from "date-fns";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, LayoutDashboard, Sliders, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const mockData = {
  trend: "up",
  percentageChange: 15.2,
  topCategory: { name: "Groceries", amount: 450.00 },
  dailyBreakdown: [
    { date: "2025-09-01", amount: 50 },
    { date: "2025-09-02", amount: 75 },
    { date: "2025-09-03", amount: 120 },
    { date: "2025-09-04", amount: 90 },
    { date: "2025-09-05", amount: 150 },
    { date: "2025-09-06", amount: 80 },
    { date: "2025-09-07", amount: 110 },
  ],
};

const userSuggestions = [
  {
    title: "Start a Budget",
    tip: "Create a spending plan to control your finances.",
  },
  {
    title: "Track Subscriptions",
    tip: "Find and cancel unused recurring payments.",
  },
  {
    title: "Review Your Habits",
    tip: "Identify areas where you can cut back on spending.",
  },
];

export default function ReportsPage() {
  const [reportData] = useState(mockData);

  const isUp = reportData.trend === "up";

  return (
    <div className="p-6 md:p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Reports</h1>
      <p className="text-gray-600 mb-6">A simple overview of your spending trends and insights.</p>

      {/* Top Stat Cards with Animation */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Trend */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-start"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`p-3 rounded-full ${isUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} mb-2`}>
            {isUp ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-1">
            {isUp ? "Upward" : "Downward"} Trend
          </h2>
          <span className="text-xs text-gray-500 mt-1">vs. previous period</span>
        </motion.div>

        {/* Top Category */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-start"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mb-2">
            <Sliders className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-1">
            Top Category
          </h2>
          <span className="text-xs text-gray-500 mt-1">
            {reportData.topCategory.name} was a key expense
          </span>
        </motion.div>

        {/* Daily Insights */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-start"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
            <LineChart className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-1">
            Daily Insights
          </h2>
          <span className="text-xs text-gray-500 mt-1">
            Review spending for a new perspective
          </span>
        </motion.div>
      </motion.div>

      {/* Suggestions for saving money */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tips & Suggestions</h2>
        <ul className="space-y-4">
          {userSuggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="text-indigo-500 mr-2 flex-shrink-0">•</span>
              <div>
                <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
                <p className="text-sm text-gray-600">{suggestion.tip}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
