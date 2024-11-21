import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: products, isLoading, error } = useQuery(getProducts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-6 bg-white max-w-screen-lg mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to PetZone</h1>
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Featured Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map(product => (
            <div key={product.id} className='border border-gray-200 shadow-md rounded p-4'>
              <h3 className='text-xl font-medium'>{product.name}</h3>
              <p className='mt-2 text-gray-600'>{product.description}</p>
              <p className='mt-2 text-lg font-bold'>${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className='text-blue-500 hover:underline mt-2'>
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
