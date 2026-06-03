import { useSuspenseQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchData, pesoFormatter } from "../../lib/utils";
import ChartCard from "../ui/ChartCard";
import DistributionChart from "../charts/DistributionChart";

type SummaryStatsData = {
  salesDistribution: {
    name: string;
    value: number;
  }[];
  stockDistribution: {
    name: string;
    value: number;
  }[];
};

const BranchAnalyticsCharts = () => {
  const { data } = useSuspenseQuery<SummaryStatsData>({
    queryKey: ["branches-charts"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/branches-charts`),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Branch Sales Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.salesDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              stroke="#94a3b8"
            />
            <YAxis
              tickFormatter={(value) => `₱${value / 1000}k`}
              stroke="#94a3b8"
            />
            <Tooltip
              formatter={(value) => [
                `${pesoFormatter.format(Number(value))}`,
                "Sales",
              ]}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ChartCard title="Branch Distribution by Region">
        <DistributionChart stockDistribution={data?.stockDistribution} />
      </ChartCard>
    </div>
  );
};

export default BranchAnalyticsCharts;
