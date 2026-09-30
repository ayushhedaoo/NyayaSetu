import React from 'react';
import StatusBadge from '../UI/StatusBadge';
import DocumentActions from '../Documents/DocumentActions';

const DocumentCard = ({ document, onClick, onRename, onDelete, onFavorite }) => {
  return (
    <div 
      onClick={() => onClick(document)}
      className="bg-white rounded-lg border border-outline-variant p-stack-md hover:shadow-[0_4px_12px_rgba(16,42,67,0.05)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer group relative"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="bg-[#E4E2DD] p-2 rounded-lg">
          <span className="material-symbols-outlined text-primary">description</span>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={document.status} />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <DocumentActions 
              document={document} 
              onRename={() => onRename && onRename(document)} 
              onDelete={() => onDelete && onDelete(document)} 
              onFavorite={() => onFavorite && onFavorite(document)} 
            />
          </div>
        </div>
      </div>
      <h4 className="font-label-md text-label-md text-primary mb-1 truncate" title={document.title || document.originalFileName}>
        {document.title || document.originalFileName}
      </h4>
      <div className="flex items-center gap-2 text-on-surface-variant font-caption text-caption mt-auto pt-4">
        <span>{new Date(document.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default React.memo(DocumentCard);
