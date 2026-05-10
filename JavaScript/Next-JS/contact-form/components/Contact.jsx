"use client"

import React, { useState } from 'react'
import { createContact } from "@/actions"

function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    async function onSubmit(e) {
        e.preventDefault()
        setIsSubmitting(true)
        setMessage("")

        const formData = new FormData(e.target)
        const result = await createContact(formData)

        console.log(result);


        if (result.success) {
            setIsSuccess(true)
            setMessage("Message sent successfully!")
            document.getElementById("contact-form").reset()
        } else {
            setIsSuccess(false)
            setMessage(result.error || "Something went wrong")
        }

        setIsSubmitting(false)
    }

    return (
        <div className="flex items-center justify-center p-4 bg-white/60 text-gray-950 px-4">
            <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-8 w-full max-w-lg shadow-2xl">

                <h2 className="text-2xl font-semibold mb-1">Contact Us</h2>
                <p className="text-gray-500 text-sm mb-6">We&apos;ll get back to you as soon as possible.</p>

                {/* Message banner */}
                {message && (
                    <div className={`mb-4 px-4 py-3 rounded-lg text-sm border ${isSuccess
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                        }`}>
                        {message}
                    </div>
                )}

                <form id="contact-form" onSubmit={onSubmit} className="flex flex-col gap-4">

                    {/* Name + Email row */}
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-gray-500 text-xs">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                disabled={isSubmitting}
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-colors placeholder-gray-300 w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-gray-500 text-xs">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                disabled={isSubmitting}
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-colors placeholder-gray-300 w-full"
                            />
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-500 text-xs">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="What's this about?"
                            disabled={isSubmitting}
                            className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-colors placeholder-gray-300"
                        />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-500 text-xs">Message</label>
                        <textarea
                            name="message"
                            placeholder="Write your message here..."
                            rows={4}
                            disabled={isSubmitting}
                            className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-colors placeholder-gray-300 resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-1"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Contact