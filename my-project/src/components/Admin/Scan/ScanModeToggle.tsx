import { Minus, Plus } from "lucide-react";

const ScanModeToggle = ({
  setScanMode,
  scanMode,
}: {
  setScanMode: any;
  scanMode: any;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setScanMode("IN")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
            scanMode === "IN"
              ? "bg-green-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Plus size={18} />
          <span>Stock In</span>
        </button>
        <button
          onClick={() => setScanMode("OUT")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
            scanMode === "OUT"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Minus size={18} />
          <span>Stock Out</span>
        </button>
      </div>
    </div>
  );
};

export default ScanModeToggle;
