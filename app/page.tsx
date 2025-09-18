import Link from "next/link";

export default function HomePage() {
  return (
    <div className={"w-full h-screen flex items-center justify-center"}>
      <div
        className={
          "p-8 rounded-xl bg-neutral-50 w-full max-w-4xl flex flex-col gap-2 min-h-1/2 items-center justify-center"
        }
      >
        <h1 className={"text-4xl font-bold"}>HyunYoung</h1>
        <Link
          href={"/yonsei-library"}
          className={
            "p-2 px-4 rounded-lg bg-neutral-900 text-neutral-50 font-semibold text-lg"
          }
        >
          도서관 세미나룸 예약
        </Link>
      </div>
    </div>
  );
}
