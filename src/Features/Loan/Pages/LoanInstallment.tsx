import { Button } from "@/components/ui/button";
import AddInstallmentForm from "@/Features/Loan/Components/LoanInstallment/AddInstallmentForm";
import LoanInstallTable from "@/Features/Loan/Components/LoanInstallment/LoanInstallTable";

const LoanInstallment = () => {
  return (
    <div className="px-3 py-2 bg-[#F4F4F5] min-h-screen">
      <div className="bg-white shadow-md rounded-xs mx-auto border">
        <div className="flex justify-between items-center border-b py-3 px-4">
          <h2 className="text-xl font-semibold">Grant Loan</h2>
          <div className="flex items-center gap-3">
            <AddInstallmentForm />
            <Button>Manage Granted Loan</Button>
          </div>
        </div>
        <div className="px-4 py-3">
          <LoanInstallTable />
        </div>
      </div>
    </div>
  );
};

export default LoanInstallment;
