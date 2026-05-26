"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCw, Mail, Wifi, WifiOff } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  active?: boolean;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const gradients: Record<number, string> = {
  0: "from-violet-500 to-purple-600",
  1: "from-rose-400 to-pink-600",
  2: "from-amber-400 to-orange-500",
  3: "from-emerald-400 to-teal-600",
  4: "from-sky-400 to-blue-600",
};

export default function UserList() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const lastFetched = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  const skeletonCount = users?.length ?? 10;

  return (
    <div className="bg-gray-950 rounded-2xl overflow-hidden border border-gray-800">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-gray-800 bg-gray-900">
        <div>
          <h2 className="text-white font-semibold text-base">Team members</h2>
          <p className="text-gray-400 text-xs mt-0.5">
            {users ? `${users.length} users loaded` : "Fetching users..."}
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 text-[13px] font-medium text-white bg-violet-600 hover:bg-violet-500 disabled:opacity-60 px-4 py-2 rounded-xl transition-colors"
        >
          <RefreshCw size={13} className={isFetching ? "animate-spin" : ""} />
          {isFetching ? "Syncing..." : "Sync"}
        </button>
      </div>

      {/* Error */}
      {isError && (
        <div className="mx-4 mt-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
          <WifiOff size={16} className="text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">{error.message}</p>
        </div>
      )}

      {/* Skeleton */}
      {isLoading && (
        <div className="p-4 grid grid-cols-1 gap-3">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex items-center gap-4 bg-gray-900 rounded-xl px-4 py-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-800 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-gray-800 rounded-full w-32" />
                <div className="h-3 bg-gray-800/70 rounded-full w-48" />
              </div>
              <div className="h-5 w-14 bg-gray-800 rounded-full" />
            </div>
          ))}
        </div>
      )}

      {/* User grid */}
      {!isLoading && !isError && (
        <div className="p-4 grid grid-cols-1 gap-3">
          {users?.map((user, i) => (
            <div
              key={user.id}
              className="group flex items-center gap-4 bg-gray-900 hover:bg-gray-800 rounded-xl px-4 py-3 transition-colors cursor-default"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradients[i % 5]} flex items-center justify-center text-white text-sm font-semibold shrink-0`}
              >
                {getInitials(user.name)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                  <Mail size={11} />
                  {user.email}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    user.active !== false ? "bg-emerald-400" : "bg-gray-600"
                  }`}
                />
                <span
                  className={`text-[11px] font-medium ${
                    user.active !== false ? "text-emerald-400" : "text-gray-500"
                  }`}
                >
                  {user.active !== false ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-800 bg-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Wifi size={12} className="text-emerald-400" />
          <span className="text-[11px] text-gray-500">
            key: <code className="text-gray-400 font-mono">["users"]</code>
          </span>
        </div>
        <span className="text-[11px] text-gray-500">
          {lastFetched ? `Synced at ${lastFetched}` : "Not yet synced"}
        </span>
      </div>
    </div>
  );
}
