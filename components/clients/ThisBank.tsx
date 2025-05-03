'use client';
import React, { useEffect, useState } from 'react';

interface Account {
  id: string;
  accountType: string; // e.g., 'checking', 'savings'
  accountNumber: string;
}

const ThisBank = () => {
  const [fromAccount, setFromAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [recipientUsername, setRecipientUsername] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

    // Validation checks
    if (!fromAccount) newErrors.push('Please select a "From Account".');
    if (!recipientUsername) newErrors.push('Please enter a "Recipient Username".');
    if (!recipientAccountNumber) newErrors.push('Please enter a "Recipient Account Number".');
    if (!amount || parseFloat(amount) <= 0) newErrors.push('Amount must be greater than 0.');

    setErrors(newErrors);

    if (newErrors.length > 0) return; // Prevent form submission if errors exist

    // Assume you're fetching balance from backend (mock value here)
    const availableBalance = 1000; // This should be fetched from your backend based on the `fromAccount` ID.
    const parsedAmount = parseFloat(amount);
    if (parsedAmount > availableBalance) {
      setErrors(['Insufficient funds in the selected account']);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/client/transfer/this-bank', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAccountId: fromAccount,
          amount,
          note,
          recipientUsername,
          recipientAccountNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors([data.error || 'Transfer failed']);
      } else {
        setSuccessMessage('Transfer successful!');
      }
    } catch (error) {
      setErrors(['An error occurred while processing the transfer.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Errors Display */}
        {errors.length > 0 && (
          <ul className="p-4 bg-red-100 text-red-700 rounded-lg space-y-1">
            {errors.map((error, idx) => (
              <li key={idx}>• {error}</li>
            ))}
          </ul>
        )}

        {/* From Account */}
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

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (CAD)</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
          <textarea
            placeholder="E.g., Rent, tuition, etc."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Recipient Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Username</label>
          <input
            type="text"
            placeholder="e.g., john_doe"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={recipientUsername}
            onChange={(e) => setRecipientUsername(e.target.value)}
            required
          />
        </div>

        {/* Recipient Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Account Number</label>
          <input
            type="text"
            placeholder="e.g., 1234567890"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={recipientAccountNumber}
            onChange={(e) => setRecipientAccountNumber(e.target.value)}
            required
          />
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="text-green-600 text-sm mt-2">
            {successMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Transfer Now'}
        </button>
      </form>
    </div>
  );
};

export default ThisBank;
