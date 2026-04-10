interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  hireable: boolean | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

export default async function Home() {
  const res = await fetch("https://api.github.com/users/shivkantx", {
    next: { revalidate: 3600 },
  });
  const user: GitHubUser = await res.json();
  const year = new Date(user.created_at).getFullYear();

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-xs overflow-hidden">
        {/* Top color band */}
        <div className="h-16 bg-gradient-to-br from-violet-500 to-indigo-600 relative">
          {user.hireable && (
            <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              hireable
            </span>
          )}
        </div>

        <div className="px-5 pb-5 my-10">
          {/* Avatar */}
          <div className="-mt-8 mb-3">
            <img
              src={user.avatar_url}
              alt={user.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-xl border-2 border-white shadow-md object-cover"
            />
          </div>

          {/* Name + handle */}
          <h1 className="text-sm font-semibold text-slate-900 leading-tight">
            {user.name}
          </h1>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-slate-400 hover:text-violet-500 transition-colors"
          >
            @{user.login}
          </a>

          {/* Bio */}
          {user.bio && (
            <p className="mt-2 text-[11px] text-slate-500 leading-relaxed line-clamp-2">
              {user.bio}
            </p>
          )}

          {/* Meta */}
          <div className="mt-3 space-y-1">
            {user.location && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <svg
                  className="w-3 h-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                {user.location}
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <svg
                  className="w-3 h-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
                {user.company}
              </div>
            )}
            {user.blog && (
              <a
                href={user.blog}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-violet-400 hover:text-violet-600 transition-colors"
              >
                <svg
                  className="w-3 h-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                Portfolio
              </a>
            )}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-slate-100" />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: "repos", value: user.public_repos },
              { label: "followers", value: user.followers },
              { label: "following", value: user.following },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl py-2.5">
                <p className="text-sm font-semibold text-slate-800">{value}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-xl py-2.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>

          <p className="mt-3 text-center text-[10px] text-slate-300">
            Member since {year}
          </p>
        </div>
      </div>
    </main>
  );
}
