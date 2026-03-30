import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Main Content */}
      <div className="flex flex-col items-center text-center max-w-xl">
        <h1 className="text-4xl font-bold text-black">Welcome to My App</h1>

        <p className="text-lg text-gray-800 mt-4">
          This is a simple Next.js application with a responsive navigation bar.
          Explore the pages and enjoy the seamless experience!
        </p>

        <div className="flex gap-5 mt-6">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Get Started
          </button>

          <button className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold rounded-md hover:bg-gray-300 transition">
            Learn more
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-3 gap-6 mt-10 mb-16">
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
            />
          </svg>

          <h3 className="font-black">fast</h3>

          <p className="mt-2 text-sm text-gray-700">Fast Performance</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg">
          🔥
          <p className="mt-2 text-sm text-gray-700">Modern UI</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg">
          ⚡<p className="mt-2 text-sm text-gray-700">Optimized</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
