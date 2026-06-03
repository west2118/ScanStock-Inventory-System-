import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InventoryBranchChart = ({
  branchInventory,
}: {
  branchInventory: any;
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={branchInventory}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" height={40} stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          formatter={(value: number) => `${value.toLocaleString()} units`}
        />
        <Legend />
        <Bar
          dataKey="totalStocks"
          fill="#3b82f6"
          name="Total Stocks"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="lowStock"
          fill="#ef4444"
          name="Low Stock Items"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InventoryBranchChart;
