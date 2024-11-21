import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction } from 'wasp/client/operations';
import { getProductsByCategory, getPetProfiles } from 'wasp/client/operations';

const ProductPage = () => {
  const { productId } = useParams();
  // Assuming getProductDetails is defined under getProductsByCategory for demonstration purposes
  const { data: product, isLoading, error } = useQuery(getProductsByCategory, { productId });
  const addToCartFn = useAction(addToCart);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  const handleAddToCart = () => {
    addToCartFn({ productId: product.id, quantity: 1 });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      {product && (
        <>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-700 text-base">{product.description}</p>
          <p className="text-xl text-indigo-600 font-semibold">${product.price.toFixed(2)}</p>
          <div className="space-y-2">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">User Reviews</h3>
            {product.reviews && product.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 py-2">
                <p className="text-sm">{review.content}</p>
                <p className="text-sm font-medium">Rating: {review.rating} / 5</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
