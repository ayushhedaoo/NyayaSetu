import React, { useState } from 'react';

const UsersTable = ({ users, onDeleteUser }) => {
  if (!users || users.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-body-md text-gray-500">No users found.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <h3 className="text-display-xs mb-4">Users</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700">Email</th>
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700">Role</th>
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700">Joined</th>
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-body-md">{user.name}</td>
                <td className="py-3 px-4 text-body-md text-gray-600">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-body-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right flex justify-end gap-2">
                  <button 
                    onClick={() => onViewUser && onViewUser(user)}
                    className="text-primary hover:text-primary-light text-body-sm font-medium transition-colors"
                  >
                    View
                  </button>
                  {user.role !== 'admin' && (
                    <button 
                      onClick={() => onDeleteUser(user._id)}
                      className="text-red-500 hover:text-red-700 text-body-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
