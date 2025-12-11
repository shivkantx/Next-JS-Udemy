import React from "react";
import Button from "./Button";

function Card({
  title = "Default",
  description = "description is not prasent",
  imageUrl,
  buttonText,
}) {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden hover:transition hover:shadow-lg">
        <img
          className="w-full h-40 object-cover"
          src={imageUrl}
          alt="sample image"
        />

        <div className="p-4 space-y-2">
          <h2 className="font-semibold text-xl text-gray-500">{title}</h2>

          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          <Button buttonText={buttonText} />
        </div>
      </div>
    </>
  );
}

export default Card;
