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

type OrderStatusChartCardProps = {
  data: {
    date: string;
    label: string;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
  }[];
};

const OrderStatusChartCard = ({ data }: OrderStatusChartCardProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#6b7280" />
        <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="pending"
          stackId="a"
          fill="#eab308"
          name="Pending"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="processing"
          stackId="a"
          fill="#3b82f6"
          name="Processing"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="shipped"
          stackId="a"
          fill="#a855f7"
          name="Shipped"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="delivered"
          stackId="a"
          fill="#22c55e"
          name="Delivered"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrderStatusChartCard;
