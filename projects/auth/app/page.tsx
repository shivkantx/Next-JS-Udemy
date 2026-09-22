import LogoutButton from "@/components/logout-button";
import { requireAuth } from "@/lib/auth-guard";
import Image from "next/image";

async function Home() {
  const session = await requireAuth();
  const { user } = session;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0e0a1a] px-4 text-white">
      {/* Static purple glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 30%, rgba(147,51,234,0.30), transparent 70%)," +
            "radial-gradient(35% 35% at 50% 100%, rgba(88,28,135,0.35), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-6 text-center">
        {/* Avatar */}
        <div className="rounded-full bg-gradient-to-r from-purple-400 via-violet-500 to-purple-700 p-[3px] shadow-lg shadow-purple-900/50">
          <div className="rounded-full bg-[#0e0a1a] p-1">
            <Image
              src={user.image || "/default-avatar.png"}
              alt="User image"
              className="size-28 rounded-full object-cover"
              height={112}
              width={112}
            />
          </div>
        </div>

        {/* Name + email */}
        <div className="space-y-1.5">
          <h1 className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
            {user.name}
          </h1>
          <p className="text-sm text-purple-200/60">{user.email}</p>
        </div>

        {/* Status */}
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200">
          <span className="size-1.5 rounded-full bg-purple-400" />
          Signed in
        </span>

        {/* Logout */}
        <div className="pt-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Home;
