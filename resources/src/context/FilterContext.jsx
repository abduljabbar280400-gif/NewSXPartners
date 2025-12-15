import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("all");
  const [status, setStatus] = useState("all");

  const value = { search, setSearch, module, setModule, status, setStatus };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilters must be used inside FilterProvider");
  }
  return ctx;
}
