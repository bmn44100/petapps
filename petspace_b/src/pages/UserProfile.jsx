import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserOrders } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const UserProfilePage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p>Total Price: ${order.totalPrice}</p>
                <ul className="mt-2">
                  {order.orderItems.map(item => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.product.name} (x{item.quantity})</span>
                      <span>${item.product.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Pet Profiles</h2>
        <p>Manage your pet profiles here.</p>
        <Link to="/pet-profiles" className="text-blue-500 hover:underline">
          Go to Pet Profiles
        </Link>
      </div>
    </div>
  );
};

export default UserProfilePage;
