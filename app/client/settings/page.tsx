'use client'

import { useEffect, useState } from 'react';
import UserSidebar from "@/components/clients/user-dashboard/UserSidebar";

const page = () => {
  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    email: '',
    username: '',
    password: '',
    street: '',
    state: '',
    zip: '',
    city: '',
    country: '',
    phone: '',
    role: 'USER',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.id) {
          setUserData({
            fname: user.fname || '',
            lname: user.lname || '',
            email: user.email || '',
            username: user.username || '',
            password: '',
            street: user.street || '',
            state: user.state || '',
            zip: user.zip || '',
            city: user.city || '',
            country: user.country || '',
            phone: user.phone || '',
            role: user.role || 'USER',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const res = await fetch(`/api/client/user/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update user data');

      alert('User data updated successfully');
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <UserSidebar />
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg ml-6 max-w-3xl w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Profile</h2>

        {errors.length > 0 && (
          <div className="mb-4 text-red-600">
            {errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="fname"
                value={userData.fname}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lname"
                value={userData.lname}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
              <input
                type="text"
                name="street"
                value={userData.street}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={userData.state}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input
                type="text"
                name="zip"
                value={userData.zip}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={userData.city}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={userData.country}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Leave blank to keep current password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
