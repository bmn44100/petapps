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
      const productIds = orders.flatMap(order => order.products.map(product => product.id));
      await createOrderFn({ productIds });
      alert('Order placed successfully!');
    } catch (error) {
      alert('Error placing order: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        {orders.length === 0 ? (
          <p>Your cart is empty. <Link to="/">Continue Shopping</Link></p>
        ) : (
          <div>
            {orders.map(order => (
              <div key={order.id} className="mb-4">
                <h2 className="font-bold">Order {order.id}</h2>
                <ul>
                  {order.products.map(product => (
                    <li key={product.id} className="flex justify-between">
                      <span>{product.name}</span>
                      <span>${product.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="font-bold mt-2">Total: ${order.totalAmount.toFixed(2)}</div>
              </div>
            ))}
            <button
              onClick={handleCheckout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
