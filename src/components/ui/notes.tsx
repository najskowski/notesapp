import { getUserNotes } from "@/actions/get-user-notes";

const Notes = async ({ email }: { email: string }) => {
  const todos = await getUserNotes(email);
  return (
    <>
      {todos.map((note) => {
        return <>{note.name}</>;
      })}
    </>
  );
};

export { Notes };
