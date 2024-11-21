import React, { useState } from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getProductDetails, addReview } from 'wasp/client/operations';

const ProductPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useQuery(getProductDetails, { id: productId });
  const addReviewFn = useAction(addReview);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddReview = () => {
    if (rating > 0 && rating <= 5 && comment) {
      addReviewFn({ productId: product.id, rating, comment });
      setRating(0);
      setComment('');
    } else {
      alert('Please provide a valid rating (1-5) and comment.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map(review => (
            <div key={review.id} className="mt-2 p-2 bg-gray-100 rounded">
              <p><strong>Rating:</strong> {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Add a Review</h2>
        <div className="mt-2 flex items-center">
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            placeholder="Rating (1-5)"
            className="border p-2 rounded mr-2"
            min="1"
            max="5"
          />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
            className="border p-2 rounded w-1/2"
          />
          <button
            onClick={handleAddReview}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
