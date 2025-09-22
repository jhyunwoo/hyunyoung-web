import { signIn } from "@/auth";

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("kakao");
      }}
    >
      <button
        type="submit"
        className={
          "bg-yellow-500 text-lg font-semibold p-2 px-4 rounded-lg w-full mt-4"
        }
      >
        카카오로 로그인
      </button>
    </form>
  );
}
