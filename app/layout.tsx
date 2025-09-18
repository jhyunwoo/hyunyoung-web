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
    <html lang="ko" className={"bg-neutral-100 text-neutral-950"}>
      <body>{children}</body>
    </html>
  );
}
