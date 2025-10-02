import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ icon, title, value, subtitle, trendIcon, accent = "from-gray-500/10 to-gray-500/5" }) {
  return (
    <motion.div
      className="rounded-xl border border-gray-200 bg-white p-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br ${accent} text-gray-700`}>
        {icon}
      </div>
      <div className="mt-3">
        <div className="text-xs text-gray-500">{title}</div>
        <div className="flex items-center gap-2">
          <div className="text-xl font-semibold">{value}</div>
          {trendIcon}
        </div>
        {subtitle ? <div className="text-xs text-gray-500 mt-1">{subtitle}</div> : null}
      </div>
    </motion.div>
  );
}
