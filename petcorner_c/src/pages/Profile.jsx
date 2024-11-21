import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserOrders } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const ProfilePage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        {orders.length ? (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.id} className="p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Order #{order.id}</span>
                  <span>Total: ${order.totalAmount.toFixed(2)}</span>
                </div>
                <div>Status: {order.status}</div>
                <ul className="mt-2 space-y-2">
                  {order.products.map(product => (
                    <li key={product.id} className="flex justify-between">
                      <span>{product.name}</span>
                      <span>${product.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no orders yet.</p>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Wishlist</h2>
        <p>Coming soon!</p>
      </section>
    </div>
  );
};

export default ProfilePage;
