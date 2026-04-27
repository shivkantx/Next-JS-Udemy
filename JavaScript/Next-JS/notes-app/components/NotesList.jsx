import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import React from "react";
import Link from "next/link";

const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
};

async function NotesList() {
    await dbConnect();
    const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
    const serialized = notes.map((note) => ({
        ...note,
        _id: note._id.toString(),
        createdAt: note.createdAt?.toString(),
        updatedAt: note.updatedAt?.toString(),
    }));

    return (
        <div className="w-full">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
                .font-lora { font-family: 'Lora', Georgia, serif; }
                .font-dm { font-family: 'DM Sans', sans-serif; }

                .note-card {
                    transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease;
                }
                .note-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 16px 40px rgba(180, 80, 100, 0.15);
                }

                .btn-edit {
                    background: rgba(91, 155, 213, 0.15);
                    color: #3A7BBF;
                    border: 1px solid rgba(91, 155, 213, 0.3);
                    transition: all 0.15s ease;
                }
                .btn-edit:hover {
                    background: #5B9BD5;
                    color: white;
                    border-color: #5B9BD5;
                }

                .btn-delete {
                    background: rgba(224, 92, 110, 0.12);
                    color: #C94D5F;
                    border: 1px solid rgba(224, 92, 110, 0.25);
                    transition: all 0.15s ease;
                }
                .btn-delete:hover {
                    background: #E05C6E;
                    color: white;
                    border-color: #E05C6E;
                }

                .fade-up {
                    animation: fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both;
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: none; }
                }

                .empty-bounce {
                    animation: emptyBounce 2s ease-in-out infinite;
                }
                @keyframes emptyBounce {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-6px); }
                }

                .count-badge {
                    background: linear-gradient(135deg, #FFB3C1, #FF8A9B);
                    color: white;
                }
            `}</style>

            {/* Notes count */}
            <div className="flex items-center gap-3 mb-6 px-6">
                {serialized.length > 0 && (
                    <span className="count-badge font-dm text-xs font-medium px-3 py-1 rounded-full">
                        {serialized.length} {serialized.length === 1 ? "note" : "notes"}
                    </span>
                )}
                <div className="flex-1 h-px bg-[#F0C4CC]/60" />
            </div>

            {/* Empty state */}
            {serialized.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center px-6">
                    <div className="empty-bounce w-16 h-16 rounded-2xl bg-[#FFE4EC] flex items-center justify-center mb-5">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <rect x="5" y="4" width="18" height="20" rx="3" stroke="#FF8A9B" strokeWidth="1.5" />
                            <path d="M9 10h10M9 14h7M9 18h5" stroke="#FF8A9B" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h3 className="font-lora text-xl text-[#3D1A24] mb-2">No notes yet</h3>
                    <p className="font-dm text-sm text-[#9A7A80]">Your thoughts are waiting to be written.</p>
                </div>
            )}

            {/* Notes list */}
            <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-2xl px-6 flex flex-col gap-3">
                    {serialized.map((note, i) => (
                        <div
                            key={note._id}
                            className="note-card fade-up bg-[#FFE4EC] rounded-2xl border border-[#FFB3C1]/50 overflow-hidden"
                            style={{ animationDelay: `${i * 0.06}s` }}
                        >
                            {/* Top accent */}
                            <div className="h-[3px] bg-gradient-to-r from-[#FF8A9B] via-[#FFB3C1] to-[#FFD6DF]" />

                            <div className="p-4 flex flex-col gap-2">
                                {/* Title */}
                                <h2 className="font-lora text-[#3D1A24] text-base font-semibold leading-snug truncate">
                                    {note.title}
                                </h2>

                                {/* Content */}
                                <p className="font-dm text-[#7A4050] text-xs leading-relaxed line-clamp-2">
                                    {note.content}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-[#3D1A24]/50 text-xs">{note.createdAt}</span>
                                    <div className="flex items-center gap-1.5">
                                        <button className="btn-edit font-dm text-[11px] font-medium px-3 py-1 rounded-full">
                                            ✏️ Edit
                                        </button>
                                        <button className="btn-delete font-dm text-[11px] font-medium px-3 py-1 rounded-full">
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotesList;