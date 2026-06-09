"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

function AddUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    mutation.mutate({ name, email });
  };

  return (
    <section className="px-4 py-10 font-sans">
      <div className="max-w-md mx-auto rounded-2xl overflow-hidden border border-indigo-500/20 bg-slate-900">
        {/* Header */}
        <div className="px-6 py-5 border-b border-indigo-500/10 bg-gradient-to-r from-indigo-500/5 to-transparent">
          <div className="flex items-center gap-2 mb-1">
            <UserPlus size={18} className="text-indigo-400" />
            <h2 className="text-base font-semibold text-slate-200">
              Add new user
            </h2>
          </div>
          <p className="text-xs text-slate-500 pl-6">
            Fill in the details below to create an account
          </p>
        </div>

        {/* Form */}
        <form className="px-6 py-6 space-y-4" onSubmit={handleSubmit}>
          {/* Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-[10px] font-medium uppercase tracking-widest text-slate-500 mb-1.5"
            >
              Full name
            </label>
            <div className="relative">
              <User
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
              />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Appleseed"
                className="w-full bg-slate-950 border border-indigo-500/15 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-300 placeholder-slate-700 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all"
              />
            </div>
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] font-medium uppercase tracking-widest text-slate-500 mb-1.5"
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full bg-slate-950 border border-indigo-500/15 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-300 placeholder-slate-700 font-mono outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all"
              />
            </div>
          </div>

          {/* Error */}
          {mutation.isError && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/25 text-rose-400 text-xs">
              <AlertCircle size={14} className="flex-shrink-0" />
              Failed to add user. Please try again.
            </div>
          )}

          {/* Success */}
          {mutation.isSuccess && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/8 border border-emerald-500/25 text-emerald-400 text-xs">
              <CheckCircle2 size={14} className="flex-shrink-0" />
              User added successfully!
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/35 text-indigo-300 text-sm font-medium hover:bg-indigo-500/25 hover:border-indigo-500/55 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <UserPlus size={15} />
            {mutation.isPending ? "Creating user…" : "Create user"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddUserForm;
