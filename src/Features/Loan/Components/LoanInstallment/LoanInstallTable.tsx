import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDeleteDialog from "@/Features/Loan/Components/LoanInstallment/ConfirmDeleteDialog";
import EditLoanInstallForm from "@/Features/Loan/Components/LoanInstallment/EditLoanInstallForm";
import SearchData from "@/Features/Loan/Components/LoanInstallment/SearchData";
import ShowEntries from "@/Features/Loan/Components/LoanInstallment/ShowEntries";
import { tableColumns } from "@/Features/Loan/Components/LoanInstallment/TableColumns";
import TablePagination from "@/Features/Loan/Components/LoanInstallment/TablePagination";
import {
  deleteLoanInstall,
  removeLoanInstallDeleteId,
  selectLoanInstallData,
  updateLoanInstallTableState,
} from "@/Features/Loan/loanSlices/LoanInstallment";
import type { ILoanInstallment } from "@/Features/Loan/types/loan-installment.type";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableState,
} from "@tanstack/react-table";

const LoanInstallTable = () => {
  const { loanInstallments, tableState, loanInstallDeleteId } = useAppSelector(
    selectLoanInstallData
  );
  const dispatch = useAppDispatch();

  const table = useReactTable<ILoanInstallment>({
    data: loanInstallments,
    columns: tableColumns,
    onSortingChange: (updater) =>
      dispatch(updateLoanInstallTableState({ key: "sorting", updater })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (updater) =>
      dispatch(updateLoanInstallTableState({ key: "rowSelection", updater })),
    onPaginationChange: (updater) =>
      dispatch(updateLoanInstallTableState({ key: "pagination", updater })),
    onGlobalFilterChange: (updater) =>
      dispatch(updateLoanInstallTableState({ key: "globalFilter", updater })),
    state: tableState as unknown as Partial<TableState>,
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <ShowEntries table={table} />
        <SearchData table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-10 text-center bg-[#F4F4F5]"
                >
                  No results found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
      <ConfirmDeleteDialog
        open={!!loanInstallDeleteId}
        onOpenChange={(open: boolean) => {
          if (!open) {
            dispatch(removeLoanInstallDeleteId());
          }
        }}
        onConfirm={() => dispatch(deleteLoanInstall())}
      />
      <EditLoanInstallForm />
    </div>
  );
};

export default LoanInstallTable;
