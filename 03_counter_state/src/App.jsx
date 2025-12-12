import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-[#242424] flex items-center justify-center px-4 text-white">
      <div className="bg-[#1a1a1a] w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 border border-white/10">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center">
          Counter – State Management
        </h1>

        {/* Count Display */}
        <div className="text-center">
          <p className="text-xl font-semibold">
            Count: <span className="text-indigo-400">{count}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
          >
            Increase
          </button>

          <button
            onClick={() => setCount(Math.max(0, count - 1))}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          >
            Decrease
          </button>

          <button
            onClick={() => setCount(0)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
          >
            Reset
          </button>
        </div>

        {/* Set Count */}
        <div className="flex items-center gap-3 justify-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-24 rounded-lg px-3 py-2 bg-[#2a2a2a] border border-white/20 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter"
          />

          <button
            onClick={() => {
              setCount(Number(inputValue || 0));
              setInputValue("");
            }}
            className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition"
          >
            Set to {inputValue}
          </button>
        </div>
      </div>
    </div>
  );
}
