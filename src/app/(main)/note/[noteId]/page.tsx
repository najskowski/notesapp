"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getNote } from "@/actions/get-note";
import { convertBase64 } from "@/lib/utils";
import { Note } from "@prisma/client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Markdown from "react-markdown";
import "./markdown.css"
import "./scroll.css"
import { FaSave } from "react-icons/fa";
import { updateNoteContent } from "@/actions/update-note";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Response = Omit<Note, "id" | "createdAt">;

const Page = ({ params }: { params: { noteId: string } }) => {
  const [note, setNote] = useState<Response | null>(null);
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { data: session, status } = useSession();
  // fetch note
  useEffect(() => {
    const fetchContent = async () => {
      const response = await getNote(params.noteId);
      if (response?.content) {
        setNote(response);
        return;
      }
    };
    fetchContent();
    console.log({
      note,
      session,
      status
    })
  }, []);
  // convert from base64 to readable string
  useEffect(() => {
    try {
      setContent(convertBase64(note?.content!));
    } catch {
      setContent("");
    }
  }, [note]);
  const saveNote = async () => {
    try {
      setIsSaving(true)
      const encoded = btoa(content)
      await updateNoteContent({ id: params.noteId, content: encoded })
      setIsSaving(false)
      toast({
        title: "Saved!",
        description: `Saved note "${note?.name}"`,
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save note"
      })
    }
  }
  if(!note || status === "loading") {
    return (
      <div className="w-full h-full flex justify-center items-center flex-col gap-5">
        <div className="w-12 h-12 border-4 border-t-neutral-800 border-r-neutral-400 border-b-neutral-400 border-l-neutral-400 rounded-full animate-spin"></div>
      </div>
    ) 
  }
  if(status === "unauthenticated" || note?.belongsTo !== session?.user?.email) {
    return (
      <div className="w-full h-full flex justify-center items-center flex-col gap-5">
        <h1 className="text-3xl font-semibold">You don't have access to this page</h1>
        <Button onClick={() => router.back()}>Go back</Button>
      </div>
    )
  }
  return (
    <>
      <div className="flex justify-between border-b p-7 border-b-neutral-300">
        <h1 className="text-3xl font-medium">{note?.name}</h1>
        <Button className="space-x-2" onClick={saveNote} disabled={isSaving}>
          {isSaving ? (
            <>
              <FaSave />
              Saving...
            </>
          ): (
            <>
              <FaSave />
              <span>Save</span>
            </>
          )}
        </Button>
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <textarea
            className="w-full h-full overflow-y-scroll text-lg outline-none bg-neutral-100 p-7"
            spellCheck={false}
            placeholder="Type here..."
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Markdown className="p-7 markdown">
            {content}
          </Markdown>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Page;
