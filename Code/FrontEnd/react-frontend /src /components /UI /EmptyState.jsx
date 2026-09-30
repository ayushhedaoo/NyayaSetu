import React from 'react';

const EmptyState = ({ icon, title, description, actionText, onAction }) => {
  return (
    <div className="border-2 border-dashed border-outline-variant rounded-lg p-stack-lg text-center bg-white hover:bg-surface-container-lowest transition-colors flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-3xl text-secondary">{icon}</span>
      </div>
      <h4 className="font-headline-lg text-[20px] text-primary mb-2">{title}</h4>
      <p className="font-body-md text-on-surface-variant text-sm mb-4">{description}</p>
      {actionText && onAction && (
        <button 
          onClick={onAction}
          className="bg-[#E4E2DD] text-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-[#c3c6ce] transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
