'use client';
import React, { useEffect, useState } from 'react';

interface Account {
  id: string;
  accountType: string; // e.g., 'checking', 'savings'
  accountNumber: string;
}

const MoveMoney = () => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newErrors: string[] = [];
  
    if (!fromAccount) newErrors.push('Please select a "From Account".');
    if (!toAccount) newErrors.push('Please select a "To Account".');
    if (fromAccount === toAccount) newErrors.push('"From" and "To" accounts must be different.');
    if (!amount || parseFloat(amount) <= 0) newErrors.push('Amount must be greater than 0.');
  
    setErrors(newErrors);
  
    if (newErrors.length === 0) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      try {
        const res = await fetch('/api/client/transfer/move-money', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromAccountId: fromAccount,
            toAccountId: toAccount,
            amount,
            note,
            userId: user.id
          })
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          setErrors([data.error || 'Transfer failed']);
          setSubmitted(false);
        } else {
          setSubmitted(true);
          setErrors([]);
          setAmount('');
          setNote('');
          setFromAccount('');
          setToAccount('');
        }
      } catch (err) {
        setErrors(['Unexpected error occurred']);
        console.error(err);
        setSubmitted(false);
      }
    } else {
      setSubmitted(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted && (
        <div className="p-4 text-green-700 bg-green-100 rounded-lg">
          ✅ Transfer submitted successfully!
        </div>
      )}

      {errors.length > 0 && (
        <ul className="p-4 bg-red-100 text-red-700 rounded-lg space-y-1">
          {errors.map((error, idx) => (
            <li key={idx}>• {error}</li>
          ))}
        </ul>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
        <select
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          disabled={loading}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select an account --</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.accountType.charAt(0).toUpperCase() + acc.accountType.slice(1)} - ****
              {acc.accountNumber.slice(-4)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">To Account</label>
        <select
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          disabled={loading}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select an account --</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.accountType.charAt(0).toUpperCase() + acc.accountType.slice(1)} - ****
              {acc.accountNumber.slice(-4)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (CAD)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="E.g., Rent, tuition, etc."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Loading Accounts...' : 'Transfer Now'}
        </button>
      </div>
    </form>
  );
};

export default MoveMoney;
