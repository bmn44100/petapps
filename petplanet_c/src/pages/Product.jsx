import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getProducts, addToWishlist, createOrder } from 'wasp/client/operations';

const ProductPage = () => {
  const { productId } = useParams();
  const { data: products, isLoading, error } = useQuery(getProducts);
  const addToWishlistFn = useAction(addToWishlist);
  const createOrderFn = useAction(createOrder);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const product = products.find(prod => prod.id === Number(productId));
  if (!product) return 'Product not found';

  const handleAddToWishlist = () => {
    addToWishlistFn({ productId: product.id });
  };

  const handleAddToCart = () => {
    createOrderFn({ productIds: [product.id] });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <img src={product.images} alt={product.name} className="w-full md:w-1/2 rounded-lg" />
        <div className="md:ml-4 mt-4 md:mt-0">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">${product.price}</p>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        <p>No reviews yet.</p>
      </div>
    </div>
  );
};

export default ProductPage;
