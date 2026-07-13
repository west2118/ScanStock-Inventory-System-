import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

type SalesTrendsChartCardProps = {
  data: {
    date: string;
    label: string;
    value1: number;
    value2?: number;
  }[];
};

const SalesTrendsChartCard = ({ data }: SalesTrendsChartCardProps) => {
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
          dataKey="value1"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.3}
          name="Sales (₱)"
          dot={{ r: 2.5, fill: "#3b82f6" }}
        />
        <Area
          type="monotone"
          dataKey="value2"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.3}
          name="Count"
          dot={{ r: 2.5, fill: "#10b981" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesTrendsChartCard;
