type SkeletonTableRowProps = {
  columns: number;
  rows?: number;
};

export default function SkeletonTableRow({
  columns,
  rows = 1,
}: SkeletonTableRowProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-3">
              <div className="h-4 w-full bg-gray-200 rounded-md"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
