import "./App.css";

function App() {
  return (
    <>
      <div className="p-4 flex flex-col h-screen space-y-4">
        <h1 className="text-sky-600 font-semibold bg-gray-400/15 p-4 text-xl rounded-xl text-center">
          Lets make a layout with cards
        </h1>

        {/* Card */}
        <div className="max-w-sm bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden hover:transition hover:shadow-lg">
          <img
            className="w-full h-40 object-cover"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="sample image"
          />

          <div className="p-4 space-y-2">
            <h2 className="font-semibold text-xl text-gray-500">Card Title</h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis inventore veritatis nesciunt culpa voluptatum id,
              architecto cupiditate nobis eligendi! Debitis.
            </p>

            <button className="bg-blue-600 text-white py-2 px-4 mt-2 rounded-lg w-full hover:bg-blue-700 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
