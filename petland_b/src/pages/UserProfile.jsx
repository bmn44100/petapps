import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserWishlist } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const UserProfilePage = () => {
  const { data: wishlist, isLoading, error } = useQuery(getUserWishlist);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Wishlist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow rounded-lg">
              <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover mb-2" />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-semibold mt-2">${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline mt-2 block">View Details</Link>
            </div>
          ))}
        </div>
      </section>
      {/* Order history and other profile sections would go here */}
    </div>
  );
}

export default UserProfilePage;
