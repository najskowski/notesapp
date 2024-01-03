"use server"

import prisma from "../lib/db"
import type { User as PrismaUser } from "@prisma/client"
import bcrypt from "bcrypt"

type User = Omit<PrismaUser, "id">

const createUser = async ({ name, email, password }: User) => {
  const count = await prisma.user.aggregate({
    _count: {
      email: true
    },
    where: {
      email: {
        equals: email
      }
    }
  })
  if(count._count.email > 0) {
    return { status: "error", message: "E-mail already in use" }
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  const result = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword
    }
  })
  return { status: "success", message: "Account successfully created!", queryResult: result };
}

export { createUser }