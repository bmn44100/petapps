import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { useParams } from 'react-router-dom';
import { getProductReviews, addProductReview } from 'wasp/client/operations';

const ProductPage = () => {
  const { productId } = useParams();
  const { data: reviews, isLoading, error } = useQuery(getProductReviews, { productId });
  const addReview = useAction(addProductReview);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddReview = () => {
    if (rating > 0 && comment.trim()) {
      addReview({ productId, rating, comment });
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="mb-6">
        <h2 className="text-xl mb-2">Reviews</h2>
        {reviews.map(review => (
          <div key={review.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
            <p className="font-semibold">Rating: {review.rating}</p>
            <p>{review.comment}</p>
            <p className="text-sm text-gray-500">Reviewed by User {review.user.id}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl mb-4">Add a Review</h2>
        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Comment</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <button onClick={handleAddReview} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
