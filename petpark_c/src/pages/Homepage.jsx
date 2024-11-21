import React, { useState } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProductsByCategory, searchProducts } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: featuredProducts, isLoading: featuredLoading, error: featuredError } = useQuery(getProductsByCategory, { variables: { categoryId: 1 } });
  const [searchTerm, setSearchTerm] = useState('');
  const { data: searchResults, refetch: refetchSearch } = useQuery(searchProducts, { variables: { searchTerm } }, { enabled: false });

  const handleSearch = () => {
    refetchSearch();
  };

  if (featuredLoading) return 'Loading...';
  if (featuredError) return 'Error: ' + featuredError;

  return (
    <div className="p-8">
      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Search
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {featuredProducts.map(product => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4 rounded" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-red-500 font-bold">${product.price.toFixed(2)}</p>
            <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
      {searchResults && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map(product => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4 rounded" />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>{product.description}</p>
                <p className="text-red-500 font-bold">${product.price.toFixed(2)}</p>
                <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
