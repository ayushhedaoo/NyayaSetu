import React from 'react';

const StatusBadge = ({ status }) => {
  const isProcessed = status === 'processed';
  const statusColor = isProcessed ? 'bg-[#EAF5F4] text-[#006A66]' : 'bg-[#FFF4E5] text-[#C08400]';
  const statusText = isProcessed ? 'Ready' : 'Analyzing';

  return (
    <span className={`${statusColor} px-2 py-1 rounded-full font-caption text-[10px] uppercase font-bold tracking-wider`}>
      {statusText}
    </span>
  );
};

export default StatusBadge;
