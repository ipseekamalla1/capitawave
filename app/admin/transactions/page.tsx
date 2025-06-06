'use client';

import React, { useEffect, useState } from 'react';
import NavbarAside from '@/components/admin/NavbarAside';
import { FaTrash, FaEye, FaFileExport } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { generateAndDownloadPDF } from '@/lib/utils/downloadPdf';

// Define User and Transaction types
type User = {
  fname: string;
  lname: string;
};

type Transaction = {
  id: number;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
  senderUser?: User;
  recipientUser?: User;
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortedField, setSortedField] = useState<keyof Transaction | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 10;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/admin/transactions');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Transaction[] = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
      const res = await fetch(`/api/admin/transactions/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTransactions((prev) => prev.filter((tx) => tx.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Something went wrong.');
    }
  };

  const handleStatusChange = async (txId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/transactions/${txId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated: Transaction = await res.json();
        setTransactions((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update transaction status');
      }
    } catch (err) {
      console.error('Error updating transaction status:', err);
      alert('Something went wrong.');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSort = (field: keyof Transaction) => {
    if (sortedField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedField(field);
      setSortDirection('asc');
    }
  };

  const filtered = transactions.filter((t) =>
    (t.senderUser?.fname.toLowerCase().includes(searchQuery) ||
    t.recipientUser?.fname?.toLowerCase().includes(searchQuery) ||
    t.type.toLowerCase().includes(searchQuery) ||
    t.status.toLowerCase().includes(searchQuery))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortedField) return 0;

    // For dates, parse as timestamps
    if (sortedField === 'createdAt') {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
    }

    const aVal = a[sortedField];
    const bVal = b[sortedField];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  const totalPages = Math.ceil(sorted.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const currentTransactions = sorted.slice(startIndex, startIndex + transactionsPerPage);

  return (
    <NavbarAside>
      <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search transactions..."
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p>Loading transactions...</p>
      ) : currentTransactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('amount')}>
                    Amount
                  </th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('type')}>
                    Type
                  </th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('status')}>
                    Status
                  </th>
                  <th className="p-4">Sender</th>
                  <th className="p-4">Recipient</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('createdAt')}>
                    Date
                  </th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-100">
                    <td className="p-4">${tx.amount.toFixed(2)}</td>
                    <td className="p-4">{tx.type}</td>
                    <td className="p-4">
                      <select
                        value={tx.status}
                        onChange={(e) => handleStatusChange(tx.id, e.target.value)}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="FAILED">Failed</option>
                        <option value="REVERSED">Reversed</option>
                      </select>
                    </td>
                    <td className="p-4">{tx.senderUser?.fname} {tx.senderUser?.lname}</td>
                    <td className="p-4">{tx.recipientUser?.fname || '-'}</td>
                    <td className="p-4">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 space-x-2">
                      <Button
                        onClick={async () => {
                          const res = await fetch(`/api/admin/transactions/${tx.id}`);
                          if (!res.ok) {
                            alert('Failed to fetch transaction data');
                            return;
                          }
                          const data = await res.json();
                          await generateAndDownloadPDF(data);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        <FaFileExport />
                      </Button>

                      <Button
                        onClick={() => handleDelete(tx.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        <FaTrash />
                      </Button>

                      <Button
                        onClick={() => window.open(`transactions/${tx.id}/pdf`, '_blank')}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        <FaEye />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="text-sm bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
            >
              Prev
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-sm bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </NavbarAside>
  );
};

export default Transactions;
