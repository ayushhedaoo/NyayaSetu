import React from 'react';

const DocumentViewer = ({ document }) => {
  return (
    <section className="flex-1 bg-[#F8F6F1] overflow-y-auto custom-scrollbar border-r border-outline-variant shadow-[inset_-4px_0_12px_rgba(16,42,67,0.02)]">
      <div className="min-h-full flex justify-center p-stack-lg">
        <div className="bg-white max-w-[850px] w-full p-12 shadow-[0_4px_12px_rgba(16,42,67,0.05)] border border-[#E4E7EB] rounded-sm relative">
          <h1 className="font-headline-lg text-headline-lg text-primary text-center mb-8 border-b border-outline-variant pb-4">
            {document?.fileName || 'Document Content'}
          </h1>
          <div className="space-y-6 text-on-surface whitespace-pre-wrap font-body-md text-body-md">
            {document?.content || 'Loading content...'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentViewer;
