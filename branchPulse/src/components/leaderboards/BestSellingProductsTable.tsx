import { ShoppingBag } from "lucide-react";
import RankBadge from "../badges/RankBadge";
import { formatPesoShort } from "../../lib/utils";

const BestSellingProductsTable = ({
  productRankings,
}: {
  productRankings: {
    growth: string;
    id: number;
    productName: string;
    rank: string;
    totalSales: number;
    totalUnitsSold: number;
    category: string;
  }[];
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Best Selling Products
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Ranked by units sold and revenue generated
            </p>
          </div>
          <ShoppingBag className="w-6 h-6 text-green-500" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Rank
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Product
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Units Sold
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {productRankings.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <RankBadge rank={Number(product.rank)} />
                </td>
                <td className="py-3 px-4">
                  <p className="font-medium text-gray-900">
                    {product.productName}
                  </p>
                </td>
                <td className="py-3 px-4 text-gray-600">{product.category}</td>
                <td className="py-3 px-4 text-center font-semibold text-gray-900">
                  {product.totalUnitsSold}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {formatPesoShort(product.totalSales)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellingProductsTable;
