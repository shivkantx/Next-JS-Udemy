import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";

function QueueForm({ onAdd }) {
  const [name, setname] = useState("");
  const [service, setservice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !service.trim()) return;

    onAdd({ name: name.trim(), service: service.trim() });
    setname("");
    setservice("");
  };

  return (
    <div className="p-6 flex flex-col gap-5 items-start rounded-md w-full md:w-[30%] bg-[#2b2b2b]">
      <h1 className="text-3xl text-blue-500 font-bold">Add to Queue</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-[#202020] border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="Customer Name"
        />

        <div className="relative w-full">
          <select
            className="w-full appearance-none px-3 py-2 rounded bg-[#202020] border border-white/20 text-white focus:outline-none"
            value={service}
            onChange={(e) => setservice(e.target.value)}
          >
            <option value="">Select service</option>
            <option value="Consultation">Consultation</option>
            <option value="Payment">Payment</option>
            <option value="Support">Support</option>
          </select>

          {/* Arrow */}
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 cursor-pointer bg-blue-600 py-2 rounded hover:bg-blue-500 transition"
        >
          <IoPersonAddSharp size={20} />
          <span>Add Customer</span>
        </button>
      </form>
    </div>
  );
}

export default QueueForm;
