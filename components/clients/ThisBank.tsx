import React, { useState } from 'react';

const ThisBank = () => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [recipientUsername, setRecipientUsername] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newErrors: string[] = [];
  
    // Validation checks
    if (!fromAccount) newErrors.push('Please select a "From Account".');
    if (!toAccount) newErrors.push('Please select a "To Account".');
    if (fromAccount === toAccount) newErrors.push('"From" and "To" accounts must be different.');
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
      const response = await fetch('/api/client/accounts/transfer', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAccountId: fromAccount,
          toAccountId: toAccount,
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
          <div className="text-red-600 text-sm mt-2">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* From Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
          <select
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select an Account</option>
            <option value="checking">Checking Account - ****1234</option>
            <option value="savings">Savings Account - ****5678</option>
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
