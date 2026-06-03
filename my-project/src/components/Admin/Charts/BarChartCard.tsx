import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type BarChartCardProps = {
  data: {
    date: string;
    label: string;
    value1: number;
    value2: number;
  }[];
};

const BarChartCard = ({ data }: BarChartCardProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#6b7280" />
        <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="value1"
          fill="#3b82f6"
          name="Stock In"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="value2"
          fill="#ef4444"
          name="Stock Out"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartCard;
