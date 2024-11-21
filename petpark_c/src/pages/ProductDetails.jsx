import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProductsByCategory } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const ProductDetailsPage = ({ match }) => {
  const { productId } = match.params;
  const { data: products, isLoading, error } = useQuery(getProductsByCategory, { id: productId });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  // Assuming one result return, focusing on the first product
  const product = products.find(p => p.id === productId);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {product ? (
        <div>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
          <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-2">${product.price}</p>
          <p className="mt-2">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
          <Link 
            to="/cart" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
          >
            Add to Cart
          </Link>
        </div>
      ) : (
        <p>No product found.</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
