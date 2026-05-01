"use client";

import React from "react";
import { useRouter } from "next/navigation";

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function NotesList() {
    const router = useRouter();
    const [notes, setNotes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [deletingId, setDeletingId] = React.useState(null);

    React.useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch("/api/notes");
                const data = await res.json();
                if (data.success) setNotes(data.data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const deleteNote = async (id) => {
        if (!confirm("Delete this note?")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
            const result = await res.json();
            console.log("Delete result:", result);
            if (result.success) {
                setNotes((prev) => prev.filter((n) => n._id !== id));
            }
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
                .font-lora { font-family: 'Lora', Georgia, serif; }
                .font-dm   { font-family: 'DM Sans', sans-serif; }
                .notes-wrapper { width: 100%; max-width: 720px; margin: 0 auto; }
                .page-title { font-family: 'Lora', serif; font-size: 28px; font-weight: 600; color: #F5EDE4; letter-spacing: -0.5px; }
                .page-sub { font-family: 'DM Sans', sans-serif; font-size: 13px; color: #6B5A4A; margin-top: 4px; }
                .count-pill { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; color: #1A1410; background: linear-gradient(135deg, #C4956A, #E8B48A); padding: 3px 11px; border-radius: 999px; }
                .note-card { background: #161E2A; border: 1px solid #243040; border-radius: 16px; overflow: hidden; animation: cardIn 0.45s cubic-bezier(0.22,1,0.36,1) both; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; cursor: pointer; }
                .note-card:hover { transform: translateY(-3px); border-color: #C4956A; box-shadow: 0 16px 48px rgba(196,149,106,0.15); }
                @keyframes cardIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                .note-accent { height: 2px; background: linear-gradient(90deg, #C4956A, #E8B48A, transparent); }
                .note-inner { padding: 18px 22px 16px; display: flex; flex-direction: column; }
                .note-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
                .note-title { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #F5EDE4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
                .note-index { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; color: #6B5A4A; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 999px; white-space: nowrap; flex-shrink: 0; }
                .note-content { font-family: 'DM Sans', sans-serif; font-size: 13px; color: #8A7060; line-height: 1.7; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 14px; }
                .note-divider { height: 1px; background: linear-gradient(90deg, rgba(196,149,106,0.2), transparent); margin-bottom: 12px; }
                .note-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
                .note-time { font-family: 'DM Sans', sans-serif; font-size: 11px; color: #4A3C30; display: flex; align-items: center; gap: 5px; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .btn-edit { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; color: #7BB8E8; background: rgba(123,184,232,0.08); border: 1px solid rgba(123,184,232,0.2); padding: 5px 14px; border-radius: 999px; cursor: pointer; transition: all 0.15s ease; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
                .btn-edit:hover { background: #5B9BD5; color: white; border-color: #5B9BD5; transform: translateY(-1px); }
                .btn-delete { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; color: #E08080; background: rgba(224,92,110,0.08); border: 1px solid rgba(224,92,110,0.18); padding: 5px 14px; border-radius: 999px; cursor: pointer; transition: all 0.15s ease; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
                .btn-delete:hover { background: #E05C6E; color: white; border-color: #E05C6E; transform: translateY(-1px); }
                .btn-delete:disabled { opacity: 0.45; cursor: not-allowed; }
                .empty-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 24px; text-align: center; }
                .empty-icon { width: 64px; height: 64px; border-radius: 18px; background: rgba(196,149,106,0.08); border: 1px solid rgba(196,149,106,0.2); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; animation: floatAnim 3s ease-in-out infinite; }
                @keyframes floatAnim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .skeleton { background: linear-gradient(90deg, #1E1A14, #2A2218, #1E1A14); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 16px; height: 100px; }
                @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
            `}</style>

            <div className="notes-wrapper">

                {/* Header */}
                <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                        <h1 className="page-title">Your Notes</h1>
                        {notes.length > 0 && <span className="count-pill">{notes.length}</span>}
                    </div>
                    <p className="page-sub">Everything you've written, in one place.</p>
                    <div style={{ marginTop: "16px", height: "1px", background: "linear-gradient(90deg, #3A2E24, transparent)" }} />
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="skeleton" />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && notes.length === 0 && (
                    <div className="empty-wrap">
                        <div className="empty-icon">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <rect x="5" y="4" width="18" height="20" rx="3" stroke="#C4956A" strokeWidth="1.5" />
                                <path d="M9 10h10M9 14h7M9 18h5" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="font-lora" style={{ fontSize: "20px", color: "#F5EDE4", marginBottom: "8px" }}>No notes yet</h3>
                        <p className="font-dm" style={{ fontSize: "13px", color: "#6B5A4A" }}>Your thoughts are waiting to be written.</p>
                    </div>
                )}

                {/* Notes list */}
                {!loading && notes.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {notes.map((note, i) => (
                            <div
                                key={note._id}
                                className="note-card"
                                style={{ animationDelay: `${i * 0.055}s` }}
                            >
                                <div className="note-accent" />
                                <div className="note-inner">
                                    <div className="note-top">
                                        <h2 className="note-title">{note.title}</h2>
                                        <span className="note-index">#{notes.length - i}</span>
                                    </div>
                                    <p className="note-content">{note.content}</p>
                                    <div className="note-divider" />
                                    <div className="note-footer">
                                        <span className="note-time">
                                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                <circle cx="6" cy="6" r="5" stroke="#4A3C30" strokeWidth="1.2" />
                                                <path d="M6 3.5V6l1.5 1.5" stroke="#4A3C30" strokeWidth="1.2" strokeLinecap="round" />
                                            </svg>
                                            {formatDate(note.updatedAt || note.createdAt)}
                                        </span>
                                        <div style={{ display: "flex", gap: "6px" }}>
                                            <button className="btn-edit">
                                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                    <path d="M8.5 1.5l2 2L4 10H2v-2L8.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                disabled={deletingId === note._id}
                                                onClick={() => deleteNote(note._id)}
                                            >
                                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 3h8M5 3V2h2v1M4 3v7h4V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {deletingId === note._id ? "Deleting..." : "Delete"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}