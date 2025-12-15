import { useEffect, useState } from "react";
import axios from "axios";
import CenteredModal from "../components/CenteredModal";

export default function Training() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const API = "http://localhost:5001/training";

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await axios.get(API);
    setList(res.data);
  }

  async function add() {
    if (!title) return;
    await axios.post(API, { title });
    setTitle("");
    load();
  }

  return (
    <>
      <CenteredModal title="Training">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Training title"
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
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
                {i.title}
              </li>
            ))}
          </ul>
        </div>
      </CenteredModal>

      <div className="min-h-full" />
    </>
  );
}
