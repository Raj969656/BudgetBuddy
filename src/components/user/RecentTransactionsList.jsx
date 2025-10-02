import React from "react";
import { CreditCard, Wallet } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/formatters.js";

export default function RecentTransactionsList({ items = [], currency = "INR" }) {
  if (!items.length) {
    return <div className="text-sm text-gray-500">No recent transactions</div>;
  }

  return (
    <ul className="divide-y divide-gray-100">
      {items.map((tx) => {
        const isCash = (tx.paymentmethod || "").toLowerCase() === "cash";
        return (
          <li key={tx.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                  isCash ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"
                }`}
              >
                {isCash ? <Wallet className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{tx.title}</div>
                <div className="text-xs text-gray-500 truncate">{tx.description}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{formatCurrency(tx.amount, currency)}</div>
              <div className="text-xs text-gray-500">
                {formatDate(tx.date)} · {tx.paymentmethod}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
