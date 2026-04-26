import dbConnect from "@/lib/db.js";
import Note from "@/models/Note";
import Link from "next/link";
import NotesClient from "@/components/NotesClient"; // ← add this

export default async function Home() {
  // ...existing code...

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-serif">
      {/* ...existing header... */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* ...existing notes list... */}
        <NotesClient /> {/* ← add at bottom */}
      </main>
    </div>
  );
}
