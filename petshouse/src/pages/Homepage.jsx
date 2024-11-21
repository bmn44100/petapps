import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getProductsByCategory } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const Homepage = () => {
  const { data: products, isLoading, error } = useQuery(getProductsByCategory, { category: 'featured' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='max-w-7xl mx-auto py-10 px-4'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-extrabold text-gray-900'>Welcome to Petshouse</h1>
        <p className='mt-4 text-xl text-gray-600'>Discover our range of products designed for your pet's comfort and joy.</p>
      </div>
      <div className='grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <div key={product.id} className='bg-white p-5 rounded shadow-md hover:shadow-xl'>
            <img src={product.mainImage} alt={product.name} className='w-full h-64 object-cover rounded'/>
            <div className='mt-5'>
              <h3 className='text-lg font-bold'>{product.name}</h3>
              <p className='mt-2 text-gray-500'>{product.description}</p>
              <div className='mt-3 flex items-center justify-between'>
                <span className='text-xl font-semibold'>${product.price}</span>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
