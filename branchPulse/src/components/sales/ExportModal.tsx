import { useState } from "react";
import Modal from "../ui/Modal";

type ExportModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  onExport?: (options: ExportOptions) => void;
};

export type ExportOptions = {
  format: "xlsx" | "csv" | "pdf";
  dateRange: "current" | "30days" | "quarter" | "ytd";
  includeCharts: boolean;
  includeRankings: boolean;
  includeComparisons: boolean;
};

const ExportModal = ({
  isModalOpen,
  isCloseModal,
  onExport,
}: ExportModalProps) => {
  const [options, setOptions] = useState<ExportOptions>({
    format: "xlsx",
    dateRange: "current",
    includeCharts: true,
    includeRankings: true,
    includeComparisons: true,
  });

  const handleExport = () => {
    onExport?.(options);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Export Report"
    >
      <div className="space-y-4">
        {/* Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Format
          </label>
          <select
            value={options.format}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                format: e.target.value as ExportOptions["format"],
              }))
            }
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="xlsx">Excel (.xlsx)</option>
            <option value="csv">CSV (.csv)</option>
            <option value="pdf">PDF (.pdf)</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            value={options.dateRange}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                dateRange: e.target.value as ExportOptions["dateRange"],
              }))
            }
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="current">Current View</option>
            <option value="30days">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="ytd">Year to Date</option>
          </select>
        </div>

        {/* Include */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Include
          </label>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.includeCharts}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeCharts: e.target.checked,
                  }))
                }
                className="rounded"
              />
              Sales Charts
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.includeRankings}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeRankings: e.target.checked,
                  }))
                }
                className="rounded"
              />
              Product Rankings
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.includeComparisons}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeComparisons: e.target.checked,
                  }))
                }
                className="rounded"
              />
              Branch Comparisons
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={isCloseModal}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleExport}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Download Report
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;
