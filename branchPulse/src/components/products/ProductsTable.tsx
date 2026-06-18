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
import ProductsFilters from "./ProductsFilters";
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
    categoryId: "",
    brandId: "",
  });

  const filters = useMemo(
    () => ({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || "",
      status: params.status || "",
      categoryId: params.categoryId || "",
      brandId: params.brandId || "",
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
    queryFn: fetchTableData(`${import.meta.env.VITE_API_URL}/admin/products`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <ProductsFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        filters={filters}
        setParams={setParams}
        handleCreateProduct={handleCreateProduct}
      />

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
