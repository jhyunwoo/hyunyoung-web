"use server";

import { auth } from "@/auth";
import { getDb } from "@/db";
import { libraryReservations } from "@/db/schema";

export async function createLibraryReservationAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const studentId = formData.get("studentId")?.toString();
  const password = formData.get("password")?.toString();
  const date = formData.get("date")?.toString();
  const time = formData.get("time")?.toString();
  const duration = formData.get("duration")?.toString();
  const library = formData.get("library")?.toString();
  const room = formData.get("room")?.toString();
  const roomNumber = formData.get("roomNumber")?.toString();
  const participants: { id: string; phone: string }[] = JSON.parse(
    formData.get("participants")?.toString()!,
  );

  console.log(
    studentId,
    password,
    date,
    time,
    duration,
    library,
    room,
    roomNumber,
    participants,
  );

  if (
    !studentId ||
    !password ||
    !date ||
    !time ||
    !duration ||
    !library ||
    !room ||
    !roomNumber ||
    participants.length === 0
  ) {
    throw new Error("All fields are required");
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
}
