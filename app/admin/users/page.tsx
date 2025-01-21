'use client'

import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState<any[]>([]); // State to hold the list of users
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch users data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
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

      {/* Users List */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Username</th>
                <th className="p-4 border-b">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center">No users found</td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user.id}>
           
                    <td className="p-4 border-b">{user.email}</td>
                    <td className="p-4 border-b">{user.username}</td>
                    <td className="p-4 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
