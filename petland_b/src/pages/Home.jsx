import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getAvailableProducts } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: products, isLoading, error } = useQuery(getAvailableProducts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-lg">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-500 font-semibold">${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="text-indigo-500 hover:text-indigo-700">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
