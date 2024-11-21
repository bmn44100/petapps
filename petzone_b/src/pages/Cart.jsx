import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getUserOrders, createOrder } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const CartPage = () => {
  const { data: orders, isLoading, error } = useQuery(getUserOrders);
  const createOrderFn = useAction(createOrder);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleProductSelection = (productId, isSelected) => {
    setSelectedProductIds(prev => 
      isSelected ? [...prev, productId] : prev.filter(id => id !== productId)
    );
  };

  const handleCreateOrder = () => {
    if (selectedProductIds.length > 0) {
      createOrderFn({ productIds: selectedProductIds });
    } else {
      alert('Please select at least one product to place an order.');
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Your Shopping Cart</h1>
      <div className='bg-white shadow-md rounded mb-4'>
        {orders.map(order => (
          <div key={order.id} className='p-4 border-b last:border-b-0 flex justify-between items-center'>
            <div className='flex items-center'>
              <input 
                type='checkbox' 
                checked={selectedProductIds.includes(order.id)} 
                onChange={(e) => handleProductSelection(order.id, e.target.checked)} 
              />
              <div className='ml-4'>
                <p className='font-medium'>{order.products.map(p => p.name).join(', ')}</p>
                <p className='text-gray-600'>Total Price: ${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <Link to={`/product/${order.id}`} className='text-blue-500 hover:underline'>View Details</Link>
          </div>
        ))}
      </div>
      <button 
        onClick={handleCreateOrder} 
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Place Order
      </button>
    </div>
  );
};

export default CartPage;
