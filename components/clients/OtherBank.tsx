'use client';
import React, { useEffect, useState } from 'react';

interface Account {
  id: string;
  accountType: string;
  accountNumber: string;
}

interface ExternalBankAccount {
  id: string;
  externalBankName: string;
  externalAccountNumber: string;
}

const OtherBank = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [externalBanks, setExternalBanks] = useState<ExternalBankAccount[]>([]);
  const [fromAccount, setFromAccount] = useState('');
  const [selectedExternalBankId, setSelectedExternalBankId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [recipientName, setRecipientName] = useState('');  // Added recipient name state
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');  // Added recipient account number state
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) return alert('User not logged in');

        const res = await fetch(`/api/client/accounts/display-acc/${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch accounts');

        const data = await res.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchExternalBanks = async () => {
      try {
        const res = await fetch('/api/client/transfer/other-bank');
        if (!res.ok) throw new Error('Failed to fetch external bank accounts');

        const data = await res.json();
        setExternalBanks(data);
      } catch (error) {
        console.error('Error fetching external banks:', error);
      }
    };

    fetchExternalBanks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) throw new Error('User not logged in');

      const res = await fetch('/api/client/transfer/submit-other-bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAccountId: fromAccount,
          amount,
          note,
          senderUserId: user.id,
          externalBankAccountId: selectedExternalBankId,
          recipientName,  // Added recipient name to the transaction data
          recipientAccountNumber,  // Added recipient account number to the transaction data
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Transfer failed');

      alert('Transfer submitted as PENDING');

      // Reset form
      setAmount('');
      setNote('');
      setFromAccount('');
      setSelectedExternalBankId('');
      setRecipientName('');
      setRecipientAccountNumber('');
    } catch (err: any) {
      setErrors([err.message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Transfer to Other Bank</h2>

      {errors.length > 0 && (
        <div className="mb-4 text-red-600">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* From Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
          <select
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="">-- Select an account --</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.accountType} - ****{acc.accountNumber.slice(-4)}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (CAD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="E.g., Rent, tuition, etc."
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Enter recipient's name"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Recipient Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Account Number</label>
          <input
            type="text"
            value={recipientAccountNumber}
            onChange={(e) => setRecipientAccountNumber(e.target.value)}
            placeholder="Enter recipient's account number"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* External Bank Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To External Bank Account</label>
          <select
            value={selectedExternalBankId}
            onChange={(e) => setSelectedExternalBankId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="">-- Select external account --</option>
            {externalBanks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.externalBankName} - ****{bank.externalAccountNumber.slice(-4)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Processing...' : 'Transfer Now'}
        </button>
      </form>
    </div>
  );
};

export default OtherBank;
