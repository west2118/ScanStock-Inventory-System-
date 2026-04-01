import { Camera } from "lucide-react";
import ScanScannerArea from "../components/Scan/ScanScannerArea";
import ScanProductInfo from "../components/Scan/ScanProductInfo";
import { useState } from "react";
import type { ProductType } from "../utils/types";

const Scan = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<ProductType | null>(
    null,
  );

  const handleSelectProduct = (product: ProductType | null) => {
    setScannedProduct(product);
  };

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Barcode Scanner
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Scan products for stock in/out operations
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCameraOn((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Camera size={18} />
              <span>{cameraOn ? "Stop Camera" : "Camera Mode"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Scanner Area */}
        <ScanScannerArea
          handleSelectProduct={handleSelectProduct}
          cameraOn={cameraOn}
        />

        {/* Right Column - Product Info & Confirmation */}
        <ScanProductInfo
          scannedProduct={scannedProduct}
          setScannedProduct={setScannedProduct}
        />
      </div>
    </main>
  );
};

export default Scan;
