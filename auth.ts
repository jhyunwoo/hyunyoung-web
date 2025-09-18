import NextAuth from "next-auth";
import { getDb } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Kakao from "next-auth/providers/kakao";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const db = getDb();

  return {
    adapter: DrizzleAdapter(db),
    providers: [Kakao],
  };
});
