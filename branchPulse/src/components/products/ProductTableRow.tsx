import type { ProductType } from "../../lib/types";
import { Edit, Eye, Trash2 } from "lucide-react";
import { formatPesoShort, pesoFormatter } from "../../lib/utils";
import { categories } from "../../lib/constants";

const ProductTableRow = ({
  product,
  handleViewProduct,
  handleEditProduct,
}: {
  product: ProductType;
  handleViewProduct: (productId: number) => void;
  handleEditProduct: (productId: number) => void;
}) => {
  const categoryMap = Object.fromEntries(
    categories.map((c) => [c.value, c.name]),
  );

  return (
    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div>
          <p className="font-medium text-gray-900">{product.productName}</p>
          <p className="text-xs text-gray-400 font-mono">{product.sku}</p>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {" "}
        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          {product.brand}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          {categoryMap[product.category] ?? product.category}
        </span>
      </td>
      <td className="py-3 px-4 text-right font-semibold text-gray-900">
        {pesoFormatter.format(product.price)}
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex flex-col items-end">
          <span className="font-semibold text-gray-900">{product.unitsSold.toLocaleString()}</span>
          <span className="text-xs text-gray-400">
            {product.storeUnitsSold.toLocaleString()} store • {product.onlineUnitsSold.toLocaleString()} online
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex flex-col items-end">
          <span className="font-semibold text-gray-900">{formatPesoShort(product.totalRevenue)}</span>
          <span className="text-xs text-gray-400">
            {formatPesoShort(product.storeRevenue)} store • {formatPesoShort(product.onlineRevenue)} online
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleViewProduct(product.id)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleEditProduct(product.id)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;
