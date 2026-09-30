import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Navigation/Sidebar';
import DocumentViewer from '../components/Analysis/DocumentViewer';
import AnalysisSidebar from '../components/Analysis/AnalysisSidebar';
import { getDocumentById } from '../services/documentService';

const DocumentAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleExportJSON = React.useCallback(() => {
    if (!document || !document.summary) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(document.summary, null, 2));
    const downloadAnchorNode = window.document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", document.fileName + "_summary.json");
    window.document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }, [document]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await getDocumentById(id);
        setDocument(data.document);
      } catch (err) {
        console.error(err);
        setError('Failed to load document analysis.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-surface text-on-surface h-screen flex overflow-hidden font-body-md">
        <Sidebar />
        <main className="flex-1 ml-64 flex flex-col h-full bg-surface-bright relative z-10 items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="bg-surface text-on-surface h-screen flex overflow-hidden font-body-md">
        <Sidebar />
        <main className="flex-1 ml-64 flex flex-col h-full bg-surface-bright relative z-10 items-center justify-center p-stack-lg">
          <div className="bg-error-container text-on-error-container p-6 rounded-lg text-center">
            <span className="material-symbols-outlined text-4xl mb-2">error</span>
            <h2 className="font-headline-lg text-[24px]">{error || 'Document not found'}</h2>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-4 border border-error text-error hover:bg-error-container px-4 py-2 rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface h-screen flex overflow-hidden font-body-md">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-full bg-surface-bright relative z-10">
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-gutter py-stack-md border-b border-outline-variant bg-surface sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex flex-col">
              <span className="font-caption text-caption text-on-surface-variant">Analyzing Document</span>
              <h2 className="font-label-md text-label-md text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">description</span>
                <span>{document.fileName}</span>
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors hidden sm:block">
              <span className="material-symbols-outlined">notifications</span>
            </button>
                        <button onClick={handleExportJSON} className="border border-outline-variant text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export JSON
            </button>
            <button className="bg-primary text-on-primary hover:bg-primary-light font-label-md text-label-md px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">share</span>
              Share
            </button>
          </div>
        </header>

        {/* Split View */}
        <div className="flex-1 flex overflow-hidden">
          <DocumentViewer document={document} />
          <AnalysisSidebar summary={document.summary} />
        </div>
      </main>
    </div>
  );
};

export default DocumentAnalysis;
