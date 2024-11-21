import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserOrders } from 'wasp/client/operations';

const OrderHistoryPage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-6 bg-slate-50 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Order History</h1>
      {orders.length === 0 ? (
        <p className='text-gray-500'>You have no orders yet.</p>
      ) : (
        <div className='space-y-6'>
          {orders.map(order => (
            <div key={order.id} className='p-4 bg-white shadow-md rounded-lg'>
              <h2 className='text-xl font-semibold'>Order #{order.id}</h2>
              <p>Status: <span className='font-medium'>{order.status}</span></p>
              <p>Total Amount: <span className='font-medium'>${order.totalAmount.toFixed(2)}</span></p>
              <ul className='list-disc list-inside mt-2'>
                {order.items.map(item => (
                  <li key={item.id}>
                    Product ID: {item.productId}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
