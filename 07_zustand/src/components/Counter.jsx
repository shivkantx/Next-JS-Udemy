import { useCounterStore } from "../store/counterStore";

function Counter() {
  const { count, increase, decrease, reset } = useCounterStore();

  return (
    <div className="">
      {/* Card */}
      <div className=" bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-6">Counter</h1>

        {/* Count */}
        <div className="text-center mb-6">
          <span className="text-4xl font-semibold">{count}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center gap-5">
          <button
            onClick={decrease}
            className="h-10 w-10 rounded-md border border-gray-300 
                       flex items-center justify-center text-xl
                       hover:bg-gray-100 transition"
          >
            −
          </button>

          <button
            onClick={reset}
            className="px-4 font-bold py-2 rounded-md border border-gray-300 text-sm
                       hover:bg-gray-100 transition"
          >
            Reset
          </button>

          <button
            onClick={increase}
            className="h-10 w-10 rounded-md border border-gray-300 
                       flex items-center justify-center text-xl
                       hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
