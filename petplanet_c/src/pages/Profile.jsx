import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserOrders, getWishlist } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const ProfilePage = () => {
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useQuery(getUserOrders);
  const { data: wishlist, isLoading: wishlistLoading, error: wishlistError } = useQuery(getWishlist);

  if (ordersLoading || wishlistLoading) return 'Loading...';
  if (ordersError || wishlistError) return 'Error: ' + (ordersError || wishlistError);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        {orders.length > 0 ? (
          <ul>
            {orders.map(order => (
              <li key={order.id} className="mb-2 p-4 bg-white rounded shadow">
                <div>Order ID: {order.id}</div>
                <div>Status: {order.status}</div>
                <div>Total: ${order.total.toFixed(2)}</div>
                <div>Products: {order.products.map(p => p.name).join(', ')}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Wishlist</h2>
        {wishlist.length > 0 ? (
          <ul>
            {wishlist.map(item => (
              <li key={item.id} className="mb-2 p-4 bg-white rounded shadow">
                <div>Product Name: {item.product.name}</div>
                <div>Price: ${item.product.price.toFixed(2)}</div>
                <div>Category: {item.product.category}</div>
                <Link to={`/product/${item.product.id}`} className="text-blue-500 hover:underline">View Product</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
