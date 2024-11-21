import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data: products, isLoading, error } = useQuery(getProducts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const product = products.find(product => product.id === Number(productId));

  if (!product) return 'Product not found.';

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex gap-x-8">
        <img src={product.image} alt={product.name} className="w-1/2 rounded-lg" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-6">${product.price.toFixed(2)}</p>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Ratings</h2>
            <div className="flex items-center gap-x-2">
              {product.ratings.map(rating => (
                <div key={rating.id} className="bg-gray-200 p-4 rounded-lg">
                  <p>Score: {rating.score}</p>
                  {rating.comment && <p className="italic">"{rating.comment}"</p>}
                </div>
              ))}
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Wishlist
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-4 gap-4">
          {products.filter(p => p.id !== product.id && p.categories.some(category => product.categories.includes(category))).map(relatedProduct => (
            <div key={relatedProduct.id} className="bg-white shadow-md rounded-lg p-4">
              <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-40 object-cover rounded-lg mb-2" />
              <p className="font-semibold">{relatedProduct.name}</p>
              <p>${relatedProduct.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
