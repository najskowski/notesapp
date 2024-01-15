"use server"

import prisma from "@/lib/db"

const getNote = async (noteId: string) => {
  const result = await prisma.note.findFirst({
    where: {
      id: noteId,
    }
  })
  console.log(result)
  return result;
}

export { getNote }