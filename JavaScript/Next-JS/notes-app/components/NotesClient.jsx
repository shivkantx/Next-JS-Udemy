"use client";

import React from "react";
import { useRouter } from "next/navigation";

function NotesClient() {
    const router = useRouter();
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [focused, setFocused] = React.useState(null);

    const createNote = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError("Title and content cannot be empty");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });

            const result = await response.json();
            console.log("Status:", response.status);
            console.log("API response:", result);

            if (!result.success) {
                setError(result.error || "Something went wrong");
                return;
            }

            // ✅ clear form
            setTitle("");
            setContent("");
            setSuccess(true);

            // ✅ redirect after 2 seconds
            setTimeout(() => {
                setSuccess(false);
                router.push("/");
                router.refresh();
            }, 2000);

        } catch (error) {
            console.error("Fetch error:", error);
            setError("Error creating note");
        } finally {
            setLoading(false);
        }
    };

    const progress = Math.round((content.length / 2000) * 100);

    return (
        <div className="min-h-screen bg-[#F7F5F0]">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-lora { font-family: 'Lora', Georgia, serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        textarea { resize: none; }

        .page-enter { animation: pageEnter 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }

        .card { transition: box-shadow 0.3s ease; }
        .card:focus-within { box-shadow: 0 20px 60px rgba(0,0,0,0.08); }

        .field-wrap { position: relative; transition: background 0.2s; }
        .field-wrap.active { background: #FDFCFA; }

        .title-input::placeholder { color: #D4CFC8; }
        .content-input::placeholder { color: #D4CFC8; }

        .progress-bar {
          transition: width 0.3s ease;
          background: linear-gradient(90deg, #8B7355, #C4A882);
        }

        .save-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .save-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(44,44,44,0.25);
        }
        .save-btn:active:not(:disabled) { transform: translateY(0); }
        .save-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .cancel-btn { transition: color 0.15s, background 0.15s; border-radius: 999px; }
        .cancel-btn:hover { background: #EDEAE4; color: #2C2C2C; }

        .char-ring { transform: rotate(-90deg); transform-origin: center; }
        .char-ring-track { stroke: #EDE9E1; }
        .char-ring-fill {
          stroke: #8B7355;
          stroke-dasharray: 50.27;
          transition: stroke-dashoffset 0.3s ease;
        }

        .logo-icon { transition: transform 0.2s; }
        .logo-icon:hover { transform: rotate(-5deg) scale(1.05); }

        .tag-line { animation: tagSlide 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        @keyframes tagSlide {
          from { opacity:0; transform: translateX(-8px); }
          to   { opacity:1; transform: none; }
        }

        .dot-pulse { animation: dotPulse 1.2s ease-in-out infinite; }
        @keyframes dotPulse {
          0%,100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }

        .success-banner {
          animation: successPop 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes successPop {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

            {/* Header */}
            <header className="sticky top-0 z-10 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E8E4DC]">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="logo-icon w-8 h-8 rounded-lg bg-[#2C2C2C] flex items-center justify-center shadow-sm">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect x="2" y="2" width="10" height="1.5" rx="0.75" fill="#F7F5F0" />
                                <rect x="2" y="6" width="7" height="1.5" rx="0.75" fill="#F7F5F0" />
                                <rect x="2" y="10" width="8.5" height="1.5" rx="0.75" fill="#F7F5F0" />
                            </svg>
                        </div>
                        <span className="font-dm text-[#2C2C2C] text-sm tracking-tight">my notes</span>
                    </a>
                    <div className="tag-line flex items-center gap-2 font-dm text-xs text-[#B5AFA7]">
                        <span>Home</span>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M3 7.5l2.5-2.5L3 2.5" stroke="#C8C3BB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#706A60]">New note</span>
                    </div>
                </div>
            </header>

            {/* Page */}
            <main className="max-w-3xl mx-auto px-6 py-6">

                {/* Heading */}
                <div className="page-enter mb-6">
                    <h1 className="font-lora text-2xl text-[#1C1C1C] mb-1">New note</h1>
                    <p className="font-dm text-sm text-[#9A9489]">Write something worth remembering.</p>
                </div>

                {/* ✅ Success banner */}
                {success && (
                    <div className="success-banner mb-4 px-5 py-3.5 rounded-2xl bg-green-50 border border-green-200 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2.5 7.5l3 3 6-7" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-dm text-sm font-medium text-green-800">Note saved successfully!</p>
                            <p className="font-dm text-xs text-green-600">Redirecting to home...</p>
                        </div>
                    </div>
                )}

                {/* Card */}
                <form
                    onSubmit={createNote}
                    className="card page-enter bg-white rounded-3xl border border-[#E8E4DC] shadow-md overflow-hidden"
                    style={{ animationDelay: "0.08s" }}
                >
                    {/* Top accent line */}
                    <div className="h-[3px] bg-gradient-to-r from-[#8B7355] via-[#C4A882] to-[#E8E4DC]" />

                    {/* Title */}
                    <div className={`field-wrap px-8 pt-7 pb-5 border-b border-[#F0EDE7] ${focused === "title" ? "active" : ""}`}>
                        <label className="font-dm text-[10px] uppercase tracking-widest text-[#C8C3BB] mb-2 block">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="Give your note a title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onFocus={() => setFocused("title")}
                            onBlur={() => setFocused(null)}
                            maxLength={100}
                            required
                            className="title-input font-lora w-full text-xl font-semibold text-[#1C1C1C] bg-transparent outline-none leading-snug"
                        />
                        {title.length > 0 && (
                            <div className="font-dm text-[10px] text-[#C8C3BB] mt-2 text-right">
                                {title.length}/100
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className={`field-wrap px-8 pt-5 pb-4 ${focused === "content" ? "active" : ""}`}>
                        <label className="font-dm text-[10px] uppercase tracking-widest text-[#C8C3BB] mb-2 block">
                            Content
                        </label>
                        <textarea
                            placeholder="Start writing your thoughts..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onFocus={() => setFocused("content")}
                            onBlur={() => setFocused(null)}
                            maxLength={2000}
                            required
                            rows={6}
                            className="content-input font-dm w-full text-sm text-[#3D3730] bg-transparent outline-none leading-7"
                        />
                    </div>

                    {/* Progress bar */}
                    <div className="px-8">
                        <div className="h-[2px] w-full bg-[#F0EDE7] rounded-full overflow-hidden">
                            <div
                                className="progress-bar h-full rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <circle className="char-ring-track" cx="9" cy="9" r="8" fill="none" strokeWidth="2" />
                                <circle
                                    className="char-ring-fill char-ring"
                                    cx="9" cy="9" r="8" fill="none" strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDashoffset={50.27 - (50.27 * progress) / 100}
                                />
                            </svg>
                            <span className="font-dm text-xs text-[#B5AFA7]">
                                {content.length > 0 ? `${2000 - content.length} left` : "2000 chars"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {error && (
                                <span className="font-dm text-xs text-red-400 mr-1">{error}</span>
                            )}
                            <a href="/" className="cancel-btn font-dm text-sm text-[#9A9489] px-4 py-2">
                                Cancel
                            </a>
                            <button
                                type="submit"
                                disabled={loading || !title.trim() || !content.trim()}
                                className="save-btn font-dm text-sm font-medium bg-[#2C2C2C] text-[#F7F5F0] px-6 py-2.5 rounded-full flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="dot-pulse">•</span>
                                        Saving
                                    </>
                                ) : (
                                    <>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6.5l3 3 5-6" stroke="#F7F5F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Save note
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default NotesClient;