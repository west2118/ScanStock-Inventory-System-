type PaginationProps = {
  limit: number;
  page: number;
  total: number | undefined;
  totalPages: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  col: number;
};

const Pagination = ({
  limit,
  page,
  total,
  totalPages,
  setPage,
  setLimit,
  col,
}: PaginationProps) => {
  if (!totalPages) return null;

  const maxPagesToShow = 5;

  let start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let end = start + maxPagesToShow - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

  return (
    <tfoot>
      <tr>
        <td colSpan={col} className="px-6 py-4">
          <div className="w-full flex flex-row items-center justify-between gap-4">
            {/* Left side */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {total && (
                <span>
                  Showing {(page - 1) * limit + 1}–
                  {Math.min(page * limit, total)} of {total}
                </span>
              )}

              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-md bg-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            {/* Right side */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  {/* Previous */}
                  <button
                    onClick={() => setPage((p: number) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="h-8 px-3 text-sm rounded-md border border-gray-200 bg-white text-gray-900
                 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {pageNumbers.map((num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`h-8 w-8 text-sm rounded-md border transition
                    ${
                      num === page
                        ? "bg-gray-50 text-zinc-900 border-zinc-300"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }
                `}
                    >
                      {num}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(totalPages ?? 0, p + 1))
                    }
                    disabled={page === totalPages}
                    className="h-8 px-3 text-sm rounded-md border border-gray-200 bg-white text-gray-900
                 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default Pagination;
