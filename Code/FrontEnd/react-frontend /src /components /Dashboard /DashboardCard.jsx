import React from 'react';

const DashboardCard = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-outline-variant p-stack-lg hover:shadow-[0_4px_12px_rgba(16,42,67,0.05)] hover:-translate-y-0.5 transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
};

export default DashboardCard;
