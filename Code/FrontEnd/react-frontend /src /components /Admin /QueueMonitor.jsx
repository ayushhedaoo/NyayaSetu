import React from 'react';

const QueueMonitor = ({ queue }) => {
  if (!queue) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Background Job Queue</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 text-blue-800 rounded-md flex flex-col">
          <span className="text-sm font-medium">Pending Jobs</span>
          <span className="text-3xl font-bold mt-1">{queue.pendingJobs}</span>
        </div>
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md flex flex-col">
          <span className="text-sm font-medium">Active Jobs</span>
          <span className="text-3xl font-bold mt-1">{queue.activeJobs}</span>
        </div>
        <div className="p-4 bg-green-50 text-green-800 rounded-md flex flex-col">
          <span className="text-sm font-medium">Completed Jobs</span>
          <span className="text-3xl font-bold mt-1">{queue.completedJobs}</span>
        </div>
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex flex-col">
          <span className="text-sm font-medium">Failed Jobs</span>
          <span className="text-3xl font-bold mt-1">{queue.failedJobs}</span>
        </div>
      </div>
    </div>
  );
};

export default QueueMonitor;
