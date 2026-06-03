import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const StockMovementChart = ({
  stockMovements,
}: {
  stockMovements: {
    month: string;
    stockIn: number;
    stockOut: number;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={stockMovements}>
        <defs>
          <linearGradient id="receivedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="soldGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          formatter={(value: number) => `${value.toLocaleString()} units`}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="stockIn"
          stroke="#10b981"
          fill="url(#receivedGradient)"
          name="Stock In"
        />
        <Area
          type="monotone"
          dataKey="stockOut"
          stroke="#ef4444"
          fill="url(#soldGradient)"
          name="Stock Out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StockMovementChart;
