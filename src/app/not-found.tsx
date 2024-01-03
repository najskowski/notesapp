"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const NotFound = () => {
  const router = useRouter()
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-5">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <Button onClick={() => router.back()}>Go back</Button>
    </div>
  )
}

export default NotFound