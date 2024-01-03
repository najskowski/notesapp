import { Nav } from "@/components/ui/nav";
import { Toaster } from "@/components/ui/toaster";
import { SessionContext } from "@/context/session-context";
import { FaRegHandPointer } from "react-icons/fa";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionContext>
      <main className="grid w-screen h-screen grid-cols-6 grid-rows-7">
        <Nav />
        <div className="flex flex-col col-span-5 row-span-7">
          {children}
        </div>
        <Toaster />
      </main>
    </SessionContext>
  );
}
