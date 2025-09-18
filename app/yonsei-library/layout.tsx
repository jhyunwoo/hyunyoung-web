import { auth } from "@/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

export default async function YLBSLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  return <>{children}</>;
}
