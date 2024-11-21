import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { getVendorProducts, updateVendor } from 'wasp/client/operations';

const VendorDashboard = () => {
  const { data: products, isLoading: productsLoading, error: productsError } = useQuery(getVendorProducts);
  const updateVendorFn = useAction(updateVendor);

  if (productsLoading) return 'Loading products...';
  if (productsError) return 'Error loading products: ' + productsError.message;

  const handleUpdateVendor = (vendorId, name, contactInfo) => {
    updateVendorFn({ vendorId, name, contactInfo });
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Manage Products</h3>
        <ul className="mt-4">
          {products.map(product => (
            <li key={product.id} className="p-4 mb-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold">{product.name}</h4>
                  <p className="text-sm">{product.description}</p>
                  <p className="text-sm">${product.price.toFixed(2)}</p>
                </div>
                <Link 
                  to={`/product/edit/${product.id}`} 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Update Profile</h3>
        <button 
          onClick={() => handleUpdateVendor(1, 'New Name', 'newcontact@example.com')} 
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Vendor Info
        </button>
      </div>
    </div>
  );
};

export default VendorDashboard;
