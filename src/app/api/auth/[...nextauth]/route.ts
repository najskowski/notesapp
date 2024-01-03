import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/db"
import bcrypt from "bcrypt"

const Auth = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if(!user || !user.password) {
          throw new Error('Invalid credentials');
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        )
        if (!isPasswordCorrect) {
          throw new Error('Invalid credentials');
        }
        return user;
      }
    })    
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { Auth as POST, Auth as GET }