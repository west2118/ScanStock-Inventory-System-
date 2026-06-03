// ProductsPage.jsx - Main Content (Table with new columns)
import ProductsTable from "../components/products/ProductsTable";
import { Suspense, useState } from "react";
import ProductFormModal from "../components/products/ProductFormModal";
import ProductDetailModal from "../components/products/ProductDetailModal";
import ProductStatsSection from "../components/products/ProductStatsSection";
import StatsCardsSkeleton from "../components/skeletons/StatsCardsSkeleton";

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [modalType, setModalType] = useState<"view" | "create" | "edit" | null>(
    null,
  );

  const handleViewProduct = (productId: number) => {
    setSelectedProduct(productId);
    setModalType("view");
  };

  // Edit Product
  const handleEditProduct = (productId: number) => {
    setSelectedProduct(productId);
    setModalType("edit");
  };

  // Create Product
  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setModalType("create");
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };

  const isFormModalOpen = modalType === "create" || modalType === "edit";
  const isDetailsModalOpen = modalType === "view";

  const isEdit = modalType === "create" ? false : true;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      {/* Summary Cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <ProductStatsSection />
      </Suspense>

      <ProductsTable
        handleViewProduct={handleViewProduct}
        handleEditProduct={handleEditProduct}
        handleCreateProduct={handleCreateProduct}
      />

      {isFormModalOpen && (
        <ProductFormModal
          isModalOpen={isFormModalOpen}
          isCloseModal={handleCloseModal}
          selectedProductId={selectedProduct ?? null}
          isEdit={isEdit}
        />
      )}

      {isDetailsModalOpen && selectedProduct && (
        <ProductDetailModal
          selectedProductId={selectedProduct ?? null}
          isModalOpen={isDetailsModalOpen}
          isCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductsPage;
