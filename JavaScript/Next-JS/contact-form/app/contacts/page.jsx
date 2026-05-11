import React from 'react'
import Link from 'next/link'
import ContactList from '../../components/Contact-list'

function Contacts() {
    return (
        <main
            className="min-h-screen px-4 pt-3 bg-gray-50"

        >
            {/* Back button */}
            <div className="container mx-auto max-w-4xl mb-6">
                <Link href="/">
                    <button className="flex items-center font-bold border-gray-300 bg-blue-500  py-2 px-4 rounded-lg  gap-2 text-white/80 hover:text-white text-sm transition-colors group">
                        <svg
                            width="16" height="16" viewBox="0 0 16 16" fill="none"
                            className="group-hover:-translate-x-1 transition-transform"
                        >
                            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Form
                    </button>
                </Link>
            </div>

            {/* Page card */}
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <ContactList />
                </div>
            </div>
        </main>
    )
}

export default Contacts