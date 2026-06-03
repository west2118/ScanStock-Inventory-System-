import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../../lib/constants";

const ProductivityTrendChart = ({
  productivityTrends,
}: {
  productivityTrends: {
    name: string;
    branches: {
      branch: string;
      productivity: number;
    }[];
  }[];
}) => {
  const chartData = productivityTrends.map((month) => {
    const row: Record<string, string | number> = {
      name: month.name,
    };

    month.branches.forEach((branch) => {
      row[branch.branch] = branch.productivity;
    });

    return row;
  });

  const branchNames = [
    ...new Set(
      productivityTrends.flatMap((month) =>
        month.branches.map((branch) => branch.branch),
      ),
    ),
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis domain={[50, 100]} stroke="#94a3b8" />
        <Tooltip formatter={(value) => [`${value}%`, "Productivity"]} />
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
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProductivityTrendChart;
