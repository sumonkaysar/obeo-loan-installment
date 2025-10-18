import type { ITableState } from "@/Features/Loan/types";
import type { IEmployee } from "@/Features/Loan/types/employee.type";
import type { IGrantLoan } from "@/Features/Loan/types/grant-loan.type";

export interface ILoanInstallment {
  _id: string;
  employee: string;
  firstName: string;
  lastName: string;
  grantLoan: string;
  employeeId: string;
  loanNo: string;
  installmentAmount: number;
  payment: number;
  date: string;
  receiver: string;
  installNo: number;
  notes: string;
}

export interface ILoanInstallmentState {
  employees: IEmployee[];
  grantedLoan: IGrantLoan[];
  loanInstallments: ILoanInstallment[];
  tableState: ITableState;
  loanInstallEditId: string;
  loanInstallDeleteId: string;
}
