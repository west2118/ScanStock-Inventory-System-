import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { ChartData } from "../../lib/types";

const SharedBarChart = ({ data }: { data: ChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={80}
          stroke="#94a3b8"
        />
        <YAxis domain={[0, 100]} stroke="#94a3b8" />
        <Tooltip formatter={(value) => [`${value}%`, "Productivity"]} />
        <Bar
          dataKey="value"
          fill="#3b82f6"
          name="Avg Productivity (%)"
          radius={[4, 4, 0, 0]}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill="#10b981" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SharedBarChart;
