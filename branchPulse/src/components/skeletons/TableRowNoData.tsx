const TableRowNoData = ({ title, col }: { title: string; col: number }) => {
  return (
    <tr>
      <td colSpan={col} className="text-center py-6 text-gray-500">
        No {title} found
      </td>
    </tr>
  );
};

export default TableRowNoData;
