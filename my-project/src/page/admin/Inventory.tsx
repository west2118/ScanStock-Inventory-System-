import InventoryTable from "../../components/Admin/Inventory/InventoryTable";
import InventorySummaryStats from "../../components/Admin/Inventory/InventorySummaryStats";
import InventoryStockModal from "../../components/Admin/Inventory/InventoryStockModal";
import { useState } from "react";
import type { ProductType } from "../../utils/types";

type InventoryModalType = "stock-in" | "stock-out" | null;

const Inventory = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [modalType, setModalType] = useState<InventoryModalType>(null);

  const handleSelectProduct = (product: ProductType, action: "IN" | "OUT") => {
    setSelectedProduct(product);
    setModalType(action === "IN" ? "stock-in" : "stock-out");
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      <InventorySummaryStats />

      <InventoryTable onSelectProduct={handleSelectProduct} />

      {modalType && selectedProduct && (
        <InventoryStockModal
          isModalOpen={Boolean(modalType)}
          isCloseModal={handleCloseModal}
          selectedProduct={selectedProduct}
          movementType={modalType === "stock-in" ? "IN" : "OUT"}
        />
      )}
    </main>
  );
};

export default Inventory;
