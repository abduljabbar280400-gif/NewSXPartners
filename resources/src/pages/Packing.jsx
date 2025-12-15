import { useEffect, useState } from "react";
import axios from "axios";
import CenteredModal from "../components/CenteredModal";

export default function Patients() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const API = "http://localhost:5001/patients";

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await axios.get(API);
    setList(res.data);
  }

  async function add() {
    if (!name) return;
    await axios.post(API, { name });
    setName("");
    load();
  }

  return (
    <>
      <CenteredModal title="Patient Intake">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              placeholder="Patient name"
            />
            <button
              onClick={add}
              className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {list.map((i) => (
              <li
                key={i.id}
                className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 text-sm"
              >
                {i.name}
              </li>
            ))}
          </ul>
        </div>
      </CenteredModal>

      {/* empty container so route exists but dashboard visually stays behind */}
      <div className="min-h-full" />
    </>
  );
}
