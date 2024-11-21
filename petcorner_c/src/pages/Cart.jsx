import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getUserOrders, createOrder } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const CartPage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);
  const createOrderFn = useAction(createOrder);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCheckout = async () => {
    try {
      const order = await createOrderFn({ productIds: orders.map(order => order.id) });
      alert('Order created successfully: ' + order.id);
    } catch (err) {
      alert('Error creating order: ' + err.message);
    }
  };

  return (
    <div className='p-4'>
      {orders.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className='flex flex-col bg-gray-100 p-4 mb-4 rounded-lg'>
              {order.products.map(product => (
                <div key={product.id} className='flex items-center gap-4 mb-2'>
                  <img src={product.imageUrl} alt={product.name} className='w-16 h-16 object-cover rounded' />
                  <div className='flex-1'>
                    <div className='font-semibold'>{product.name}</div>
                    <div className='text-gray-600'>${product.price}</div>
                  </div>
                </div>
              ))}
              <div className='font-bold'>Total Amount: ${order.totalAmount}</div>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
