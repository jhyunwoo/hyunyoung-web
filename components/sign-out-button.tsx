import { signOut } from "@/auth";

export default async function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className={"p-2 px-4 rounded-lg ring-2 ring-black text-sm"}
      >
        로그아웃
      </button>
    </form>
  );
}
