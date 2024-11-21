import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getProductDetails, addReview } from 'wasp/client/operations';

const ProductPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useQuery(getProductDetails, { id: productId });
  const addReviewFn = useAction(addReview);

  const handleAddReview = (rating, comment) => {
    addReviewFn({ productId: parseInt(productId), rating, comment });
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg">
        <img className="w-full h-64 object-cover rounded-t-lg" src={product.imageUrl} alt={product.name} />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">${product.price}</span>
            <span className="text-sm text-gray-500">Stock: {product.stock}</span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {product.reviews.map(review => (
          <div key={review.id} className="mb-4">
            <div className="flex items-center mb-2">
              <span className="font-bold mr-2">Rating:</span>
              <span>{review.rating} / 5</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
        <button
          onClick={() => handleAddReview(5, 'Great product!')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
