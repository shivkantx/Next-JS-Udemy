import Link from "next/link";
import AddUserForm from "@/components/AddUserForm";

export const metadata = {
  title: "Add User",
};

export default function AddPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute right-10 top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <div className="space-y-8 rounded-[40px] border border-white/10 bg-slate-900/85 p-10 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">
                New user
              </p>
              <h1 className="text-5xl font-semibold tracking-tight text-slate-100 sm:text-6xl">
                Add users in a focused view
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-400">
                Keep the form isolated from the directory so you can add new
                entries without distraction and move straight to review.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:border-slate-300/30 hover:bg-slate-900/80"
              >
                Back to home
              </Link>
              <Link
                href="/users"
                className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400/25 via-indigo-500/20 to-violet-400/20 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:from-cyan-400/35 hover:to-violet-400/30"
              >
                Open directory
              </Link>
            </div>
          </div>

          <aside className="rounded-[40px] border border-white/10 bg-slate-900/90 p-8 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                  Fresh entry
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-100">
                  Create profile
                </h2>
              </div>
              <span className="rounded-3xl bg-slate-950/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                Focus mode
              </span>
            </div>
            <AddUserForm redirectOnSuccess="/users" />
          </aside>
        </div>
      </main>
    </div>
  );
}
