'use client';

import React, { useEffect, useState } from 'react';

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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Accounts</h2>
      
      {loading ? (
        <p>Loading accounts...</p>
      ) : accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <div className="space-y-4">
          {accounts.map((account) => (
            <div key={account.id} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
              <p><strong>Account Number:</strong> {account.accountNumber}</p>
              <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
              <p><strong>Account Type:</strong> {account.accountType}</p>
              <p><strong>Status:</strong> {account.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
