import React from "react";
import Link from "next/link";

function Header() {

    return (

        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-gray-900 hover:text-violet-600 transition-colors"
                >
                    ContactFlow
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-3">

                    <Link
                        href="/"
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-600 transition-all"
                    >
                        Home
                    </Link>

                    <Link
                        href="/contacts"
                        className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-medium shadow-md hover:bg-violet-500 transition-all"
                    >
                        View Contacts
                    </Link>

                </nav>

            </div>

        </header>

    );
}

export default Header;