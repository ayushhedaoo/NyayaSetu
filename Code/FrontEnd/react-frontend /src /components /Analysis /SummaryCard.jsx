import React from 'react';

const SummaryCard = ({ summary }) => {
  return (
    <div className="space-y-4">
      <div className="bg-[#F8F6F1] rounded-lg p-4 border border-[#E4E7EB]">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#147D78]">description</span>
          <h3 className="font-label-md text-label-md text-primary">Document Overview</h3>
        </div>
        <p className="text-on-surface-variant leading-relaxed font-body-md text-body-md">
          {summary?.documentOverview || 'Loading overview...'}
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#147D78]">auto_awesome</span>
          <h3 className="font-label-md text-label-md text-primary">Plain-Language Summary</h3>
        </div>
        <p className="text-on-surface-variant leading-relaxed font-body-md text-body-md">
          {summary?.plainLanguageSummary || 'Loading plain language summary...'}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
