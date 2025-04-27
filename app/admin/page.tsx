import Head from 'next/head';
import NavbarAside from '@/components/admin/NavbarAside'; // adjust if path is different

export default function Admin() {
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarAside>
        <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </NavbarAside>
    </>
  );
}
