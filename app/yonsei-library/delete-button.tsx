"use client";

import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type={"submit"}
      className={"bg-red-500 text-neutral-50 p-1 px-2 rounded-lg"}
      disabled={pending}
    >
      {pending ? "삭제중..." : "삭제"}
    </button>
  );
}
