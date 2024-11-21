import React, { useState } from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getProductDetails, addProductReview } from 'wasp/client/operations';

const ProductPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useQuery(getProductDetails, { id: productId });
  const addReview = useAction(addProductReview);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  const handleAddReview = async () => {
    try {
      await addReview({ productId, rating: reviewRating, comment: reviewComment });
      alert('Review added successfully!');
      setReviewComment('');
    } catch (err) {
      alert('Failed to add review: ' + err.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg mb-4">{product.description}</p>
      <div className="mb-4">
        <strong>Price: </strong>${product.price}
      </div>
      <div className="mb-4">
        <strong>Stock: </strong>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="p-2 mb-2 bg-gray-100 rounded">
            <p><strong>Rating:</strong> {review.rating}/5</p>
            <p><strong>Comment:</strong> {review.comment}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
        <textarea 
          placeholder="Write your comment here..." 
          className="w-full p-2 border rounded mb-2" 
          value={reviewComment} 
          onChange={(e) => setReviewComment(e.target.value)}
        />
        <div className="mb-2">
          <label className="mr-2">Rating:</label>
          <select 
            value={reviewRating} 
            onChange={(e) => setReviewRating(Number(e.target.value))}
            className="border rounded p-1"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={handleAddReview} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
