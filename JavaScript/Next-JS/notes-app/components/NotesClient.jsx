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

            setTitle("");
            setContent("");
            setSuccess(true);

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
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;

    return (
        <div style={{
            minHeight: "100vh",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            position: "relative",
            overflow: "hidden",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
                .font-lora  { font-family: 'Lora', Georgia, serif; }
                .font-dm    { font-family: 'DM Sans', sans-serif; }
                .font-mono  { font-family: 'JetBrains Mono', monospace; }
                textarea    { resize: none; }

                /* ── Background orbs ── */
                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                    opacity: 0.35;
                }
                .orb-1 {
                    width: 400px; height: 400px;
                    background: radial-gradient(circle, #7C3AED, transparent);
                    top: -100px; right: -100px;
                    animation: orbFloat1 8s ease-in-out infinite;
                }
                .orb-2 {
                    width: 300px; height: 300px;
                    background: radial-gradient(circle, #DB2777, transparent);
                    bottom: -80px; left: -80px;
                    animation: orbFloat2 10s ease-in-out infinite;
                }
                .orb-3 {
                    width: 200px; height: 200px;
                    background: radial-gradient(circle, #0891B2, transparent);
                    top: 50%; left: 50%;
                    animation: orbFloat3 12s ease-in-out infinite;
                }
                @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,20px)} }
                @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
                @keyframes orbFloat3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.2)} }

                /* ── Main container ── */
                .nc-container {
                    width: 100%;
                    max-width: 660px;
                    position: relative;
                    z-index: 1;
                    animation: containerIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
                }
                @keyframes containerIn {
                    from { opacity:0; transform: translateY(24px) scale(0.97); }
                    to   { opacity:1; transform: none; }
                }

                /* ── Top bar ── */
                .nc-topbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                .nc-badge {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 11px;
                    color: #7C3AED;
                    background: rgba(124,58,237,0.1);
                    border: 1px solid rgba(124,58,237,0.25);
                    padding: 4px 12px;
                    border-radius: 999px;
                    letter-spacing: 0.5px;
                }
                .nc-topbar-right {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    color: #3D3D3D;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .nc-stat {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .nc-stat-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #7C3AED;
                    animation: blink 2s ease-in-out infinite;
                }
                @keyframes blink { 0%,100%{opacity:0.3} 50%{opacity:1} }

                /* ── Paper card ── */
                .nc-paper {
                    background: #161616;
                    border: 1px solid #2A2A2A;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.03),
                        0 40px 100px rgba(0,0,0,0.6),
                        0 8px 24px rgba(0,0,0,0.4);
                    transition: box-shadow 0.4s ease;
                }
                .nc-paper:focus-within {
                    border-color: rgba(124,58,237,0.3);
                    box-shadow:
                        0 0 0 1px rgba(124,58,237,0.1),
                        0 40px 100px rgba(0,0,0,0.6),
                        0 0 60px rgba(124,58,237,0.06);
                }

                /* ── Window chrome ── */
                .nc-chrome {
                    background: #1E1E1E;
                    border-bottom: 1px solid #2A2A2A;
                    padding: 14px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .nc-dot { width: 12px; height: 12px; border-radius: 50%; }
                .nc-dot-r { background: #FF5F57; }
                .nc-dot-y { background: #FEBC2E; }
                .nc-dot-g { background: #28C840; }
                .nc-chrome-title {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12px;
                    color: #4A4A4A;
                    flex: 1;
                    text-align: center;
                    margin-right: 48px;
                }

                /* ── Title field ── */
                .nc-title-wrap {
                    padding: 32px 36px 20px;
                    border-bottom: 1px solid #1F1F1F;
                    position: relative;
                }
                .nc-title-label {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 9px;
                    color: #3D3D3D;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .nc-title-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, #2A2A2A, transparent);
                }
                .nc-title-input {
                    font-family: 'Lora', serif;
                    font-size: 26px;
                    font-weight: 600;
                    color: #F0F0F0;
                    background: transparent;
                    outline: none;
                    width: 100%;
                    border: none;
                    line-height: 1.3;
                    letter-spacing: -0.5px;
                }
                .nc-title-input::placeholder { color: #2A2A2A; }
                .nc-title-count {
                    position: absolute;
                    bottom: 8px;
                    right: 36px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 9px;
                    color: #3D3D3D;
                }

                /* ── Content field ── */
                .nc-content-wrap {
                    padding: 20px 36px 16px;
                    position: relative;
                }
                .nc-content-label {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 9px;
                    color: #3D3D3D;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .nc-content-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, #2A2A2A, transparent);
                }
                .nc-content-textarea {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    color: #9A9A9A;
                    background: transparent;
                    outline: none;
                    width: 100%;
                    border: none;
                    line-height: 1.9;
                }
                .nc-content-textarea::placeholder { color: #2A2A2A; }

                /* ── Line numbers decoration ── */
                .nc-lines {
                    position: absolute;
                    left: 12px;
                    top: 52px;
                    display: flex;
                    flex-direction: column;
                    gap: 26.6px;
                    pointer-events: none;
                }
                .nc-line-num {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 9px;
                    color: #252525;
                    line-height: 1;
                }

                /* ── Progress ── */
                .nc-progress-section {
                    padding: 0 36px;
                    margin-bottom: 4px;
                }
                .nc-progress-track {
                    height: 1px;
                    background: #1F1F1F;
                    border-radius: 999px;
                    overflow: hidden;
                }
                .nc-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #7C3AED, #DB2777);
                    border-radius: 999px;
                    transition: width 0.3s ease;
                    position: relative;
                }
                .nc-progress-fill::after {
                    content: '';
                    position: absolute;
                    right: 0; top: -1px;
                    width: 4px; height: 3px;
                    background: #DB2777;
                    border-radius: 50%;
                    box-shadow: 0 0 6px #DB2777;
                }

                /* ── Footer ── */
                .nc-footer {
                    padding: 16px 36px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .nc-footer-left {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .nc-meta {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    color: #3D3D3D;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .nc-footer-right {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                /* ── Buttons ── */
                .nc-cancel {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12px;
                    color: #4A4A4A;
                    text-decoration: none;
                    padding: 8px 16px;
                    border-radius: 10px;
                    transition: background 0.15s, color 0.15s;
                    border: 1px solid transparent;
                }
                .nc-cancel:hover {
                    background: #1E1E1E;
                    color: #7A7A7A;
                    border-color: #2A2A2A;
                }

                .nc-save {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    color: white;
                    background: linear-gradient(135deg, #7C3AED, #DB2777);
                    border: none;
                    padding: 9px 22px;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
                    box-shadow: 0 4px 16px rgba(124,58,237,0.3), 0 2px 8px rgba(219,39,119,0.2);
                    position: relative;
                    overflow: hidden;
                }
                .nc-save::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
                    opacity: 0;
                    transition: opacity 0.15s;
                }
                .nc-save:hover:not(:disabled)::before { opacity: 1; }
                .nc-save:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 28px rgba(124,58,237,0.45), 0 4px 12px rgba(219,39,119,0.3);
                }
                .nc-save:active:not(:disabled) { transform: translateY(0); }
                .nc-save:disabled { opacity: 0.35; cursor: not-allowed; }

                /* ── Error ── */
                .nc-error {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    color: #F87171;
                    background: rgba(248,113,113,0.08);
                    border: 1px solid rgba(248,113,113,0.2);
                    padding: 5px 12px;
                    border-radius: 8px;
                }

                /* ── Success ── */
                .nc-success {
                    margin-bottom: 20px;
                    padding: 16px 20px;
                    border-radius: 16px;
                    background: rgba(16,185,129,0.06);
                    border: 1px solid rgba(16,185,129,0.15);
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    animation: successIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
                }
                @keyframes successIn {
                    from { opacity:0; transform:translateY(-8px) scale(0.97); }
                    to   { opacity:1; transform:none; }
                }

                .dot-pulse { animation: dotPulse 1s ease-in-out infinite; display: inline-block; }
                @keyframes dotPulse {
                    0%,100% { opacity:0.3; transform:scale(0.8); }
                    50%     { opacity:1; transform:scale(1.2); }
                }

                /* ── Focused line indicator ── */
                .nc-title-wrap.focused::before,
                .nc-content-wrap.focused::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 2px;
                    background: linear-gradient(180deg, #7C3AED, #DB2777);
                    border-radius: 0 2px 2px 0;
                }
            `}</style>

            {/* Background orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div className="nc-container">

                {/* Top bar */}
                <div className="nc-topbar">
                    <span className="nc-badge">✦ new_note.md</span>
                    <div className="nc-topbar-right">
                        <div className="nc-stat">
                            <div className="nc-stat-dot" />
                            <span>{words} words</span>
                        </div>
                        <span style={{ color: "#2A2A2A" }}>·</span>
                        <span>{content.length}/2000</span>
                    </div>
                </div>

                {/* Success */}
                {success && (
                    <div className="nc-success">
                        <div style={{
                            width: "32px", height: "32px", borderRadius: "10px",
                            background: "rgba(16,185,129,0.12)",
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8.5l3.5 3.5 7-8" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-dm" style={{ fontSize: "13px", fontWeight: 600, color: "#10B981" }}>Saved successfully!</p>
                            <p className="font-mono" style={{ fontSize: "10px", color: "#059669" }}>redirecting to home...</p>
                        </div>
                    </div>
                )}

                {/* Paper card */}
                <form onSubmit={createNote} className="nc-paper">

                    {/* Window chrome */}
                    <div className="nc-chrome">
                        <div className="nc-dot nc-dot-r" />
                        <div className="nc-dot nc-dot-y" />
                        <div className="nc-dot nc-dot-g" />
                        <span className="nc-chrome-title">
                            {title || "untitled note"}
                        </span>
                    </div>

                    {/* Title */}
                    <div className={`nc-title-wrap ${focused === "title" ? "focused" : ""}`} style={{ position: "relative" }}>
                        <div className="nc-title-label">title</div>
                        <input
                            type="text"
                            placeholder="What's this note about?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onFocus={() => setFocused("title")}
                            onBlur={() => setFocused(null)}
                            maxLength={100}
                            required
                            className="nc-title-input"
                        />
                        {title.length > 0 && (
                            <div className="nc-title-count">{title.length}/100</div>
                        )}
                    </div>

                    {/* Content */}
                    <div className={`nc-content-wrap ${focused === "content" ? "focused" : ""}`} style={{ position: "relative" }}>
                        {/* Line numbers */}
                        <div className="nc-lines">
                            {[1, 2, 3, 4, 5, 6].map(n => (
                                <span key={n} className="nc-line-num">{n}</span>
                            ))}
                        </div>

                        <div className="nc-content-label">content</div>
                        <textarea
                            placeholder="Pour your thoughts here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onFocus={() => setFocused("content")}
                            onBlur={() => setFocused(null)}
                            maxLength={2000}
                            required
                            rows={6}
                            className="nc-content-textarea"
                        />
                    </div>

                    {/* Progress */}
                    <div className="nc-progress-section">
                        <div className="nc-progress-track">
                            <div className="nc-progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="nc-footer">
                        <div className="nc-footer-left">
                            <div className="nc-meta">
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                    <circle cx="6" cy="6" r="5" stroke="#3D3D3D" strokeWidth="1.2" />
                                    <path d="M6 3.5V6l1.5 1.5" stroke="#3D3D3D" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                                {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                            </div>
                            <div className="nc-meta">
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 9l3-3m0 0l2-2m-2 2L3 4m2 2l2 2" stroke="#3D3D3D" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                                {words} words
                            </div>
                        </div>

                        <div className="nc-footer-right">
                            {error && <span className="nc-error">{error}</span>}
                            <a href="/" className="nc-cancel">Discard</a>
                            <button
                                type="submit"
                                disabled={loading || !title.trim() || !content.trim()}
                                className="nc-save"
                            >
                                {loading ? (
                                    <>
                                        <span className="dot-pulse">●</span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6.5l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Publish note
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NotesClient;