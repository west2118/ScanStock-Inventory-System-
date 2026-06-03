import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "../badges/CustomTooltip";
import { COLORS } from "../../lib/constants";

const SalesComparisonChart = ({
  salesComparisonMonthly,
}: {
  salesComparisonMonthly: {
    name: string;
    branches: {
      branch: string;
      sales: number;
    }[];
  }[];
}) => {
  const chartData = salesComparisonMonthly.map((month) => {
    const row: Record<string, string | number> = {
      name: month.name,
    };

    month.branches.forEach((branch) => {
      row[branch.branch] = branch.sales;
    });

    return row;
  });

  const branchNames = [
    ...new Set(
      salesComparisonMonthly.flatMap((month) =>
        month.branches.map((branch) => branch.branch),
      ),
    ),
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis
          tickFormatter={(value) => `₱${value / 1000}k`}
          stroke="#94a3b8"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {branchNames.map((branch, index) => (
          <Line
            key={branch}
            type="monotone"
            dataKey={branch}
            name={branch}
            stroke={COLORS[index % COLORS.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default SalesComparisonChart;
