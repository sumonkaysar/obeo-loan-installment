import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  editLoanInstall,
  removeLoanInstallEditId,
  selectLoanInstallData,
} from "@/Features/Loan/loanSlices/LoanInstallment";
import type { ILoanInstallment } from "@/Features/Loan/types/loan-installment.type";
import { loanInstallmentUpdateZodSchema } from "@/Features/Loan/validations/loan-installment.validation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";

const EditLoanInstallForm = () => {
  const { loanInstallments, loanInstallEditId } = useAppSelector(
    selectLoanInstallData
  );
  const dispatch = useAppDispatch();
  const prevData = loanInstallments.find((l) => l._id === loanInstallEditId);
  const form = useForm({
    resolver: zodResolver(loanInstallmentUpdateZodSchema),
    values: {
      payment: String(prevData?.payment || 0),
      receiver: prevData?.receiver || "",
      installNo: String(prevData?.installNo || 0),
      notes: prevData?.notes || "",
      date: prevData?.date ? parseISO(prevData?.date) : "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof loanInstallmentUpdateZodSchema>
  ) => {
    try {
      let updatedData = {} as Partial<ILoanInstallment>;
      for (const key in data) {
        if (key === "payment" || key === "installNo") {
          updatedData = {
            ...updatedData,
            [key]: Number(data[key as keyof typeof data]),
          };
        } else if (key === "date") {
          updatedData = {
            ...updatedData,
            [key]: new Date(
              data[key as keyof typeof data] as string
            ).toISOString(),
          };
        } else {
          updatedData = {
            ...updatedData,
            [key]: data[key as keyof typeof data],
          };
        }
      }

      dispatch(editLoanInstall(updatedData));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={!!loanInstallEditId}
      onOpenChange={(open: boolean) => {
        if (!open) {
          dispatch(removeLoanInstallEditId());
        }
      }}
    >
      <DialogContent
        className="p-0 overflow-hidden min-w-11/12"
        aria-describedby="editLoanInstall"
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="text-xl">Edit Loan Installment</DialogTitle>
          <DialogDescription>
            Here you will Edit Loan Installment
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="border">
            <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
              Edit Loan Installment
            </h2>
            <Form {...form}>
              <form
                id="editLoanInstall"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 px-6 py-4"
              >
                <FormField
                  control={form.control}
                  name="payment"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Payment <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Payment"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Payment.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receiver"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Receiver <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Receiver" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Receiver.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="installNo"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Install No <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step={1}
                          min={0}
                          placeholder="Install No"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Install No.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(date);
                            }}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="sr-only">
                        Pick a Date.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Notes <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Notes" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Notes.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="editLoanInstall">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditLoanInstallForm;
