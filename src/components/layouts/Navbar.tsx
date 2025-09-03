'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';

const Navbar: React.FC = () => {
  const { user, clearUser } = useUser();
  const router = useRouter();

  const handleLogout = (): void => {
    clearUser();
    router.push('/');
  };

  return (
    <nav className="flex items-center justify-between mb-6">
      <Link href="/dashboard" className="text-2xl font-bold text-purple-600">
        Interview Prep AI
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-600">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
