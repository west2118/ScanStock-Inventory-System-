type TableRowSkeletonProps = {
  columns: number;
  rows?: number;
};

export default function TableRowSkeleton({
  columns,
  rows = 1,
}: TableRowSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-6">
              <div className="h-4 w-full bg-gray-200 rounded-md"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
