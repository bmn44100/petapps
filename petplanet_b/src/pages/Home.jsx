import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProductsByCategory } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: products, isLoading, error } = useQuery(getProductsByCategory, { categoryId: 1, priceRange: null, minRating: null, availability: true });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='bg-slate-50 p-6'>
      <div className='rounded-lg shadow-lg overflow-hidden mb-8'>
        <div className='p-6 bg-blue-500 text-white text-center'>
          <h1 className='text-4xl font-bold'>Welcome to PetPlanet!</h1>
          <p className='mt-2 text-lg'>Your one-stop shop for all pet needs.</p>
        </div>
      </div>

      <h2 className='text-2xl font-semibold mb-4'>Featured Products</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <div key={product.id} className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <img src={`https://picsum.photos/seed/${product.id}/400/400`} alt={product.name} className='w-full h-56 object-cover'/>
            <div className='p-4'>
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='mt-2 text-gray-600'>{product.description}</p>
              <p className='mt-2 font-bold text-blue-500'>${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
