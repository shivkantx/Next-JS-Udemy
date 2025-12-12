import React, { useState } from "react";
import QueueForm from "./components/QueueForm";
import QueueDisplay from "./components/QueueDisplay";
function App() {
  const [queue, setQueue] = useState([]);

  const addToQueue = (customer) => {
    setQueue([...queue, { ...customer, id: Date.now(), status: "waiting" }]);
  };

  const updateStatus = (id, newStatus) => {
    setQueue(
      queue.map((customer) =>
        customer.id === id ? { ...customer, status: newStatus } : customer
      )
    );
  };

  const removeFromQueue = (id) => {
    setQueue(queue.filter((customer) => customer.id !== id));
  };

  return (
    <div className="flex flex-col space-y-4 text-white min-h-screen bg-[#202020] justify-center items-center px-4">
      <h1 className="text-blue-500 font-bold text-5xl">
        Queue Management System
      </h1>

      <p>Manage your customers efficiently</p>

      <div className="flex mt-4 flex-wrap gap-4 w-full max-w-7xl">
        {/* LEFT FORM */}
        <QueueForm onAdd={addToQueue} />

        {/* RIGHT LIST */}
        <QueueDisplay
          queue={queue}
          updateStatus={updateStatus}
          removeFromQueue={removeFromQueue}
        />
      </div>
    </div>
  );
}

export default App;
