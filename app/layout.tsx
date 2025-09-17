import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hyunyoung",
  description: "Automatic Yonsei Library Seminar Room Reservation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={
        "bg-neutral-50 dark:bg-neutral-950 dark:text-neutral-50 text-neutral-950"
      }
    >
      <body>{children}</body>
    </html>
  );
}
