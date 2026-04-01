import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

type AreaChartCardProps = {
  data: {
    date: string;
    label: string;
    value: number;
  }[];
};

const AreaChartCard = ({ data }: AreaChartCardProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#6b7280" />
        <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.3}
          name="Net Change"
          dot={{ r: 2.5, fill: "#10b981" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartCard;
