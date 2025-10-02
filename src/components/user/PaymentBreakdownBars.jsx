import React, { useMemo } from "react";
import { formatCurrency } from "../../utils/formatters.js";

export default function PaymentBreakdownBars({ items = [], currency = "INR" }) {
  const total = useMemo(() => items.reduce((s, i) => s + (i.amount || 0), 0), [items]);

  if (!items.length) return <div className="text-sm text-gray-500">No data</div>;

  const palette = ["#6366f1", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const pct = total ? (it.amount / total) * 100 : 0;
        return (
          <div key={it.method} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: palette[idx % palette.length] }} />
                {it.method}
              </span>
              <span className="text-gray-600">
                {formatCurrency(it.amount, currency)} · {pct.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: palette[idx % palette.length] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
