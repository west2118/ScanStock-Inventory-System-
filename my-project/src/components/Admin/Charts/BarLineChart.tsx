import {
  Line,
  Bar,
  PieChart as RePieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

const monthlyData = [
  {
    month: "Jan",
    stockIn: 1250,
    stockOut: 980,
    revenue: 24500,
    profit: 7350,
    returns: 12,
  },
  {
    month: "Feb",
    stockIn: 1340,
    stockOut: 1020,
    revenue: 25500,
    profit: 7650,
    returns: 8,
  },
  {
    month: "Mar",
    stockIn: 1420,
    stockOut: 1150,
    revenue: 28750,
    profit: 8625,
    returns: 15,
  },
  {
    month: "Apr",
    stockIn: 1510,
    stockOut: 1230,
    revenue: 30750,
    profit: 9225,
    returns: 10,
  },
  {
    month: "May",
    stockIn: 1680,
    stockOut: 1450,
    revenue: 36250,
    profit: 10875,
    returns: 18,
  },
  {
    month: "Jun",
    stockIn: 1720,
    stockOut: 1520,
    revenue: 38000,
    profit: 11400,
    returns: 14,
  },
  {
    month: "Jul",
    stockIn: 1850,
    stockOut: 1680,
    revenue: 42000,
    profit: 12600,
    returns: 22,
  },
  {
    month: "Aug",
    stockIn: 1920,
    stockOut: 1750,
    revenue: 43750,
    profit: 13125,
    returns: 16,
  },
  {
    month: "Sep",
    stockIn: 2010,
    stockOut: 1840,
    revenue: 46000,
    profit: 13800,
    returns: 20,
  },
  {
    month: "Oct",
    stockIn: 2150,
    stockOut: 1980,
    revenue: 49500,
    profit: 14850,
    returns: 19,
  },
  {
    month: "Nov",
    stockIn: 2280,
    stockOut: 2120,
    revenue: 53000,
    profit: 15900,
    returns: 25,
  },
  {
    month: "Dec",
    stockIn: 2450,
    stockOut: 2310,
    revenue: 57750,
    profit: 17325,
    returns: 28,
  },
];

const BarLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={monthlyData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
        <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#6b7280" />
        <YAxis
          yAxisId="right"
          orientation="right"
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
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="revenue"
          fill="#3b82f6"
          name="Revenue ($)"
          radius={[4, 4, 0, 0]}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="profit"
          stroke="#10b981"
          strokeWidth={2}
          name="Profit ($)"
          dot={{ r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default BarLineChart;
