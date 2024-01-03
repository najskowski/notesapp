"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache";

interface Note {
  name: string;
  belongsTo: string;
}

const createNote = async ({ name, belongsTo }: Note) => {
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