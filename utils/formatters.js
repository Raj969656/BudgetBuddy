export function formatCurrency(amount = 0, currency = "INR") {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  }
}

export function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

export function capitalize(s) {
  return (s || "").charAt(0).toUpperCase() + (s || "").slice(1);
}

export function getSeverityBadge(severity) {
  switch (severity) {
    case "caution":
      return "bg-amber-50 text-amber-700";
    case "warning":
      return "bg-rose-50 text-rose-700";
    case "success":
      return "bg-emerald-50 text-emerald-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}