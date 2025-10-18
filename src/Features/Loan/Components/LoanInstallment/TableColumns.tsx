import TableActions from "@/Features/Loan/Components/LoanInstallment/TableActions";
import TableColumnHeader from "@/Features/Loan/Components/LoanInstallment/TableColumnHeader";
import type { ILoanInstallment } from "@/Features/Loan/types/loan-installment.type";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const tableColumns: ColumnDef<ILoanInstallment>[] = [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Name" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "employeeId",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Employee Id" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("employeeId")}</div>,
  },
  {
    accessorKey: "loanNo",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Loan No." />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("loanNo")}</div>,
  },
  {
    accessorKey: "installmentAmount",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Installment Amount" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("installmentAmount")}</div>
    ),
  },
  {
    accessorKey: "payment",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Payment" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("payment")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Date" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{format(row.getValue("date"), "do MMM yyyy")}</div>
    ),
  },
  {
    accessorKey: "receiver",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Receiver" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("receiver")}</div>,
  },
  {
    accessorKey: "installNo",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Install No" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("installNo")}</div>,
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Notes" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("notes")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { _id } = row.original;
      return <TableActions id={_id} />;
    },
  },
];
