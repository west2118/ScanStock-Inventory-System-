import { useState } from "react";
import type { ProductType } from "../../utils/types";
import ScanModeToggle from "./ScanModeToggle";
import ScanScannedProductDetail from "./ScanScannedProductDetail";
import ScanNoProductFound from "./ScanNoProductFound";

type ScanProductInfoProps = {
  scannedProduct: ProductType | null;
  setScannedProduct: any;
};

const ScanProductInfo = ({
  scannedProduct,
  setScannedProduct,
}: ScanProductInfoProps) => {
  const [scanMode, setScanMode] = useState("IN");

  return (
    <div className="lg:col-span-1">
      {/* Mode Toggle */}
      <ScanModeToggle setScanMode={setScanMode} scanMode={scanMode} />

      {/* Product Display Card */}
      {scannedProduct ? (
        <ScanScannedProductDetail
          scanMode={scanMode}
          scannedProduct={scannedProduct}
          setScannedProduct={setScannedProduct}
        />
      ) : (
        <ScanNoProductFound />
      )}
    </div>
  );
};

export default ScanProductInfo;
