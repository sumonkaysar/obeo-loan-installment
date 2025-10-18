import { Button } from "@/components/ui/button";
import type { Table } from "@tanstack/react-table";

interface IProps<TData> {
  table: Table<TData>;
}
const TablePagination = <TData,>({ table }: IProps<TData>) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length}{" "}
          {table.getFilteredSelectedRowModel().rows.length > 1 ? "rows" : "row"}{" "}
          selected.
        </div>
      )}
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
