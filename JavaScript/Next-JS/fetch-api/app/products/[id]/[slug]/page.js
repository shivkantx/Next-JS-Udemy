import React from "react";

async function ProductDetailsPage({ params }) {
  // destructure dynamic params
  const { id, slug } = await params;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Product Details
        </h1>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-blue-700">Product ID</h2>

            <p className="text-gray-700 mt-1">{id}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-green-700">
              Product Slug
            </h2>

            <p className="text-gray-700 mt-1">{slug}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
