"use client";

import React,{ useEffect, useState } from "react";
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

import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  ArrowRightIcon,
  UserCircleIcon,
  CreditCardIcon,
  CogIcon

} from "@heroicons/react/solid";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const UserDashboard = () => {
const [username, setUsername] = useState<string | null>(null);

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


useEffect(() => {
  // Fetch user details from localStorage
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    setUsername(user.username); // Extract username
    console.log(user.username)
  }
}, []);


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
        {/* Dashboard Header */}
        <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
        <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome, {username || "User"}!</h1>
        <p className="mt-4 text-gray-600">This is your dashboard. Explore and enjoy!</p>
      </div>
      </section>
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
