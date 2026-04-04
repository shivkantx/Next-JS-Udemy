import React from "react";
import Link from "next/link";

function DashboradPage() {
  return (
    <div className="text-gray-900 flex flex-col gap-4">
      <h1 className="text-gray-900 text-2xl font-bold">Dashboard Page</h1>
      <Link href={"/dashboard/reports"}>view Reports</Link>
      <Link href={"/profile"}>Go to Profile</Link>
      <Link href={"/admin"}>Go to Admin</Link>
    </div>
  );
}

export default DashboradPage;
