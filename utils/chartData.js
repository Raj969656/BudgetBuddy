function normalizeDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function getDayWiseFromTransactions(recentTransactions = [], fallbackLabels = [], fallbackValues = []) {
  if (Array.isArray(recentTransactions) && recentTransactions.length > 0) {
    const map = new Map();
    for (const tx of recentTransactions) {
      const key = normalizeDate(tx.date);
      if (!key) continue;
      map.set(key, (map.get(key) || 0) + (Number(tx.amount) || 0));
    }
    const keys = Array.from(map.keys()).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    const values = keys.map((k) => map.get(k));
    return {
      labels: keys,
      data: values,
    };
  }

  if (Array.isArray(fallbackLabels) && Array.isArray(fallbackValues) && fallbackLabels.length === fallbackValues.length) {
    return {
      labels: fallbackLabels,
      data: fallbackValues,
    };
  }

  return { labels: [], data: [] };
}

export function getPaymentMethodData(breakdown = []) {
  const labels = [];
  const data = [];
  for (const item of breakdown) {
    labels.push(item.method || "Unknown");
    data.push(Number(item.amount) || 0);
  }
  return { labels, data };
}