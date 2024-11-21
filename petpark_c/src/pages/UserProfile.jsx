import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getUserOrders, updateUserProfile } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const UserProfilePage = () => {
  const { data: userOrders, isLoading: ordersLoading, error: ordersError } = useQuery(getUserOrders);
  const updateUserProfileFn = useAction(updateUserProfile);

  const [address, setAddress] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [message, setMessage] = useState(null);

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfileFn({ userId: 1, address, paymentInfo }); // Replace `1` with actual user ID
      setMessage('Profile updated successfully.');
    } catch (err) {
      setMessage('Failed to update profile.');
    }
  };

  if (ordersLoading) return 'Loading...';
  if (ordersError) return 'Error: ' + ordersError;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-gray-700">Address:</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          className="border p-2 w-full rounded" 
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-gray-700">Payment Info:</label>
        <input 
          type="text" 
          value={paymentInfo} 
          onChange={(e) => setPaymentInfo(e.target.value)} 
          className="border p-2 w-full rounded" 
        />
      </div>

      <button
        onClick={handleProfileUpdate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Profile
      </button>

      {message && <p className="mt-3 text-sm text-green-500">{message}</p>}

      <h2 className="text-xl font-bold mt-8 mb-4">Order History</h2>
      <ul className="list-disc pl-5">
        {userOrders.map((order) => (
          <li key={order.id}>{`Order #${order.id} - Total: $${order.totalAmount}`}</li>
        ))}
      </ul>

      <Link to="/orders" className="text-blue-500 hover:text-blue-700 mt-4 block">View all orders</Link>
    </div>
  );
}

export default UserProfilePage;
