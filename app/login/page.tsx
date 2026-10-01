import { signIn } from "@/lib/auth";
import { BookOpen } from "lucide-react";

const Page = () => {
  return (
    <section className="min-h-screen flex justify-center items-center p-8">
      <div className="max-w-[400px] w-full text-center">
        <div className="w-11 h-11 rounded-xl bg-[var(--btn-color)] flex justify-center items-center mx-auto mb-5">
          <BookOpen className="text-white" size={20} />
        </div>

        <h2 className="text-2xl font-bold mb-1.5">Welcome to MY BLOG</h2>
        <p className="text-sm text-gray-500 mb-8">
          Sign in to write, save, and share your posts
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2.5 py-3 rounded-lg border-2 border-black text-sm font-medium cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.9v2.33A9 9 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.03l3.05-2.33z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z"
              />
            </svg>
            Continue with Google
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-6 leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">Terms</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </section>
  );
};

export default Page;