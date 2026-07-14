"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UserPlus, User, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

type UserData = {
  name: string;
  email: string;
};

async function addUser(userData: UserData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to add user");
  return response.json();
}

interface AddUserFormProps {
  redirectOnSuccess?: string;
}

function AddUserForm({ redirectOnSuccess }: AddUserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setName("");
      setEmail("");
      if (redirectOnSuccess) {
        router.push(redirectOnSuccess);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    mutation.mutate({ name, email });
  };

  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20">
            <UserPlus size={20} />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-100">
              Add a new user
            </p>
            <p className="text-sm text-slate-500">
              Create a user and watch the directory refresh instantly.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
          <span className="rounded-full bg-white/5 px-3 py-1">
            Fast onboarding
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1">
            Clean user list
          </span>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-2"
          >
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Appleseed"
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-12 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-2"
          >
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-12 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
            />
          </div>
        </div>

        {mutation.isError && (
          <div className="flex items-center gap-3 rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            <AlertCircle size={16} className="text-rose-300" />
            <span>Failed to add user. Please try again.</span>
          </div>
        )}

        {mutation.isSuccess && (
          <div className="flex items-center gap-3 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            <CheckCircle2 size={16} className="text-emerald-300" />
            <span>User added successfully!</span>
          </div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/10 transition hover:-translate-y-0.5 hover:shadow-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <UserPlus size={16} />
          {mutation.isPending ? "Creating user…" : "Create user"}
        </button>
      </form>

      <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-400">
        <p className="font-semibold text-slate-100">Quick tip</p>
        <p>
          Use a real name and email to keep the directory readable and
          consistent.
        </p>
      </div>
    </section>
  );
}

export default AddUserForm;
