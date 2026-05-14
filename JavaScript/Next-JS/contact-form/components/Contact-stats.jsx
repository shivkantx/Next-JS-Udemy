import React from 'react'
import { getContactStats } from "@/actions"

async function ContactStats() {
    const stats = await getContactStats()

    const items = [
        {
            label: "Total",
            value: stats.total,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            iconBg: "bg-violet-100 text-violet-600",
            value_color: "text-violet-600",
        },
        {
            label: "New",
            value: stats.newCount,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
            iconBg: "bg-emerald-100 text-emerald-600",
            value_color: "text-emerald-600",
        },
        {
            label: "Read",
            value: stats.readCount,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            ),
            iconBg: "bg-sky-100 text-sky-600",
            value_color: "text-sky-600",
        },
        {
            label: "Replied",
            value: stats.repliedCount,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 17l-5-5 5-5M20 18v-2a4 4 0 00-4-4H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            iconBg: "bg-orange-100 text-orange-600",
            value_color: "text-orange-600",
        },
    ]

    return (
        <div className="grid grid-cols-4 gap-4 mb-8">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center mb-4`}>
                        {item.icon}
                    </div>

                    {/* Value */}
                    <p className={`text-3xl font-bold ${item.value_color} leading-none mb-1`}>
                        {item.value}
                    </p>

                    {/* Label */}
                    <p className="text-gray-400 text-xs font-medium">{item.label}</p>
                </div>
            ))}
        </div>
    )
}

export default ContactStats