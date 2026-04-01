// Products.jsx - Products Management Page
import { useState } from "react";
import { Plus, Search, Package, Filter } from "lucide-react";
import ProductFormModal from "./ProductFormModal";
import ProductTableRow from "./ProductTableRow";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ProductType } from "../../utils/types";
import { fetchData } from "../../utils/utils";
import DeleteModal from "../DeleteModal";
import ProductDetailModal from "./ProductDetailModal";
import TableRowErrorHandling from "../TableRowErrorHandling";
import TableRowSkeleton from "../Skeletons/TableRowSkeleton";
import Pagination from "../Pagination";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { categories } from "../../utils/constants";
import TableRowNoData from "../TableRowNoDataSkeleton";
import { useAuth } from "../../context/AuthContext";

type ProductsData = {
  products: ProductType[];
  page: number;
  total: number;
  totalPages: number;
};

const ProductTable = () => {
  const { user } = useAuth();

  const [isFormModal, setIsFormModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const debouncedSearch = useDebounceInput(search);
  const { data, isLoading, isError, refetch } = useQuery<ProductsData>({
    queryKey: ["products-data", page, limit, status, category, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:5001/api/products
      ?page=${page}
      &limit=${limit}
      &search=${debouncedSearch}
      &status=${status}
      &category=${category}`.replace(/\s+/g, ""),
    ),
    placeholderData: keepPreviousData,
  });

  const isAdmin = user?.role === "admin";

  const handleSelectProduct = (
    productId: number,
    action: "edit" | "delete" | "view",
    productName?: string,
  ) => {
    setSelectedProductId(productId);

    if (action === "edit") {
      setIsEdit(true);
      setIsFormModal(true);
    } else if (action === "view") {
      setIsDetailsModalOpen(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
      setSelectedProductName(productName ?? "");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 flex-wrap">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsFormModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="p-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && <TableRowSkeleton columns={6} />}

              {!isLoading && isError && (
                <TableRowErrorHandling
                  col={6}
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
                    handleSelectProduct={handleSelectProduct}
                  />
                ))}

              {!isLoading && !isError && data?.products?.length === 0 && (
                <TableRowNoData title="products" col={6} />
              )}
            </tbody>

            <Pagination
              limit={limit}
              page={page}
              total={data?.total}
              totalPages={data?.totalPages}
              setPage={setPage}
              setLimit={setLimit}
              col={6}
            />
          </table>
        </div>
      </div>

      {/* Add Product Modal (Static) */}
      {isFormModal && (
        <ProductFormModal
          isModalOpen={isFormModal}
          isCloseModal={() => {
            setSelectedProductId(0);
            setIsFormModal(false);
          }}
          selectedProductId={selectedProductId}
          isEdit={isEdit}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isModalOpen={isDeleteModalOpen}
          isCloseModal={() => {
            setSelectedProductId(0);
            setIsDeleteModalOpen(false);
          }}
          selectedProductId={selectedProductId}
          selectedProductName={selectedProductName}
          title="Product"
        />
      )}

      {isDetailsModalOpen && (
        <ProductDetailModal
          isModalOpen={isDetailsModalOpen}
          isCloseModal={() => {
            setSelectedProductId(0);
            setIsDetailsModalOpen(false);
          }}
          selectedProductId={selectedProductId}
        />
      )}
    </>
  );
};

export default ProductTable;
