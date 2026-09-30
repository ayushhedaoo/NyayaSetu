import React from 'react';

const TermDetail = ({ term, onClose }) => {
  if (!term) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h3 className="text-display-sm text-primary">{term.term}</h3>
            {term.hindiTerm && (
              <p className="text-body-md text-gray-500 font-medium mt-1">{term.hindiTerm}</p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <section>
            <h4 className="text-label-md text-gray-500 uppercase tracking-wider mb-2">Definition</h4>
            <p className="text-body-lg text-gray-800">{term.definition}</p>
          </section>

          {term.simpleExplanation && (
            <section className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="text-label-md text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                Simple Explanation
              </h4>
              <p className="text-body-md text-blue-900">{term.simpleExplanation}</p>
            </section>
          )}

          {term.category && (
            <section>
              <h4 className="text-label-md text-gray-500 uppercase tracking-wider mb-2">Category</h4>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {term.category}
              </span>
            </section>
          )}

          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <section>
              <h4 className="text-label-md text-gray-500 uppercase tracking-wider mb-2">Related Terms</h4>
              <div className="flex flex-wrap gap-2">
                {term.relatedTerms.map((rt, i) => (
                  <span key={i} className="inline-block px-3 py-1 border border-gray-200 text-primary rounded-full text-sm hover:bg-gray-50 cursor-pointer transition-colors">
                    {rt}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermDetail;
