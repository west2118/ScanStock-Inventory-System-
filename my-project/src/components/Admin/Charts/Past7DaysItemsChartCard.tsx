import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Past7DaysItemsChartCardProps = {
  data: {
    date: string;
    label: string;
    pending: number; // Used as the generic 'value' to match orderStatusDistributionCTE output schema from backend
  }[];
};

const Past7DaysItemsChartCard = ({ data }: Past7DaysItemsChartCardProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
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
        <Bar
          dataKey="pending"
          fill="#8b5cf6"
          name="Items Sold"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Past7DaysItemsChartCard;
