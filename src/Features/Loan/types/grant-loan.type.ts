export interface IGrantLoan {
  _id: string;
  employee: string;
  firstName: string;
  lastName: string;
  permittedBy: string;
  loanNo: string;
  totalAmount: number;
  interestPercentage: number;
  installmentPeriod: number;
  repaymentTotal: number;
  approveDate: string;
  repaymentFrom: string;
}
