import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CalendarDays,
  CreditCard,
  TrendingUp,
} from "lucide-react";

import DayWiseSpendChart from "../../components/user/DayWiseSpendChart.jsx";
import StatCard from "../../components/user/StatCard.jsx";
import PaymentMethodDoughnut from "../../components/user/PaymentMethodDoughnut.jsx";
import RecentTransactionsList from "../../components/user/RecentTransactionsList.jsx";
import DailySpendBar from "../../components/user/DailySpendBar.jsx";

import {
  formatCurrency,
  formatDate,
  capitalize,
  getSeverityBadge,
} from "../../utils/formatters.js";

export default function UserHome() {
  // ✅ Dummy static data
  const data = {
    trend: "up",
    total: 15420,
    headline: "Welcome back! Here’s your weekly expense summary 🎉",
    pct_change: 12.5,
    currency: "INR",
    topPaymentMethodUsed: { name: "UPI", amount: 8900, pct: 58 },
    peakDay: { date: new Date().toISOString(), amount: 3200 },
    paymentMethodBreakdown: [
      { method: "UPI", value: 58 },
      { method: "Card", value: 30 },
      { method: "Cash", value: 12 },
    ],
    chart: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [1200, 1800, 1500, 2000, 2200, 1700, 3020],
    },
    recentTransactions: [
      { id: 1, title: "Zomato", amount: 350, date: "2025-09-27" },
      { id: 2, title: "Swiggy", amount: 220, date: "2025-09-28" },
      { id: 3, title: "Amazon", amount: 1800, date: "2025-09-29" },
      { id: 4, title: "Uber", amount: 260, date: "2025-09-29" },
    ],
    severity: "warning",
    action: {
      label: "Control Expenses",
      tip: "You spent 12% more this week. Try reducing food orders 🍕",
      url: "#",
    },
  };

  const isUp = data?.trend === "up";
  const currency = data?.currency ?? "INR";

  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 🎉 Hero Header */}
      <motion.div
        className="mt-4 mb-8 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 p-6 text-white shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="text-sm mt-2">{data.headline}</p>
        <div
          className={`inline-flex items-center px-3 py-1 mt-3 rounded-md text-xs font-medium ${
            isUp ? "bg-emerald-600" : "bg-rose-600"
          }`}
        >
          {isUp ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          {isUp ? "Spending Up" : "Spending Down"}
        </div>
      </motion.div>

      {/* 📊 Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.05 }}>
          <StatCard
            icon={<Wallet className="w-5 h-5" />}
            title="This Week"
            value={formatCurrency(data.total, currency)}
            subtitle={data.headline}
            accent="from-blue-500/15 to-blue-500/5"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            title="Trend"
            value={`${isUp ? "+" : "-"}${Math.abs(data.pct_change ?? 0)}%`}
            subtitle={isUp ? "Up vs last week" : "Down vs last week"}
            trendIcon={
              isUp ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-rose-600" />
              )
            }
            accent={
              isUp
                ? "from-emerald-500/15 to-emerald-500/5"
                : "from-rose-500/15 to-rose-500/5"
            }
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <StatCard
            icon={<CreditCard className="w-5 h-5" />}
            title="Top Payment Method"
            value={`${data.topPaymentMethodUsed?.name ?? "-"} · ${formatCurrency(
              data.topPaymentMethodUsed?.amount ?? 0,
              currency
            )}`}
            subtitle={`${data.topPaymentMethodUsed?.pct ?? 0}% of total`}
            accent="from-violet-500/15 to-violet-500/5"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <StatCard
            icon={<CalendarDays className="w-5 h-5" />}
            title="Peak Day"
            value={formatDate(data.peakDay?.date)}
            subtitle={`${formatCurrency(
              data.peakDay?.amount ?? 0,
              currency
            )} spent`}
            accent="from-amber-500/15 to-amber-500/5"
          />
        </motion.div>
      </div>

      {/* 📈 Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">
        <motion.div
          className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-medium mb-3">Day-wise Spend</h3>
          <div className="h-72">
            <DayWiseSpendChart
              recentTransactions={data.recentTransactions}
              fallbackLabels={data.chart?.labels}
              fallbackSeries={data.chart?.series}
              currency={currency}
            />
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="font-medium mb-3">Payment Methods</h3>
          <div className="h-72">
            <PaymentMethodDoughnut breakdown={data.paymentMethodBreakdown} />
          </div>
        </motion.div>
      </div>

      {/* 📊 Daily Totals Bar */}
      <motion.div
        className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-5 shadow-sm mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Daily Totals</h3>
          <span className="text-xs text-gray-500">
            {data.recentTransactions.length} transactions
          </span>
        </div>
        <div className="h-72">
          <DailySpendBar
            recentTransactions={data.recentTransactions}
            fallbackLabels={data.chart?.labels}
            fallbackSeries={data.chart?.series}
            currency={currency}
          />
        </div>
      </motion.div>

      {/* 📝 Recent Transactions + Expense Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <motion.div
          className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-5 lg:col-span-2 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Recent Transactions</h3>
            <span className="text-xs text-gray-500">
              {data.recentTransactions.length} items
            </span>
          </div>
          <RecentTransactionsList
            items={data.recentTransactions}
            currency={currency}
          />
        </motion.div>

        <motion.div
          className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-6 flex flex-col justify-between shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div>
            <div
              className={`inline-block text-xs px-2 py-1 rounded-md mb-3 ${getSeverityBadge(
                data.severity
              )}`}
            >
              {capitalize(data.severity)}
            </div>
            <h3 className="font-semibold text-lg">{data.action.label}</h3>
            <p className="text-sm text-gray-600 mt-1">{data.action.tip}</p>
          </div>
          <a
            href={data.action.url}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
          >
            Go to {data.action.label}
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
