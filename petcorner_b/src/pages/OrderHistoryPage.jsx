import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getOrderHistory } from 'wasp/client/operations';

const OrderHistoryPage = () => {
  const { data: orders, isLoading, error } = useQuery(getOrderHistory);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className='bg-white shadow-md rounded-lg p-4 mb-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-xl font-semibold'>Order #{order.id}</h2>
              <p className='text-gray-600'>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <div className='text-lg font-bold text-green-700'>Total: ${order.totalPrice.toFixed(2)}</div>
          </div>
          <div className='mt-2'>
            {order.items.map((item) => (
              <div key={item.id} className='flex justify-between items-center py-2'>
                <div className='flex items-center'>
                  <p className='text-lg mr-2'>{item.product.name}</p>
                  <p className='text-gray-600'>x{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;
