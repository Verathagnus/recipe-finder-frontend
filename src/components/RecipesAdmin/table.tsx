import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "./shared/Icons";
import { Button, PageButton } from "./shared/Button";
import { classNames } from "./shared/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./shared/Icons";
import { useAppDispatch } from "../../store";
import {
  deleteRecipeThunk,
  setEditRecipeId,
  setRecipeTextView,
} from "../../store/recipe/recipeSlice";
import { IngredientGetBasicType } from "../../types/types";
import RecipeForm from "./RecipeUploadForm";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">Search: </span>
      <input
        type="text"
        className="
        block
        w-full
        px-2
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}: any) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option: any, i: any) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SelectDateFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}: any) {
  // Calculate the options for filtering
  // using the preFilteredRows
  // console.log(preFilteredRows)
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline w-auto">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="form-select appearance-none
        block
        w-full
        px-2
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option: any, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function StatusPill({ value }: any) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("active") ? "bg-green-100 text-green-800" : null,
        status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
        status.startsWith("offline") ? "bg-red-100 text-red-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function DateCell({ value }: any) {
  return (
    <span
      className={classNames("px-3 py-1 leading-wide rounded-full shadow-sm")}
    >
      {new Date(value).toLocaleDateString()}
    </span>
  );
}

export function CategoryCell({ value, column, row }: any) {
  return (
    <>
      {value === "Veg" ? (
        <span className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm text-teal-700 bg-teal-100">
          <a>{value}</a>
        </span>
      ) : (
        <span className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm text-red-700 bg-red-100">
          {value}
        </span>
      )}
    </>
  );
}

export function TimeCell({ value, column, row }: any) {
  return (
    <>
      <span className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm text-teal-700 bg-teal-100">
        <a>{value}</a>
      </span>
    </>
  );
}

export function DownloadPDFIngredient({ value, column, row }: any) {
  if (value && row.original[column.flagAccessor])
    return (
      <span className="flex flex-row w-full items-center gap-4">
        <a href={value} className="w-10">
          <img src={value} className="w-10 h-10 rounded-sm mr-5" />
        </a>
        <span
          className={classNames(
            "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
            "bg-green-100 text-green-800"
          )}
        >
          <a href={value}>
            {value.split("ingredient/")[1] ||
              value
                .replace(
                  "https://res.cloudinary.com/dxgfvidct/image/upload/",
                  ""
                )
                .slice(0, 20)}
          </a>
        </span>
      </span>
    );
  return <></>;
}
export function EditRecipe({ value, column, row }: any) {
  const dispatch = useAppDispatch();
  return (
    <>
      <span
        className={classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
          "bg-blue-100 text-blue-600"
        )}
      >
        <button
          type="button"
          onClick={() => {
            console.log("Edit Modal", row.original[column.editAccessor]);
            dispatch(setEditRecipeId(row.original[column.editAccessor]));
          }}
          data-mdb-ripple="true"
          data-bs-toggle="modal"
          data-bs-target={`#recipeModalEdit`}
        >
          Edit
        </button>
      </span>
    </>
  );
}

export function RecipeText({ value, column, row }: any) {
  const dispatch = useAppDispatch();
  return (
    <>
      <>{value.length < 50 ? value : <>{value.slice(0, 50)}<span
        className={classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm ml-3",
          "bg-green-100 text-green-600"
        )}
      >
        <button
          type="button"
          onClick={() => {
            // console.log("Edit Modal", row.original[column.editAccessor]);
            dispatch(setRecipeTextView(value));
          }}
          data-mdb-ripple="true"
          data-bs-toggle="modal"
          data-bs-target={`#recipeTextModalView`}
        >
          Show More
        </button>
      </span></>}</>
      
    </>
  );
}

export function DeleteRecipe({ value, data }: any) {
  const dispatch = useAppDispatch();
  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        "bg-red-100 text-red-800"
      )}
    >
      <button type="button" onClick={() => dispatch(deleteRecipeThunk(value))}>
        Delete
      </button>
    </span>
  );
}
export function AvatarCell({ value, column, row }: any) {
  return (
    <div className="flex items-center">
      {/* <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div> */}
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">
          {value} {row.original[column.lNameAccessor]}
        </div>
        {/* <div className="text-sm text-gray-500">
          {row.original[column.emailAccessor]}
        </div> */}
      </div>
    </div>
  );
}

function Table({ columns, data }: any) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  ) as any;

  // Render the UI for your table
  return (
    <div className="max-w-[1180px] mx-auto relative">
      <div className="sm:flex sm:gap-x-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup: any) =>
          headerGroup.headers.map((column: any) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div>
      {/* table */}
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200 border shadow-md"
              >
                <thead className="bg-gray-100">
                  {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: any) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row: any, i: number) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "defaultRenderer" ? (
                                <div className="text-sm text-gray-500">
                                  {cell.render("Cell")}
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label className="w-32">
              <span className="sr-only">Items Per Page</span>
              <select
                className="form-select appearance-none
                block
                w-full
                px-2
                py-1
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
                <option key="All" value={data.length}>
                  Show All
                </option>
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Table;
