'use client';
import React, { useState } from 'react';
import UserSidebar from '@/components/clients/user-dashboard/UserSidebar';
import ThisBank from '@/components/clients/ThisBank';
import OtherBank from '@/components/clients/OtherBank';
import MoveMoney from '@/components/clients//MoveMoney';

const Transfer = () => {
  const [activeTab, setActiveTab] = useState<'this' | 'other' | 'move'>('move');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />

      <main className="flex-1 p-10">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">💸 Transfer Funds</h2>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('move')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === 'move'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Move Money
            </button>
            <button
              onClick={() => setActiveTab('this')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === 'this'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              This Bank
            </button>
            <button
              onClick={() => setActiveTab('other')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === 'other'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Other Bank
            </button>
          </div>

        
            {/* Conditional Fields for Different Tabs */}
            {activeTab === 'this' && <ThisBank />}
            {activeTab === 'other' && <OtherBank />}
            {activeTab === 'move' && <MoveMoney />}

            
    
        </div>
      </main>
    </div>
  );
};

export default Transfer;
