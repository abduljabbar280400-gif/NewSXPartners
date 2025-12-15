import Dashboard from "./Dashboard";
import DashboardFilters from "../components/DashboardFilters";
import { FilterProvider } from "../context/FilterContext";

// Import your data
import {
  patients,
  inventory,
  billing,
  operations,
  training,
} from "../../db.json"; // or wherever your data is

export default function DashboardWrapper({ activeModal, setActiveModal }) {
  return (
    <FilterProvider>
      <div className="space-y-4 ">
        <div className="hidden md:block sticky top-2 z-30 pt-3 pb-3">
          <DashboardFilters />
        </div>
        <div className="mt-4">
          <Dashboard
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            patients={patients}
            inventory={inventory}
            billing={billing}
            operations={operations}
            training={training}
          />
        </div>
      </div>
    </FilterProvider>
  );
}
