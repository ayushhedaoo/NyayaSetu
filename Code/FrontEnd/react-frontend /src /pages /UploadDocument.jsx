import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Navigation/Sidebar';
import UploadZone from '../components/Upload/UploadZone';
import ProcessingTimeline from '../components/Upload/ProcessingTimeline';
import { uploadDocument, generateSummary } from '../services/documentService';

const UploadDocument = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [processingState, setProcessingState] = useState('idle'); // 'idle', 'uploading', 'extracting', 'analyzing', 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileSelected = (selectedFile) => {
    setFile(selectedFile);
    setErrorMsg('');
  };

  const handleStartAnalysis = async () => {
    if (!file) {
      setErrorMsg('Please select a file to upload.');
      return;
    }

    try {
      setProcessingState('uploading');
      
      const formData = new FormData();
      formData.append('file', file);
      
      // Step 1: Upload (which also extracts text on the backend)
      const uploadRes = await uploadDocument(formData);
      
      if (uploadRes && uploadRes.success) {
        setProcessingState('analyzing');
        
        const docId = uploadRes.document._id;
        
        // Step 2: Generate Summary
        await generateSummary(docId);
        
        // Final Step: Complete and Redirect
        setProcessingState('completed');
        navigate(`/analysis/${docId}`);
      } else {
        throw new Error(uploadRes?.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during document processing.');
      setProcessingState('error');
    }
  };

  return (
    <div className="bg-surface text-on-surface h-screen flex overflow-hidden font-body-md">
      <Sidebar />
      <main className="flex-1 ml-64 flex items-center justify-center p-gutter overflow-y-auto bg-surface">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm w-full max-w-3xl p-stack-lg flex flex-col gap-stack-lg">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Upload Document</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-unit">
              Securely upload legal documents for automated analysis and translation.
            </p>
          </div>

          {processingState === 'idle' || processingState === 'error' ? (
            <>
              {errorMsg && (
                <div className="bg-error-container text-on-error-container p-4 rounded-lg font-body-md flex items-center gap-2">
                  <span className="material-symbols-outlined">error</span>
                  {errorMsg}
                </div>
              )}
              
              <UploadZone onFileSelected={handleFileSelected} />
              
              {file && (
                <div className="bg-surface-container border border-outline-variant rounded-lg p-stack-sm flex flex-col gap-unit">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">description</span>
                      <span className="font-label-md text-label-md text-on-surface">{file.name}</span>
                    </div>
                    <button onClick={() => setFile(null)} className="text-on-surface-variant hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <ProcessingTimeline currentStage={processingState} fileName={file?.name} />
          )}

          {/* Configuration Section (UI Only for now, matching static design) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md pt-stack-sm border-t border-outline-variant">
            <div className="flex flex-col gap-unit">
              <label className="font-label-md text-label-md text-on-surface">Source Language</label>
              <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none appearance-none">
                <option>Auto-detect</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
            <div className="flex flex-col gap-unit">
              <label className="font-label-md text-label-md text-on-surface">Output Language</label>
              <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none appearance-none">
                <option>English</option>
                <option>Hindi</option>
                <option>Both</option>
              </select>
            </div>
            <div className="flex flex-col gap-unit md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface">Analysis Preference</label>
              <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none appearance-none">
                <option>Detailed Summary</option>
                <option>Quick Overview</option>
                <option>Key Clauses &amp; Risks</option>
              </select>
            </div>
          </div>

          <div className="bg-secondary-container bg-opacity-30 border border-secondary-container rounded-lg p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              <strong>Privacy Note:</strong> Your documents are encrypted end-to-end and are never used for training models. They remain strictly confidential.
            </p>
          </div>

          <div className="flex justify-end gap-stack-sm pt-stack-md border-t border-outline-variant">
            <button 
              onClick={() => navigate('/dashboard')}
              disabled={processingState !== 'idle' && processingState !== 'error'}
              className="font-label-md text-label-md px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-surface-container transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleStartAnalysis}
              disabled={!file || (processingState !== 'idle' && processingState !== 'error')}
              className="font-label-md text-label-md px-6 py-2.5 rounded-lg bg-tertiary-fixed-dim text-tertiary hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
            >
              {processingState === 'idle' || processingState === 'error' ? 'Start Analysis' : 'Processing...'}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadDocument;
