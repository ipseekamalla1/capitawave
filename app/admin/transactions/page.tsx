'use client';
import React, { useEffect, useState } from 'react';
import NavbarAside from '@/components/admin/NavbarAside';
import {  FaTrash, FaEye,FaFileExport } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/admin/transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortedField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedField(field);
      setSortDirection('asc');
    }
  };

  const filtered = transactions.filter((t) =>
    t.senderUser?.fname.toLowerCase().includes(searchQuery) ||
    t.recipientUser?.fname?.toLowerCase().includes(searchQuery) ||
    t.type.toLowerCase().includes(searchQuery) ||
    t.status.toLowerCase().includes(searchQuery)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortedField) return 0;
    const aVal = a[sortedField];
    const bVal = b[sortedField];
    if (typeof aVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
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
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('amount')}>Amount</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('type')}>Type</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
                  <th className="p-4">Sender</th>
                  <th className="p-4">Recipient</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('createdAt')}>Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-100">
                    <td className="p-4">${tx.amount.toFixed(2)}</td>
                    <td className="p-4">{tx.type}</td>
                    <td className="p-4">{tx.status}</td>
                    <td className="p-4">{tx.senderUser?.fname} {tx.senderUser?.lname}</td>
                    <td className="p-4">{tx.recipientUser?.fname || '-'}</td>
                    <td className="p-4">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 space-x-2">
                      <Button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                      <FaFileExport />
                      </Button>
                      <Button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
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
    </NavbarAside>
  );
};

export default Transactions;
