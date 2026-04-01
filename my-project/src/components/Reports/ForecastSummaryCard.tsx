import { Clock } from "lucide-react";

const ForecastSummaryCard = () => {
  return (
    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Clock size={24} className="text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-blue-900 mb-2">Forecast Summary</h3>
          <p className="text-sm text-blue-800">
            Based on historical data, demand is expected to peak in December
            (98%) with supply constraints at 90%. It is recommended to increase
            stock levels for high-demand categories in Q4. Price index shows 5%
            growth potential in peak season.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500">Peak Demand Month</p>
              <p className="text-lg font-bold text-gray-900">December</p>
              <p className="text-xs text-green-600">98% demand rate</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Recommended Stock Increase
              </p>
              <p className="text-lg font-bold text-gray-900">+25%</p>
              <p className="text-xs text-green-600">For Q4 season</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500">Projected Revenue Growth</p>
              <p className="text-lg font-bold text-gray-900">+18.5%</p>
              <p className="text-xs text-green-600">Year over year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastSummaryCard;
