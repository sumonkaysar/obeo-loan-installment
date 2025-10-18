import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";

interface IProps<TData> {
  table: Table<TData>;
}

const SearchData = <TData,>({ table }: IProps<TData>) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search..."
        value={table.getState().globalFilter ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

export default SearchData;
