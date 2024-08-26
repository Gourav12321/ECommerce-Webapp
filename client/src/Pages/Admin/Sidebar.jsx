import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-white shadow-md border-r border-gray-200 p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        <NavLink
          to="all-users"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-blue-100'
            }`
          }
        >
          All Users
        </NavLink>
        <NavLink
          to="all-products"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-blue-100'
            }`
          }
        >
          All Products
        </NavLink>
        <NavLink
          to="upload-product"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-blue-100'
            }`
          }
        >
          Upload Product
        </NavLink>
        <NavLink
          to="create-category"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-blue-100'
            }`
          }
        >
          Create Category
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
