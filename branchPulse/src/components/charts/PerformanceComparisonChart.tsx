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
import { pesoFormatter } from "../../lib/utils";
import { COLORS } from "../../lib/constants";
import CustomTooltip from "../badges/CustomTooltip";

const PerformanceComparisonChart = ({
  branchPerformance,
}: {
  branchPerformance: ChartData[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={branchPerformance} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          type="number"
          tickFormatter={(value) => `₱${value / 1000}k`}
          stroke="#94a3b8"
        />
        <YAxis type="category" dataKey="name" stroke="#94a3b8" width={80} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]}>
          {branchPerformance.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceComparisonChart;
