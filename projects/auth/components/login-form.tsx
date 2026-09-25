"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const [pending, setPending] = useState<"google" | "github" | null>(null);

  // Google Login
  const handleGoogleLogin = async () => {
    setPending("google");

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/?provider=google",
    });
  };

  // GitHub Login
  const handleGithubLogin = async () => {
    setPending("github");

    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/?provider=github",
    });
  };

  return (
    <div className={cn("relative w-full", className)} {...props}>
      <Card className="border border-white/[0.09] bg-[#0d0a18]/90 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        {/* Header */}
        <CardHeader className="px-8 pb-4 pt-7 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </CardTitle>

          <CardDescription className="mt-1 text-sm text-white/40">
            Sign in to continue to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-6">
          <form>
            <FieldGroup className="gap-4">
              {/* Social Login */}
              <div className="flex flex-col gap-3">
                {/* GitHub */}
                <Button
                  variant="outline"
                  type="button"
                  disabled={pending !== null}
                  onClick={handleGithubLogin}
                  className="h-11 w-full border-white/10 bg-white/[0.045] text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                >
                  {pending === "github" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.2.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
                      />
                    </svg>
                  )}

                  <span>Continue with GitHub</span>
                </Button>

                {/* Google */}
                <Button
                  variant="outline"
                  type="button"
                  disabled={pending !== null}
                  onClick={handleGoogleLogin}
                  className="h-11 w-full border-white/10 bg-white/[0.045] text-white transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                >
                  {pending === "google" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.5 5.5 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
                      />

                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.1A12 12 0 0 0 12 24Z"
                      />

                      <path
                        fill="#FBBC05"
                        d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.26a12 12 0 0 0 0 10.76l4.01-3.1Z"
                      />

                      <path
                        fill="#EA4335"
                        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.26 6.62l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
                      />
                    </svg>
                  )}

                  <span>Continue with Google</span>
                </Button>
              </div>

              {/* Divider */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.08]" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-[#0d0a18] px-4 text-[11px] font-medium uppercase tracking-[0.15em] text-white/25">
                    or continue with email
                  </span>
                </div>
              </div>

              {/* Email */}
              <Field className="gap-2">
                <FieldLabel
                  htmlFor="email"
                  className="text-sm font-medium text-white/60"
                >
                  Email address
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-11 border-white/10 bg-white/[0.035] text-sm text-white placeholder:text-white/20 focus-visible:border-violet-500/60 focus-visible:ring-violet-500/20"
                />
              </Field>

              {/* Password */}
              <Field className="gap-2">
                <div className="flex items-center">
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-medium text-white/60"
                  >
                    Password
                  </FieldLabel>

                  <a
                    href="#"
                    className="ml-auto text-xs text-violet-400 transition-colors hover:text-violet-300"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="h-11 border-white/10 bg-white/[0.035] pr-11 text-sm text-white focus-visible:border-violet-500/60 focus-visible:ring-violet-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-violet-400"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </Field>

              {/* Sign In */}
              <Button
                type="submit"
                className="mt-1 h-11 w-full border-0 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-sm font-medium text-white shadow-lg shadow-violet-900/25 transition-all duration-300 hover:from-violet-500 hover:via-purple-500 hover:to-blue-500 hover:shadow-violet-600/30"
              >
                Sign in
              </Button>

              {/* Sign Up */}
              <FieldDescription className="text-center text-xs text-white/35">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                  Create account
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* Terms */}
      <p className="mt-3 px-4 text-center text-[11px] leading-relaxed text-white/25">
        By continuing, you agree to our{" "}
        <a
          href="#"
          className="text-white/40 transition-colors hover:text-white/70"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="text-white/40 transition-colors hover:text-white/70"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
