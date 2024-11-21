import React, { useState, useEffect } from 'react';
import { useAction } from 'wasp/client/operations';
import { createOrder } from 'wasp/client/operations';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const createOrderFn = useAction(createOrder);

  useEffect(() => {
    const dummyCartItems = [
      { id: 1, name: 'Dog Food', price: 20.0, quantity: 1 },
      { id: 2, name: 'Cat Toy', price: 5.0, quantity: 2 }
    ];
    setCartItems(dummyCartItems);
    setQuantityMap(dummyCartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {}));
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setQuantityMap(
      prevMap => ({
        ...prevMap,
        [id]: newQuantity
      })
    );
  };

  const handleCheckout = async () => {
    const order = await createOrderFn({
      products: cartItems.map(item => ({ productId: item.id, quantity: quantityMap[item.id] }))
    });
    console.log('Order created:', order);
  };

  return (
    <div className='p-4 bg-gray-50 rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className='bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between'>
              <div className='flex items-center'>
                <p className='text-lg font-medium'>{item.name}</p>
                <input
                  type='number'
                  value={quantityMap[item.id]}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                  className='ml-4 w-16 p-1 border rounded'
                />
              </div>
              <p className='text-lg font-medium'>${(item.price * quantityMap[item.id]).toFixed(2)}</p>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4'
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
