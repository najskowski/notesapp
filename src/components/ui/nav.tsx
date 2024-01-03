"use client";

import { NavItem } from "./nav-item";
import { NewNoteDialog } from "./new-note-dialog";
import { FaUserCircle } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SigninForm, SignupForm } from "./auth-forms";
import { useSession } from "next-auth/react";
import { Button } from "./button";
import { Note } from "@prisma/client";
import { useEffect, useState } from "react";
import { getUserNotes } from "@/actions/get-user-notes";

export const Nav = () => {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<Note[]>([])
  useEffect(() => {
    const loadNotes = async () => {
      const notes = await getUserNotes(session?.user?.email || "")
      setNotes(notes)
      return
    }
    loadNotes()
  }, [status])
  return (
    <nav className="flex flex-col items-center gap-5 border-r py-7 row-span-7 border-r-neutral-300 relative">
      <div className="w-5/6 space-y-3">
        {status === "loading" ? <div className="w-full py-2 text-center">Loading</div> : null}
        {notes.map((note) => {
          return <NavItem 
            name={note.name} 
            id={note.id} 
            notes={notes}
            setNotes={setNotes}
            key={note.id} 
          />
        })}
        <NewNoteDialog notes={notes} setNotes={setNotes} />
      </div>
      <div className="absolute bottom-5 left-7 w-5/6">
        {status === "loading" ? (
          <Button className="w-full">Loading...</Button>
        ) : status === "authenticated" ? (
          <Button className="w-full space-x-2">
            <FaUserCircle size={22} />
            <span>{session.user?.email}</span>
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger className="flex items-center justify-center gap-2 bg-black text-primary-foreground w-full py-2 rounded-md hover:bg-primary/90 text-sm font-medium transition-colors">
              <>
                <FaUserCircle size={22} />
                <span>Login</span>
              </>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="pb-3">Authentication</DialogTitle>
                <Tabs defaultValue="Sign in" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="Sign in">Sign in</TabsTrigger>
                    <TabsTrigger value="Sign up">Sign up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Sign in" className="space-y-2">
                    <SigninForm />
                  </TabsContent>
                  <TabsContent value="Sign up" className="space-y-3">
                    <SignupForm />
                  </TabsContent>
                </Tabs>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </nav>
  );
};
