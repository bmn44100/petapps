import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getProductCatalog, addRating } from 'wasp/client/operations';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data: products, isLoading, error } = useQuery(getProductCatalog);
  const addRatingFn = useAction(addRating);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  const product = products.find(p => p.id === parseInt(productId));

  const handleAddRating = (score, comment) => {
    addRatingFn({ productId: product.id, score, comment });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-2xl font-semibold mb-4">${product.price}</p>
      <div className="flex gap-2 mb-4">
        <img src="/path/to/image.jpg" alt={product.name} className="w-32 h-32 object-cover rounded" />
        {/* Add more images if available */}
      </div>
      {/* Reviews Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Reviews</h2>
        <button className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-700" onClick={() => handleAddRating(5, 'Great product!')}>Add Rating</button>
      </div>
      <button className="bg-green-500 px-6 py-3 mt-4 text-white font-bold rounded hover:bg-green-700">Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;
