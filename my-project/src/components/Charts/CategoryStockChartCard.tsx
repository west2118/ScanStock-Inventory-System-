import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { capitalizeFirst } from "../../utils/utils";
import { COLORS } from "../../utils/constants";

type CategoryStockChartCardProps = {
  data: {
    name: string;
    value1: number;
    value2?: number;
  }[];
};

const CategoryStockChartCard = ({ data }: CategoryStockChartCardProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value1"
          label={({ name = "", percent = 0 }) => {
            return `${
              name.length > 3 ? capitalizeFirst(name) : name.toUpperCase()
            } ${(percent * 100).toFixed(0)}%`;
          }}
          labelLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value: string) =>
            value.length > 3 ? capitalizeFirst(value) : value.toUpperCase()
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryStockChartCard;
