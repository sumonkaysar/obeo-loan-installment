import type { SortingState } from "@tanstack/react-table";

interface IPaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface ITableState {
  globalFilter: string;
  sorting: SortingState;
  rowSelection: Record<string, boolean>;
  pagination: IPaginationState;
}
