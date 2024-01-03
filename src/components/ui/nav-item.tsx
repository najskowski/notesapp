import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BsThreeDots } from "react-icons/bs";
import { Button } from "./button";
import { deleteNote } from "@/actions/delete-note";
import { useRouter } from "next/navigation";
import { IoMdEye, IoMdTrash } from "react-icons/io";

interface NavItemProps {
  name: string;
  id: string;
}

export const NavItem: React.FC<NavItemProps> = ({ name, id }) => {
  const router = useRouter();
  return (
    <div className="border border-neutral-200 rounded-md px-3 py-2 flex justify-between ">
      <span>{name}</span>
      <div className="space-x-2">
        <button onClick={() => router.push(`/note/${id}`)} className="hover:bg-black hover:text-white p-1 rounded-sm transition-all">
          <IoMdEye />
        </button>
        <Dialog>
          <DialogTrigger className="hover:text-red-500 hover:bg-black transition-all p-1 rounded-sm">
            <IoMdTrash />
          </DialogTrigger>
          <DialogContent className="w-fit">
            <DialogHeader>
              <DialogTitle>Are you sure sure?</DialogTitle>
              <DialogDescription>
                This action will permamently delete note "{name}"
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-between flex">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={() => deleteNote(id)}>
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};