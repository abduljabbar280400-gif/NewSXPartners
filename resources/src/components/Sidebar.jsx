import React from "react";

export function Sidebar({ isOpen, onClose, onOpenModal }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 rounded-2xl m-5 left-0 bg-white shadow-lg p-4 pt-20 w-64 transform transition-transform duration-300 z-100 border-none 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:static md:translate-x-0 md:flex md:shrink-0`}
      >
        <nav className="flex flex-col gap-5 text-sm">
          {/* Dashboard (no modal, just background) */}
          <button
            type="button"
            onClick={onClose}
            className="text-left sidebar-link px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-teal-500/10 text-teal-600">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-18v6h8V3h-8z"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Dashboard</span>
          </button>

          {/* Patient Intake */}
          <button
            type="button"
            onClick={() => {
              onOpenModal("patients");
              onClose();
            }}
            className="text-left sidebar-link px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-500/10 text-emerald-600">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="3"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Patient Intake</span>
          </button>

          {/* Disclosures */}
          <button
            type="button"
            onClick={() => {
              onOpenModal("disclosures");
              onClose();
            }}
            className="text-left sidebar-link px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-sky-500/10 text-sky-600">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3h7l4 4v14H7V3z"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Disclosures</span>
          </button>

          {/* Inventory */}
          <button
            type="button"
            onClick={() => {
              onOpenModal("inventory");
              onClose();
            }}
            className="text-left sidebar-link px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-indigo-500/10 text-indigo-600">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="7"
                  y="3"
                  width="10"
                  height="5"
                  rx="1"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Inventory</span>
          </button>

          {/* Packaging */}
          <button
            type="button"
            onClick={() => {
              onOpenModal("packaging");
              onClose();
            }}
            className="text-left sidebar-link px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-amber-500/10 text-amber-600">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 7l8-4 8 4-8 4-8-4zm0 4l8 4 8-4m-8 4v8"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Packaging</span>
          </button>

          {/* Billing */}
          <button
            type="button"
            onClick={() => {
              onOpenModal("billing");
              onClose();
            }}
            className="text-left sidebar-link px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-rose-500/10 text-rose-600">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 6h8M8 10h6M8 6h6a4 4 0 0 1 0 8H9l6 6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Billing</span>
          </button>

          {/* Training */}
          <button
            type="button"
            onClick={() => {
              onOpenModal("training");
              onClose();
            }}
            className="text-left sidebar-link px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-purple-500/10 text-purple-600">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7l9-4 9 4-9 4-9-4z"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Training</span>
          </button>

          {/* Operations */}
          <button
            type="button"
            onClick={() => {
              onOpenModal("operations");
              onClose();
            }}
            className="text-left sidebar-link px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-slate-700 hover:bg-slate-100"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-500/10 text-slate-700">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5h4m-4 6h4m-4 6h4M11 5h8M11 11h8M11 17h8"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Operations</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
