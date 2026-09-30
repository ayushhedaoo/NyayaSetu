import React from 'react';

const ProcessingTimeline = ({ currentStage, fileName }) => {
  // Define the stages in order
  const stages = [
    { id: 'uploading', label: 'Uploading Document', icon: 'cloud_upload' },
    { id: 'extracting', label: 'Extracting Text', icon: 'document_scanner' },
    { id: 'analyzing', label: 'Generating Summary', icon: 'auto_awesome' },
    { id: 'completed', label: 'Completed', icon: 'check_circle' }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === currentStage);
  
  // Calculate a fake progress percentage for the current stage
  // If completed, 100%. If extracting or analyzing, we can show an indeterminate or pulse state.
  // For simplicity, we just use a full bar with an animated class.
  let progressWidth = '0%';
  if (currentStage === 'uploading') progressWidth = '25%';
  else if (currentStage === 'extracting') progressWidth = '50%';
  else if (currentStage === 'analyzing') progressWidth = '75%';
  else if (currentStage === 'completed') progressWidth = '100%';

  return (
    <div className="bg-surface-container border border-outline-variant rounded-lg p-stack-sm flex flex-col gap-unit">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-on-surface-variant">
            {stages[currentStageIndex]?.icon || 'description'}
          </span>
          <span className="font-label-md text-label-md text-on-surface">
            {stages[currentStageIndex]?.label || 'Processing...'}
          </span>
        </div>
        <span className="font-caption text-caption text-on-surface-variant truncate max-w-[150px]" title={fileName}>
          {fileName}
        </span>
      </div>
      <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
        <div 
          className={`bg-secondary h-full rounded-full transition-all duration-500 ${currentStage !== 'completed' ? 'animate-pulse' : ''}`} 
          style={{ width: progressWidth }}
        ></div>
      </div>
    </div>
  );
};

export default ProcessingTimeline;
