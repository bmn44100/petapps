import React from 'react';
import { useAction, useQuery } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { getUserOrders, createOrder } from 'wasp/client/operations';

const CartPage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);
  const createOrderFn = useAction(createOrder);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCheckout = async () => {
    try {
      const newOrder = await createOrderFn({ userId: context.user.id, items: orders.flatMap(order => order.items) });
      alert('Order created: ' + newOrder.id);
    } catch (err) {
      alert('Checkout failed: ' + err.message);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-medium mb-5">Your Cart</h1>
      <div className="mb-5">
        {orders.map(order => (
          <div key={order.id} className="bg-white shadow-md p-4 rounded mb-4">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    // Implement item removal logic (e.g., updating state or triggering backend)
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartPage;
