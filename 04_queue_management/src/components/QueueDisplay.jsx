import React from "react";

function QueueDisplay({ queue, updateStatus, removeFromQueue }) {
  const getSatusColor = (status) => {
    switch (status) {
      case "waiting":
        return "text-yellow-400";
      case "in-service":
        return "text-blue-400";
      case "completed":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="p-6 flex flex-col space-y-3 rounded-md w-full md:w-[66%] bg-[#2b2b2b]">
      <h1 className="text-3xl font-bold text-white">Current Queue</h1>

      {queue.length === 0 ? (
        <p className="text-gray-400">No customer yet.</p>
      ) : (
        queue.map((customer) => (
          <div
            key={customer.id}
            className="bg-[#202020] border border-white/10 p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{customer.name}</p>
              <p className="text-sm text-blue-400">{customer.service}</p>
              <p
                className={`text-xs capitalize ${getSatusColor(
                  customer.status
                )}`}
              >
                {customer.status}
              </p>
            </div>

            <div className="flex gap-2">
              {/* Serve Button - hides when completed */}
              {customer.status !== "completed" && (
                <button
                  onClick={() => updateStatus(customer.id, "completed")}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm cursor-pointer"
                >
                  Serve
                </button>
              )}

              {/* Remove Button */}
              <button
                onClick={() => removeFromQueue(customer.id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QueueDisplay;
