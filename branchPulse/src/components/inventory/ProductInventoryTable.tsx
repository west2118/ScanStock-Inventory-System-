const ProductInventoryTable = ({
  productInventoryStatus,
}: {
  productInventoryStatus: {
    category: string;
    id: number;
    productName: string;
    sku: string;
    totalStock: number;
    branches: {
      branch: string;
      status: string;
      stock: number;
    }[];
  }[];
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "text-green-600";

      case "Low Stock":
        return "text-yellow-600";

      case "Critical Stock":
        return "text-orange-600";

      case "High Stock":
        return "text-blue-600";

      case "Out of Stock":
        return "text-red-500";

      default:
        return "text-gray-600";
    }
  };

  const branchNames = [
    ...new Set(
      productInventoryStatus.flatMap((product) =>
        product.branches.map((branch) => branch.branch),
      ),
    ),
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Product Inventory Status
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {/* Showing {filteredProducts.length} products */}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Product
              </th>
              {branchNames.map((branch) => (
                <th
                  key={branch}
                  className="text-center py-3 px-4 text-sm font-semibold text-gray-600"
                >
                  {branch}
                </th>
              ))}
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Total Stock
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {productInventoryStatus.map((product, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {product.productName}
                    </p>
                    <p className="text-xs text-gray-400">{product.sku}</p>
                  </div>
                </td>

                {branchNames.map((branchName) => {
                  const branch = product.branches.find(
                    (b) => b.branch === branchName,
                  );

                  return (
                    <td
                      key={branchName}
                      className={`py-3 px-4 text-center font-medium ${getStatusColor(branch?.status ?? "")}`}
                    >
                      {branch?.stock}
                    </td>
                  );
                })}

                <td className="py-3 px-4 text-center">
                  <p className="font-medium text-green-600">
                    {product.totalStock}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductInventoryTable;
