import BookLibraryRoomForm from "@/app/yonsei-library/book-library-room-form";

export default function YLBSPage() {
  return (
    <div className={"w-full min-h-screen p-4 flex items-center justify-center"}>
      <div
        className={
          "w-full p-4 bg-neutral-50 rounded-xl max-w-4xl flex flex-col gap-2 min-h-1/2"
        }
      >
        <h1 className={"text-2xl font-bold"}>도서관 세미나룸 예약</h1>
        <BookLibraryRoomForm />
      </div>
    </div>
  );
}
