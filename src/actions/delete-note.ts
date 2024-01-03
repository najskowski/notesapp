"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

const deleteNote = async (id: string) => {
  try {
    await prisma.note.delete({
      where: {
        id
      }
    })
    revalidatePath("/")
    return { message: "Successfully deleted note" }
  } catch {
    return { message: "Failed to delete note" }
  }
}

export { deleteNote }