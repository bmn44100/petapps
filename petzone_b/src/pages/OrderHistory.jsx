import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserOrders } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const OrderHistoryPage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow-md rounded-lg mb-4 p-4">
          <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
          <p>Status: {order.status}</p>
          <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
          <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
          <div className="mt-2">
            <h3 className="font-medium">Products:</h3>
            <ul className="list-disc list-inside">
              {order.products.map((product) => (
                <li key={product.id} className="ml-4">
                  {product.name} - ${product.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <Link to={`/order/${order.id}`} className="text-blue-500 hover:underline mt-2 block">
            View Order Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;
