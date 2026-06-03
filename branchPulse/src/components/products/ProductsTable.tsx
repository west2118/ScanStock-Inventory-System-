// ProductsPage.jsx - Main Content (Table with new columns)
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  RefreshCw,
  Download,
  Printer,
  Search,
  Filter,
} from "lucide-react";
import { useTableParams } from "../../hooks/useTableParams";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ProductType } from "../../lib/types";
import { fetchTableData } from "../../lib/utils";
import ProductTableRow from "./ProductTableRow";
import { categories } from "../../lib/constants";
import Pagination from "../Pagination";
import TableRowErrorHandling from "../skeletons/TableRowErrorHandling";
import SkeletonTableRow from "../skeletons/SkeletonTableRow";
import TableRowNoData from "../skeletons/TableRowNoData";

type ProductsTableProps = {
  handleViewProduct: (productId: number) => void;
  handleEditProduct: (productId: number) => void;
  handleCreateProduct: () => void;
};

type ProductsData = {
  products: ProductType[];
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};

const ProductsTable = ({
  handleViewProduct,
  handleEditProduct,
  handleCreateProduct,
}: ProductsTableProps) => {
  const { params, setParams } = useTableParams({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    category: "",
  });

  const filters = useMemo(
    () => ({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || "",
      status: params.status || "",
      category: params.category || "",
    }),
    [params],
  );

  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounceInput(searchInput);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setParams({
        search: debouncedSearch,
        page: 1,
      });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const { data, isLoading, isError, refetch } = useQuery<ProductsData>({
    queryKey: ["products-data", filters],
    queryFn: fetchTableData(`${import.meta.env.VITE_API_URL}/products`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product or brand..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filters.category}
                onChange={(e) =>
                  setParams({
                    category: e.target.value,
                    page: 1,
                  })
                }
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Package className="w-4 h-4 text-gray-400" />
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand === "all" ? "All Brands" : brand}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <Printer className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleCreateProduct}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Brand
                </th>

                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Price
                </th>

                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Units Sold
                </th>

                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Revenue
                </th>

                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && <SkeletonTableRow columns={7} />}

              {!isLoading && isError && (
                <TableRowErrorHandling
                  col={7}
                  title="products"
                  refetch={refetch}
                />
              )}

              {!isLoading &&
                !isError &&
                data?.products.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    handleViewProduct={handleViewProduct}
                    handleEditProduct={handleEditProduct}
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

export default ProductsTable;
