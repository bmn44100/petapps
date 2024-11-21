import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getProductsByCategory, addToCart } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const ProductCatalogPage = ({ match }) => {
  const { category } = match.params;
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState({ field: 'name', direction: 'asc' });

  const { data: products, isLoading, error } = useQuery(getProductsByCategory, {
    variables: { category, priceRange, sortBy }
  });

  const addToCartFn = useAction(addToCart);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddToCart = (productId) => {
    addToCartFn({ productId });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{category} Products</h1>
        <div className="flex gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="mt-1"
            />
            <span>${priceRange.min} - ${priceRange.max}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sort By</label>
            <select
              value={sortBy.field}
              onChange={(e) => setSortBy({ ...sortBy, field: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={product.mainImage} alt={product.name} className="w-full h-48 object-cover rounded-t" />
            <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
            <p className="text-sm">{product.description}</p>
            <p className="font-medium">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogPage;
