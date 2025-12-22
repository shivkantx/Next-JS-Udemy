import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

function CartItems({ item, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="flex items-center justify-between bg-[#2a2a2a] rounded-lg p-3">
      {/* Product Info */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold">{item.name}</h4>
        <p className="text-xs text-gray-400">₹{item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 bg-red-500 rounded-full hover:bg-red-600 transition"
        >
          <FaMinus size={12} />
        </button>

        <span className="text-sm font-medium w-6 text-center">
          {item.quantity}
        </span>

        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-full bg-green-500 hover:bg-green-600 transition"
        >
          <FaPlus size={12} />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemoveItem(item.id)}
        className="ml-3 text-red-400 hover:text-red-500 transition"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );
}

export default CartItems;
