'use client';

import React, { useEffect, useState } from 'react';
import NavbarAside from '@/components/admin/NavbarAside';
import { Button } from '@/components/ui/Button';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

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

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

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

    fetchAccounts();
  }, []);

  if (loading) {
    return <p>Loading accounts...</p>;
  }

  return (
    <NavbarAside>
        <h2 className="text-2xl font-semibold mb-6">Accounts</h2>
        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Accounts"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="text-sm bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
            <FaEdit className="mr-2" /> Add New Account
          </Button>
        </div>
        {accounts.length === 0 ? (
          <p>No accounts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="text-left p-4 border-b cursor-pointer">Account Number</th>
                  <th className="text-left p-4 border-b cursor-pointer">Name</th>
                  <th className="text-left p-4 border-b cursor-pointer">Type</th>
                  <th className="text-left p-4 border-b cursor-pointer">Balance</th>
                  <th className="text-left p-4 border-b cursor-pointer">Status</th>
                  <th className="text-left p-4 border-b cursor-pointer">Created</th>
                  <th className="text-left p-4 border-b cursor-pointer">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} className="border-b hover:bg-gray-100">
                    <td className="p-4 border-b">{account.accountNumber}</td>
                    <td className="p-4 border-b">{account.user.fname} {account.user.lname}</td>
                    <td className="p-4 border-b">{account.accountType}</td>
                    <td className="p-4 border-b">
                      <strong className={account.balance < 0 ? 'text-red-600' : 'text-green-600'}>
                        ${account.balance.toFixed(2)}
                      </strong>
                    </td>
                    <td className="px-4 py-2">{account.status}</td>
                    <td className="px-4 py-2">{new Date(account.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                          <Button
                                                
                                                className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                                              >
                                                <FaEdit className="mr-1" />
                                              </Button>
                        
                                              <Button
                                              
                                                className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                                              >
                                                <FaTrash className="mr-1" />
                                              </Button>
                                              <Button
                                                className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                                              >
                                                <FaEye className="mr-1" />
                                              </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      
    </NavbarAside>
  );
};

export default Accounts;
