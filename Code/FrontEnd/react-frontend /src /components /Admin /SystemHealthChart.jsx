import React from 'react';

const SystemHealthChart = ({ health }) => {
  if (!health) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">System Health</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Status</p>
          <p className={`text-xl font-bold ${health.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
            {health.status.toUpperCase()}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Uptime</p>
          <p className="text-xl font-bold text-gray-800">
            {Math.floor(health.uptime / 3600)}h {Math.floor((health.uptime % 3600) / 60)}m
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">CPU Usage</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${health.cpuUsage}%` }}></div>
            </div>
            <span className="text-sm font-medium">{health.cpuUsage}%</span>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Memory Usage</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${health.memoryUsage}%` }}></div>
            </div>
            <span className="text-sm font-medium">{health.memoryUsage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthChart;
