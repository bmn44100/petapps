import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getAvailableProducts, addProductToWishlist } from 'wasp/client/operations';

const ProductPage = () => {
  const { productId } = useParams();
  const { data: products, isLoading, error } = useQuery(getAvailableProducts);
  const addProductToWishlistFn = useAction(addProductToWishlist);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const product = products.find(p => p.id === parseInt(productId));

  if (!product) return 'Product not found.';

  const handleAddToWishlist = () => {
    addProductToWishlistFn({ productId: product.id });
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-md'>
      <div className='flex flex-col md:flex-row'>
        <img src={product.imageUrl} alt={product.name} className='w-full md:w-1/2 rounded-lg' />
        <div className='md:ml-4 mt-4 md:mt-0'>
          <h1 className='text-2xl font-bold mb-2'>{product.name}</h1>
          <p className='text-lg mb-4'>{product.description}</p>
          <p className='text-xl font-semibold mb-4'>${product.price.toFixed(2)}</p>
          <button onClick={handleAddToWishlist} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;