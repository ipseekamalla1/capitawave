"use client";

import React, { useEffect, useState } from "react";
import NavbarAside from "@/components/admin/NavbarAside";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal"; // Import a modal component
import toast from "react-hot-toast";


interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  username: string;
  password?: string; // optional on edit maybe
  street?: string;
  state?: string;
  zip?: string;
  city?: string;
  country?: string;
  phone?: string;
  role: string;
  createdAt: string;
}


const Users = () => {
const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "email",
    direction: "asc",
  });
const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
const [userToEdit, setUserToEdit] = useState<User | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newUser = {
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      street: formData.get("street"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      city: formData.get("city"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      role: formData.get("role"),
    };

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers((prev) => [...prev, createdUser]); // Update your user list immediately
        setShowAddUserModal(false); // Close the modal
        toast.success("User added successfully!");
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setUserToEdit(user);
    setShowEditUserModal(true);
  };

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const updatedUser = {
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      street: formData.get("street"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      city: formData.get("city"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      role: formData.get("role"),
    };
    if (!userToEdit) {
    toast.error("No user selected for editing.");
    return;
  }

    console.log(updatedUser);
    try {
      const response = await fetch(`/api/admin/users/${userToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUserData.id ? updatedUserData : user
          )
        );
        setShowEditUserModal(false);
        setUserToEdit(null);
        toast.success("User updated successfully!");
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        toast.success("User deleted successfully!");
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to page 1 after search
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
  let aValue = a[sortConfig.key];
  let bValue = b[sortConfig.key];

  if (sortConfig.key === "createdAt") {
    aValue = new Date(aValue);
    bValue = new Date(bValue);
  }

  if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
  if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
  return 0;
});

  // Pagination calculation
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <NavbarAside>
      <h2 className="text-2xl font-semibold mb-6">Users</h2>

      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search Users"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={() => setShowAddUserModal(true)}
          className="text-sm bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          <FaEdit className="mr-2" /> Add New User
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th
                  className="text-left p-4 border-b cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  {sortConfig.key === "email" &&
                    (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                </th>
                <th
                  className="text-left p-4 border-b cursor-pointer"
                  onClick={() => handleSort("username")}
                >
                  Username{" "}
                  {sortConfig.key === "username" &&
                    (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                </th>
                <th
                  className="text-left p-4 border-b cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Created{" "}
                  {sortConfig.key === "createdAt" &&
                    (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                </th>
                <th
                  className="text-left p-4 border-b cursor-pointer"
                  onClick={() => handleSort("role")}
                >
                  Role{" "}
                  {sortConfig.key === "role" &&
                    (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                </th>
                <th className="text-center p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6">
                    No users found
                  </td>
                </tr>
              ) : (
                currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-4 border-b">{user.email}</td>
                    <td className="p-4 border-b">{user.username}</td>
                    <td className="p-4 border-b">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 border-b">{user.role}</td>
                    <td className="p-4 border-b text-center space-x-2">
                      <Button
                        onClick={() => handleEdit(user)}
                        className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                      >
                        <FaEdit className="mr-1" />
                      </Button>

                      <Button
                        onClick={() => handleDelete(user.id)}
                        className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        <FaTrash className="mr-1" />
                      </Button>
                      <Button
                        onClick={() => handleView(user)}
                        className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                      >
                        <FaEye className="mr-1" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-center mt-6 space-x-2">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-800 rounded disabled:opacity-50"
            >
              Previous
            </Button>

            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                className={`px-3 py-1 ${
                  currentPage === index + 1
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-700"
                } rounded`}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-800 rounded disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Modal for viewing user details */}
      {selectedUser && (
        <Modal onClose={() => setSelectedUser(null)}>
          <div className="p-4">
            <h3 className="text-xl font-semibold">User Details</h3>
            <div className="mt-4">
              <p>
                <strong>First Name:</strong> {selectedUser.fname}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedUser.lname}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Street:</strong> {selectedUser.street}
              </p>
              <p>
                <strong>State:</strong> {selectedUser.state}
              </p>
              <p>
                <strong>Zip:</strong> {selectedUser.zip}
              </p>
              <p>
                <strong>City:</strong> {selectedUser.city}
              </p>
              <p>
                <strong>Country:</strong> {selectedUser.country}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedUser.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(selectedUser.updatedAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {showAddUserModal && (
        <div className="w-700">
          <Modal onClose={() => setShowAddUserModal(false)}>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">Add New User</h3>
              <form onSubmit={handleAddUser}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="fname"
                    className="p-2 w-full border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lname"
                    className="p-2 w-full border rounded"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="p-2 w-full border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    className="p-2 w-full border rounded"
                    required
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="p-2 w-full border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    className="p-2 w-full border rounded"
                  />

                  <input
                    type="text"
                    placeholder="Street"
                    name="street"
                    className="p-2 w-full border rounded"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="p-2 w-full border rounded"
                  />

                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    className="p-2 w-full border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    name="zip"
                    className="p-2 w-full border rounded"
                  />

                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    className="p-2 w-full border rounded"
                  />
                  {/* Role Select */}
                  <select
                    name="role"
                    className="p-2 w-full border rounded"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                    <option value="STAFF">Staff</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white w-full mt-6 py-2 rounded text-lg font-semibold"
                >
                  Create User
                </Button>
              </form>
            </div>
          </Modal>
        </div>
      )}

      {showEditUserModal && userToEdit && (
        <Modal onClose={() => setShowEditUserModal(false)}>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <form onSubmit={handleUpdateUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fname"
                  defaultValue={userToEdit.fname}
                  className="p-2 w-full border rounded"
                  required
                />
                <input
                  type="text"
                  name="lname"
                  defaultValue={userToEdit.lname}
                  className="p-2 w-full border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  defaultValue={userToEdit.email}
                  className="p-2 w-full border rounded"
                  required
                />
                <input
                  type="text"
                  name="username"
                  defaultValue={userToEdit.username}
                  className="p-2 w-full border rounded"
                  required
                />
                <input
                  type="password"
                  name="password"
                  defaultValue={userToEdit.password}
                  className="p-2 w-full border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  defaultValue={userToEdit.phone}
                  className="p-2 w-full border rounded"
                />
                <input
                  type="text"
                  name="street"
                  defaultValue={userToEdit.street}
                  className="p-2 w-full border rounded"
                />
                <input
                  type="text"
                  name="city"
                  defaultValue={userToEdit.city}
                  className="p-2 w-full border rounded"
                />
                <input
                  type="text"
                  name="state"
                  defaultValue={userToEdit.state}
                  className="p-2 w-full border rounded"
                />
                <input
                  type="text"
                  name="zip"
                  defaultValue={userToEdit.zip}
                  className="p-2 w-full border rounded"
                />
                <input
                  type="text"
                  name="country"
                  defaultValue={userToEdit.country}
                  className="p-2 w-full border rounded"
                />
                <select
                  name="role"
                  defaultValue={userToEdit.role}
                  className="p-2 w-full border rounded"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                  <option value="STAFF">Staff</option>
                </select>
              </div>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white w-full mt-6 py-2 rounded text-lg font-semibold"
              >
                Update User
              </Button>
            </form>
          </div>
        </Modal>
      )}
    </NavbarAside>
  );
};

export default Users;
