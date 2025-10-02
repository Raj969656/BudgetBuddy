import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getPaymentMethodData } from "../../utils/chartData.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#6366f1", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#a3e635"];

export default function PaymentMethodDoughnut({ breakdown = [] }) {
  const { labels, data } = useMemo(() => getPaymentMethodData(breakdown), [breakdown]);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: COLORS.slice(0, labels.length),
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true, pointStyle: "circle" },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.label || "";
            const val = ctx.parsed;
            return ` ${label}: ${val}`;
          },
        },
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
