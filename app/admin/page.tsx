// pages/admin.js
import Head from 'next/head';

export default function Admin() {
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64 p-4 space-y-4">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:bg-gray-700 p-2 rounded">Dashboard</a></li>
            <li><a href="#" className="hover:bg-gray-700 p-2 rounded">Users</a></li>
            <li><a href="#" className="hover:bg-gray-700 p-2 rounded">Settings</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="text-3xl font-semibold">Welcome to the Admin Dashboard</h1>
          
          {/* Example Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Total Users</h3>
              <p className="text-2xl">1,250</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Pending Orders</h3>
              <p className="text-2xl">54</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Revenue</h3>
              <p className="text-2xl">$12,345</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
