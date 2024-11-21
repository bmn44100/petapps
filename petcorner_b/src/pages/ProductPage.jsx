
import React, { useState } from 'react';
import { useQuery, useAction, getProducts, writeReview } from 'wasp/client/operations';
import { useParams } from 'wasp/client/router';
import { Link } from 'wasp/client/router';

const ProductPage = () => {
  const { productId } = useParams();
  const { data: products, isLoading, error } = useQuery(getProducts, { categoryId: null });
  const writeReviewFn = useAction(writeReview);
  const [review, setReview] = useState({ rating: 0, comment: '' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const product = products.find(p => p.id === parseInt(productId));

  if (!product) return 'Product not found';

  const handleReviewSubmit = () => {
    writeReviewFn({ productId: product.id, rating: review.rating, comment: review.comment });
    setReview({ rating: 0, comment: '' });
  };

  return (
    <div className='p-6'>
      <div className='bg-white shadow-md rounded-lg p-4'>
        <h1 className='text-2xl font-bold mb-2'>{product.name}</h1>
        <p className='text-gray-700'>Price: ${product.price}</p>
        <p className='text-gray-700'>{product.description}</p>
        <Link to={`/cart`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block'>
          View Cart
        </Link>
      </div>

      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>Write a Review</h2>
        <div className='flex gap-x-4 mt-2'>
          <input 
            type='number' 
            value={review.rating} 
            onChange={(e) => setReview({ ...review, rating: e.target.value })} 
            className='border p-2 rounded' 
            placeholder='Rating'
          />
          <textarea 
            value={review.comment} 
            onChange={(e) => setReview({ ...review, comment: e.target.value })} 
            className='border p-2 rounded w-full' 
            placeholder='Comment'
          />
          <button 
            onClick={handleReviewSubmit} 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Submit
          </button>
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>Similar Products</h2>
        <div className='grid grid-cols-3 gap-4'>
          {products.map(prod => (
            <div key={prod.id} className='p-4 bg-white rounded-lg shadow-md'>
              <h3 className='font-bold'>{prod.name}</h3>
              <p>${prod.price}</p>
              <Link to={`/product/${prod.id}`} className='text-blue-500 hover:underline'>
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
