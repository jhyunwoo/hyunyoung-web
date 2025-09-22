import BookLibraryRoomForm from "@/app/yonsei-library/book-library-room-form";
import { Suspense } from "react";
import BookingHistory from "@/app/yonsei-library/booking-history";

export default function YLBSPage() {
  return (
    <div
      className={
        "w-full min-h-screen flex items-center justify-center flex-col"
      }
    >
      <div className={"w-full h-[10vh]"} />
      <div
        className={
          "w-full p-4 bg-neutral-50 rounded-xl max-w-4xl flex flex-col gap-2 min-h-1/3"
        }
      >
        <h1 className={"text-2xl font-bold"}>도서관 세미나룸 예약</h1>
        <BookLibraryRoomForm />
      </div>
      <Suspense
        fallback={
          <div
            className={
              "w-full rounded-xl bg-neutral-300 animate-pulse h-16 max-w-4xl mt-2"
            }
          />
        }
      >
        <BookingHistory />
      </Suspense>
    </div>
  );
}
