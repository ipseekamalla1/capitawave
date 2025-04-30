'use client'

import { FaTachometerAlt, FaUsers, FaCog, FaSignOutAlt,FaUserCircle, FaExchangeAlt} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NavbarAside({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear session storage/local storage if you use it
    sessionStorage.clear();
    localStorage.clear();
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-white text-gray-800 w-64 shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-wide border-b border-gray-200">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-3 mt-4">
          <Link href="/admin" className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 transition">
            <FaTachometerAlt className="text-blue-600" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/users" className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 transition">
            <FaUsers className="text-blue-600" />
            <span>Users</span>
          </Link>
         
<Link href="/admin/accounts" className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 transition">
  <FaUserCircle className="text-blue-600" />
  <span>Accounts</span>
</Link>

<Link href="/admin/transactions" className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 transition">
  <FaExchangeAlt className="text-blue-600" />
  <span>Transactions</span>
</Link>


          <Link href="/admin/settings" className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 transition">
            <FaCog className="text-blue-600" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full space-x-3 py-2 px-4 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow flex justify-between items-center px-8 py-5">
          <h1 className="text-2xl font-bold text-gray-700">Welcome Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition"
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
