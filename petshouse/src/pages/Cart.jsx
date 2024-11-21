import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getUserCart, addToCart } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const CartPage = () => {
  const { data: cartItems, isLoading, error } = useQuery(getUserCart);
  const addToCartFn = useAction(addToCart);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      addToCartFn({ productId, quantity: newQuantity });
    }
  };

  return (
    <div className='p-4 bg-white rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <img src={item.product.mainImage} alt={item.product.name} className='w-16 h-16 object-cover mr-4 rounded'/>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold'>{item.product.name}</h3>
            <div className='flex items-center mt-2'>
              <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>-</button>
              <span className='mx-2'>{item.quantity}</span>
              <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)} className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'>+</button>
            </div>
          </div>
          <div className='text-lg font-semibold'>${(item.product.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}
      <Link to="/checkout" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Proceed to Checkout</Link>
    </div>
  );
};

export default CartPage;
