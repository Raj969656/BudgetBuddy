import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto animate-pulse">
      <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-56 bg-gray-200 rounded mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="h-9 w-9 bg-gray-200 rounded-lg" />
            <div className="mt-3 h-5 w-28 bg-gray-200 rounded" />
            <div className="mt-2 h-4 w-40 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="col-span-1 lg:col-span-2 rounded-xl border border-gray-200 bg-white p-4 h-48" />
        <div className="rounded-xl border border-gray-200 bg-white p-4 h-48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 h-64 lg:col-span-2" />
        <div className="rounded-xl border border-gray-200 bg-white p-4 h-64" />
      </div>
    </div>
  );
}
