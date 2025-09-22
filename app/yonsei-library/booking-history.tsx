import { getDb } from "@/db";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { libraryReservations } from "@/db/schema";
import { forbidden } from "next/navigation";
import DataForm from "@/components/data-form";
import { deleteLibraryReservationAction } from "@/app/yonsei-library/actions";

export default async function BookingHistory() {
  const db = getDb();
  const session = await auth();

  if (!session?.user?.id) {
    return forbidden();
  }

  const bookingHistory = await db.query.libraryReservations.findMany({
    where: eq(libraryReservations.userId, session.user.id),
  });

  return (
    <div className={"flex flex-col gap-2 w-full max-w-4xl py-4"}>
      {bookingHistory.map((history) => (
        <div
          key={history.id}
          className={
            "flex justify-between items-center gap-1 p-2 px-4 rounded-xl bg-neutral-50"
          }
        >
          <div>
            <div className={"flex gap-1 text-lg font-semibold"}>
              <div>{history.library}</div>
              <div>{history.room}</div>
              <div>{history.roomNumber}</div>
            </div>
            <div className={"flex gap-1"}>
              <div>{history.date}</div>
              <div>{history.time}</div>
              <div>{history.duration}</div>
            </div>
          </div>
          <DataForm action={deleteLibraryReservationAction}>
            <input
              hidden={true}
              value={history.id}
              readOnly={true}
              name={"reservationId"}
            />
            <button
              type={"submit"}
              className={"bg-red-500 text-neutral-50 p-1 px-2 rounded-lg"}
            >
              삭제
            </button>
          </DataForm>
        </div>
      ))}
    </div>
  );
}
