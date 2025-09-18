import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInButton from "@/app/auth/sign-in/sign-in-button";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/");
  }

  return (
    <div className={"w-full"}>
      <div>Sign In Page</div>
      <SignInButton />
    </div>
  );
}
