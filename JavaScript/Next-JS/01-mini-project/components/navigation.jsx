"use client";

import React, { useState } from "react";
import Link from "next/link";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}4
          <div className="shrink-0">
            <Link href="/" className="font-bold text-xl text-gray-800">
              My App
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h22M4 15h22M4 23h22" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1">
          <Link href="/" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;