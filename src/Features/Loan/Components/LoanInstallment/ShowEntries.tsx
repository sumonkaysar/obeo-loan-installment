import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

interface IProps<TData> {
  table: Table<TData>;
}

const ShowEntries = <TData,>({ table }: IProps<TData>) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Show</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-20 justify-between">
            {table.getState().pagination.pageSize}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {[10, 20, 30, 50, 100].map((pageSize) => (
            <DropdownMenuItem
              key={pageSize}
              onClick={() => table.setPageSize(Number(pageSize))}
            >
              {pageSize}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="text-sm text-muted-foreground">entries</span>
    </div>
  );
};

export default ShowEntries;
