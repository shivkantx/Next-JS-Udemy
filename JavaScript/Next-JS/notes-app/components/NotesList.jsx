"use client";

import React from "react";

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
    const [notes, setNotes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [deletingId, setDeletingId] = React.useState(null);

    // edit state
    const [editingNote, setEditingNote] = React.useState(null);
    const [editTitle, setEditTitle] = React.useState("");
    const [editContent, setEditContent] = React.useState("");
    const [editLoading, setEditLoading] = React.useState(false);
    const [editError, setEditError] = React.useState("");

    const startedit = (note) => {
        setEditingNote(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const cancelEdit = () => {
        setEditingNote(null);
        setEditTitle("");
        setEditContent("");
        setEditError("");
    };

    const saveEdit = async (id) => {
        setEditLoading(true);
        const res = await fetch(`/api/notes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: editTitle, content: editContent }),
        });

        const result = await res.json();

        if (result.success) {
            setNotes((notes) =>
                notes.map((note) => (note._id === id ? result.data : note))
            );
            cancelEdit();
        } else {
            setEditError(result.error || "Something went wrong");
        }
        setEditLoading(false);
    };

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

    const cardColors = [
        { bg: "#0F172A", border: "#1E3A5F", accent: "linear-gradient(90deg, #3B82F6, #60A5FA, transparent)" },
        { bg: "#1A0F2E", border: "#3B1F6B", accent: "linear-gradient(90deg, #8B5CF6, #A78BFA, transparent)" },
        { bg: "#1A1028", border: "#3D1A6B", accent: "linear-gradient(90deg, #7C3AED, #C084FC, transparent)" },
        { bg: "#0F2A1A", border: "#1A5C35", accent: "linear-gradient(90deg, #10B981, #34D399, transparent)" },
        { bg: "#2A1018", border: "#6B1A2E", accent: "linear-gradient(90deg, #F43F5E, #FB7185, transparent)" },
        { bg: "#1A1F0A", border: "#3D4F10", accent: "linear-gradient(90deg, #84CC16, #A3E635, transparent)" },
        { bg: "#2A1A08", border: "#6B3D10", accent: "linear-gradient(90deg, #F97316, #FB923C, transparent)" },
    ];

    return (
        <div style={{ width: "100%" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
                .font-lora { font-family: 'Lora', Georgia, serif; }
                .font-dm   { font-family: 'DM Sans', sans-serif; }
                .font-mono { font-family: 'JetBrains Mono', monospace; }

                .notes-wrapper { width: 100%; max-width: 720px; margin: 0 auto; }

                .page-title { font-family: 'Lora', serif; font-size: 28px; font-weight: 600; color: #F0F0F0; letter-spacing: -0.5px; }
                .page-sub { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #3D3D3D; margin-top: 6px; }
                .count-pill { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; color: #7C3AED; background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.25); padding: 3px 10px; border-radius: 999px; }

                .note-card { border-radius: 16px; overflow: hidden; animation: cardIn 0.45s cubic-bezier(0.22,1,0.36,1) both; transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; border-width: 1px; border-style: solid; }
                .note-card:hover { transform: translateY(-3px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
                @keyframes cardIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

                .note-inner { padding: 18px 22px 16px; display: flex; flex-direction: column; }
                .note-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
                .note-title { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #F0F0F0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
                .note-index { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; color: #4A4A4A; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 999px; white-space: nowrap; flex-shrink: 0; }
                .note-content { font-family: 'DM Sans', sans-serif; font-size: 13px; color: #6A6A6A; line-height: 1.7; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 14px; }
                .note-divider { height: 1px; background: rgba(255,255,255,0.04); margin-bottom: 12px; }
                .note-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
                .note-time { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #3A3A3A; display: flex; align-items: center; gap: 5px; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

                .btn-edit { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; color: #60A5FA; background: rgba(96,165,250,0.08); border: 1px solid rgba(96,165,250,0.18); padding: 5px 14px; border-radius: 8px; cursor: pointer; transition: all 0.15s ease; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
                .btn-edit:hover { background: #3B82F6; color: white; border-color: #3B82F6; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(59,130,246,0.3); }

                .btn-delete { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; color: #F87171; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.18); padding: 5px 14px; border-radius: 8px; cursor: pointer; transition: all 0.15s ease; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
                .btn-delete:hover { background: #EF4444; color: white; border-color: #EF4444; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(239,68,68,0.3); }
                .btn-delete:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

                .empty-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 24px; text-align: center; }
                .empty-icon { width: 72px; height: 72px; border-radius: 20px; background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.2); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; animation: floatAnim 3s ease-in-out infinite; }
                @keyframes floatAnim { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

                .skeleton { border-radius: 16px; height: 100px; background: linear-gradient(90deg, #141414, #1E1E1E, #141414); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
                @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

                .heading-line { height: 1px; background: linear-gradient(90deg, rgba(124,58,237,0.3), transparent); margin-top: 16px; }

                /* ── Edit form styles ── */
                .edit-card { background: #161616; border: 1px solid #2A2A2A; border-radius: 16px; overflow: hidden; animation: cardIn 0.4s cubic-bezier(0.22,1,0.36,1) both; box-shadow: 0 20px 60px rgba(0,0,0,0.5); transition: border-color 0.3s; }
                .edit-card:focus-within { border-color: rgba(16,185,129,0.4); box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(16,185,129,0.06); }

                .edit-chrome { background: #1E1E1E; border-bottom: 1px solid #2A2A2A; padding: 12px 20px; display: flex; align-items: center; gap: 10px; }
                .edit-dot { width: 12px; height: 12px; border-radius: 50%; }
                .edit-chrome-title { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #4A4A4A; flex: 1; text-align: center; }
                .edit-badge { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #10B981; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); padding: 2px 8px; border-radius: 999px; }

                .edit-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #3D3D3D; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
                .edit-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, #2A2A2A, transparent); }

                .edit-title-input { font-family: 'Lora', serif; font-size: 22px; font-weight: 600; color: #F0F0F0; background: transparent; outline: none; width: 100%; border: none; line-height: 1.3; }
                .edit-title-input::placeholder { color: #2A2A2A; }

                .edit-textarea { font-family: 'DM Sans', sans-serif; font-size: 14px; color: #9A9A9A; background: transparent; outline: none; width: 100%; border: none; line-height: 1.9; resize: none; }
                .edit-textarea::placeholder { color: #2A2A2A; }

                .edit-char-count { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #3D3D3D; text-align: right; margin-top: 6px; }

                .edit-progress-track { height: 1px; background: #1F1F1F; border-radius: 999px; overflow: hidden; }
                .edit-progress-fill { height: 100%; background: linear-gradient(90deg, #10B981, #34D399); border-radius: 999px; transition: width 0.3s ease; }

                .btn-cancel-edit { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #4A4A4A; background: transparent; border: 1px solid #2A2A2A; padding: 7px 14px; border-radius: 8px; cursor: pointer; transition: all 0.15s; }
                .btn-cancel-edit:hover { background: #1E1E1E; color: #7A7A7A; }

                .btn-update { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: white; background: linear-gradient(135deg, #059669, #10B981); border: none; padding: 7px 18px; border-radius: 8px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 4px 12px rgba(16,185,129,0.3); display: flex; align-items: center; gap: 6px; }
                .btn-update:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(16,185,129,0.4); }
                .btn-update:disabled { opacity: 0.4; cursor: not-allowed; }

                .edit-error { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #F87171; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2); padding: 4px 10px; border-radius: 6px; }
            `}</style>

            <div className="notes-wrapper">

                {/* Header */}
                <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                        <h1 className="page-title">Your Notes</h1>
                        {notes.length > 0 && <span className="count-pill">{notes.length}</span>}
                    </div>
                    <p className="page-sub">// everything you've written, in one place</p>
                    <div className="heading-line" />
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {[1, 2, 3].map((n) => <div key={n} className="skeleton" />)}
                    </div>
                )}

                {/* Empty state */}
                {!loading && notes.length === 0 && (
                    <div className="empty-wrap">
                        <div className="empty-icon">
                            <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
                                <rect x="5" y="4" width="18" height="20" rx="3" stroke="#7C3AED" strokeWidth="1.5" />
                                <path d="M9 10h10M9 14h7M9 18h5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="font-lora" style={{ fontSize: "20px", color: "#F0F0F0", marginBottom: "8px" }}>No notes yet</h3>
                        <p className="font-mono" style={{ fontSize: "11px", color: "#3D3D3D" }}>// your thoughts are waiting to be written</p>
                    </div>
                )}

                {/* Notes list */}
                {!loading && notes.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {notes.map((note, i) => {
                            const color = cardColors[i % cardColors.length];

                            // ── EDIT FORM — shows in place of the card ──
                            if (editingNote === note._id) {
                                const editProgress = Math.round((editContent.length / 2000) * 100);
                                return (
                                    <div key={note._id} className="edit-card">

                                        {/* Chrome bar */}
                                        <div className="edit-chrome">
                                            <div className="edit-dot" style={{ background: "#FF5F57" }} />
                                            <div className="edit-dot" style={{ background: "#FEBC2E" }} />
                                            <div className="edit-dot" style={{ background: "#28C840" }} />
                                            <span className="edit-chrome-title">{editTitle || "editing note"}</span>
                                            <span className="edit-badge">editing</span>
                                        </div>

                                        {/* Title field */}
                                        <div style={{ padding: "24px 28px 16px", borderBottom: "1px solid #1F1F1F" }}>
                                            <div className="edit-label">title</div>
                                            <input
                                                type="text"
                                                placeholder="Note title..."
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                maxLength={100}
                                                className="edit-title-input"
                                            />
                                            {editTitle.length > 0 && (
                                                <div className="edit-char-count">{editTitle.length}/100</div>
                                            )}
                                        </div>

                                        {/* Content field */}
                                        <div style={{ padding: "16px 28px 12px" }}>
                                            <div className="edit-label">content</div>
                                            <textarea
                                                placeholder="Update your note..."
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                maxLength={2000}
                                                rows={5}
                                                className="edit-textarea"
                                            />
                                        </div>

                                        {/* Progress bar */}
                                        <div style={{ padding: "0 28px", marginBottom: "2px" }}>
                                            <div className="edit-progress-track">
                                                <div className="edit-progress-fill" style={{ width: `${editProgress}%` }} />
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div style={{ padding: "12px 28px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <span className="font-mono" style={{ fontSize: "10px", color: "#3D3D3D" }}>
                                                {editContent.length}/2000
                                            </span>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                {editError && <span className="edit-error">{editError}</span>}
                                                <button onClick={cancelEdit} className="btn-cancel-edit">
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => saveEdit(note._id)}
                                                    disabled={editLoading || !editTitle.trim() || !editContent.trim()}
                                                    className="btn-update"
                                                >
                                                    {editLoading ? (
                                                        "Updating..."
                                                    ) : (
                                                        <>
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                <path d="M2 6.5l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            Update note
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // ── NORMAL CARD ──
                            return (
                                <div
                                    key={note._id}
                                    className="note-card"
                                    style={{ backgroundColor: color.bg, borderColor: color.border, animationDelay: `${i * 0.055}s` }}
                                >
                                    <div style={{ height: "2px", background: color.accent }} />

                                    <div className="note-inner">
                                        <div className="note-top">
                                            <h2 className="note-title">{note.title}</h2>
                                            <span className="note-index">#{notes.length - i}</span>
                                        </div>

                                        <p className="note-content">{note.content}</p>

                                        <div className="note-divider" />

                                        <div className="note-footer">
                                            <span className="note-time">
                                                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                                                    <circle cx="6" cy="6" r="5" stroke="#3A3A3A" strokeWidth="1.2" />
                                                    <path d="M6 3.5V6l1.5 1.5" stroke="#3A3A3A" strokeWidth="1.2" strokeLinecap="round" />
                                                </svg>
                                                {formatDate(note.updatedAt || note.createdAt)}
                                            </span>
                                            <div style={{ display: "flex", gap: "6px" }}>
                                                <button onClick={() => startedit(note)} className="btn-edit">
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
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}