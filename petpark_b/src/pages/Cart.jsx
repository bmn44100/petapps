import React from 'react';
import { useAction } from 'wasp/client/operations';
import { createOrder } from 'wasp/client/operations';

const CartPage = () => {
  const createOrderFn = useAction(createOrder);

  const handleCreateOrder = () => {
    // Example product IDs, replace with actual data from cart state
    const productIds = [1, 2, 3];
    createOrderFn({ productIds })
      .then(order => console.log('Order created:', order))
      .catch(error => console.error('Error creating order:', error));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {/* Cart items would be dynamically listed here */}
      <div className="mt-4">
        <button
          onClick={handleCreateOrder}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
