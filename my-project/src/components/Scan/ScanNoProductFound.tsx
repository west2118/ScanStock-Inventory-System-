import { Barcode } from "lucide-react";

const ScanNoProductFound = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Barcode size={32} className="text-gray-400" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">No Product Scanned</h3>
      <p className="text-sm text-gray-500">
        Scan or enter a barcode to view product information
      </p>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">Demo Barcodes:</p>
        <p className="text-xs font-mono text-blue-600 mt-1">8901234567890</p>
        <p className="text-xs font-mono text-blue-600">8901234567891</p>
        <p className="text-xs font-mono text-blue-600">8901234567892</p>
      </div>
    </div>
  );
};

export default ScanNoProductFound;
