"use client";

import React from "react";
import { Trash2, Calendar } from "lucide-react";

const PRIORITY_COLOR = {
    low: "#7DD3FC",
    medium: "#A78BFA",
    high: "#F87171",
};

function TodoItem({ todo }) {
    const formattedDate = new Date(todo.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    return (
        <div
            className={`group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.035] ${todo.completed ? "opacity-60" : ""
                }`}
        >
            <div className="flex items-start gap-3">
                <div
                    title="Toggle coming soon"
                    className="mt-0.5 flex h-5 w-5 shrink-0 cursor-not-allowed items-center justify-center rounded-full border-2 opacity-70"
                    style={{
                        borderColor: todo.completed ? "#8A5EF0" : "rgba(255,255,255,0.25)",
                        background: todo.completed
                            ? "linear-gradient(135deg, #6D5EF0, #8A5EF0)"
                            : "transparent",
                    }}
                >
                    {todo.completed && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                        <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: PRIORITY_COLOR[todo.priority] || "#A78BFA" }}
                        />
                        <h3
                            className={`truncate text-sm font-medium transition-all duration-200 ${todo.completed ? "text-white/30 line-through" : "text-white"
                                }`}
                        >
                            {todo.title}
                        </h3>
                    </div>

                    {todo.description && (
                        <p className={`mb-2 text-xs leading-relaxed ${todo.completed ? "text-white/20" : "text-white/45"}`}>
                            {todo.description}
                        </p>
                    )}

                    <div className="flex items-center gap-3 text-[10px] text-white/30">
                        <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {formattedDate}
                        </span>
                        <span className="rounded-full border border-white/10 px-2 py-0.5 font-medium uppercase tracking-wider">
                            {todo.priority}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    disabled
                    title="Delete coming soon"
                    aria-label="Delete todo (not yet available)"
                    className="shrink-0 cursor-not-allowed rounded-md p-1.5 text-white/10 opacity-0 transition-all duration-200 group-hover:opacity-100"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}

export default TodoItem;