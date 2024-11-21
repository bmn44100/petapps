import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserOrders } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const UserDashboardPage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Your Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className='bg-white shadow-md p-4 rounded-lg mb-4'>
          <div className='flex justify-between'>
            <div className='font-semibold'>Order ID: {order.id}</div>
            <div>Status: {order.status}</div>
          </div>
          <div className='text-gray-500'>Order Date: {new Date(order.orderDate).toLocaleDateString()}</div>
          <div className='flex justify-end'>
            <Link to={`/order/${order.id}`} className='text-blue-500 hover:underline'>View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDashboardPage;
