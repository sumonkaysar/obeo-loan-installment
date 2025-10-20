import { employeesData } from "@/Features/Loan/consts/employees.const";
import { grantedLoanData } from "@/Features/Loan/consts/grant-loan.const";
import { loanInstallmentData } from "@/Features/Loan/consts/loan-installment.const";
import type { ITableState } from "@/Features/Loan/types";
import type { ILoanInstallmentState } from "@/Features/Loan/types/loan-installment.type";
import type { RootState } from "@/Redux/store";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { Updater } from "@tanstack/react-table";
import { toast } from "sonner";

const initialState: ILoanInstallmentState = {
  employees: employeesData,
  grantedLoan: grantedLoanData,
  loanInstallments: loanInstallmentData,
  tableState: {
    globalFilter: "",
    sorting: [{ desc: false, id: "sl" }],
    rowSelection: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
  loanInstallEditId: "",
  loanInstallDeleteId: "",
};

export const loanInstallSlice = createSlice({
  name: "loanInstallment",
  initialState,
  reducers: {
    addLoanInstallment: (state, action) => {
      state.loanInstallments = [...state.loanInstallments, action.payload];
      toast.success("Loan installment added succesfully");
      console.log(current(state));
    },
    selectLoanInstallEditId: (state, action) => {
      state.loanInstallEditId = action.payload;
    },
    removeLoanInstallEditId: (state) => {
      state.loanInstallEditId = "";
    },
    selectLoanInstallDeleteId: (state, action) => {
      state.loanInstallDeleteId = action.payload;
    },
    removeLoanInstallDeleteId: (state) => {
      state.loanInstallDeleteId = "";
    },
    editLoanInstall: (state, action) => {
      const index = state.loanInstallments.findIndex(
        (c) => c._id === state.loanInstallEditId
      );
      state.loanInstallments[index] = {
        ...state.loanInstallments[index],
        ...action.payload,
      };
      toast.success("Loan installment updated succesfully");
      state.loanInstallEditId = "";
    },
    deleteLoanInstall: (state) => {
      state.loanInstallments = state.loanInstallments.filter(
        (l) => l._id !== state.loanInstallDeleteId
      );
      toast.success("Loan installment deleted succesfully");
      state.loanInstallDeleteId = "";
    },
    updateLoanInstallTableState: (
      state,
      action: PayloadAction<{
        key: keyof ITableState;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updater: Updater<any>;
      }>
    ) => {
      const { key, updater } = action.payload;

      const currentValue = state.tableState[key];
      const newValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      state.tableState[key] = newValue;
    },
  },
});

export const {
  addLoanInstallment,
  selectLoanInstallEditId,
  removeLoanInstallEditId,
  selectLoanInstallDeleteId,
  removeLoanInstallDeleteId,
  editLoanInstall,
  deleteLoanInstall,
  updateLoanInstallTableState,
} = loanInstallSlice.actions;

export const selectLoanInstallData = (state: RootState) =>
  state.loanInstallment;

export default loanInstallSlice.reducer;
