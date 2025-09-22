"use server";

import { auth } from "@/auth";
import { getDb } from "@/db";
import { libraryReservations } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

export async function createLibraryReservationAction(
  prev: { error: string },
  formData: FormData,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const studentId = formData.get("studentId")?.toString();
  const password = formData.get("password")?.toString();
  const date = formData.get("date")?.toString();
  const time = formData.get("time")?.toString();
  const duration = formData.get("duration")?.toString();
  const library = formData.get("library")?.toString();
  const room = formData.get("room")?.toString();
  const roomNumber = formData.get("roomNumber")?.toString();

  // --- 💡 오류 수정 부분 시작 ---

  // 1. formData에서 원시 값을 먼저 가져옵니다.
  const participantsRaw = formData.get("participants")?.toString();

  // 2. 값이 있을 때만 JSON.parse를 실행하고, 없으면 빈 배열을 할당합니다.
  const participants: { id: string; phone: string }[] = participantsRaw
    ? JSON.parse(participantsRaw)
    : [];

  if (
    !studentId ||
    !password ||
    !date ||
    !time ||
    !duration ||
    !library ||
    !room ||
    !roomNumber ||
    // participants가 빈 배열일 수 있으므로 이 조건은 그대로 둡니다.
    participants.length === 0
  ) {
    return { error: "Invalid form data" };
  }

  const db = getDb();

  await db.insert(libraryReservations).values({
    userId: session.user.id,
    studentId,
    library,
    room,
    roomNumber,
    date,
    time,
    duration,
    participants: JSON.stringify(participants),
  });

  revalidatePath("/yonsei-library");
  return { error: "" };
}

export async function deleteLibraryReservationAction(
  prev: { error: string },
  formData: FormData,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const reservationId = formData.get("reservationId")?.toString();

  if (!reservationId) {
    return { error: "Invalid form data" };
  }

  const db = getDb();

  await db
    .delete(libraryReservations)
    .where(
      and(
        eq(libraryReservations.id, reservationId),
        eq(libraryReservations.userId, session.user.id),
      ),
    );

  revalidatePath("/yonsei-library");
  return { error: "" };
}
