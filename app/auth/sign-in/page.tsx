import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInButton from "@/app/auth/sign-in/sign-in-button";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/");
  }

  return (
    <div
      className={
        "w-full h-screen flex flex-col items-center justify-center p-4"
      }
    >
      <div className={"p-4 rounded-xl bg-neutral-50 max-w-4xl w-full"}>
        <h1 className={"text-2xl font-bold"}>Sign In Page</h1>
        <SignInButton />
      </div>
    </div>
  );
}
