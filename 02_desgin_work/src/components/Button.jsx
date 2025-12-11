import React from "react";

function Button({ buttonText = "Buy Now" }) {
  return (
    <button className="bg-blue-600 text-white py-2 px-4 mt-2 rounded-lg w-full hover:bg-blue-700 transition">
      {buttonText}
    </button>
  );
}

export default Button;
