import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Admin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <Outlet /> {/* This renders the matched child route */}
      </div>
    </div>
  );
};

export default Admin;
