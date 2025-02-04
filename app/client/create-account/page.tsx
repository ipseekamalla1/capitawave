'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  ArrowRightIcon,
  UserCircleIcon,
  CreditCardIcon,
  CogIcon,
} from "@heroicons/react/solid";

import { useRouter } from 'next/navigation'; // Import useRouter


const CreateAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(0);
  const [accountType, setAccountType] = useState<'CHECKING' | 'SAVINGS'>('CHECKING');
  const [status, setStatus] = useState<'ACTIVE' | 'INACTIVE' | 'CLOSED'>('ACTIVE');
  const router = useRouter(); // Initialize router


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('User not logged in');
      return;
    }
  
    const accountData = { accountNumber, balance, accountType, status, userId: user.id };
  
    try {
      const response = await fetch('/api/admin/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountData),
      });
      console.log(response)
  
      if (!response.ok) {
        throw new Error('Failed to create account');
      }
  
      const data = await response.json();
      console.log('Account created:', data);
      router.push('/client/accounts/'); 
    } catch (error) {
      console.error(error);
      alert('Error creating account');
    }
  };
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 text-blue-600 p-5 flex flex-col h-screen">
        {/* Logo and Dashboard Link */}
        <div className="flex items-center space-x-4 mb-7">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/icons/logo-full.png"
              alt="Logo"
              width={200}
              height={40}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col justify-center space-y-6 text-lg p-8">
          <Link href="/dashboard" className="flex items-center space-x-2 hover:text-blue-700">
            <HomeIcon className="h-6 w-6" />
            <span>Dashboard</span>
          </Link>
          <Link href="/transfer" className="flex items-center space-x-2 hover:text-blue-700">
            <ArrowRightIcon className="h-6 w-6" />
            <span>Transfer</span>
          </Link>
          <Link href="/account" className="flex items-center space-x-2 hover:text-blue-700">
            <UserCircleIcon className="h-6 w-6" />
            <span>Account</span>
          </Link>
          <Link href="/cards" className="flex items-center space-x-2 hover:text-blue-700">
            <CreditCardIcon className="h-6 w-6" />
            <span>Cards</span>
          </Link>
        </nav>

        {/* Settings and Logout */}
        <div className="space-y-4 p-8 mt-9">
          <Link href="/settings" className="flex items-center space-x-2 hover:text-blue-700">
            <CogIcon className="h-6 w-6" />
            <span>Settings</span>
          </Link>
          <Link href="/logout" className="flex items-center space-x-2 hover:text-blue-700">
            <UserCircleIcon className="h-6 w-6" />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-5">
        {/* Navbar */}
        <div className="rounded-md p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Create Account</h2>
          </div>
          <UserCircleIcon className="h-8 w-8 text-indigo-600" />
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-10 w-4/5 max-w-2xl border border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
              Initial Balance
            </label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={(e) => setBalance(parseFloat(e.target.value))}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as 'CHECKING' | 'SAVINGS')}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="CHECKING">Checking</option>
              <option value="SAVINGS">Savings</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Account Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'INACTIVE' | 'CLOSED')}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Create Account
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
