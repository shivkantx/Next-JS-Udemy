import { useCounterStore } from "../store/counterStore.js";
function CounterValue() {
  const count = useCounterStore((state) => state.count);
  return (
    <div className=" bg-white shadow-md p-2 rounded-xl flex justify-center items-center flex-col gap-2">
      <h1 className="text-2xl font-semibold">
        Counter value from CounterValue
      </h1>
      <span className="font-bold text-xl">{count}</span>
    </div>
  );
}

export default CounterValue;
