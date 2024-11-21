import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: productData, isLoading, error } = useQuery(getProducts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  const { products } = productData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 bg-gradient-to-r from-blue-400 to-purple-500 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to PetSpace</h1>
        <p className="text-xl">Your one-stop solution for all pet needs!</p>
      </div>
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
              <img src={product.images} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p>{product.description}</p>
                <p className="text-xl font-semibold text-blue-600">${product.price}</p>
                <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline mt-2 inline-block">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
