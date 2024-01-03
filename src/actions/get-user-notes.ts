"use server"

import prisma from "@/lib/db"

const getUserNotes = async (email: string) => {
  const notes = await prisma.note.findMany({
    where: {
      belongsTo: email
    }
  })
  console.log("---* NOTES FETCHED *---")
  return notes;
}

export { getUserNotes }