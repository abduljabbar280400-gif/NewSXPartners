import { useFilters } from "../context/FilterContext";

export function useFilteredData(data) {
  const { search, module, status } = useFilters();

  const filterArray = (arr = []) =>
    arr.filter((item) => {
      const textMatch = JSON.stringify(item)
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        status === "all" ||
        item.status === status ||
        item.completed === (status === "completed");

      return textMatch && statusMatch;
    });

  return {
    patients: module === "all" || module === "patients" ? filterArray(data.patients) : [],
    inventory: module === "all" || module === "inventory" ? filterArray(data.inventory) : [],
    billing: module === "all" || module === "billing" ? filterArray(data.billing) : [],
    training: module === "all" || module === "training" ? filterArray(data.training) : [],
  };
}
