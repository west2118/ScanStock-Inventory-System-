import { Suspense } from "react";
import InventoryPage from "../components/inventory/InventoryPage";
import InventorySkeleton from "../components/inventory/InventorySkeleton";

const Inventory = () => {
  return (
    <Suspense fallback={<InventorySkeleton />}>
      <InventoryPage />
    </Suspense>
  );
};

export default Inventory;
