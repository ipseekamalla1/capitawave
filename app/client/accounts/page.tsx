'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UserSidebar from '@/components/user-dashboard/UserSidebar';

interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountType: 'CHECKING' | 'SAVINGS';
  status: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
}

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) {
          alert('User not logged in');
          return;
        }

        const response = await fetch(`/api/admin/display-acc?userId=${user.id}`);
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
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Accounts</h2>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : accounts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-md p-8 text-center"
            >
              <p className="text-gray-600 text-lg">No accounts found.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
                >
                  <div className="p-6">
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
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
