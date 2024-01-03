"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache";

const createNote = async (name: string, belongsTo: string) => {
  const result = await prisma.note.create({
    data: {
      name,
      content: "Empty note",
      belongsTo
    }
  })
  return result;
}

export { createNote }