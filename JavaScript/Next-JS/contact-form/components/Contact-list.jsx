import React from 'react'
import { getContacts } from "@/actions/index.js"

async function ContactList() {
    const contacts = await getContacts()

    return (
        <div className="w-full">

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold text-white">Messages</h1>
                    {contacts.length > 0 && (
                        <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                            {contacts.length}
                        </span>
                    )}
                </div>
                <p className="text-white/50 text-sm">All contact form submissions</p>
                <div className="mt-4 h-px bg-white/10" />
            </div>

            {/* Empty state */}
            {contacts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">No messages yet</h3>
                    <p className="text-white/50 text-sm">Contact form submissions will appear here.</p>
                </div>
            )}

            {/* Contact cards */}
            <div className="flex flex-col gap-4 ">
                {contacts.map((contact) => (
                    <div
                        key={contact._id}
                        className=" rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all bg-pink-200 duration-200"
                    >
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    {contact.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm">{contact.name}</h3>
                                    <p className="text-gray-400 text-xs">{contact.email}</p>
                                </div>
                            </div>

                            {/* Date + status */}
                            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                                <span className="text-xs text-gray-400">
                                    {new Date(contact.createdAt).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${contact.status === "new"
                                    ? "bg-green-100 text-green-600"
                                    : contact.status === "read"
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-gray-100 text-gray-500"
                                    }`}>
                                    {contact.status || "new"}
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 mb-4" />

                        {/* Subject */}
                        <p className="text-sm font-semibold text-gray-800 mb-2">
                            {contact.subject}
                        </p>

                        {/* Message */}
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                            {contact.message}
                        </p>

                        {/* Footer */}
                        <div className="mt-4 flex items-center gap-1.5">
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="5" stroke="#D1D5DB" strokeWidth="1.2" />
                                <path d="M6 3.5V6l1.5 1.5" stroke="#D1D5DB" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            <span className="text-xs text-gray-300">
                                {new Date(contact.createdAt).toLocaleTimeString("en-IN", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContactList;