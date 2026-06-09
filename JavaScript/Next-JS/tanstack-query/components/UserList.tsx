"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCw, Mail, Users } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const AVATAR_STYLES = [
  "bg-indigo-500/20 text-indigo-400",
  "bg-teal-500/20 text-teal-400",
  "bg-rose-500/20 text-rose-400",
  "bg-amber-500/20 text-amber-400",
  "bg-green-500/20 text-green-400",
];

export default function UserList() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <section className="px-4 py-10 bg-slate-950 min-h-screen font-sans">
      <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-indigo-500/20 bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-indigo-500/10 bg-gradient-to-r from-indigo-500/5 to-transparent">
          <div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-indigo-400" />
              <h2 className="text-base font-semibold text-slate-200">
                Users directory
              </h2>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 pl-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22D3EE]" />
              {users?.length ?? 0} users available
            </p>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-indigo-300 bg-indigo-500/15 border border-indigo-500/35 hover:bg-indigo-500/25 hover:border-indigo-500/55 transition disabled:opacity-60"
          >
            <RefreshCw size={13} className={isFetching ? "animate-spin" : ""} />
            {isFetching ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="py-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3">
                <div className="h-10 w-10 rounded-full bg-slate-800 animate-pulse flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-3 w-32 bg-slate-800 rounded animate-pulse mb-2" />
                  <div className="h-2.5 w-48 bg-slate-800/70 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mx-5 my-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/25 text-rose-400 text-xs">
            <span className="text-base">⚠</span>
            {error.message}
          </div>
        )}

        {/* Users list */}
        {!isLoading && !isError && (
          <ul>
            {users?.map((user, i) => (
              <li
                key={user.id}
                className="flex items-center gap-4 px-6 py-3 border-b border-indigo-500/6 last:border-0 hover:bg-indigo-500/5 transition-colors group"
              >
                <div
                  className={`h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border border-transparent group-hover:border-indigo-500/50 transition-all ${AVATAR_STYLES[i % AVATAR_STYLES.length]}`}
                >
                  {getInitials(user.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-300 truncate">
                    {user.name}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-0.5 truncate">
                    <Mail size={11} />
                    {user.email}
                  </p>
                </div>

                <span className="text-[10px] font-mono text-slate-700 bg-slate-950 border border-indigo-500/10 rounded px-2 py-0.5 flex-shrink-0">
                  #{String(user.id).padStart(3, "0")}
                </span>
              </li>
            ))}

            {users?.length === 0 && (
              <li className="py-16 text-center">
                <p className="text-slate-600 text-sm">No users found.</p>
                <p className="text-slate-700 text-xs mt-1">
                  Add a user to get started.
                </p>
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
