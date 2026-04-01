import { TrendingUp } from "lucide-react";

const topProducts = [
  {
    name: "Wireless Mouse",
    sales: 342,
    revenue: 10258,
    stockTurnover: 8.5,
    profit: 3077,
  },
  {
    name: "USB-C Cable",
    sales: 568,
    revenue: 7384,
    stockTurnover: 7.2,
    profit: 2215,
  },
  {
    name: "LED Bulb",
    sales: 445,
    revenue: 4000,
    stockTurnover: 12.3,
    profit: 1200,
  },
  {
    name: "Cotton T-Shirt",
    sales: 289,
    revenue: 5778,
    stockTurnover: 6.4,
    profit: 1733,
  },
  {
    name: "Organic Rice",
    sales: 234,
    revenue: 3742,
    stockTurnover: 5.8,
    profit: 936,
  },
];

type TopPerformingProductsTableProps = {
  data: {
    id: number;
    productName: string;
    revenue: number;
    sales: number;
    sku: string;
    stock: number;
    turnover: number;
  }[];
};

const TopPerformingProductsTable = ({
  data,
}: TopPerformingProductsTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">
            Top Performing Products
          </h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Units Sold
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Revenue
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Stock Turnover
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.map((product, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {product.productName}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  {product.sales}
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium">
                  ${product.revenue}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  {product.turnover}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPerformingProductsTable;
