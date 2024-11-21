import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserOrders } from 'wasp/client/operations';

const UserProfilePage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order ID: {order.id}</p>
                    <p>Status: {order.status}</p>
                  </div>
                  <ul className="list-disc pl-5">
                    {order.products.map(product => (
                      <li key={product.id} className="text-gray-700">
                        {product.name} - ${product.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
