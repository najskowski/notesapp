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
import { useState } from "react"
import { createNote } from "@/actions/create-note"
import { useSession } from "next-auth/react"

export const NewNoteDialog = () => {
  const router = useRouter()
  const [noteName, setNoteName] = useState("")
  const { data: session, status } = useSession()
  const handleSubmit = () => {
    createNote({ name: noteName, belongsTo: session?.user?.email! })
  }
  return (
    <Dialog>
      <DialogTrigger 
        className="flex items-center justify-center gap-2 bg-black text-primary-foreground w-full py-2 rounded-md hover:bg-primary/90 text-sm font-medium transition-colors"
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