import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { getFeaturedProducts, getCategories } from 'wasp/client/operations';

const HomePage = () => {
  const { data: featuredProducts, isLoading: isLoadingProducts, error: errorProducts } = useQuery(getFeaturedProducts);
  const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useQuery(getCategories);
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoadingProducts || isLoadingCategories) return 'Loading...';
  if (errorProducts || errorCategories) return 'Error: ' + (errorProducts || errorCategories);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded py-2 px-3 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Search
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="border rounded-lg p-4">
              <img src={product.imageURL} alt={product.name} className="w-full h-32 object-cover rounded-t" />
              <h3 className="font-bold mt-2">{product.name}</h3>
              <p className="text-gray-700">${product.price}</p>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 mt-2 rounded">
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
