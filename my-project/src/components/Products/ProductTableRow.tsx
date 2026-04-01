import { Edit, Eye, Package, Trash2 } from "lucide-react";
import { capitalizeFirst, pesoFormatter } from "../../utils/utils";
import type { ProductType } from "../../utils/types";
import { useAuth } from "../../context/AuthContext";

type ProductTableRowProps = {
  product: ProductType;
  handleSelectProduct: (
    productId: number,
    action: "edit" | "delete" | "view",
    productName?: string,
  ) => void;
};

const ProductTableRow = ({
  product,
  handleSelectProduct,
}: ProductTableRowProps) => {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
            <Package size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{product.productName}</p>
            <p className="text-xs text-gray-500 mt-0.5">{product.barcode}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-mono text-gray-600">{product.sku}</span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700`}
        >
          {product.category.length > 3
            ? capitalizeFirst(product.category)
            : product.category.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <span className="text-sm font-medium text-gray-900">
          {pesoFormatter.format(product.price)}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full bg-gray-50`}
        >
          {capitalizeFirst(product.status)}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleSelectProduct(product.id, "view")}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Eye size={16} />
          </button>

          {isAdmin && (
            <>
              <button
                onClick={() => handleSelectProduct(product.id, "edit")}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit size={16} />
              </button>

              <button
                onClick={() =>
                  handleSelectProduct(product.id, "delete", product.productName)
                }
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;
