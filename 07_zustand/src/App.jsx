import Counter from "./components/Counter";
import CounterButton from "./components/CounterButton";
import CounterValue from "./components/CounterValue";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";

function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center gap-10 py-10">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold">Counter App</h1>

        {/* Counter Section */}
        <div className="flex gap-6">
          {/* Counter */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <Counter />
          </div>

          {/* Buttons + Value */}
          <div className="bg-white border border-gray-200 rounded-md p-6 flex flex-col gap-4 justify-center">
            <CounterButton />
            <CounterValue />
          </div>
        </div>

        {/* Posts Section */}
        <div className="w-full flex justify-center pt-4">
          <Posts />
        </div>
      </main>
    </div>
  );
}

export default App;
