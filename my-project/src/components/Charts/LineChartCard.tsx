import {
  LineChart,
  Line,
  PieChart as RePieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Static data for charts
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

type LineChartCardProps = {
  data: {
    date: string;
    label: string;
    value1: number;
    value2: number;
    value3: number;
  }[];
};

const LineChartCard = ({ data }: LineChartCardProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="label" />
        <YAxis />

        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="value1"
          stroke="#3b82f6"
          strokeWidth={3}
          name="Revenue"
        />

        <Line
          type="monotone"
          dataKey="value2"
          stroke="#22c55e"
          strokeWidth={2}
          name="Stock In"
        />

        <Line
          type="monotone"
          dataKey="value3"
          stroke="#ef4444"
          strokeWidth={2}
          name="Stock Out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartCard;
