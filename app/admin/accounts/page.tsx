'use client';

import React, { useEffect, useState } from 'react';
import NavbarAside from '@/components/admin/NavbarAside';
import { Button } from '@/components/ui/Button';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Modal from "@/components/Modal"; // Import a modal component


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
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'createdAt', direction: 'desc' });
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

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

  // Filtered & Sorted
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
          placeholder="Search by name or account number"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition text-sm">
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
                      <Button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                        <FaEdit />
                      </Button>
                      <Button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
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

          {/* Pagination Controls */}
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
      {/* Modal for viewing account details */}
{selectedAccount && (
  <Modal onClose={() => setSelectedAccount(null)}>
    <div className="p-4">
      <h3 className="text-xl font-semibold">Account Details</h3>
      <div className="mt-4 space-y-2">
        <p>
          <strong>Account Number:</strong> {selectedAccount.accountNumber}
        </p>
        <p>
          <strong>Account Type:</strong> {selectedAccount.accountType}
        </p>
        <p>
          <strong>Balance:</strong>{' '}
          <span className={selectedAccount.balance < 0 ? 'text-red-600' : 'text-green-600'}>
            ${selectedAccount.balance.toFixed(2)}
          </span>
        </p>
        <p>
          <strong>Status:</strong> {selectedAccount.status}
        </p>
        <p>
          <strong>Created At:</strong>{' '}
          {new Date(selectedAccount.createdAt).toLocaleDateString()}
        </p>
        {selectedAccount.closedAt && (
          <p>
            <strong>Closed At:</strong>{' '}
            {new Date(selectedAccount.closedAt).toLocaleDateString()}
          </p>
        )}
        <hr className="my-2" />
        <p>
          <strong>User First Name:</strong> {selectedAccount.user.fname}
        </p>
        <p>
          <strong>User Last Name:</strong> {selectedAccount.user.lname}
        </p>
      </div>
    </div>
  </Modal>
)}

    </NavbarAside>
  );
};

export default Accounts;
