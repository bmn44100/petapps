import React, { useState } from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getProductDetails, addToWishlist } from 'wasp/client/operations';

const ProductPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useQuery(getProductDetails, { id: productId });
  const addToWishlistFn = useAction(addToWishlist);
  const [wishlistError, setWishlistError] = useState(null);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddToWishlist = async () => {
    try {
      await addToWishlistFn({ productId: parseInt(productId) });
      setWishlistError(null); // Clear any previous error
    } catch (err) {
      setWishlistError(err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img src="/path/to/product/image.jpg" alt={product.name} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-gray-800 mt-4">Price: ${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToWishlist}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Wishlist
          </button>
          {wishlistError && <p className="text-red-500 mt-2">Error: {wishlistError}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
