import LogoutButton from "@/components/logout-button";
import { requireAuth } from "@/lib/auth-guard";
import { prisma } from "@/lib/db";
import Image from "next/image";

type GitHubProfile = {
  login?: string;
  name?: string | null;
  email?: string | null;
  avatar_url?: string;
  bio?: string | null;
  location?: string | null;
  public_repos?: number;
  followers?: number;
  following?: number;
  html_url?: string;
};

type HomeProps = {
  searchParams: Promise<{
    provider?: string;
  }>;
};

async function Home({ searchParams }: HomeProps) {
  const session = await requireAuth();
  const { user } = session;

  // Read the provider from the login redirect URL
  const params = await searchParams;

  const provider =
    params.provider === "github" || params.provider === "google"
      ? params.provider
      : null;

  let githubProfile: GitHubProfile | null = null;

  // Only fetch GitHub data when the current login was through GitHub
  if (provider === "github") {
    const githubAccount = await prisma.account.findFirst({
      where: {
        userId: user.id,
        providerId: "github",
      },
      select: {
        accessToken: true,
      },
    });

    if (githubAccount?.accessToken) {
      try {
        const response = await fetch("https://api.github.com/user", {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${githubAccount.accessToken}`,
            "X-GitHub-Api-Version": "2026-03-10",
          },
          cache: "no-store",
        });

        if (response.ok) {
          githubProfile = await response.json();
        } else {
          console.error("GitHub API error:", response.status);
        }
      } catch (error) {
        console.error("GitHub API request failed:", error);
      }
    }
  }

  const providerName =
    provider === "github"
      ? "GitHub"
      : provider === "google"
        ? "Google"
        : "Account";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0e0a1a] px-4 text-white">
      {/* Background */}
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
        {/* Profile Image */}
        <div className="rounded-full bg-gradient-to-r from-purple-400 via-violet-500 to-purple-700 p-[3px] shadow-lg shadow-purple-900/50">
          <div className="rounded-full bg-[#0e0a1a] p-1">
            <Image
              src={
                provider === "github"
                  ? githubProfile?.avatar_url || "/default-avatar.png"
                  : user.image || "/default-avatar.png"
              }
              alt="User profile image"
              width={112}
              height={112}
              className="size-28 rounded-full object-cover"
              priority
              unoptimized
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-2">
          {/* Name */}
          <h1 className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
            {githubProfile?.name || user.name}
          </h1>

          {/* GitHub Username */}
          {provider === "github" && githubProfile?.login && (
            <p className="text-lg text-purple-300">@{githubProfile.login}</p>
          )}

          {/* Email */}
          <p className="text-sm text-purple-200/60">
            {githubProfile?.email || user.email}
          </p>

          {/* GitHub Bio */}
          {provider === "github" && githubProfile?.bio && (
            <p className="max-w-md text-sm text-purple-200/70">
              {githubProfile.bio}
            </p>
          )}

          {/* GitHub Location */}
          {provider === "github" && githubProfile?.location && (
            <p className="text-sm text-purple-200/60">
              📍 {githubProfile.location}
            </p>
          )}
        </div>

        {/* GitHub Statistics */}
        {provider === "github" && githubProfile && (
          <div className="flex gap-3">
            {/* Repositories */}
            <div className="rounded-lg border border-purple-400/20 bg-purple-500/10 px-4 py-2">
              <p className="text-lg font-semibold">
                {githubProfile.public_repos ?? 0}
              </p>

              <p className="text-xs text-purple-200/60">Repositories</p>
            </div>

            {/* Followers */}
            <div className="rounded-lg border border-purple-400/20 bg-purple-500/10 px-4 py-2">
              <p className="text-lg font-semibold">
                {githubProfile.followers ?? 0}
              </p>

              <p className="text-xs text-purple-200/60">Followers</p>
            </div>

            {/* Following */}
            <div className="rounded-lg border border-purple-400/20 bg-purple-500/10 px-4 py-2">
              <p className="text-lg font-semibold">
                {githubProfile.following ?? 0}
              </p>

              <p className="text-xs text-purple-200/60">Following</p>
            </div>
          </div>
        )}

        {/* GitHub Profile */}
        {provider === "github" && githubProfile?.html_url && (
          <a
            href={githubProfile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-purple-400/30 bg-purple-500/10 px-5 py-2 text-sm text-purple-200 transition hover:bg-purple-500/20"
          >
            View GitHub Profile
          </a>
        )}

        {/* Login Provider */}
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200">
          <span className="size-1.5 rounded-full bg-purple-400" />
          Signed in with {providerName}
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
