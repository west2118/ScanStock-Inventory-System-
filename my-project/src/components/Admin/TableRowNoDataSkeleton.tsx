import { Package } from "lucide-react";

const TableRowNoData = ({ title, col }: { title: string; col: number }) => {
  return (
    <td colSpan={col} className="text-center py-6 text-gray-500">
      <Package size={48} className="mx-auto text-gray-300 mb-3" />
      <p className="text-gray-500">No {title} found</p>
    </td>
  );
};

export default TableRowNoData;
