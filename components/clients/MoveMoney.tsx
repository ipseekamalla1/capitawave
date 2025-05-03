// components/Transfer/MoveMoney.tsx
import React from 'react';

const MoveMoney = () => {
  return (
    <div>
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

      {/* Specific Fields for "Move Money" */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">To Account</label>
        <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>Checking Account - ****1234</option>
          <option>Savings Account - ****5678</option>
        </select>
      </div>
    </div>
  );
};

export default MoveMoney;
