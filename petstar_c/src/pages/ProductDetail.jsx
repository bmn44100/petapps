import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { getProductDetails } from 'wasp/client/operations';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useQuery(getProductDetails, { id: parseInt(productId, 10) });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-2">{product.description}</p>
      <p className="text-lg font-semibold mb-2">Price: ${product.price.toFixed(2)}</p>
      <p className="text-lg mb-4">Stock: {product.stock}</p>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
        Add to Cart
      </button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add to Wishlist
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          product.reviews.map(review => (
            <div key={review.id} className="mb-4 p-4 border rounded">
              <p className="text-lg font-semibold">{review.user.username}</p>
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
