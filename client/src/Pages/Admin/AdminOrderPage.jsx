import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/order/admin/orders`, {
        params: { searchQuery },
      });

      if (response.data.success) {
        const { orders } = response.data;
        if (Array.isArray(orders)) {
          setOrders(orders);
        } else {
          setError('Unexpected response format');
        }
      } else {
        setError('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchQuery]);

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.post(`/api/order/admin/orders/update-status`, { orderId, status });
      fetchOrders();
      toast.success('Status has been Updated');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`/api/order/admin/orders/delete`, { data: { orderId } });
      fetchOrders();
      toast.success('Order has been deleted');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  return (
    <div className="admin-order-page pt-10  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 lg:pt-0 md:pt-10 pt-20">Manage Orders</h1>
      {/* <input
        type="text"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar mb-6 p-2 border border-gray-300 rounded w-full max-w-md"
      /> */}

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="order-list w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="order-card w-[100%] bg-white p-4 rounded-lg shadow-lg relative">
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
                >
                  <FaTrashAlt size={20} />
                </button>
                <h3 className=" mb-2">Order ID: {order._id}</h3>
                <p className="text-gray-700 mb-2">
                  User: {order.user ? order.user.email : 'Unknown User'}
                </p>
                <p className="text-gray-700 mb-2">
                  Products: {order.products.map(p => p.product.title).join(', ')}
                </p>
                <p className="text-gray-700 mb-2">Total Amount: ${order.totalAmount.toFixed(2)}</p>
                <p className="text-gray-700 mb-2">Order Status: {order.orderStatus}</p>
                <select
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  value={order.orderStatus}
                  className="p-2 border border-gray-300 rounded w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
