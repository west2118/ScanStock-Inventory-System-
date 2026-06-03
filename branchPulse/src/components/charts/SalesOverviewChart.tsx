import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartData } from "../../lib/types";
import { pesoFormatter } from "../../lib/utils";

const SalesOverviewChart = ({
  monthlySalesOverview,
}: {
  monthlySalesOverview: ChartData[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={monthlySalesOverview}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis
          stroke="#94a3b8"
          tickFormatter={(value) => `₱${value / 1000}k`}
        />
        <Tooltip
          formatter={(value) => [
            `${pesoFormatter.format(Number(value))}`,
            "Sales",
          ]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.2}
          name="Actual Sales"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesOverviewChart;
