import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserOrders } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const OrdersPage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Your Orders</h1>
      {orders.map(order => (
        <div key={order.id} className='bg-white shadow-md rounded-lg mb-4 p-4'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-semibold'>Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
              <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className='mt-2'>
            <h2 className='font-semibold'>Items:</h2>
            {order.orderItems.map(item => (
              <div key={item.id} className='pl-4'>
                <p>Product: {item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price at Purchase: ${item.priceAtPurchase.toFixed(2)}</p>
                <Link to={`/product/${item.product.id}`} className='text-blue-500 hover:underline'>
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
