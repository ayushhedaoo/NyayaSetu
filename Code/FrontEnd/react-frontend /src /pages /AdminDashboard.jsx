import React, { useState, useEffect } from 'react';
import { getDashboardStats, getAllUsers, getAllDocuments, deleteUser, getSystemHealth, getQueueStatus } from '../services/adminService';
import StatsCards from '../components/Admin/StatsCards';
import UsersTable from '../components/Admin/UsersTable';
import DocumentsTable from '../components/Admin/DocumentsTable';
import SystemHealthChart from '../components/Admin/SystemHealthChart';
import QueueMonitor from '../components/Admin/QueueMonitor';
import { UserDetailModal } from '../components/Admin/AdminDetailModals';
import EmptyState from '../components/UI/EmptyState';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [health, setHealth] = useState(null);
  const [queue, setQueue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsData, usersData, docsData, healthData, queueData] = await Promise.all([
        getDashboardStats(),
        getAllUsers(),
        getAllDocuments(),
        getSystemHealth(),
        getQueueStatus()
      ]);
      setStats(statsData.data);
      setUsers(usersData.data);
      setDocuments(docsData.data);
      setHealth(healthData.data);
      setQueue(queueData.data);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
      setError('Failed to load admin dashboard. You may not have administrative privileges.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(u => u._id !== userId));
      } catch (err) {
        alert('Failed to delete user.');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-200 rounded"></div>)}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <EmptyState 
          title="Access Denied" 
          message={error} 
          icon="shield-alert"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-display-lg text-primary">Admin Control Panel</h1>
          <p className="text-body-lg text-gray-600 mt-2">Manage users, documents, and system health.</p>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        <button 
          className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('overview')}
        >
          System Overview
        </button>
        <button 
          className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button 
          className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'documents' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('documents')}
        >
          Document Management
        </button>
        <button 
          className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'health' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('health')}
        >
          System Health
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="fade-in space-y-8">
          <StatsCards stats={stats} />
          <QueueMonitor queue={queue} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <UsersTable users={users.slice(0, 5)} onDeleteUser={handleDeleteUser} onViewUser={setSelectedUser} />
            <DocumentsTable documents={documents.slice(0, 5)} />
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="fade-in">
          <UsersTable users={users} onDeleteUser={handleDeleteUser} onViewUser={setSelectedUser} />
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="fade-in">
          <DocumentsTable documents={documents} />
        </div>
      )}

      {activeTab === 'health' && (
        <div className="fade-in space-y-8">
          <SystemHealthChart health={health} />
          <QueueMonitor queue={queue} />
        </div>
      )}

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default AdminDashboard;
