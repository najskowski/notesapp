"use client"

import { SessionProvider } from "next-auth/react"

const SessionContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export { SessionContext }