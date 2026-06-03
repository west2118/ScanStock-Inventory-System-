import {
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";
import { COLORS } from "../../lib/constants";
import { pesoFormatter } from "../../lib/utils";

const MarketShareChart = ({
  marketShare,
}: {
  marketShare: {
    name: string;
    sales: number;
    marketShare: string;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RePieChart>
        <Pie
          data={marketShare}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="marketShare"
          nameKey="name"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(1)}%`
          }
          labelLine={false}
        >
          {marketShare.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(marketShare, _, payload) => [
            `${marketShare}% (${pesoFormatter.format(payload.payload.sales)})`,
            "Market Share",
          ]}
        />
      </RePieChart>
    </ResponsiveContainer>
  );
};

export default MarketShareChart;
