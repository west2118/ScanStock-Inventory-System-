// ProductsPage.jsx
import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import ProductsAside from "../../components/store/Products/ProductsAside";
import ProductsListed from "../../components/store/Products/ProductsListed";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTableData } from "../../utils/utils";
import { useCollections } from "../../components/store/Products/useCollections";
import { useBrands } from "../../components/store/Products/useBrands";
import { useCategories } from "../../components/store/Products/useCategories";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, isLoading, filters, searchInput, setSearchInput } =
    useCollections();
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Product Catalog
          </h1>
          <p className="text-gray-500 mt-1">
            Browse our extensive collection of computer parts and accessories
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700"
          >
            <Filter className="w-5 h-5" />
            Filter & Sort
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Smaller width */}
          <ProductsAside brands={brands} categories={categories} />

          {/* Main Content - Wider */}
          <ProductsListed
            sortedProducts={data?.collections ?? []}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
