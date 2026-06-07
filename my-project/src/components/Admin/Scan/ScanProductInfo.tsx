import { useState } from "react";
import type { ItemType } from "../../../utils/types";
import ScanModeToggle from "./ScanModeToggle";
import ScanScannedProductDetail from "./ScanScannedProductDetail";
import ScanNoProductFound from "./ScanNoProductFound";

type ScanProductInfoProps = {
  items: ItemType[];
  removeItem: (id: number) => void;
  updateItem: (
    id: number,
    field: "quantity" | "remarks",
    value: number | string,
  ) => void;
  clearItem: () => void;
};

const ScanProductInfo = ({
  items,
  removeItem,
  updateItem,
  clearItem,
}: ScanProductInfoProps) => {
  const [scanMode, setScanMode] = useState("IN");

  return (
    <div className="lg:col-span-2">
      {/* Mode Toggle */}
      <ScanModeToggle setScanMode={setScanMode} scanMode={scanMode} />

      {/* Product Display Card */}
      {items.length >= 1 ? (
        <ScanScannedProductDetail
          scanMode={scanMode}
          items={items}
          removeItem={removeItem}
          updateItem={updateItem}
          clearItem={clearItem}
        />
      ) : (
        <ScanNoProductFound />
      )}
    </div>
  );
};

export default ScanProductInfo;
