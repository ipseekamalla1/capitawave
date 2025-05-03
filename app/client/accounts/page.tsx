'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UserSidebar from '@/components/clients/user-dashboard/UserSidebar';

interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountType: 'CHECKING' | 'SAVINGS';
  status: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
}

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<Record<number, string>>({});

  const dummyTransactions: Transaction[] = [
    { id: 1, date: '2025-02-20', description: 'Deposit', amount: 500, type: 'CREDIT' },
    { id: 2, date: '2025-02-21', description: 'Grocery Shopping', amount: -120, type: 'DEBIT' },
    { id: 3, date: '2025-02-22', description: 'Online Purchase', amount: -45, type: 'DEBIT' },
    { id: 4, date: '2025-02-23', description: 'Salary Credit', amount: 2000, type: 'CREDIT' },
    { id: 5, date: '2025-02-24', description: 'Electricity Bill', amount: -85, type: 'DEBIT' },
  ];

  const handleMonthChange = (accountId: number, value: string) => {
    setSelectedMonths((prev) => ({ ...prev, [accountId]: value }));
  };

  const handleDownloadStatement = (account: Account) => {
    const month = selectedMonths[account.id];
    if (!month) return alert("Please select a month");

    const data = `Statement for ${account.accountNumber} - ${month}\nBalance: $${account.balance}\nStatus: ${account.status}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `statement-${account.accountNumber}-${month}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) {
          alert('User not logged in');
          return;
        }

        const response = await fetch(`/api/client/accounts/display-acc/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }

        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Accounts</h2>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="flex">
            {/* Scrollable Account Cards */}
            <div className="flex-1 overflow-x-auto whitespace-nowrap space-y-4 p-4 flex flex-col">
              {accounts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-lg shadow-md p-8 text-center w-full"
                >
                  <p className="text-gray-600 text-lg">No accounts found.</p>
                </motion.div>
              ) : (
                accounts.map((account, index) => (
                  <motion.div
                    key={account.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-xl shadow-lg p-6 transform transition-all duration-300 w-80 inline-block cursor-pointer ${
                      account.accountType === 'SAVINGS' ? 'bg-gradient-to-r from-slate-50 to-green-300' : 
                      account.accountType === 'CHECKING' ? 'bg-gradient-to-r from-slate-50 to-indigo-300' : 
                      'bg-gradient-to-r from-slate-50 to-yellow-300'
                    }`}                  
                  >
                    <div className="flex items-center justify-between mb-4">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-sm font-medium
                          ${account.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                            account.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}
                      >
                        {account.status}
                      </motion.span>
                      <span className="text-sm font-medium text-gray-500">{account.accountType}</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Account Number</p>
                        <p className="text-lg font-semibold text-gray-800">{account.accountNumber}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Available Balance</p>
                        <motion.p
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className="text-2xl font-bold text-blue-600"
                        >
                          ${account.balance.toFixed(2)}
                        </motion.p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedAccount(account)}
                        className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                      >
                        View Details
                      </motion.button>
                    </div>
                    
                  </motion.div>
                ))
              )}
            </div>

            {/* Account Details & Transactions */}
            <div className="w-[800px] bg-white shadow-lg rounded-lg p-6 ml-4 flex-shrink-0">
              {selectedAccount ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">Account Details</h3>

                  <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedAccount.accountNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <p className="text-2xl font-bold text-blue-600">${selectedAccount.balance.toFixed(2)}</p>
                  </div>

                  {/* Transaction History */}
                  <h3 className="text-lg font-bold text-gray-600 mt-6">Transaction History</h3>
                  <div className="border rounded-lg shadow-md bg-gray-50 p-4 max-h-60 overflow-y-auto">
                    <table className="table-auto w-full text-sm text-left">
                      <thead className="sticky top-0 bg-gray-200 text-gray-700 uppercase text-xs font-semibold">
                        <tr>
                          <th className="p-2 w-1/4">Date</th>
                          <th className="p-2 w-1/4">Description</th>
                          <th className="p-2 w-1/4 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyTransactions.map((txn) => (
                          <tr key={txn.id} className="border-b last:border-none">
                            <td className="p-2 text-gray-400">{txn.date}</td>
                            <td className="p-2 text-gray-400">{txn.description}</td>
                            <td className={`p-2 text-right font-semibold ${txn.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                              {txn.type === 'CREDIT' ? '+' : '-'}${Math.abs(txn.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Download Statement */}
                  <div className="mt-6 space-y-2">
                    {!showMonthSelector ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMonthSelector(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                      >
                        Download Statement
                      </motion.button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <select
                          value={selectedMonths[selectedAccount.id] || ''}
                          onChange={(e) => handleMonthChange(selectedAccount.id, e.target.value)}
                          className="border rounded-md px-4 py-2"
                        >
                          <option value="">Select Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                        </select>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDownloadStatement(selectedAccount)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                        >
                          Download
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500"
                >
                  <p>Select an account to view details.</p>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsPage;
