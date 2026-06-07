import { ArrowUpDown } from "lucide-react";
import InventoryTableRow from "./InventoryTableRow";
import Pagination from "../Pagination";
import TableRowNoData from "../TableRowNoDataSkeleton";
import TableRowErrorHandling from "../TableRowErrorHandling";
import TableRowSkeleton from "../Skeletons/TableRowSkeleton";
import InventoryFilter from "./InventoryFilter";
import { useInventoryProducts } from "./useInventoryProducts";
import type { ProductType } from "../../../utils/types";

type InventoryTableProps = {
  onSelectProduct: (product: ProductType, action: "IN" | "OUT") => void;
};

const InventoryTable = ({ onSelectProduct }: InventoryTableProps) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    params,
    setParams,
    filters,
    searchInput,
    setSearchInput,
  } = useInventoryProducts();

  return (
    <>
      <InventoryFilter
        filters={filters}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setParams={setParams}
      />

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    Product
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU/Barcode
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    Category
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center justify-end gap-1">
                    Stock
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center justify-center gap-1">
                    Status
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {isLoading && <TableRowSkeleton columns={7} />}

              {!isLoading && isError && (
                <TableRowErrorHandling
                  col={7}
                  title="products"
                  refetch={refetch}
                />
              )}

              {!isLoading &&
                !isError &&
                data?.products.map((item) => (
                  <InventoryTableRow
                    key={item.id}
                    item={item}
                    onSelectProduct={onSelectProduct}
                  />
                ))}

              {!isLoading && !isError && data?.products?.length === 0 && (
                <TableRowNoData title="products" col={7} />
              )}
            </tbody>

            <Pagination
              limit={params.limit}
              page={params.page}
              total={data?.pagination.total}
              totalPages={data?.pagination.totalPages}
              setPage={(newPage) => setParams({ page: newPage })}
              setLimit={(newLimit) => setParams({ limit: newLimit, page: 1 })}
              col={7}
            />
          </table>
        </div>
      </div>
    </>
  );
};

export default InventoryTable;
