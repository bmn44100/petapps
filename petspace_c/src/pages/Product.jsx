import React, { useState } from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getProductDetails, addReview } from 'wasp/client/operations';

const ProductPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useQuery(getProductDetails, { productId });
  const addReviewFn = useAction(addReview);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddReview = async () => {
    try {
      await addReviewFn({ productId, rating, comment });
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Failed to add review:', err);
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className=''>
          <img src={product.images} alt={product.name} className='w-full h-auto rounded-lg' />
        </div>
        <div className=''>
          <h1 className='text-2xl font-bold mb-2'>{product.name}</h1>
          <p className='text-lg'>{product.description}</p>
          <p className='text-xl font-semibold my-4'>${product.price}</p>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className='mb-4'>
              <p>Rating: {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}

        <h2 className='text-xl font-bold mt-8 mb-4'>Add a Review</h2>
        <div className='flex flex-col gap-4'>
          <input
            type='number'
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value) || 0)}
            className='border rounded px-3 py-2'
            min='1'
            max='5'
            placeholder='Rating (1-5)'
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='border rounded px-3 py-2'
            placeholder='Comment'
          />
          <button
            onClick={handleAddReview}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
