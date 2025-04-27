'use client'

import React, { useEffect, useState } from 'react';
import NavbarAside from '@/components/admin/NavbarAside';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import  Modal from "@/components/Modal"; // Import a modal component

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'email',
    direction: 'asc',
  });
  const [selectedUser, setSelectedUser] = useState<any>(null); // To store the selected user's data for modal

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
    // Add your edit logic here
  };

  const handleDelete = async (userId: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleView = (user: any) => {
    setSelectedUser(user); // Set the selected user for the modal
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <NavbarAside>
      <h2 className="text-2xl font-semibold mb-6">Users List</h2>

      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by email or username"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={() => {}} className="text-sm bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
          <FaEdit className="mr-2" /> Add New User
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="text-left p-4 border-b cursor-pointer" onClick={() => handleSort('email')}>
                  Email
                  {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
                <th className="text-left p-4 border-b cursor-pointer" onClick={() => handleSort('username')}>
                  Username
                  {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
                <th className="text-left p-4 border-b cursor-pointer" onClick={() => handleSort('createdAt')}>
                  Created
                  {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
                <th className="text-left p-4 border-b cursor-pointer" onClick={() => handleSort('role')}>
                  Role
                  {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
                <th className="text-center p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6">No users found</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-4 border-b">{user.email}</td>
                    <td className="p-4 border-b">{user.username}</td>
                    <td className="p-4 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 border-b">{user.role}</td> {/* Display role */}
                    <td className="p-4 border-b text-center space-x-2">
                      <Button
                        onClick={() => handleEdit(user.id)}
                        className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                      >
                        <FaEdit className="mr-1" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        <FaTrash className="mr-1" />
                      </Button>
                      <Button
                        onClick={() => handleView(user)} // View button to show details in a modal
                        className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                      >
                        <FaEye className="mr-1" /> View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for viewing user details */}
      {selectedUser && (
  <Modal onClose={() => setSelectedUser(null)}>
    <div className="p-4">
      <h3 className="text-xl font-semibold">User Details</h3>
      <div className="mt-4">
        <p><strong>First Name:</strong> {selectedUser.fname}</p>
        <p><strong>Last Name:</strong> {selectedUser.lname}</p>
        <p><strong>Email:</strong> {selectedUser.email}</p>
        <p><strong>Username:</strong> {selectedUser.username}</p>
        <p><strong>Street:</strong> {selectedUser.street}</p>
        <p><strong>State:</strong> {selectedUser.state}</p>
        <p><strong>Zip:</strong> {selectedUser.zip}</p>
        <p><strong>City:</strong> {selectedUser.city}</p>
        <p><strong>Country:</strong> {selectedUser.country}</p>
        <p><strong>Phone:</strong> {selectedUser.phone}</p>
        <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
        <p><strong>Updated At:</strong> {new Date(selectedUser.updatedAt).toLocaleDateString()}</p>
        <p><strong>Role:</strong> {selectedUser.role}</p>
      </div>
    </div>
  </Modal>
)}
    </NavbarAside>
  );
};

export default Users;
