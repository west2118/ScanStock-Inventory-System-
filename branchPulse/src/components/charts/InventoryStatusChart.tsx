import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { ChartData } from "../../lib/types";
import { COLORS } from "../../lib/constants";

const InventoryStatusChart = ({
  inventoryDistribution,
}: {
  inventoryDistribution: ChartData[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={inventoryDistribution}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent! * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {inventoryDistribution.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              `${Number(value).toLocaleString()} units`,
              "Stock",
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-3">
        {inventoryDistribution.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-4"
          >
            <span className="text-sm text-gray-600 min-w-30">{item.name}</span>

            <div className="flex items-center gap-2 flex-1">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.value / 100) * 100}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>

              <span className="text-sm font-medium text-gray-700 min-w-12.5 text-right">
                {item.value.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryStatusChart;
