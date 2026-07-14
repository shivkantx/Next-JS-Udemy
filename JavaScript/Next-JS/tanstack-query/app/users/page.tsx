import Link from "next/link";
import UserList from "@/components/UserList";

export const metadata = {
  title: "User Directory",
};

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute right-10 top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <div className="space-y-6 rounded-[40px] border border-white/10 bg-slate-900/85 p-10 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">
              Directory
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-100 sm:text-6xl">
              Browse and manage users
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-400">
              Use the directory page for a clean overview of every profile,
              refresh the data, and delete users with confidence.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:border-slate-300/30 hover:bg-slate-900/80"
              >
                Back to home
              </Link>
              <Link
                href="/add"
                className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400/25 via-indigo-500/20 to-violet-400/20 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:from-cyan-400/35 hover:to-violet-400/30"
              >
                Add new user
              </Link>
            </div>
          </div>

          <aside className="space-y-4 rounded-[40px] border border-white/10 bg-slate-900/90 p-8 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-5 text-sm text-slate-300 shadow-sm shadow-black/10">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                Why use this page
              </p>
              <p className="mt-4 text-slate-400 leading-6">
                This is where you review profiles, manage entries, and keep the
                list tidy after creating users on the home screen.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-5 text-sm text-slate-300 shadow-sm shadow-black/10">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                Quick tip
              </p>
              <p className="mt-4 text-slate-400 leading-6">
                Delete outdated users and refresh the list to keep your
                directory accurate.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 rounded-[40px] border border-white/10 bg-slate-900/85 p-6 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <UserList />
        </div>
      </main>
    </div>
  );
}
