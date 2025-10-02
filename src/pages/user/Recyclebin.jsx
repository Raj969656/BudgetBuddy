import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Trash2,
  RotateCcw,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = (typeof import.meta !== "undefined" && import.meta?.env?.VITE_API_BASE_URL) || "/api";

const formatCurrency = (value) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(
    Number(value || 0)
  );

const formatDateTime = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString();
};

export default function RecycleBin() {
  // Data and pagination
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("deletedAt");
  const [sortDir, setSortDir] = useState("desc");

  // Selection
  const [selected, setSelected] = useState(new Set());

  const abortRef = useRef(null);
  const searchDebounceRef = useRef(null);

  const categories = useMemo(() => {
    const set = new Set();
    items.forEach((i) => i?.category && set.add(i.category));
    return ["all", ...Array.from(set).sort((a, b) => String(a).localeCompare(String(b)))];
  }, [items]);

  const visibleIds = useMemo(() => items.map((i) => i?.id || i?._id).filter(Boolean), [items]);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selected.has(id));
  const someVisibleSelected = visibleIds.some((id) => selected.has(id));

  const applySelectAllVisible = (checked) => {
    const next = new Set(selected);
    if (checked) {
      visibleIds.forEach((id) => next.add(id));
    } else {
      visibleIds.forEach((id) => next.delete(id));
    }
    setSelected(next);
  };

  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const fetchDeletedExpenses = async (opts = {}) => {
    const { signal } = opts;
    setLoading(true);
    setError("");
    try {
      const params = {
        page,
        limit: pageSize,
        q: searchTerm || undefined,
        category: category !== "all" ? category : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sortBy,
        sortDir,
      };

      const res = await axios.get(`${API_BASE}/expenses/deleted`, { params, signal });
      const data = res?.data;

      // Support both array and paginated shapes
      if (Array.isArray(data)) {
        setItems(data);
        setTotal(data.length);
        setPages(Math.max(1, Math.ceil(data.length / pageSize)));
        // If backend returned all data, do client-side pagination slice for the page
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        setItems(data.slice(start, end));
      } else {
        const items = data?.items ?? [];
        setItems(items);
        setTotal(data?.total ?? items.length);
        setPages(data?.pages ?? Math.max(1, Math.ceil((data?.total ?? items.length) / (data?.pageSize ?? pageSize))));
        if (typeof data?.page === "number") setPage(data.page);
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err?.response?.data?.message || err?.message || "Failed to load deleted expenses");
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetching when search/filter/sort/pagination changes
  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      fetchDeletedExpenses({ signal: controller.signal });
    }, 300);

    return () => {
      controller.abort();
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchTerm, category, startDate, endDate, sortBy, sortDir]);

  const refresh = () => {
    fetchDeletedExpenses();
  };

  const confirm = async ({ title, text, confirmText = "Confirm", confirmColor = "#2563eb", icon = "warning" }) => {
    const res = await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: confirmText,
      confirmButtonColor: confirmColor,
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });
    return res.isConfirmed;
  };

  const restoreExpenses = async (ids) => {
    if (!ids?.length) return;
    const ok = await confirm({
      title: "Restore expenses",
      text: `Restore ${ids.length} item${ids.length > 1 ? "s" : ""} back to Expenses?`,
      confirmText: "Restore",
      confirmColor: "#16a34a",
      icon: "question",
    });
    if (!ok) return;

    try {
      await axios.post(`${API_BASE}/expenses/restore`, { ids });
      toast.success("Expenses restored");
      setSelected(new Set());
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to restore");
    }
  };

  const deleteForever = async (ids) => {
    if (!ids?.length) return;
    const ok = await confirm({
      title: "Permanently delete",
      text: `This will permanently remove ${ids.length} item${ids.length > 1 ? "s" : ""}. This action cannot be undone.`,
      confirmText: "Delete forever",
      confirmColor: "#dc2626",
      icon: "warning",
    });
    if (!ok) return;

    try {
      await axios.delete(`${API_BASE}/expenses/hard-delete`, { data: { ids } });
      toast.success("Expenses permanently deleted");
      setSelected(new Set());
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  const onHeaderSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  // Reset to first page on major filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, category, startDate, endDate]);

  const EmptyState = () => (
    <div className="text-center py-16 border border-dashed rounded-xl bg-white/50">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <Trash2 className="h-6 w-6 text-gray-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">No deleted expenses</h3>
      <p className="mt-1 text-gray-500">Deleted items will appear here. You can restore or permanently delete them.</p>
      <button
        type="button"
        onClick={refresh}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </button>
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Recycle Bin</h1>
        <p className="mt-1 text-gray-600">View and manage expenses that have been deleted.</p>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Failed to load</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200"
          >
            Try again
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search description or notes..."
            className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="md:col-span-3 relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="w-full appearance-none rounded-lg border border-gray-300 pl-9 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All categories" : c}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="md:col-span-1 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setCategory("all");
              setStartDate("");
              setEndDate("");
              setSortBy("deletedAt");
              setSortDir("desc");
              setPage(1);
            }}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-700 hover:bg-gray-50"
            title="Reset filters"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={refresh}
            className="rounded-lg bg-blue-600 px-3 py-2.5 text-white hover:bg-blue-700"
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
          <div className="text-sm text-blue-900">
            {selected.size} selected
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => restoreExpenses(Array.from(selected))}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              <RotateCcw className="h-4 w-4" />
              Restore
            </button>
            <button
              type="button"
              onClick={() => deleteForever(Array.from(selected))}
              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete forever
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={allVisibleSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = !allVisibleSelected && someVisibleSelected;
                    }}
                    onChange={(e) => applySelectAllVisible(e.target.checked)}
                  />
                </th>
                <Th label="Date" sortKey="date" sortBy={sortBy} sortDir={sortDir} onSort={onHeaderSort} />
                <Th label="Category" sortKey="category" sortBy={sortBy} sortDir={sortDir} onSort={onHeaderSort} />
                <Th label="Description" sortKey="description" sortBy={sortBy} sortDir={sortDir} onSort={onHeaderSort} />
                <Th label="Amount" sortKey="amount" sortBy={sortBy} sortDir={sortDir} onSort={onHeaderSort} align="right" />
                <Th label="Deleted on" sortKey="deletedAt" sortBy={sortBy} sortDir={sortDir} onSort={onHeaderSort} />
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading &&
                Array.from({ length: Math.min(5, pageSize) }).map((_, idx) => (
                  <tr key={`skeleton-${idx}`} className="animate-pulse">
                    <td className="px-4 py-4">
                      <div className="h-4 w-4 rounded bg-gray-200" />
                    </td>
                    <td className="px-4 py-4"><div className="h-4 w-24 rounded bg-gray-200" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-20 rounded bg-gray-200" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-48 rounded bg-gray-200" /></td>
                    <td className="px-4 py-4 text-right"><div className="ml-auto h-4 w-16 rounded bg-gray-200" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-28 rounded bg-gray-200" /></td>
                    <td className="px-4 py-4 text-right">
                      <div className="ml-auto h-8 w-28 rounded bg-gray-200" />
                    </td>
                  </tr>
                ))}

              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8">
                    <EmptyState />
                  </td>
                </tr>
              )}

              {!loading &&
                items.map((item) => {
                  const id = item?.id || item?._id || item?.ID || item?.Id;
                  const checked = id ? selected.has(id) : false;
                  return (
                    <tr key={id || Math.random()}>
                      <td className="px-4 py-3">
                        {id ? (
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={checked}
                            onChange={() => toggleOne(id)}
                          />
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(item?.date)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item?.category || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="max-w-[42ch] truncate" title={item?.description || ""}>
                          {item?.description || "-"}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatCurrency(item?.amount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {formatDateTime(item?.deletedAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            type="button"
                            onClick={() => (id ? restoreExpenses([id]) : null)}
                            className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-100"
                            title="Restore"
                          >
                            <RotateCcw className="h-4 w-4" />
                            Restore
                          </button>
                          <button
                            type="button"
                            onClick={() => (id ? deleteForever([id]) : null)}
                            className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
                            title="Delete forever"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-4 py-3">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">
              {items.length > 0 ? (page - 1) * pageSize + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {(page - 1) * pageSize + items.length}
            </span>{" "}
            of <span className="font-medium">{total}</span> results
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <label htmlFor="pageSize" className="text-sm text-gray-600">
                Rows:
              </label>
              <select
                id="pageSize"
                className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[10, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`inline-flex items-center rounded-md border px-2 py-1.5 text-sm ${
                  page <= 1 || loading
                    ? "border-gray-200 text-gray-300"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                title="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-700">
                Page <span className="font-medium">{page}</span> of{" "}
                <span className="font-medium">{pages}</span>
              </span>
              <button
                type="button"
                disabled={page >= pages || loading}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                className={`inline-flex items-center rounded-md border px-2 py-1.5 text-sm ${
                  page >= pages || loading
                    ? "border-gray-200 text-gray-300"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                title="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-center" closeOnClick newestOnTop limit={1} />
    </div>
  );
}

function Th({ label, sortKey, sortBy, sortDir, onSort, align = "left" }) {
  const active = sortBy === sortKey;
  return (
    <th
      scope="col"
      className={`px-4 py-3 text-${align} text-xs font-semibold uppercase tracking-wider text-gray-600 select-none`}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`inline-flex items-center gap-1 ${
          active ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {label}
        <span
          className={`transition-transform ${active ? "opacity-100" : "opacity-0"} ${
            active && sortDir === "desc" ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ▲
        </span>
      </button>
    </th>
  );
}