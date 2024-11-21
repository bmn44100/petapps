import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { getOrders, getPetProfiles } from 'wasp/client/operations';

const UserProfilePage = () => {
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useQuery(getOrders);
  const { data: petProfiles, isLoading: petProfilesLoading, error: petProfilesError } = useQuery(getPetProfiles);

  if (ordersLoading || petProfilesLoading) return 'Loading...';
  if (ordersError) return 'Error loading orders: ' + ordersError;
  if (petProfilesError) return 'Error loading pet profiles: ' + petProfilesError;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Orders</h2>
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
            <div className="flex justify-between">
              <p>Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
            </div>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item.id}>
                  {item.product.name} - {item.quantity} x ${item.product.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Pet Profiles</h2>
        {petProfiles.map((pet) => (
          <div key={pet.id} className="bg-white p-4 shadow mb-4 rounded-lg">
            <p><span className="font-semibold">Name:</span> {pet.name}</p>
            <p><span className="font-semibold">Breed:</span> {pet.breed ? pet.breed : 'Unknown'}</p>
            <p><span className="font-semibold">Medical Records:</span> {pet.medicalRecords ? pet.medicalRecords : 'None'}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default UserProfilePage;
