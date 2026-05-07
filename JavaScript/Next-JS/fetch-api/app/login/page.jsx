"use client";

import React from "react";
import { useRouter } from "next/navigation";

function Login() {

    const router = useRouter();

    const handleLogin = () => {

        // login logic here

        router.push("/products");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <button
                onClick={handleLogin}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
                Login
            </button>

        </div>
    );
}

export default Login;