import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import TopNav from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";

import DashboardWrapper from "./pages/DashboardWrapper";
import Patients from "./pages/Patients";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";
import Training from "./pages/Training";
import Disclosures from "./pages/Discloures";
import Packing from "./pages/Packing";
import Operation from "./pages/Operations";

import QuickActionsMobile from "./components/QuickActionsBar";
import { FilterProvider } from "./context/FilterContext";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <FilterProvider>
      <div className="flex h-screen w-full overflow-hidden ">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpenModal={setActiveModal}
        />
        <div className="flex-1 flex flex-col">
          <TopNav onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="p-4 overflow-y-auto relative">
            <DashboardWrapper
              activeModal={activeModal}
              setActiveModal={setActiveModal}
            />

            {/* keep routes if you want direct navigation */}
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<div />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/training" element={<Training />} />
              <Route path="/disclosures" element={<Disclosures />} />
              <Route path="/packaging" element={<Packing />} />
              <Route path="/operations" element={<Operation />} />
            </Routes>
          </main>
        </div>
        <QuickActionsMobile />
      </div>
    </FilterProvider>
  );
}
