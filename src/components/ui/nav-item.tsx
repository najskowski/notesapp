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
import { Note } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface NavItemProps {
  name: string;
  id: string;
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

export const NavItem: React.FC<NavItemProps> = ({ name, id, notes, setNotes }) => {
  const router = useRouter();
  const handleDelete = async () => {
    deleteNote(id)
    const updatedNotes = notes.filter(note => note.id !== id)
    setNotes(updatedNotes)
  }
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
                This action will permamently delete note &quot;{name}&quot;
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-between flex">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={handleDelete}>
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