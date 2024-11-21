import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getUserOrders, createOrder } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const CartPage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);
  const createOrderFn = useAction(createOrder);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCheckout = () => {
    const productIds = orders.flatMap(order => order.products.map(product => product.id));
    createOrderFn({ productIds });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {orders.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Start shopping!</Link></p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="bg-white shadow-md rounded-lg mb-4">
            <h2 className="text-xl font-semibold">Order #{order.id}</h2>
            {order.products.map(product => (
              <div key={product.id} className="flex justify-between items-center p-4 border-t">
                <span>{product.name}</span>
                <span>${product.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="p-4">
              <button
                onClick={handleCheckout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
