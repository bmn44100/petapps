import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getCart, createOrder } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const CartPage = () => {
  const { data: cart, isLoading, error } = useQuery(getCart);
  const createOrderFn = useAction(createOrder);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCheckout = () => {
    createOrderFn().then(order => {
      console.log('Order created successfully:', order);
    }).catch(err => {
      console.error('Could not create order:', err);
    });
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Start shopping</Link></p>
      ) : (
        <div>
          {cart.items.map(item => (
            <div key={item.product.id} className='flex items-center justify-between mb-2 px-2 py-2 bg-gray-100 rounded'>
              <div>
                <p className='font-semibold'>{item.product.name}</p>
                <p className='text-sm'>{item.product.description}</p>
              </div>
              <div className='flex items-center'>
                <p className='mr-4'>Quantity: {item.quantity}</p>
                <p className='mr-4'>Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
