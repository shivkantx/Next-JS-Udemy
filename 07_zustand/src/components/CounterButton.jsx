import { useCounterStore } from "../store/counterStore.js";

function CounterButton() {
  const increase = useCounterStore((state) => state.increase);
  const decrease = useCounterStore((state) => state.decrease);

  return (
    <div className="flex flex-col justify-center items-center bg-white p-4 rounded-xl shadow-sm gap-4">
      <h1 className="font-bold text-2xl">Counter From CounterButton</h1>
      <div className=" flex gap-4">
        <button
          className="px-4 font-bold py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-100 transition"
          onClick={increase}
        >
          +
        </button>
        <button
          className="px-4 font-bold py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-100 transition"
          onClick={decrease}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default CounterButton;
