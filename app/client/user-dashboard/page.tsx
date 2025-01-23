"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {Button} from "@/components/ui/button"

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDashboard = () => {
  const transactions = [
    { id: 1, date: "2025-01-20", description: "Groceries", amount: -50 },
    { id: 2, date: "2025-01-19", description: "Salary", amount: 1500 },
    { id: 3, date: "2025-01-18", description: "Electricity Bill", amount: -120 },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Transactions Overview",
        data: [1200, 900, 1400, 1500, 1300, 1600, 1800],
        backgroundColor: "#2a32ea",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#d1d5db" } },
    },
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 text-blue-600 p-5 flex flex-col  h-screen">
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11M9 21V3M21 21V10m0 11H9" />
            </svg>
            <span>Dashboard</span>
          </Link>
          <Link href="/transfer" className="flex items-center space-x-2 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            <span>Transfer</span>
          </Link>
          <Link href="/account" className="flex items-center space-x-2 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9.953 9.953 0 0112 15a9.953 9.953 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Account</span>
          </Link>
          <Link href="/cards" className="flex items-center space-x-2 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a4 4 0 10-8 0v2m-3 5a9 9 0 0118 0v1a9 9 0 01-18 0v-1z" />
            </svg>
            <span>Cards</span>
          </Link>
        </nav>

        {/* Settings and Logout */}
        <div className="space-y-4 p-8 mt-9">
          <Link href="/settings" className="flex items-center space-x-2 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v6m0-6v6m9-12h-6m6 0H9m9 0H9" />
            </svg>
            <span>Settings</span>
          </Link>
          <Link href="/logout" className="flex items-center space-x-2 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 15l-4-4m0 0l4-4m-4 4h12" />
            </svg>
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-5">
        {/* Dashboard Header */}
        <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
        <Button>Create an Account</Button>

        {/* Dashboard Card and Chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card */}
          <div className="bg-white shadow-lg rounded-lg p-5 text-center col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-gray-500">Your account is in good standing.</p>
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow-lg rounded-lg p-5 col-span-1">
            <Bar data={chartData} options={options} />
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-3">Recent Transactions</h2>
          <div className="bg-white shadow-lg rounded-lg p-5">
            <ul className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="flex justify-between py-2">
                  <span>{transaction.date}</span>
                  <span>{transaction.description}</span>
                  <span
                    className={
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount} USD
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;


