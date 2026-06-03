import {
  PieChart as RePieChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const seasonalData = [
  { month: "Jan", demand: 82, supply: 85, price: 95 },
  { month: "Feb", demand: 85, supply: 88, price: 94 },
  { month: "Mar", demand: 88, supply: 90, price: 93 },
  { month: "Apr", demand: 90, supply: 92, price: 94 },
  { month: "May", demand: 92, supply: 93, price: 95 },
  { month: "Jun", demand: 93, supply: 94, price: 96 },
  { month: "Jul", demand: 95, supply: 94, price: 97 },
  { month: "Aug", demand: 94, supply: 95, price: 96 },
  { month: "Sep", demand: 92, supply: 94, price: 95 },
  { month: "Oct", demand: 91, supply: 93, price: 94 },
  { month: "Nov", demand: 94, supply: 92, price: 96 },
  { month: "Dec", demand: 98, supply: 90, price: 98 },
];

const DualAreaChartCard = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={seasonalData}
        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
        <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" domain={[70, 100]} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />
        <Area
          type="monotone"
          dataKey="demand"
          stackId="1"
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.3}
          name="Demand"
        />
        <Area
          type="monotone"
          dataKey="supply"
          stackId="1"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.3}
          name="Supply"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DualAreaChartCard;
