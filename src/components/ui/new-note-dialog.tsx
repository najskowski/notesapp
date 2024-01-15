"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./button"
import { BiPencil } from "react-icons/bi"
import { useRouter } from "next/navigation"
import { Input } from "./input"
import { Dispatch, SetStateAction, useState } from "react"
import { createNote } from "@/actions/create-note"
import { useSession } from "next-auth/react"
import { Note } from "@prisma/client"

interface NewNoteDialogProps {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

export const NewNoteDialog = ({ notes, setNotes }: NewNoteDialogProps) => {
  const [noteName, setNoteName] = useState("")
  const { data: session, status } = useSession()
  const handleSubmit = async () => {
    const result = await createNote(noteName, session?.user?.email!)
    setNotes([...notes, result])
  }
  return (
    <Dialog>
      <DialogTrigger 
        className="flex items-center justify-center gap-2 bg-black text-primary-foreground w-full py-2 rounded-md hover:bg-primary/90 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
        disabled={status === "loading" || status === "unauthenticated"}
      >
        <>
          <BiPencil size={22} />
          <span>Create new note</span>
        </>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3">Name your new note</DialogTitle>
          <DialogDescription className="space-y-3">
            <Input type="text" placeholder="Name" onChange={(e) => setNoteName(e.target.value)}/>
            <DialogClose asChild>
              <Button type="submit" disabled={noteName.length === 0} onClick={handleSubmit}>Submit</Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}