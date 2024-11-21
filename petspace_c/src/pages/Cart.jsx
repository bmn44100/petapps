import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getUserOrders, createOrder } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const CartPage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);
  const createOrderFn = useAction(createOrder);
  const [items, setItems] = useState([]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCheckout = async () => {
    try {
      const order = await createOrderFn({ items });
      // Handle successful order creation, e.g., redirect or show a success message
    } catch (err) {
      console.error(err);
      // Handle error during order creation
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {orders && orders.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} className="flex justify-between mb-2">
              <div>{order.product.name}</div>
              <div>x{order.quantity}</div>
              <div>${order.product.price}</div>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Proceed to Checkout
          </button>
          <Link to="/" className="text-blue-500 hover:underline mt-4 block">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
