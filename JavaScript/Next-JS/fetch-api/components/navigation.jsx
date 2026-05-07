"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;
    console.log(isActive);


    return (
        <nav className="flex gap-4 bg-gray-100 p-3 rounded-xl shadow-sm">

            <Link
                href="/about/dashboard"
                className={`px-4 py-2 rounded-lg transition ${isActive("/about/dashboard")
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "text-gray-700 hover:bg-gray-200"
                    }`}
            >
                Dashboard
            </Link>

            <Link
                href="/about/setting"
                className={`px-4 py-2 rounded-lg transition ${isActive("/about/setting")
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "text-gray-700 hover:bg-gray-200"
                    }`}
            >
                Settings
            </Link>

        </nav>
    );
};

export default Navigation;