import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: products, isLoading, error } = useQuery(getProducts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Trending Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <div className="mt-2">
              <span className="text-lg font-semibold">${product.price}</span>
            </div>
            <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline mt-4 inline-block">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
