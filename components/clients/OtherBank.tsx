// components/Transfer/OtherBank.tsx
import React from 'react';

const OtherBank = () => {
  return (
    <div>
                 <form className="space-y-6">

         <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
        <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>Checking Account - ****1234</option>
          <option>Savings Account - ****5678</option>
        </select>
      </div>
      {/* Shared Fields (Amount and Note) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (CAD)</label>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
        <textarea
          placeholder="E.g., Rent, tuition, etc."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Specific Fields for "Other Bank" */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
        <input
          type="text"
          placeholder="e.g., RBC, TD, Scotiabank"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Transit Number</label>
        <input
          type="text"
          placeholder="e.g., 12345"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Institution Number</label>
        <input
          type="text"
          placeholder="e.g., 001"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
        <input
          type="text"
          placeholder="e.g., 123456789"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Transfer Now
              </button>
      </form>
    </div>
  );
};

export default OtherBank;
