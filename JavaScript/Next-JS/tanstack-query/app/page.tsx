import Link from "next/link";
import AddUserForm from "@/components/AddUserForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[-6rem] top-16 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-[-5rem] top-12 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute left-[50%] top-[40%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:px-10 lg:px-16 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
        <section className="space-y-10 rounded-[40px] border border-white/10 bg-slate-900/85 p-10 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
              Next.js user manager
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-100 sm:text-6xl">
              Add users faster with a modern home workflow.
            </h1>
            <p className="text-lg leading-8 text-slate-400">
              The home screen keeps the add user form visible, reduces friction,
              and sends you directly to the directory after each save.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/users"
              className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400/25 via-indigo-500/20 to-violet-400/20 px-6 py-4 text-sm font-semibold text-slate-100 transition hover:from-cyan-400/35 hover:to-violet-400/30"
            >
              View directory
            </Link>
            <Link
              href="/add"
              className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-4 text-sm font-semibold text-slate-100 transition hover:border-slate-300/30 hover:bg-slate-900/80"
            >
              Open add page
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-sm shadow-black/10">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                Instant access
              </p>
              <p className="mt-4 text-xl font-semibold text-slate-100">
                Form first
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Start adding users immediately without scrolling past a
                directory or distracting content.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-sm shadow-black/10">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                Polished layout
              </p>
              <p className="mt-4 text-xl font-semibold text-slate-100">
                Crisp interface
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Modern cards, soft gradients, and strong spacing make the
                experience feel premium.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-sm shadow-black/10">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                Smart flow
              </p>
              <p className="mt-4 text-xl font-semibold text-slate-100">
                One-click review
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Save a user and go straight to the directory to verify your
                latest profile.
              </p>
            </div>
          </div>
        </section>

        <aside className="rounded-[40px] border border-white/10 bg-slate-900/90 p-8 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                Create profile
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-100">
                Add user
              </h2>
            </div>
            <span className="rounded-3xl bg-slate-950/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              Home form
            </span>
          </div>
          <AddUserForm redirectOnSuccess="/users" />
        </aside>
      </main>
    </div>
  );
}
