import { Camera } from "lucide-react";
import ScanScannerArea from "../../components/Admin/Scan/ScanScannerArea";
import ScanProductInfo from "../../components/Admin/Scan/ScanProductInfo";
import { useState } from "react";
import type { ItemType, ProductType } from "../../utils/types";

const Scan = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [items, setItems] = useState<ItemType[]>([]);

  const addNewItem = (product: ProductType) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: Date.now(),
          productId: product.id,
          productName: product.productName,
          sku: product.sku,
          currentStock: product.stock,
          quantity: 1,
          remarks: "",
        },
      ];
    });
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: number,
    field: "quantity" | "remarks",
    value: number | string,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (field === "quantity") {
          return {
            ...item,
            quantity: Number(value),
          };
        }

        return { ...item, remarks: String(value) };
      }),
    );
  };

  const clearItem = () => {
    setItems([]);
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Scanner Area */}
        <ScanScannerArea addNewItem={addNewItem} cameraOn={cameraOn} />

        {/* Right Column - Product Info & Confirmation */}
        <ScanProductInfo
          items={items}
          removeItem={removeItem}
          updateItem={updateItem}
          clearItem={clearItem}
        />
      </div>
    </main>
  );
};

export default Scan;
