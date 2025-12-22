import CartItems from "./CartItems.jsx";

function Cart({ cart, onUpdateQuantity, onRemoveItem, totalPrice }) {
  if (cart.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">Your cart is empty.</div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg text-white max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4 border-b border-white/10 pb-2">
        🛒 Shopping Cart
      </h2>

      {/* Cart Items */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
        {cart.map((item) => (
          <CartItems
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Total</h3>
          <span className="text-green-400 text-lg font-semibold">
            ₹
            {typeof totalPrice === "string"
              ? totalPrice
              : totalPrice.toFixed(2)}
          </span>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium active:scale-95">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
