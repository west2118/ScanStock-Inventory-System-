import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { truncateWords } from "../../../utils/utils";

type HorizontalBarChartCardProps = {
  data: {
    name: string;
    value: number;
  }[];
};

const HorizontalBarChartCard = ({ data }: HorizontalBarChartCardProps) => {
  const chartData = data.map(item => ({
    ...item,
    name: truncateWords(item.name, 3)
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        layout="vertical" // ✅ makes it horizontal
        margin={{ top: 10, right: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

        {/* ✅ X = values */}
        <XAxis type="number" tick={{ fontSize: 12 }} stroke="#6b7280" />

        {/* ✅ Y = product names */}
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 12 }}
          stroke="#6b7280"
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />

        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[0, 6, 6, 0]} // rounded right side
          name="Units Sold"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChartCard;
