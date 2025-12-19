import { useRef, useState, forwardRef } from "react";

// Input component that accepts a ref prop
const CustomInput = forwardRef(({ label, placeholder, className }, ref) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold text-gray-800 mb-2">{label}</label>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
});

CustomInput.displayName = "CustomInput";

function RefProps() {
  const inputRef = useRef(null);
  const secondInputRef = useRef(null);

  const [message, setMessage] = useState("");

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const focusSecondInput = () => {
    secondInputRef.current?.focus();
  };

  const clearInputValue = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const getInputValue = () => {
    if (inputRef.current) {
      setMessage(inputRef.current?.value);
    }
  };

  return (
    <section className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-gray-800  text-center text-3xl font-bold mb-2">
        Ref Props
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Using Refs with Custom Input Components
      </p>
      <div className="bg-blue-100 w-full py-5 px-7 rounded-md">
        <h3 className="font-semibold mb-2 text-center text-gray-800 text-xl">
          Try it out
        </h3>

        <CustomInput
          ref={inputRef}
          label="First Input with ref"
          placeholder="Type something..."
          className="text-gray-800 font-medium"
        />

        <CustomInput
          ref={secondInputRef}
          label="Second Input with ref"
          placeholder="Type something else..."
          className="text-gray-800 font-medium"
        />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Focus First Input */}
          <button
            onClick={focusInput}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 
    text-xs sm:text-sm rounded-md shadow-md text-white font-semibold 
    transition-all duration-200 hover:scale-[1.03]"
          >
            Focus First Input
          </button>

          {/* Focus Second Input */}
          <button
            onClick={focusSecondInput}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-500 
    text-xs sm:text-sm rounded-md shadow-md text-white font-semibold 
    transition-all duration-200 hover:scale-[1.03]"
          >
            Focus Second Input
          </button>

          {/* Get Input Value */}
          <button
            onClick={getInputValue}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-500 
    text-xs sm:text-sm rounded-md shadow-md text-white font-semibold 
    transition-all duration-200 hover:scale-[1.03]"
          >
            Get First Input Value
          </button>

          {/* Clear Input */}
          <button
            onClick={clearInputValue}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 
    text-xs sm:text-sm rounded-md shadow-md text-white font-semibold 
    transition-all duration-200 hover:scale-[1.03]"
          >
            Clear First Input
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-blue-200 rounded-sm py-2 mt-4 w-full text-center text-gray-600">
          <span className="font-bold">{message}</span>
        </div>
      )}

      <div>
        <ul className="bg-yellow-50 rounded-sm border-l-3 border-yellow-500 p-4 mt-6 text-gray-700 list-disc list-inside">
          <h1 className="font-bold text-md text-yellow-900">
            When to use refs
          </h1>
          <li className="text-sm">
            Managing focus, text selection, or media playback
          </li>
          <li className="text-sm">Triggering imperative animations</li>
          <li className="text-sm">
            Integrating with third-party DOM libraries
          </li>
          <li className="text-sm">
            Accessing DOM measurements (scroll position, element size)
          </li>
        </ul>
      </div>
    </section>
  );
}

export default RefProps;
