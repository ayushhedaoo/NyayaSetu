import React, { useState } from 'react';
import SummaryCard from './SummaryCard';
import ClauseCard from './ClauseCard';
import RiskCard from './RiskCard';
import TranslationTab from './TranslationTab';
import DictionaryTab from './DictionaryTab';

const AnalysisSidebar = ({ summary }) => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <aside className="w-[420px] bg-white flex flex-col h-full shadow-[-4px_0_12px_rgba(16,42,67,0.03)] z-10 border-l border-outline-variant">
      {/* Panel Tabs */}
      <div className="flex border-b border-outline-variant bg-surface-container-lowest pt-2 px-2 overflow-x-auto custom-scrollbar hide-scroll">
        <button 
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-3 font-label-md text-label-md whitespace-nowrap transition-colors ${activeTab === 'summary' ? 'text-primary border-b-2 border-[#147D78]' : 'text-on-surface-variant hover:text-primary'}`}
        >
          Summary
        </button>
        <button 
          onClick={() => setActiveTab('clauses')}
          className={`px-4 py-3 font-label-md text-label-md whitespace-nowrap transition-colors ${activeTab === 'clauses' ? 'text-primary border-b-2 border-[#147D78]' : 'text-on-surface-variant hover:text-primary'}`}
        >
          Key Clauses & Risks
        </button>
        <button 
          onClick={() => setActiveTab('translation')}
          className={`px-4 py-3 font-label-md text-label-md whitespace-nowrap transition-colors ${activeTab === 'translation' ? 'text-primary border-b-2 border-[#147D78]' : 'text-on-surface-variant hover:text-primary'}`}
        >
          Translation
        </button>
        <button 
          onClick={() => setActiveTab('dictionary')}
          className={`px-4 py-3 font-label-md text-label-md whitespace-nowrap transition-colors ${activeTab === 'dictionary' ? 'text-primary border-b-2 border-[#147D78]' : 'text-on-surface-variant hover:text-primary'}`}
        >
          Dictionary
        </button>
      </div>

      {/* Panel Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-stack-md">
        {activeTab === 'summary' && (
          <div className="space-y-stack-lg">
            <SummaryCard summary={summary} />
          </div>
        )}
        
        {activeTab === 'clauses' && (
          <div>
            <h3 className="font-label-md text-label-md text-primary mb-4 border-b border-outline-variant pb-2">Key Facts Extracted</h3>
            <div className="space-y-4">
              {(!summary?.importantClauses?.length && !summary?.potentialConcerns?.length) && (
                <p className="text-on-surface-variant text-sm">No clauses or risks found.</p>
              )}
              {summary?.importantClauses?.map((clause, idx) => (
                <ClauseCard key={`clause-${idx}`} clause={clause} />
              ))}
              {summary?.potentialConcerns?.map((risk, idx) => (
                <RiskCard key={`risk-${idx}`} risk={risk} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'translation' && (
          <TranslationTab documentId={summary?.document} />
        )}

        {activeTab === 'dictionary' && (
          <DictionaryTab />
        )}
      </div>

      {/* Action Bar & Disclaimer (Bottom Pinned) */}
      <div className="border-t border-outline-variant bg-surface-container-lowest p-stack-md space-y-4 mt-auto">
        <div className="flex justify-between items-center gap-2">
          <button className="flex-1 border border-outline text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md py-2 px-3 rounded-lg transition-colors flex justify-center items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            Copy
          </button>
          <button className="flex-1 border border-outline text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md py-2 px-3 rounded-lg transition-colors flex justify-center items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export
          </button>
          <button className="flex-none p-2 border border-outline text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors" title="Regenerate">
            <span className="material-symbols-outlined text-[18px]">refresh</span>
          </button>
          <button className="flex-none p-2 border border-outline text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors" title="Feedback">
            <span className="material-symbols-outlined text-[18px]">thumb_up</span>
          </button>
        </div>
        <div className="flex items-start gap-2 bg-surface p-3 rounded-lg border border-outline-variant">
          <span className="material-symbols-outlined text-[#147D78] text-[16px] mt-0.5">info</span>
          <p className="font-caption text-caption text-on-surface-variant leading-tight">
            AI-generated summary. Always verify important legal information with a qualified legal professional before acting.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AnalysisSidebar;
