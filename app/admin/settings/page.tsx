import React from 'react';
import NavbarAside from '@/components/admin/NavbarAside';
const AdminSettings: React.FC = () => {
  return (
    <NavbarAside>
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Settings</h1>

      {/* Bank Information */}
      <section className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🏦 Bank Information</h2>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Bank Name</label>
          <input
            type="text"
            placeholder="Enter bank name"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Bank Logo</label>
          <input
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:border-blue-500 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="mt-2 text-gray-400 text-sm">[Image Preview Placeholder]</div>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Default Currency</label>
          <select className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200">
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="NPR">NPR</option>
          </select>
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🔒 Security Settings</h2>

        <div className="mb-4 flex items-center">
          <input type="checkbox" id="2fa" className="mr-2 h-5 w-5 text-blue-600" />
          <label htmlFor="2fa" className="text-gray-600 font-medium">
            Enable Two-Factor Authentication
          </label>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Password Expiry (days)</label>
          <input
            type="number"
            min={1}
            placeholder="e.g. 90"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>
      </section>

      {/* System Settings */}
      <section className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">⚙️ System Settings</h2>

        <div className="flex items-center">
          <input type="checkbox" id="maintenance" className="mr-2 h-5 w-5 text-blue-600" />
          <label htmlFor="maintenance" className="text-gray-600 font-medium">
            Enable Maintenance Mode
          </label>
        </div>
      </section>

      {/* Save Button */}
      <div className="text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow">
          Save Settings
        </button>
      </div>
    </div>
    </NavbarAside>

  );
};

export default AdminSettings;
