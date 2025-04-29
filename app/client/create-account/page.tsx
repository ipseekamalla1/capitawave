'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const CreateAccount = () => {
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();

  // Generate a 9-digit random account number
  const generateAccountNumber = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('User not logged in');
      return;
    }

    if (!accountType) {
      alert('Please select an account type');
      return;
    }

    const accountData = {
      accountNumber: generateAccountNumber(),
      accountType,
      balance: parseFloat(amount) || 0, // Convert string to float
      status: isActive ? 'ACTIVE' : 'INACTIVE',
      userId: user.id,
    };
    
    

    try {
      const response = await fetch('/api/client/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountData),
      });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      router.push('/client/accounts/');
    } catch (error) {
      console.error(error);
      alert('Error creating account');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-10 w-4/5 max-w-2xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Choose Your Account Type</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Account Type</label>
          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          >
            <option value="">Select Account Type</option>
            <option value="CHECKING">Checking</option>
            <option value="SAVINGS">Savings</option>
            <option value="CREDIT">Credit</option>
          </select>
        </div>

        {accountType && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {accountType === 'CREDIT' ? 'Credit Limit' : 'Initial Deposit'}
            </label>
            <input
              type="number"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="mr-2"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active Account</label>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
