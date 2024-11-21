import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProductCatalog } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: products, isLoading, error } = useQuery(getProductCatalog);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white p-4 shadow-md'>
        <h1 className='text-3xl font-bold text-center'>Welcome to Petshouse</h1>
      </header>
      <section className='p-8'>
        <div className='mb-10'>
          <div className='relative h-64 bg-cover bg-center bg-[url("/hero.jpg")]'>
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
              <h2 className='text-white text-4xl font-bold'>Discover Our Featured Products</h2>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {products.map((product) => (
            <div key={product.id} className='bg-white p-4 rounded-lg shadow hover:shadow-lg'>
              <h3 className='text-xl font-semibold'>{product.name}</h3>
              <p className='text-gray-600'>{product.description}</p>
              <p className='text-lg font-bold'>${product.price}</p>
              <Link to={`/product/${product.id}`} className='text-blue-500 hover:text-blue-700'>
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
