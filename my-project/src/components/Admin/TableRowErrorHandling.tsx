type TableRowErrorHandlingProps = {
  col: number;
  title?: string;
  refetch: () => void;
};

const TableRowErrorHandling = ({
  col,
  title = "data",
  refetch,
}: TableRowErrorHandlingProps) => {
  return (
    <tr>
      <td colSpan={col} className="py-12">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-gray-500">Failed to load {title}.</p>

          <button
            onClick={refetch}
            className="px-4 py-2 text-sm font-medium 
                   text-gray-700 bg-gray-100 
                   rounded-md 
                   hover:bg-gray-200 
                   transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRowErrorHandling;
