import {
  PieChart as RePieChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const categoryPerformance = [
  { name: "Electronics", value: 52400 },
  { name: "Clothing", value: 40500 },
  { name: "Groceries", value: 44700 },
  { name: "Tools", value: 22250 },
  { name: "Beauty", value: 35500 },
];

const RadarChartCard = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={categoryPerformance}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Turnover Rate"
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.5}
        />
        <Tooltip />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartCard;
