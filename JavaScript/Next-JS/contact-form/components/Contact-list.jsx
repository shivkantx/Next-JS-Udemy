import React from "react";
import { getContacts, updateContact } from "@/actions/index.js";

async function ContactList() {

    const contacts = (await getContacts()) || [];

    return (

        <div className="w-full max-w-5xl mx-auto px-4 py-2">

            {/* Header */}
            <div className="mb-8">

                <div className="flex items-center justify-between gap-4 flex-wrap">

                    <div>

                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                            Messages
                        </h1>

                        <p className="text-gray-600 text-sm mt-2">
                            All contact form submissions
                        </p>

                    </div>

                    {contacts.length > 0 && (

                        <span className="bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-2 rounded-full border border-violet-200 shadow-sm">
                            {contacts.length} Messages
                        </span>

                    )}

                </div>

                <div className="mt-6 h-px bg-gray-200" />

            </div>

            {/* Empty State */}
            {contacts.length === 0 && (

                <div className="flex flex-col items-center justify-center py-28 text-center bg-white border border-gray-200 rounded-3xl shadow-sm">

                    <div className="w-20 h-20 rounded-2xl bg-violet-100 flex items-center justify-center mb-5">

                        <svg
                            width="34"
                            height="34"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                stroke="#7C3AED"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        No messages yet
                    </h3>

                    <p className="text-gray-500 text-sm max-w-md">
                        Contact form submissions will appear here once users start sending messages.
                    </p>

                </div>

            )}

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {contacts.map((contact) => {

                    const status = contact.status || "new";

                    return (

                        <div
                            key={contact._id}
                            className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >

                            {/* Top Section */}
                            <div className="flex items-start justify-between gap-4 mb-5">

                                <div className="flex items-center gap-4">

                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white text-base font-bold shadow-md flex-shrink-0">

                                        {contact.name?.charAt(0)?.toUpperCase() || "U"}

                                    </div>

                                    {/* User Info */}
                                    <div>

                                        <h3 className="font-semibold text-gray-900 text-base">
                                            {contact.name}
                                        </h3>

                                        <p className="text-gray-500 text-sm break-all">
                                            {contact.email}
                                        </p>

                                    </div>

                                </div>

                                {/* Status */}
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">

                                    <span
                                        className={`text-[11px] font-semibold px-3 py-1 rounded-full ${status === "new"
                                            ? "bg-black text-white"
                                            : status === "read"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-violet-100 text-violet-700"
                                            }`}
                                    >
                                        {status}
                                    </span>

                                </div>

                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-100 mb-5" />

                            {/* Subject */}
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">

                                {contact.subject}

                            </h4>

                            {/* Message */}
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">

                                {contact.message}

                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">

                                {/* Date */}
                                <span className="text-xs text-gray-400 font-medium">

                                    {new Date(contact.createdAt).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}

                                </span>

                                {/* Action Button */}
                                <div>

                                    {status === "new" && (

                                        <form
                                            action={async () => {
                                                "use server";

                                                await updateContact(
                                                    contact._id,
                                                    "read"
                                                );
                                            }}
                                        >

                                            <button
                                                type="submit"
                                                className="bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition"
                                            >
                                                Mark as Read
                                            </button>

                                        </form>

                                    )}

                                    {status === "read" && (

                                        <form
                                            action={async () => {
                                                "use server";

                                                await updateContact(
                                                    contact._id,
                                                    "replied"
                                                );
                                            }}
                                        >

                                            <button
                                                type="submit"
                                                className="bg-violet-100 hover:bg-violet-200 border border-violet-200 text-violet-700 text-sm font-medium px-4 py-2 rounded-xl transition"
                                            >
                                                Mark as Replied
                                            </button>

                                        </form>

                                    )}

                                </div>

                            </div>

                        </div>

                    );
                })}

            </div>

        </div>
    );
}

export default ContactList;