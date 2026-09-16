import { requireUnAuth } from "@/lib/auth-guard";
import React from "react";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  await requireUnAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {children}
    </div>
  );
}

export default AuthLayout;
