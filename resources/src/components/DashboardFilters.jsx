import React from "react";
import { useFilters } from "../context/FilterContext";

export default function DashboardFilters() {
  const { search, setSearch, module, setModule, status, setStatus } =
    useFilters();

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 bg-white border border-slate-200 rounded-2xl px-3 py-4 mx-5">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search patients, inventory, billing..."
        className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
      />
      <div className="flex gap-2">
        <select
          value={module}
          onChange={(e) => setModule(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
        >
          <option value="all">All Modules</option>
          <option value="patients">Patients</option>
          <option value="inventory">Inventory</option>
          <option value="billing">Billing</option>
          <option value="training">Training</option>
          <option value="disclosures">Disclosures</option>
          <option value="packaging">Packaging</option>
          <option value="operations">Operations</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="paid">Paid</option>
        </select>
      </div>
    </div>
  );
}
