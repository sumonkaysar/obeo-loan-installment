import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog = ({ open, onOpenChange, onConfirm }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="" aria-describedby="Delete">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Are you sure you want to delete?
            </DialogTitle>
            <DialogDescription>
              By confirming this action can be undone, it will permanently
              remove the data from our server.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="p-0 gap-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={onConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
