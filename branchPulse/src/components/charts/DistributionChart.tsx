import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { COLORS } from "../../lib/constants";

const DistributionChart = ({
  stockDistribution,
}: {
  stockDistribution: {
    name: string;
    value: number;
    value2?: number;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={stockDistribution}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent = 0 }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {stockDistribution.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DistributionChart;
