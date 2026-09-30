import React, { useCallback, useRef } from 'react';

const UploadZone = ({ onFileSelected }) => {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSelect(file);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelect(e.target.files[0]);
    }
  };

  const validateAndSelect = (file) => {
    // 50MB limit
    if (file.size > 50 * 1024 * 1024) {
      alert('File size exceeds 50MB limit.');
      return;
    }
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'text/plain', 
      'application/rtf'
    ];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt|rtf)$/i)) {
      alert('Unsupported file type. Please upload PDF, DOCX, RTF, or TXT file.');
      return;
    }
    onFileSelected(file);
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
      className="border-2 border-dashed border-outline-variant rounded-lg bg-surface-container flex flex-col items-center justify-center py-12 px-6 hover:bg-surface-container-highest transition-colors cursor-pointer group relative"
    >
      <input 
        ref={fileInputRef}
        type="file" 
        accept=".pdf,.doc,.docx,.txt,.rtf" 
        onChange={handleFileInput}
        className="hidden" 
      />
      <div className="h-16 w-16 bg-surface rounded-full flex items-center justify-center mb-stack-md shadow-sm group-hover:scale-105 transition-transform duration-200 border border-outline-variant">
        <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>cloud_upload</span>
      </div>
      <p className="font-label-md text-label-md text-on-surface text-center mb-unit">
        Drag &amp; drop files here, or <span className="text-secondary underline">browse</span>
      </p>
      <p className="font-caption text-caption text-on-surface-variant text-center">Supports PDF, DOCX, TXT up to 50MB</p>
    </div>
  );
};

export default UploadZone;
