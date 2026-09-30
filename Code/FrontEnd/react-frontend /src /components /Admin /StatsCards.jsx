import React from 'react';

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="card">
        <h3 className="text-body-sm text-gray-500 mb-2">Total Users</h3>
        <p className="text-display-md text-primary font-semibold">{stats?.totalUsers || 0}</p>
      </div>
      <div className="card">
        <h3 className="text-body-sm text-gray-500 mb-2">Total Documents</h3>
        <p className="text-display-md text-primary font-semibold">{stats?.totalDocuments || 0}</p>
      </div>
      <div className="card">
        <h3 className="text-body-sm text-gray-500 mb-2">Free Trial Signups</h3>
        <p className="text-display-md text-primary font-semibold">{stats?.freeTrials || 0}</p>
      </div>
      <div className="card">
        <h3 className="text-body-sm text-gray-500 mb-2">Active Jobs</h3>
        <p className="text-display-md text-primary font-semibold">Healthy</p>
      </div>
    </div>
  );
};

export default StatsCards;
