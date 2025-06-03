'use client';

import React, { useEffect, useState } from 'react';
import NavbarAside from '@/components/admin/NavbarAside';
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";


interface User {
  id: string;
  fname: string;
  lname: string;
}

interface Account {
  id: string;
  accountNumber: string;
  accountType: 'CHECKING' | 'SAVINGS' | 'CREDIT';
  balance: number;
  createdAt: string;
  closedAt?: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
  user: {
    fname: string;
    lname: string;
  };
}

interface SortConfig {
  key: keyof Account | 'name';
  direction: 'asc' | 'desc';
}

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'createdAt', direction: 'desc' });
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Add state for Edit modal
  const [editedAccount, setEditedAccount] = useState<Account | null>(null); // Add state for edited account


  // Form states
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    accountType: 'CHECKING',
    balance: '',
    status: 'ACTIVE',
    userId: '',
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch('/api/admin/accounts');
        const data = await res.json();
        setAccounts(data);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchAccounts();
    fetchUsers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleView = (account: Account) => {
    setSelectedAccount(account);
  };

  const handleAddAccount = async () => {
    try {
      const res = await fetch('/api/admin/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAccount,
          balance: parseFloat(newAccount.balance), // Ensure balance is a float
        }),
      });
  
      if (res.ok) {
        const newAcc = await res.json(); // Expect the response to include user details as well
  
        // Update accounts state with the newly created account (including user data)
        setAccounts((prev) => [...prev, newAcc]);
  
        // Close modal and reset the form
        setShowAddModal(false);
        toast.success("Account added successfully!");

        setNewAccount({
          accountNumber: '',
          accountType: 'CHECKING',
          balance: '',
          status: 'ACTIVE',
          userId: '', // Assuming you select the user ID from the form
        });
      } else {
        console.error('Failed to create account');
      }
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };
  const handleEditAccount = async () => {
    try {
      if (!editedAccount) return;
  
      const res = await fetch(`/api/admin/accounts/${editedAccount.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountNumber: editedAccount.accountNumber, // Add the necessary fields
          accountType: editedAccount.accountType,     // Add the necessary fields
          balance: parseFloat(editedAccount.balance.toString()), // Ensure balance is a float
          status: editedAccount.status,               // Add the status
                         // Add last name
        }),
      });
  
      if (res.ok) {
        const updatedAccount = await res.json();
        console.log('Updated Account:', updatedAccount); // Check the account data
        setAccounts((prev) =>
          prev.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc))
        );
        setShowEditModal(false);
        toast.success("Account edited successfully!");

      } else {
        console.error('Failed to update account');
      }
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };
  
  

  const handleDeleteAccount = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/accounts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAccounts((prev) => prev.filter((account) => account.id !== id));
        toast.success("Account deleted successfully!");

      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  // Filter & Sort
  const filteredAccounts = accounts
    .filter((acc) => {
      const query = searchQuery.toLowerCase();
      return (
        acc.accountNumber.toLowerCase().includes(query) ||
        `${acc.user.fname} ${acc.user.lname}`.toLowerCase().includes(query) ||
        acc.accountType.toLowerCase().includes(query) ||
        acc.status.toLowerCase().includes(query) ||
        acc.balance.toString().includes(query) ||
        new Date(acc.createdAt).toLocaleDateString().toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      if (sortConfig.key === 'name') {
        aValue = `${a.user.fname} ${a.user.lname}`.toLowerCase();
        bValue = `${b.user.fname} ${b.user.lname}`.toLowerCase();
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  // Pagination
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAccounts.length / usersPerPage);

  return (
    <NavbarAside>
      <h2 className="text-2xl font-semibold mb-6">Accounts</h2>

      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search accounts..."
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={() => setShowAddModal(true)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition text-sm">
          <FaEdit className="mr-2" /> Add New Account
        </Button>
      </div>

      {loading ? (
        <p>Loading accounts...</p>
      ) : currentAccounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('accountNumber')}>Account Number</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('accountType')}>Type</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('balance')}>Balance</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('createdAt')}>Created</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAccounts.map((account) => (
                  <tr key={account.id} className="border-b hover:bg-gray-100">
                    <td className="p-4">{account.accountNumber}</td>
                    <td className="p-4">{account.user.fname} {account.user.lname}</td>
                    <td className="p-4">{account.accountType}</td>
                    <td className="p-4">
                      <strong className={account.balance < 0 ? 'text-red-600' : 'text-green-600'}>
                        ${account.balance.toFixed(2)}
                      </strong>
                    </td>
                    <td className="p-4">{account.status}</td>
                    <td className="p-4">{new Date(account.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 space-x-2">
                      <Button onClick={() => { setEditedAccount(account); setShowEditModal(true); }} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                        <FaEdit />
                      </Button>
                      <Button onClick={() => handleDeleteAccount(account.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                        <FaTrash />
                      </Button>
                      <Button onClick={() => handleView(account)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">
                        <FaEye />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="text-sm bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded">
              Prev
            </Button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="text-sm bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded">
              Next
            </Button>
          </div>
        </>
      )}

      {selectedAccount && (
        <Modal onClose={() => setSelectedAccount(null)}>
          <div className="p-4">
            <h3 className="text-xl font-semibold">Account Details</h3>
            <div className="mt-4 space-y-2">
              <p><strong>Account Number:</strong> {selectedAccount.accountNumber}</p>
              <p><strong>Account Type:</strong> {selectedAccount.accountType}</p>
              <p><strong>Balance:</strong> ${selectedAccount.balance.toFixed(2)}</p>
              <p><strong>Status:</strong> {selectedAccount.status}</p>
              <p><strong>Created At:</strong> {new Date(selectedAccount.createdAt).toLocaleDateString()}</p>
              {selectedAccount.closedAt && <p><strong>Closed At:</strong> {new Date(selectedAccount.closedAt).toLocaleDateString()}</p>}
              <hr className="my-2" />
              <p><strong>User First Name:</strong> {selectedAccount.user.fname}</p>
              <p><strong>User Last Name:</strong> {selectedAccount.user.lname}</p>
            </div>
          </div>
        </Modal>
      )}

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Add New Account</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Account Number"
                value={newAccount.accountNumber}
                onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <select
                value={newAccount.accountType}
                onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value as any })}
                className="w-full border p-2 rounded"
              >
                <option value="CHECKING">CHECKING</option>
                <option value="SAVINGS">SAVINGS</option>
                <option value="CREDIT">CREDIT</option>
              </select>
              <input
                type="number"
                placeholder="Balance"
                value={newAccount.balance}
                onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <select
                value={newAccount.status}
                onChange={(e) => setNewAccount({ ...newAccount, status: e.target.value as any })}
                className="w-full border p-2 rounded"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="CLOSED">CLOSED</option>
              </select>
              <select
                value={newAccount.userId}
                onChange={(e) => setNewAccount({ ...newAccount, userId: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fname} {user.lname}
                  </option>
                ))}
              </select>
              <Button onClick={handleAddAccount} className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">Submit</Button>
            </div>
          </div>
        </Modal>
      )}


       {/* Edit Modal */}
       {showEditModal && editedAccount && (
        <Modal onClose={() => setShowEditModal(false)}>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Edit Account</h3>
            <form>
              <div className="space-y-4">
                <div>
                  <label htmlFor="accountNumber" className="block text-sm font-semibold">Account Number</label>
                  <input
                    type="text"
                    id="accountNumber"
                    value={editedAccount.accountNumber}
                    onChange={(e) => setEditedAccount({ ...editedAccount, accountNumber: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="accountType" className="block text-sm font-semibold">Account Type</label>
                  <select
                    id="accountType"
                    value={editedAccount.accountType}
                    onChange={(e) => setEditedAccount({ ...editedAccount, accountType: e.target.value as 'CHECKING' | 'SAVINGS' | 'CREDIT' })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="CHECKING">Checking</option>
                    <option value="SAVINGS">Savings</option>
                    <option value="CREDIT">Credit</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="balance" className="block text-sm font-semibold">Balance</label>
                  <input
                    type="number"
                    id="balance"
                    value={editedAccount.balance}
                    onChange={(e) => setEditedAccount({ ...editedAccount, balance: parseFloat(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-semibold">Status</label>
                  <select
                    id="status"
                    value={editedAccount.status}
                    onChange={(e) => setEditedAccount({ ...editedAccount, status: e.target.value as 'ACTIVE' | 'INACTIVE' | 'CLOSED' })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
                <div>
                 
                </div>
              </div>
              <div className="mt-6 text-right">
                <Button onClick={handleEditAccount} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal>
       )}

    </NavbarAside>
  );
};

export default Accounts;
