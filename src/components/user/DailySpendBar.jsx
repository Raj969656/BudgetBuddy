import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getDayWiseFromTransactions } from "../../utils/chartData.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DailySpendBar({
  recentTransactions = [],
  fallbackLabels = [],
  fallbackSeries = [],
  currency = "INR",
}) {
  const { labels, data } = useMemo(
    () => getDayWiseFromTransactions(recentTransactions, fallbackLabels, fallbackSeries),
    [recentTransactions, fallbackLabels, fallbackSeries]
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Daily Total",
        data,
        backgroundColor: "rgba(99,102,241,0.25)", // indigo-500 alpha
        borderColor: "#6366f1",
        borderWidth: 2,
        borderRadius: 8,
        maxBarThickness: 24,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => {
            const raw = items?.[0]?.label;
            const d = raw ? new Date(raw) : null;
            return d && !isNaN(d) ? d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : raw;
          },
          label: (ctx) => {
            const val = ctx.parsed.y || 0;
            try {
              return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(val);
            } catch {
              return `₹${val}`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          callback: (value, index) => {
            const raw = labels[index];
            const d = raw ? new Date(raw) : null;
            return d && !isNaN(d) ? d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : raw;
          },
          maxRotation: 0,
          autoSkipPadding: 16,
        },
      },
      y: {
        grid: { color: "rgba(17,24,39,0.06)" },
        ticks: {
          callback: (val) => {
            try {
              return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(val);
            } catch {
              return `₹${val}`;
            }
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
