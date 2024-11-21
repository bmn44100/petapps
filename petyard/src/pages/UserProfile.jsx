import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserProfile, getUserOrders } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const UserProfilePage = () => {
  const { data: userProfile, isLoading: isLoadingProfile, error: errorProfile } = useQuery(getUserProfile);
  const { data: userOrders, isLoading: isLoadingOrders, error: errorOrders } = useQuery(getUserOrders);

  if (isLoadingProfile || isLoadingOrders) return 'Loading...';
  if (errorProfile || errorOrders) return 'Error: ' + (errorProfile || errorOrders);

  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Pet Profiles</h2>
        {userProfile.petProfiles.map(pet => (
          <div key={pet.id} className="my-2 p-4 border rounded shadow">
            <p><strong>Name:</strong> {pet.name}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age} years</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Order History</h2>
        {userOrders.map(order => (
          <div key={order.id} className="my-2 p-4 border rounded shadow">
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
            <Link to={`/order/${order.id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePage;
