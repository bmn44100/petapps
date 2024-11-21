import React, { useState } from 'react';
import { useQuery, useAction, getProductDetails, addReview } from 'wasp/client/operations';

const ProductPage = ({ productId }) => {
  const { data: product, isLoading, error } = useQuery(getProductDetails, { id: productId });
  const addReviewFn = useAction(addReview);
  const [review, setReview] = useState({ rating: 0, comment: '' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddReview = () => {
    if (review.rating > 0 && review.rating <= 5) {
      addReviewFn({ productId, ...review });
      setReview({ rating: 0, comment: '' });
    } else {
      alert('Please provide a rating between 1 and 5.');
    }
  };

  return (
    <div className='p-4'>
      <div className='bg-white shadow-md rounded-lg p-4 mb-6'>
        <h2 className='text-2xl font-bold mb-2'>{product.name}</h2>
        <p className='text-lg mb-4'>{product.description}</p>
        <p className='text-xl font-semibold'>${product.price}</p>
        <div className='mt-4'>
          <h3 className='text-xl font-bold mb-2'>Reviews</h3>
          {product.reviews.map(review => (
            <div key={review.id} className='mb-4 p-2 border rounded'>
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-gray-100 p-4 rounded-lg'>
        <h3 className='text-xl font-bold mb-2'>Add a Review</h3>
        <input
          type='number'
          className='border p-2 rounded mb-2 w-full'
          placeholder='Rating (1-5)'
          value={review.rating}
          onChange={e => setReview({ ...review, rating: parseInt(e.target.value) })}
          min='1'
          max='5'
        />
        <textarea
          className='border p-2 rounded mb-2 w-full'
          placeholder='Comment'
          value={review.comment}
          onChange={e => setReview({ ...review, comment: e.target.value })}
        ></textarea>
        <button
          onClick={handleAddReview}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
