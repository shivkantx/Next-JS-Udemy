import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-100 border-t mt-10">

            <div className="max-w-7xl mx-auto px-4 py-10 text-center">

                {/* Brand / Title */}
                <h2 className="text-lg font-semibold text-gray-800">
                    My App
                </h2>

                {/* Links */}
                <div className="flex justify-center gap-6 mt-4 flex-wrap">
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                        Home
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                        About
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                        Contact
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-gray-500 mt-6">
                    © {new Date().getFullYear()} My App. All rights reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;