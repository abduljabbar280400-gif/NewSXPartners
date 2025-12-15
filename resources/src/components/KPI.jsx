import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  { color: "#f59e0b", name: "Orange" },
  { color: "#10b981", name: "Green" },
  { color: "#3b82f6", name: "Blue" },
  { color: "#ef4444", name: "Red" },
];

export default function KPI({ title, data }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-65">
      <h3 className="text-sm font-semibold text-slate-700 mb-2">{title}</h3>

      {/* Pie Chart */}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={35}
              outerRadius={55}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length].color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-1 text-xs text-slate-600">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{
                backgroundColor: COLORS[index % COLORS.length].color,
              }}
            />
            <span>
              {item.name}:{" "}
              <strong className="text-slate-800">{item.value}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
