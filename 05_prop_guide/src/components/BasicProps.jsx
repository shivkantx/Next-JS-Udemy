import React, { useState } from "react";

/* -------------------- Button Component -------------------- */
function Button({
  text,
  color = "primary",
  size = "medium",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`
        rounded-md font-medium transition-all duration-200

        ${size === "small" ? "text-sm px-3 py-1" : ""}
        ${size === "medium" ? "text-sm px-4 py-2" : ""}
        ${size === "large" ? "text-base px-6 py-2" : ""}

        ${color === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
        ${
          color === "secondary"
            ? "bg-gray-600 text-white hover:bg-gray-700"
            : ""
        }
        ${color === "danger" ? "bg-red-600 text-white hover:bg-red-700" : ""}
        ${
          color === "success"
            ? "bg-green-600 text-white hover:bg-green-700"
            : ""
        }

        ${
          disabled
            ? "opacity-50 cursor-default"
            : "cursor-pointer active:scale-95"
        }
      `}
    >
      {text}
    </button>
  );
}

/* -------------------- Basic Props -------------------- */
function BasicProps() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <section className="bg-white text-black p-6 rounded-lg shadow-sm">
      <h2 className="text-gray-800 text-center text-3xl font-bold mb-2">
        Basic Props
      </h2>

      <p className="text-gray-600 mb-6">
        Props are arguments passed to React components. They allow you to pass
        data from parent to child components.
      </p>

      {/* -------- Colors -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Different Colors</h3>
        <div className="flex gap-3 flex-wrap">
          <Button text="Primary Button" color="primary" onClick={handleClick} />
          <Button
            text="Secondary Button"
            color="secondary"
            onClick={handleClick}
          />
          <Button text="Danger Button" color="danger" onClick={handleClick} />
          <Button text="Success Button" color="success" onClick={handleClick} />
        </div>
      </div>

      {/* -------- Sizes -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Different Sizes</h3>
        <div className="flex gap-3 flex-wrap">
          <Button text="Small" size="small" onClick={handleClick} />
          <Button text="Medium (Default)" onClick={handleClick} />
          <Button text="Large" size="large" onClick={handleClick} />
        </div>
      </div>

      {/* -------- Disabled -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Disabled State</h3>
        <div className="flex gap-3 flex-wrap">
          <Button text="Enabled Button" onClick={handleClick} />
          <Button text="Disabled Button" disabled />
        </div>
      </div>

      {/* -------- Click Count -------- */}
      <div className="bg-blue-50 border border-blue-100 rounded-md px-4 py-3">
        <p className="text-sm">
          Click Count:{" "}
          <span className="font-semibold text-blue-600">{clickCount}</span>
        </p>
      </div>
    </section>
  );
}

export default BasicProps;
