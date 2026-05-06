import Link from "next/link";
import React from "react";

function NotFoundReview() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-8xl font-extrabold text-red-500 tracking-widest">
          404
        </h1>

        <div className="w-24 h-1 bg-red-500 mx-auto my-6 rounded-full"></div>

        <h2 className="text-3xl md:text-5xl font-bold mb-4">Page Not Found</h2>

        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-block bg-red-500 hover:bg-red-600 transition-all duration-300 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:scale-105"
        >
          Go Back Home
        </Link>

        <div className="mt-12 text-gray-600 text-sm">Error Code: NOT_FOUND</div>
      </div>
    </div>
  );
}

export default NotFoundReview;
