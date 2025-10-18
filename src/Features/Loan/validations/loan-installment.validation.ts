import z from "zod";

export const loanInstallmentZodSchema = z.object({
  employee: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Employee is required"
          : "Employee must be a string",
    })
    .nonempty("Employee can't be blank"),
  grantLoan: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Granted loan is required"
          : "Granted loan must be a string",
    })
    .nonempty("Granted loan can't be blank"),
  payment: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Payment must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Payment must be greater than 0",
    }),
  date: z.date({
    error: (issue) =>
      issue.input === undefined ? "Date is required" : "Date must be a date",
  }),
  receiver: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Receiver is required"
          : "Receiver must be a string",
    })
    .nonempty("Receiver can't be blank"),
  installNo: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Installment number must be a number",
    })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Installment number must be an integer",
    })
    .refine((val) => Number(val) > 0, {
      message: "Installment number must be greater than 0",
    }),
  notes: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Notes is required"
          : "Notes must be a string",
    })
    .nonempty("Notes can't be blank"),
});

export const loanInstallmentUpdateZodSchema = z.object({
  payment: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Payment must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Payment must be greater than 0",
    })
    .optional(),
  date: z
    .date({
      error: (issue) =>
        issue.input === undefined ? "Date is required" : "Date must be a date",
    })
    .optional(),
  receiver: z
    .string("Receiver must be a string")
    .nonempty("Receiver can't be blank")
    .optional(),
  installNo: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Installment number must be a number",
    })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Installment number must be an integer",
    })
    .refine((val) => Number(val) > 0, {
      message: "Installment number must be greater than 0",
    })
    .optional(),
  notes: z
    .string("Notes must be a string")
    .nonempty("Notes can't be blank")
    .optional(),
});
