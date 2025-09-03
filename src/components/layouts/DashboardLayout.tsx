'use client';

import React from 'react';
import { useUser } from '@/context/userContext';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useUser();

  return (
    <div className="w-full min-h-screen bg-white pt-6 px-6">
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
