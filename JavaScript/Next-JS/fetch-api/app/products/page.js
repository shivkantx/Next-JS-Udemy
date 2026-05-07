"use client";

import React from "react";
import { useRouter } from "next/navigation";

function Productpage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6">
      <h1 className="text-4xl font-bold text-gray-800">Products Page</h1>

      <div className="flex gap-4">
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-700 text-white rounded-xl shadow hover:bg-gray-800 transition"
        >
          ⬅ Back
        </button>

        <button
          onClick={() => router.forward()}
          className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
        >
          Forward ➡
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          Home 🏠
        </button>
      </div>
    </div>
  );
}

export default Productpage;
