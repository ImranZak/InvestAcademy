// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './pages/Navbar'; // Import your Navbar

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* This navbar will be present on all pages except Landing */}
      <main>
        <Outlet /> {/* This will render the current page content */}
      </main>
    </div>
  );
};

export default Layout;
