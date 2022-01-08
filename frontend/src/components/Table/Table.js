import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { matchSorter } from "match-sorter";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div class="relative">
      <span class="absolute text-gray-500 inset-y-0 left-0 flex items-center pl-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
      </span>
      <input
        class="py-2 rounded-lg text-sm text-white bg-gray-700 pl-10 focus:border-gray-300"
        placeholder={`Enter Coin...`}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data, totalAssets, loading }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
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
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 25 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <div className="grid grid-cols-1 bg-gray-900 my-5">
      <div className="mb-3">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {/* Dropdown to filter by category/categories */}

        {/* Dropdown to filter by companies */}
        {/* Dropdown to filter by marketcap */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-t-lg">
        <table
          {...getTableProps()}
          className="rounded-t-lg border-gray-900 min-w-full bg-gray-700"
          id="table"
        >
          {/* Columns Header */}
          <thead className="shadow align-middle text-xl h-16 bg-gray-600">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="text-white px-4"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Table body - rows */}
          <tbody {...getTableBodyProps()} className="bg-gray-800">
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
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="borderborder-gray-900 py-3 flex items-center justify-between">
        {/* Mobile Pagination */}
        <div className="flex-1 flex justify-between sm:hidden">
          <a
            href="#table"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </a>
          <a
            href="#table"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </a>
        </div>

        {/* Desktop Pagination */}
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white">
              {/*  Showing {page.length} of ~{controlledPageCount * pageSize}{" "} results */}
              Showing <span className="font-medium">{pageIndex * 25 + 1}</span>{" "}
              to{" "}
              <span className="font-medium">
                {pageIndex + 1 == pageCount
                  ? totalAssets
                  : (pageIndex + 1) * 25}
              </span>{" "}
              of <span className="font-medium">{totalAssets}</span> results
            </p>
          </div>

          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center bg-gray-500 px-2 py-2 rounded-l-md border border-gray-900 bg-white text-sm font-medium text-gray-500 hover:bg-gray-400"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </a>
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

              {[...Array(pageCount).keys()].map((number) =>
                number == pageIndex ? (
                  // Use our custom loading state to show a loading indicator
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-gray-600 text-white relative inline-flex items-center px-4 py-2 border border-gray-900 text-sm font-medium"
                    onClick={() => gotoPage(number)}
                    disabled={!canNextPage}
                  >
                    {number + 1}
                  </a>
                ) : (
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 text-white bg-gray-800 relative inline-flex items-center px-4 py-2 border border-gray-900 text-sm font-medium"
                    onClick={() => gotoPage(number)}
                    disabled={!canNextPage}
                  >
                    {number + 1}
                  </a>
                )
              )}

              <a
                href="#"
                className="relative bg-gray-500 inline-flex items-center px-2 py-2 rounded-r-md border border-gray-900 bg-white text-sm font-medium text-gray-500 hover:bg-gray-400"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
