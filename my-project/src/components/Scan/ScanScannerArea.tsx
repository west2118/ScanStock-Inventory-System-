import { Barcode, ScanLine, Search, RefreshCw, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProductType } from "../../utils/types";
import { toast } from "react-toastify";
import { Html5Qrcode } from "html5-qrcode";

type ScanScannerAreaProps = {
  handleSelectProduct: (product: ProductType | null) => void;
  cameraOn: boolean; // ✅ ADD THIS
};

const ScanScannerArea = ({
  handleSelectProduct,
  cameraOn,
}: ScanScannerAreaProps) => {
  const isScanningRef = useRef(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [barcodeInput, setBarcodeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ SAFE STOP FUNCTION
  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();

        if (state === 2) {
          // SCANNING
          await scannerRef.current.stop();
          await scannerRef.current.clear();
        }
      } catch (err) {
        // ignore safely
      }
    }
  };

  useEffect(() => {
    if (!cameraOn) {
      stopScanner();
      return;
    }

    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: (w: number) => ({
            width: Math.min(w, 400),
            height: Math.min(w, 400) / 2.5,
          }),
        },
        async (decodedText) => {
          if (isScanningRef.current) return;
          isScanningRef.current = true;

          console.log("Scanned:", decodedText);

          setBarcodeInput(decodedText);

          try {
            setIsLoading(true);

            const res = await fetch(
              `http://localhost:5001/api/product-scan/${decodedText}`,
            );

            if (res.status === 404) {
              toast.error("Product Not Found");
              handleSelectProduct(null);
              return;
            }

            const data = await res.json();
            toast.success(data.message);

            handleSelectProduct(data.data);

            // 🔥 OPTIONAL: stop camera after success
            await stopScanner();
          } catch (err: any) {
            toast.error(err.message);
          } finally {
            setIsLoading(false);

            // allow next scan after delay
            setTimeout(() => {
              isScanningRef.current = false;
            }, 1500);
          }
        },
        () => {}, // ignore errors
      )
      .then(() => {
        console.log("✅ Scanner started");
      })
      .catch((err) => {
        console.error("❌ Scanner error:", err);
      });

    // cleanup
    return () => {
      stopScanner();
    };
  }, [cameraOn, handleSelectProduct]);

  const handleScan = async (e: any) => {
    e.preventDefault();

    if (!barcodeInput.trim()) {
      toast.error("Please enter or scan a barcode");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch(
        `http://localhost:5001/api/product-scan/${barcodeInput}`,
      );

      // ❌ Not found
      if (res.status === 404) {
        toast.error("Product Not Found");

        handleSelectProduct(null);
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await res.json();

      toast.success(data.message);

      handleSelectProduct(data.data);
      setBarcodeInput("");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:col-span-2">
      {/* Scanner Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {cameraOn ? (
          <div id="reader" className="w-full h-120 overflow-hidden"></div>
        ) : (
          <div className="h-120 bg-linear-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <ScanLine size={48} className="text-blue-600 animate-pulse" />
              </div>

              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Barcode size={16} className="text-white" />
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              Position barcode in front of scanner or enter manually
            </p>
          </div>
        )}

        <div className="p-6">
          {/* Barcode Input */}
          <form onSubmit={handleScan} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barcode / SKU
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Barcode
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="Scan or enter barcode number..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-mono"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 
                ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Scan</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <RefreshCw size={16} />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanScannerArea;
