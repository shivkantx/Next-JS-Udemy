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
    <section className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20">
              <Users size={18} />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-100">
                Users directory
              </p>
              <p className="text-sm text-slate-400">
                A clean, responsive list with create and delete actions.
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">
            {users?.length ?? 0} users available
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-2 rounded-3xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-200 transition hover:border-indigo-500/40 hover:bg-indigo-500/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {toast && (
        <div
          className={`mb-5 rounded-3xl border px-4 py-3 text-sm shadow-sm transition ${
            toast.type === "loading"
              ? "border-rose-500/20 bg-rose-500/10 text-rose-200"
              : toast.type === "success"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                : "border-rose-500/20 bg-rose-500/10 text-rose-200"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {toast.type === "loading" ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <span>{toast.type === "success" ? "✓" : "⚠"}</span>
              )}
              <span>{toast.message}</span>
            </div>
            {toast.type !== "loading" && (
              <button
                onClick={() => setToast(null)}
                className="text-slate-300 hover:text-slate-100"
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3 py-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-3xl bg-slate-950/90 px-6 py-4 shadow-sm"
            >
              <div className="h-12 w-12 rounded-full bg-slate-800 animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-3 w-3/5 rounded-full bg-slate-800 animate-pulse" />
                <div className="h-2 w-1/2 rounded-full bg-slate-800/80 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-4 text-sm text-rose-200">
          {error.message}
        </div>
      )}

      {!isLoading && !isError && (
        <ul className="space-y-3">
          {users?.map((user, i) => {
            const isDeleting = isDeletingId === user.id;
            return (
              <li
                key={user.id}
                className={`rounded-3xl border border-white/5 bg-slate-950/90 p-4 shadow-sm transition ${
                  isDeleting ? "opacity-50" : "hover:bg-slate-900/90"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-3xl text-sm font-semibold ${AVATAR_STYLES[i % AVATAR_STYLES.length]}`}
                  >
                    {getInitials(user.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-100 truncate">
                      {user.name}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-slate-500 font-mono truncate">
                      <Mail size={12} />
                      {user.email}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full bg-slate-900/90 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      #{String(user.id).padStart(3, "0")}
                    </span>
                    <button
                      onClick={() => handleDelete(user)}
                      disabled={isDeleting}
                      aria-label={`Delete ${user.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-3xl border border-rose-500/15 bg-rose-500/10 text-rose-300 transition hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}

          {users?.length === 0 && (
            <li className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 p-12 text-center text-sm text-slate-500">
              <p className="text-slate-400">No users found yet.</p>
              <p className="mt-2 text-xs">
                Add a user to populate the directory.
              </p>
            </li>
          )}
        </ul>
      )}
    </section>
  );
}
