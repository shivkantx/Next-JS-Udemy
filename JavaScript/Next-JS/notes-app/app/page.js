import Link from "next/link";
import NotesList from "@/components/NotesList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-lora { font-family: 'Lora', Georgia, serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
        .btn-new { transition: background 0.15s, transform 0.15s; }
        .btn-new:hover { background: #1a1a1a; transform: scale(1.02); }
        .logo-icon { transition: transform 0.2s; }
        .logo-icon:hover { transform: rotate(-5deg) scale(1.05); }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#F7F5F0]/90 backdrop-blur-sm border-b border-[#E0DCD4]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="logo-icon w-8 h-8 rounded-lg bg-[#2C2C2C] flex items-center justify-center shadow-sm">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="10"
                  height="1.5"
                  rx="0.75"
                  fill="#F7F5F0"
                />
                <rect
                  x="2"
                  y="6"
                  width="7"
                  height="1.5"
                  rx="0.75"
                  fill="#F7F5F0"
                />
                <rect
                  x="2"
                  y="10"
                  width="8.5"
                  height="1.5"
                  rx="0.75"
                  fill="#F7F5F0"
                />
              </svg>
            </div>
            <span className="font-dm text-[#2C2C2C] text-sm tracking-tight">
              my notes
            </span>
          </a>
          <Link
            href="/notes/new"
            className="btn-new font-dm text-sm font-medium bg-[#2C2C2C] text-[#F7F5F0] px-4 py-2 rounded-full"
          >
            + New note
          </Link>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <NotesList />
      </main>
    </div>
  );
}
