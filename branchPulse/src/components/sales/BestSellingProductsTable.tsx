const BestSellingProductsTable = ({
  bestSellingProducts,
}: {
  bestSellingProducts: {
    product: string;
    branches: {
      branch: string;
      sold: number;
    }[];
  }[];
}) => {
  const branchNames = [
    ...new Set(
      bestSellingProducts.flatMap((product) =>
        product.branches.map((branch) => branch.branch),
      ),
    ),
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Product Sales</h3>
        <p className="text-sm text-gray-500 mt-1">Units sold (YTD)</p>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bestSellingProducts.map((product, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">
                  {product.product}
                </td>

                {branchNames.map((branchName) => {
                  const branch = product.branches.find(
                    (b) => b.branch === branchName,
                  );

                  return (
                    <td
                      key={branchName}
                      className="py-3 px-4 text-center text-gray-600"
                    >
                      {branch?.sold ?? 0}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellingProductsTable;
