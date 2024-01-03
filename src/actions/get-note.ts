"use server"

import prisma from "@/lib/db"

const getNote = (noteId: string) => {
  const result = prisma.note.findFirst({
    select: {
      content: true,
      name: true,
      belongsTo: true
    },
    where: {
      id: noteId,
    }
  })
  console.log("FETCHED NOTE CONTENT")
  return result;
}

export { getNote }