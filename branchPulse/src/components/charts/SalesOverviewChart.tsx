import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlySalesData } from "../../lib/types";
import { pesoFormatter } from "../../lib/utils";

const SalesOverviewChart = ({
  monthlySalesOverview,
}: {
  monthlySalesOverview: MonthlySalesData[];
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
          formatter={(value, name) => [
            `${pesoFormatter.format(Number(value))}`,
            name === "storeRevenue" ? "Store Revenue" : "Delivery Revenue",
          ]}
        />
        <Area
          type="monotone"
          dataKey="storeRevenue"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.2}
          name="storeRevenue"
        />
        <Area
          type="monotone"
          dataKey="deliveryRevenue"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.2}
          name="deliveryRevenue"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesOverviewChart;
