import React from "react";
import Logo from "../assets/1600w-enoKffV7vWg.jpg";

export default function TopNav({ onMenuClick }) {
  return (
    <header className="flex items-center ml-10 mr-10 mt-5 p-4 bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200 rounded-2xl">
      <button
        className="md:hidden p-2 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-700"
        onClick={onMenuClick}
        aria-label="Toggle Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Logo + title */}
      <div className="flex items-center gap-3">
        {/* Colorful HSL Labs logo */}
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient from-teal-500 via-cyan-500 to-sky-500 ">
          <span className="text-xs font-bold tracking-wide text-white">
            <img src={Logo} alt="" />
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">
            HSL Labs Command Center
          </h1>
          <span className="text-xs text-slate-500">
            Healthcare Diagnostics &amp; Lab Operations
          </span>
        </div>
      </div>
    </header>
  );
}
