'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaUsers, FaExchangeAlt, FaWallet } from 'react-icons/fa';
import NavbarAside from '@/components/admin/NavbarAside';

type User = {
  id: number;
  fname: string;
  email: string;
  username: string;
  role: string;
};

type Transaction = {
  id: number;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
};

type Account = {
  accountNumber: string;
  accountType: string;
  balance: number;
  status: string;
};



export default function Admin() {
 const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/admin/transactions');
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoadingTransactions(false);
      }
    };

    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/admin/accounts');
        if (!response.ok) throw new Error('Failed to fetch accounts');
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchUsers();
    fetchTransactions();
    fetchAccounts();
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin panel for managing users, transactions, and accounts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarAside>
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
          <p className="text-gray-500 mb-8">Monitor all platform activity</p>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
              <FaUsers className="text-blue-600 text-3xl" />
              <div>
                <h4 className="text-gray-500 text-sm">Total Users</h4>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
              <FaExchangeAlt className="text-purple-600 text-3xl" />
              <div>
                <h4 className="text-gray-500 text-sm">Transactions</h4>
                <p className="text-2xl font-bold text-gray-800">{transactions.length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
              <FaWallet className="text-green-600 text-3xl" />
              <div>
                <h4 className="text-gray-500 text-sm">Active Accounts</h4>
                <p className="text-2xl font-bold text-gray-800">{accounts.length}</p>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white p-6 rounded-xl shadow mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Username</th>
                    <th className="py-2 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingUsers ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.slice(0, 4).map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{user.fname}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4">{user.username}</td>
                        <td className="py-2 px-4">{user.role}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white p-6 rounded-xl shadow mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="py-2 px-4">TX ID</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Type</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingTransactions ? (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                        Loading transactions...
                      </td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    transactions.slice(0, 4).map((tx) => (
                      <tr key={tx.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{tx.id}</td>
                        <td className="py-2 px-4">{tx.amount}</td>
                        <td className="py-2 px-4">{tx.type}</td>
                        <td className="py-2 px-4">{tx.status}</td>
                        <td className="py-2 px-4">
                          {new Date(tx.createdAt).toLocaleString('en-US', {
                            weekday: 'short',
                            year: 'numeric', 
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: true,
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Accounts Table */}
          <div className="bg-white p-6 rounded-xl shadow mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Accounts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="py-2 px-4">Account Number</th>
                    <th className="py-2 px-4">Account Type</th>
                    <th className="py-2 px-4">Balance</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingAccounts ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                        Loading accounts...
                      </td>
                    </tr>
                  ) : accounts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                        No accounts found.
                      </td>
                    </tr>
                  ) : (
                    accounts.slice(0, 4).map((account) => (
                      <tr key={account.accountNumber} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{account.accountNumber}</td>
                        <td className="py-2 px-4">{account.accountType}</td>
                        <td className="py-2 px-4">{account.balance}</td>
                        <td className="py-2 px-4">{account.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </NavbarAside>
    </>
  );
}
