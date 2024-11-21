import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProductCatalog } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: products, isLoading, error } = useQuery(getProductCatalog);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to PetSpace</h1>
        <p className="text-lg">Your one-stop shop for all pet needs!</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold text-lg mb-2">${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <p className="font-bold">Food</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <p className="font-bold">Toys</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <p className="font-bold">Grooming</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <p className="font-bold">Accessories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
