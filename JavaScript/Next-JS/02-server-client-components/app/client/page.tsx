"use client";
import { useEffect, useState } from "react";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

export default function ClientPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.github.com/users/shivkantx");
      setUser(await res.json());
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-3">
        {/* Counter */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between">
          <p
            className={`text-3xl font-bold ${count > 0 ? "text-violet-600" : count < 0 ? "text-rose-500" : "text-slate-300"}`}
          >
            {count}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="w-9 h-9 rounded-xl border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
            >
              −
            </button>
            <button
              onClick={() => setCount(0)}
              className="w-9 h-9 rounded-xl border border-slate-200 text-slate-300 hover:bg-slate-100 transition-all text-xs"
            >
              ↺
            </button>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="w-9 h-9 rounded-xl border border-slate-200 text-slate-400 hover:bg-violet-50 hover:text-violet-600 transition-all"
            >
              +
            </button>
          </div>
        </div>

        {/* Profile */}
        {user && (
          <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {user.name}
              </p>
              <p className="text-[11px] text-slate-400">@{user.login}</p>
              <div className="flex gap-3 mt-1 text-[10px] text-slate-400">
                <span>{user.public_repos} repos</span>
                <span>{user.followers} followers</span>
              </div>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-violet-500 hover:text-violet-700 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
