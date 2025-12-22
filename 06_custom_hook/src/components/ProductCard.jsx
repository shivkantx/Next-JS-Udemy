import { FaShoppingCart } from "react-icons/fa";

function ProductCard({ product, onAddToCart }) {
  if (!product) return null; // safety guard

  return (
    <div className="w-full bg-[#1e1e1e] rounded-xl p-5 shadow-md hover:shadow-xl transition hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-green-400 text-base">₹{product.price}</p>
      </div>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition py-2 rounded-lg text-sm"
      >
        <FaShoppingCart />
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
