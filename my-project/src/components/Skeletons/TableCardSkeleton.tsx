type TableCardSkeletonProps = {
  count?: number; // controls both rows & cols
};

const TableCardSkeleton = ({ count = 5 }: TableCardSkeletonProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Header Section */}
      <div className="px-6 py-4.5 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-4.5 h-4.5 bg-gray-200 rounded" />
          <div className="h-5 bg-gray-200 rounded w-32" />
          <div className="ml-auto h-3 bg-gray-200 rounded w-28" />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {Array.from({ length: count }).map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <div className="h-3 bg-gray-200 rounded w-16 mx-auto" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: count }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: count }).map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCardSkeleton;
