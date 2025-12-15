import React, { useState } from "react";
import DashboardFilters from "./DashboardFilters";

export default function QuickActionsMobile() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <>
      <button
        type="button"
        className="fixed right-4 bottom-4 z-[110px] inline-flex items-center justify-center w-11 h-11 rounded-full bg-teal-600 text-white shadow-lg shadow-teal-500/40 hover:bg-teal-700 active:scale-95 transition sm:hidden"
        onClick={toggle}
        aria-label={open ? "Close filters" : "Open filters"}
      >
        {open ? (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M6 6l12 12M6 18L18 6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M12 5v14M5 12h14"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <button
          className="fixed inset-0 z-[100px] bg-slate-900/20 sm:hidden"
          onClick={toggle}
          aria-hidden="true"
        />
      )}

      <div
        className={`md:hidden fixed left-0 w-full z-[101px] px-2 pb-2 transition-all duration-200 ease-out ${
          open
            ? "bottom-0 opacity-100"
            : "-bottom-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="shadow-[0_-8px_16px_rgba(15,23,42,0.15)] mb-4 bg-white/95 border-t border-slate-200 rounded-t-2xl">
          <DashboardFilters />
        </div>
      </div>
    </>
  );
}
