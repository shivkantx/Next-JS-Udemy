import React from "react";
import Link from "next/link";

function SectionPage() {
  return (
    <div className="text-gray-900 flex flex-col gap-4">
      <h1>Section Page</h1>
      <Link href="/settings">Go to Settings</Link>
      <Link href="/admin">Go to Admin</Link>
    </div>
  );
}

export default SectionPage;
