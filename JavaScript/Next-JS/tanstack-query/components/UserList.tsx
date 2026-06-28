"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCw, Mail, Users, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

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

async function deleteUser(id: number) {
  const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete");
  return response.json();
}

type Toast = { type: "success" | "error" | "loading"; message: string } | null;

export default function UserList() {
  const [toast, setToast] = useState<Toast>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

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

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setToast({
        type: "success",
        message: `${deletingUser?.name ?? "User"} deleted successfully.`,
      });
      setDeletingUser(null);
    },
    onError: () => {
      setToast({
        type: "error",
        message: `Failed to delete ${deletingUser?.name ?? "user"}. Please try again.`,
      });
      setDeletingUser(null);
    },
  });

  // Auto-dismiss only success/error toasts, not loading
  useEffect(() => {
    if (!toast || toast.type === "loading") return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const isDeletingId = deleteMutation.isPending
    ? deleteMutation.variables
    : null;

  const handleDelete = (user: User) => {
    setDeletingUser(user);
    setToast({ type: "loading", message: `Deleting ${user.name}…` });
    deleteMutation.mutate(user.id);
  };

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

        {/* Single toast — handles loading, success, error */}
        {toast && (
          <div
            className={`mx-5 my-3 flex items-center justify-between gap-2.5 px-4 py-3 rounded-xl border text-xs transition-all ${
              toast.type === "loading"
                ? "bg-rose-500/5 border-rose-500/15 text-rose-400"
                : toast.type === "success"
                  ? "bg-emerald-500/8 border-emerald-500/25 text-emerald-400"
                  : "bg-rose-500/8 border-rose-500/25 text-rose-400"
            }`}
          >
            <span className="flex items-center gap-2">
              {toast.type === "loading" ? (
                <RefreshCw size={12} className="animate-spin flex-shrink-0" />
              ) : (
                <span>{toast.type === "success" ? "✓" : "⚠"}</span>
              )}
              {toast.message}
            </span>
            {toast.type !== "loading" && (
              <button
                onClick={() => setToast(null)}
                className="opacity-50 hover:opacity-100 transition-opacity text-base leading-none cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        )}

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

        {/* Fetch error */}
        {isError && (
          <div className="mx-5 my-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/25 text-rose-400 text-xs">
            <span className="text-base">⚠</span>
            {error.message}
          </div>
        )}

        {/* Users list */}
        {!isLoading && !isError && (
          <ul>
            {users?.map((user, i) => {
              const isDeleting = isDeletingId === user.id;
              return (
                <li
                  key={user.id}
                  className={`flex items-center gap-4 px-6 py-3 border-b border-indigo-500/6 last:border-0 transition-colors group ${
                    isDeleting
                      ? "opacity-40 bg-rose-500/5"
                      : "hover:bg-indigo-500/5"
                  }`}
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

                  <button
                    onClick={() => handleDelete(user)}
                    disabled={isDeleting}
                    aria-label={`Delete ${user.name}`}
                    className="flex-shrink-0 p-2 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isDeleting ? (
                      <RefreshCw
                        size={14}
                        className="animate-spin"
                        style={{ color: "#f43f5e" }}
                      />
                    ) : (
                      <Trash2 size={14} style={{ color: "#f43f5e" }} />
                    )}
                  </button>
                </li>
              );
            })}

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
