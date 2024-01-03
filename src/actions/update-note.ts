"use server"

import prisma from "@/lib/db"

const updateNoteName = async ({ id, name }: { id: string, name: string }) => {
  const result = await prisma.note.update({
    where: { id },
    data: { name }
  })
  return result;
}

const updateNoteContent = async ({ id, content }: { id: string, content: string }) => {
  const result = await prisma.note.update({
    where: { id },
    data: { content }
  })
  return result;
} 

export { updateNoteName, updateNoteContent } 