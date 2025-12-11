import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <>
      <div className="p-4 flex flex-col h-screen space-y-4">
        <h1 className="text-sky-600 font-semibold bg-gray-400/15 p-4 text-xl rounded-xl text-center">
          Lets make a layout with cards
        </h1>

        {/* Card */}
        <div className="flex gap-3">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}

export default App;
