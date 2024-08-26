import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative min-h-screen md:flex md:mt-0 mt-[4rem]">
      {/* Mobile menu button */}
      <div className="bg-white shadow-md  md:hidden fixed">
        <button
          onClick={toggleSidebar}
          className="text-gray-800 focus:outline-none"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={` inset-y-0 left-0 transform lg:mt-0 md:mt-14 mt-[2rem] absolute ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out min-h-screen w-48 bg-white shadow-md border-r border-gray-200 p-4 z-20`}
      >
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
            onClick={toggleSidebar} // Close sidebar on link click
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
            onClick={toggleSidebar} // Close sidebar on link click
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
            onClick={toggleSidebar} // Close sidebar on link click
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
            onClick={toggleSidebar} // Close sidebar on link click
          >
            Create Category
          </NavLink>
        </nav>
      </div>

    </div>
  );
};

export default Sidebar;
