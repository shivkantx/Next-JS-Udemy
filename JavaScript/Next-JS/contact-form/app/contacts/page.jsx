import React from 'react'
import Link from 'next/link'
import ContactList from '../../components/Contact-list'
import ContactStats from '../../components/Contact-stats'

function Contacts() {
    return (
        <main
            className="min-h-screen px-4 py-10"
            style={{
                background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf3 50%, #f0e6ff 100%)"
            }}
        >
            <div className="container mx-auto max-w-4xl">

                {/* Top bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                        <p className="text-gray-400 text-sm mt-0.5">Manage your contact submissions</p>
                    </div>
                    <Link href="/">
                        <button className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-white/80 text-gray-500 hover:text-gray-900 text-sm font-medium py-2 px-4 rounded-xl transition-all shadow-sm hover:shadow-md group">
                            <svg
                                width="14" height="14" viewBox="0 0 16 16" fill="none"
                                className="group-hover:-translate-x-0.5 transition-transform"
                            >
                                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back to Form
                        </button>
                    </Link>
                </div>

                {/* Stats */}
                <ContactStats />

                {/* Contact list */}
                <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-8 shadow-sm">
                    <ContactList />
                </div>

            </div>
        </main>
    )
}

export default Contacts