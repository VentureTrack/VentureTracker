import React from "react";
import { useTable, usePagination, useSortBy }  from "react-table";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  totalAssets,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination,
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return (
    <div className="bg-gray-900 py-5 flex flex-col overflow-x-auto">
      {/* Table */}
      <table
        {...getTableProps()}
        className="rounded-t-lg border border-gray-900 overflow-hidden shadow align-middle h-20 w-11/12 lg:mx-auto mx-5 bg-gray-700"
        id="table"
      >
        {/* Columns Header */}
        <thead className="shadow align-middle text-xl h-16 bg-gray-700">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="text-white px-4">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Table body - rows */}
        <tbody {...getTableBodyProps()} className="bg-gray-900">
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px",
                        borderColor: "rgb(55 65 81)",
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                      className="text-white border border-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {/* Loading Symbol */}
          {/* <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000" className="text-white">
                Loading...
              </td>
            ) : (
              <td colSpan="10000" className="text-white">
                Showing {page.length} of {totalAssets}{" "}
                results
              </td>
            )}
          </tr> */}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="border-gray-900  px-4 py-3 flex items-center justify-between sm:px-6">
        
        {/* Mobile Pagination */}
        <div className="flex-1 flex justify-between sm:hidden">
          <a
            href="#table"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => previousPage()} disabled={!canPreviousPage}
          >
            Previous
          </a>
          <a
            href="#table"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => nextPage()} disabled={!canNextPage}
          >
            Next
          </a>
        </div>

        {/* Desktop Pagination */}
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          
          <div>
            <p className="text-sm text-white">
            {/*  Showing {page.length} of ~{controlledPageCount * pageSize}{" "} results */}
                Showing <span className="font-medium">{(pageIndex*25)+1}</span> to <span className="font-medium">{(pageIndex+1)*25}</span> of{' '}
                <span className="font-medium">{totalAssets}</span> results
            </p>
          </div>

          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => previousPage()} disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

              { new Array(pageCount).fill("", 0, pageCount).map((key, number) =>
                {pageIndex == number ? (
                // Use our custom loading state to show a loading indicator
                    <a
                        href="#"
                        aria-current="page"
                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        onClick={() => gotoPage(number)} disabled={!canNextPage}
                    >
                        { number+1 }
                    </a>
                
                ) : (
                    <a
                        href="#"
                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        onClick={() => gotoPage(number)} disabled={!canNextPage}
                    >
                        { number+1 }
                    </a>                
                )} 
              )}

              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => nextPage()} disabled={!canNextPage}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;


{/* <div className="pagination">
    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {"<<"}
    </button>{" "}
    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {"<"}
    </button>{" "}
    <button onClick={() => nextPage()} disabled={!canNextPage}>
        {">"}
    </button>{" "}
    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {">>"}
    </button>{" "}
    <span>
        Page{" "}
        <strong>
        {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
    </span>
</div> */}