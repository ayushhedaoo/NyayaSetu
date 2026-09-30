import React from 'react';

const RiskCard = ({ risk }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-[#E4E7EB] hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-2 mb-2 text-error">
        <span className="material-symbols-outlined text-[18px]">warning</span>
        <span className="font-label-md text-label-md uppercase tracking-wider text-[11px]">Risk Detected</span>
      </div>
      <div className="pl-6 border-l-2 border-error ml-2">
        <div className="text-primary font-medium">{risk}</div>
      </div>
    </div>
  );
};

export default RiskCard;
