import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFilteredData } from "../hooks/useFilteredData";
import CenteredModal from "../components/CenteredModal";
import KPI from "../components/KPI";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard({ activeModal, setActiveModal }) {
  const [data, setData] = useState({
    patients: [],
    inventory: [],
    billing: [],
    training: [],
  });

  // 🔹 NEW (controls which KPI drives the overview chart)
  const [activeOverview, setActiveOverview] = useState("patients");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const [p, i, b, t] = await Promise.all([
      axios.get("http://localhost:5001/patients"),
      axios.get("http://localhost:5001/inventory"),
      axios.get("http://localhost:5001/billing"),
      axios.get("http://localhost:5001/training"),
      axios.get("http://localhost:5001/disclosures"),
      axios.get("http://localhost:5001/packaging"),
      axios.get("http://localhost:5001/operations"),
    ]);

    setData({
      patients: p.data,
      inventory: i.data,
      billing: b.data,
      training: t.data,
    });
  }

  async function markDone(module, field = "status") {
    const item = data[module].find(
      (x) => x.status !== "completed" && x.status !== "paid"
    );
    if (!item) return;

    await axios.patch(`http://localhost:5001/${module}/${item.id}`, {
      [field]: field === "status" ? "completed" : true,
    });

    load();
  }

  async function approve(module) {
    const item = data[module].find((x) => x.status === "pending");
    if (!item) return;

    await axios.patch(`http://localhost:5001/${module}/${item.id}`, {
      status: "approved",
    });

    load();
  }

  const filtered = useFilteredData(data);

  /* ---------- ANALYTICS ---------- */

  const patientStats = {
    pending: filtered.patients.filter((p) => p.status === "pending").length,
    approved: filtered.patients.filter((p) => p.status === "approved").length,
    completed: filtered.patients.filter((p) => p.status === "completed").length,
  };

  const lowStockItems = filtered.inventory.filter((i) => i.stock < 10);

  const billingSummary = {
    pending: filtered.billing.filter((b) => b.status === "pending").length,
    paid: filtered.billing.filter((b) => b.status === "paid").length,
  };

  const trainingProgress = {
    completed: filtered.training.filter((t) => t.completed).length,
    total: filtered.training.length,
  };

  // 🔹 DATA SOURCE FOR OVERVIEW LINE CHART
  const overviewDataMap = {
    patients: [
      { name: "Pending", value: patientStats.pending },
      { name: "Approved", value: patientStats.approved },
      { name: "Completed", value: patientStats.completed },
    ],
    inventory: [
      { name: "Low Stock", value: lowStockItems.length },
      {
        name: "OK",
        value: filtered.inventory.length - lowStockItems.length,
      },
    ],
    billing: [
      { name: "Pending", value: billingSummary.pending },
      { name: "Paid", value: billingSummary.paid },
    ],
    training: [
      { name: "Completed", value: trainingProgress.completed },
      {
        name: "Remaining",
        value: trainingProgress.total - trainingProgress.completed,
      },
    ],
  };

  const actionItems = [
    {
      label: "Patient Intake",
      module: "patients",
      pending: filtered.patients.filter((p) => p.status !== "completed").length,
    },
    {
      label: "Inventory",
      module: "inventory",
      pending: filtered.inventory.filter((i) => i.stock < 10).length,
    },
    {
      label: "Billing",
      module: "billing",
      pending: filtered.billing.filter((b) => b.status !== "paid").length,
    },
    {
      label: "Training",
      module: "training",
      pending: filtered.training.filter((t) => !t.completed).length,
    },
  ];

  // API base URLs used inside modals
  const API_PATIENTS = "http://localhost:5001/patients";
  const API_INVENTORY = "http://localhost:5001/inventory";
  const API_BILLING = "http://localhost:5001/billing";
  const API_DISCLOSURES = "http://localhost:5001/disclosures";
  const API_PACKAGING = "http://localhost:5001/packaging";
  const API_TRAINING = "http://localhost:5001/training";
  const API_OPERATIONS = "http://localhost:5001/operations";

  // Local modal form state
  const [patientName, setPatientName] = useState("");
  const [inventoryItem, setInventoryItem] = useState("");
  const [amount, setAmount] = useState("");
  const [disclosureText, setDisclosureText] = useState("");
  const [packageType, setPackageType] = useState("");
  const [trainingTitle, setTrainingTitle] = useState("");
  const [operationTask, setOperationTask] = useState("");

  // Lists for modals
  const [patientsList, setPatientsList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [billingList, setBillingList] = useState([]);
  const [disclosuresList, setDisclosuresList] = useState([]);
  const [packagingList, setPackagingList] = useState([]);
  const [trainingList, setTrainingList] = useState([]);
  const [operationsList, setOperationsList] = useState([]);

  // Load data when a specific modal opens
  useEffect(() => {
    async function loadPatients() {
      const res = await axios.get(API_PATIENTS);
      setPatientsList(res.data);
    }
    async function loadInventory() {
      const res = await axios.get(API_INVENTORY);
      setInventoryList(res.data);
    }
    async function loadBilling() {
      const res = await axios.get(API_BILLING);
      setBillingList(res.data);
    }
    async function loadDisclosures() {
      const res = await axios.get(API_DISCLOSURES);
      setDisclosuresList(res.data);
    }
    async function loadPackaging() {
      const res = await axios.get(API_PACKAGING);
      setPackagingList(res.data);
    }
    async function loadTraining() {
      const res = await axios.get(API_TRAINING);
      setTrainingList(res.data);
    }
    async function loadOperations() {
      const res = await axios.get(API_OPERATIONS);
      setOperationsList(res.data);
    }

    if (activeModal === "patients") loadPatients();
    if (activeModal === "inventory") loadInventory();
    if (activeModal === "billing") loadBilling();
    if (activeModal === "disclosures") loadDisclosures();
    if (activeModal === "packaging") loadPackaging();
    if (activeModal === "training") loadTraining();
    if (activeModal === "operations") loadOperations();
  }, [activeModal]);

  // Add handlers for modal forms
  async function addPatient() {
    if (!patientName) return;
    await axios.post(API_PATIENTS, { name: patientName });
    setPatientName("");
    const res = await axios.get(API_PATIENTS);
    setPatientsList(res.data);
    load();
  }

  async function addInventory() {
    if (!inventoryItem.trim()) return;
    await axios.post(API_INVENTORY, { item: inventoryItem });
    setInventoryItem("");
    const res = await axios.get(API_INVENTORY);
    setInventoryList(res.data);
    load();
  }

  async function addBilling() {
    if (!amount) return;
    await axios.post(API_BILLING, { amount });
    setAmount("");
    const res = await axios.get(API_BILLING);
    setBillingList(res.data);
    load();
  }

  async function addDisclosure() {
    if (!disclosureText.trim()) return;
    await axios.post(API_DISCLOSURES, { text: disclosureText });
    setDisclosureText("");
    const res = await axios.get(API_DISCLOSURES);
    setDisclosuresList(res.data);
  }

  async function addPackage() {
    if (!packageType.trim()) return;
    await axios.post(API_PACKAGING, { type: packageType });
    setPackageType("");
    const res = await axios.get(API_PACKAGING);
    setPackagingList(res.data);
  }

  async function addTraining() {
    if (!trainingTitle) return;
    await axios.post(API_TRAINING, { title: trainingTitle });
    setTrainingTitle("");
    const res = await axios.get(API_TRAINING);
    setTrainingList(res.data);
    load();
  }

  async function addOperation() {
    if (!operationTask.trim()) return;
    await axios.post(API_OPERATIONS, { task: operationTask });
    setOperationTask("");
    const res = await axios.get(API_OPERATIONS);
    setOperationsList(res.data);
  }

  /* ---------- UI ---------- */

  return (
    <div className="p-4 md:p-6 space-y-8 min-h-full rounded-xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Command Center
        </h1>
        <p className="text-sm text-slate-500">
          High-level overview of HSL Labs operations
        </p>
      </div>

      {/* ================= KPI LINE-DRIVEN CARDS ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div onClick={() => setActiveOverview("patients")}>
          <KPI
            title="Patients"
            data={[
              { name: "Pending", value: patientStats.pending },
              { name: "Approved", value: patientStats.approved },
              { name: "Completed", value: patientStats.completed },
            ]}
          />
        </div>

        <div onClick={() => setActiveOverview("inventory")}>
          <KPI
            title="Inventory"
            data={[
              { name: "Low Stock", value: lowStockItems.length },
              {
                name: "OK",
                value: filtered.inventory.length - lowStockItems.length,
              },
            ]}
          />
        </div>

        <div onClick={() => setActiveOverview("billing")}>
          <KPI
            title="Billing"
            data={[
              { name: "Pending", value: billingSummary.pending },
              { name: "Paid", value: billingSummary.paid },
            ]}
          />
        </div>

        <div onClick={() => setActiveOverview("training")}>
          <KPI
            title="Training"
            data={[
              { name: "Completed", value: trainingProgress.completed },
              {
                name: "Remaining",
                value: trainingProgress.total - trainingProgress.completed,
              },
            ]}
          />
        </div>
      </div>

      {/* ================= OVERVIEW LINE CHART ================= */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4 text-slate-800 capitalize">
          {activeOverview} Overview
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overviewDataMap[activeOverview]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ACTION TRACKER */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 ">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">
          Action Tracker
        </h2>

        <div className="overflow-x-auto ">
          <table className="w-full text-sm ">
            <thead className="bg-slate-100 ">
              <tr className="text-slate-600">
                <th className="p-3 text-left font-medium">Module</th>
                <th className="p-3 text-left font-medium">Pending</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {actionItems.map((item) => (
                <tr key={item.label} className="border-t border-slate-100">
                  <td className="p-3 text-slate-800">{item.label}</td>
                  <td className="p-3 font-semibold text-slate-800">
                    {item.pending}
                  </td>
                  <td className="p-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => approve(item.module)}
                      className="px-3 py-1 text-xs rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => markDone(item.module)}
                      className="px-3 py-1 text-xs rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      Mark Done
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeModal === "patients" && (
        <CenteredModal
          title="Patient Intake"
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient name"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              />
              <button
                onClick={addPatient}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {patientsList.map((i) => (
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
      )}

      {activeModal === "inventory" && (
        <CenteredModal title="Inventory" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                value={inventoryItem}
                onChange={(e) => setInventoryItem(e.target.value)}
                placeholder="Item name"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              />
              <button
                onClick={addInventory}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {inventoryList.map((i) => (
                <li
                  key={i.id}
                  className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 text-sm"
                >
                  {i.item}
                </li>
              ))}
            </ul>
          </div>
        </CenteredModal>
      )}

      {activeModal === "billing" && (
        <CenteredModal title="Billing" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              />
              <button
                onClick={addBilling}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {billingList.map((i) => (
                <li
                  key={i.id}
                  className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 text-sm"
                >
                  ₹ {i.amount}
                </li>
              ))}
            </ul>
          </div>
        </CenteredModal>
      )}

      {activeModal === "disclosures" && (
        <CenteredModal title="Disclosures" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                value={disclosureText}
                onChange={(e) => setDisclosureText(e.target.value)}
                placeholder="Disclosure text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              />
              <button
                onClick={addDisclosure}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {disclosuresList.map((i) => (
                <li
                  key={i.id}
                  className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 text-sm"
                >
                  {i.text}
                </li>
              ))}
            </ul>
          </div>
        </CenteredModal>
      )}

      {activeModal === "packaging" && (
        <CenteredModal title="Packaging" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                placeholder="Package type"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              />
              <button
                onClick={addPackage}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {packagingList.map((i) => (
                <li
                  key={i.id}
                  className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 text-sm"
                >
                  {i.type}
                </li>
              ))}
            </ul>
          </div>
        </CenteredModal>
      )}

      {activeModal === "training" && (
        <CenteredModal title="Training" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                value={trainingTitle}
                onChange={(e) => setTrainingTitle(e.target.value)}
                placeholder="Training title"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              />
              <button
                onClick={addTraining}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {trainingList.map((i) => (
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
      )}

      {activeModal === "operations" && (
        <CenteredModal
          title="Day-to-Day Operations"
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                value={operationTask}
                onChange={(e) => setOperationTask(e.target.value)}
                placeholder="Operation task"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              />
              <button
                onClick={addOperation}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {operationsList.map((i) => (
                <li
                  key={i.id}
                  className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 text-sm"
                >
                  {i.task}
                </li>
              ))}
            </ul>
          </div>
        </CenteredModal>
      )}
    </div>
  );
}
