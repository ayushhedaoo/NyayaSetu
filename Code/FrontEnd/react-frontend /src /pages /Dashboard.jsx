import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import DashboardCard from '../components/Dashboard/DashboardCard';
import DocumentCard from '../components/Dashboard/DocumentCard';
import EmptyState from '../components/UI/EmptyState';
import { getDocuments } from '../services/documentService';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getDocuments();
        // Just take the first 4 for recent
        setDocuments(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg">
        {/* Main Activity Column */}
        <div className="md:col-span-8 flex flex-col gap-gutter">
          {/* Continue where you left off */}
          <DashboardCard>
            <div className="flex justify-between items-start mb-stack-md">
              <div>
                <span className="font-label-md text-label-md text-secondary tracking-widest uppercase mb-2 block">Resume Analysis</span>
                <h3 className="font-headline-lg text-headline-lg text-primary">Commercial Lease Agreement v2.pdf</h3>
              </div>
              <span className="bg-[#E4E2DD] text-on-surface px-3 py-1 rounded-full font-caption text-caption font-bold">In Progress</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-2xl">
              Our AI has identified 14 key clauses and 2 potential liabilities in section 4 regarding property maintenance responsibilities. Review the highlighted sections to proceed.
            </p>
            <Link 
              to="/analysis/demo" 
              className="border border-primary text-primary hover:bg-surface-container-low font-label-md text-label-md px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              Review Findings
            </Link>
          </DashboardCard>

          {/* Recent Documents */}
          <div>
            <div className="flex justify-between items-center mb-stack-md">
              <h3 className="font-headline-lg text-[24px] font-bold text-primary">Recent Documents</h3>
              <Link href="/documents" className="text-[#147D78] font-label-md text-label-md hover:underline bg-transparent border-none">View All</Link>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="animate-pulse bg-surface-container-high h-32 rounded-lg"></div>
                ))}
              </div>
            ) : documents.length === 0 ? (
              <EmptyState 
                icon="folder_open"
                title="No documents yet"
                description="Upload your first document to get started."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map(doc => (
                  <DocumentCard 
                    key={doc._id} 
                    document={doc} 
                    onClick={() => navigate(`/analysis/${doc._id}`)} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Side Widgets Column */}
        <div className="md:col-span-4 flex flex-col gap-gutter">
          {/* Quick Stats / Usage */}
          <div className="bg-surface-container-low rounded-lg p-stack-md border border-outline-variant relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-50 blur-xl pointer-events-none"></div>
            <h3 className="font-label-md text-label-md text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">donut_large</span>
              Free Trial Status
            </h3>
            <div className="mb-2 flex justify-between items-end">
              <span className="font-display-md text-[32px] font-bold text-primary leading-none">3</span>
              <span className="font-body-md text-on-surface-variant mb-1">/ 5 Documents</span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-2 mb-4">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="font-caption text-caption text-on-surface-variant mb-4">Upgrade to Premium for unlimited document analysis and multi-language support.</p>
            <button className="w-full text-center text-[#147D78] border border-[#147D78] hover:bg-[#147D78] hover:text-white font-label-md text-label-md py-2 rounded-lg transition-colors">
              Upgrade Plan
            </button>
          </div>

          {/* Legal Tip of the Day */}
          <div className="bg-primary text-on-primary rounded-lg p-stack-md relative shadow-lg">
            <div className="flex items-start gap-3 mb-3">
              <span className="material-symbols-outlined text-[#E8A317] mt-1">lightbulb</span>
              <h3 className="font-label-md text-label-md text-white">Tip of the Day</h3>
            </div>
            <p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed mb-4">
              "Force Majeure clauses strictly require specific unforeseeable events to be explicitly listed to provide comprehensive legal protection in Indian commercial contracts."
            </p>
            <div className="flex justify-end">
              <button className="text-secondary-fixed hover:text-white font-caption text-caption flex items-center gap-1 transition-colors bg-transparent border-none p-0">
                Read More <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Quick Upload Area */}
          <div className="mt-auto pt-gutter">
            <Link to="/upload" className="block border-2 border-dashed border-outline-variant rounded-lg p-stack-lg text-center bg-white hover:bg-surface-container-lowest transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl text-secondary">upload_file</span>
              </div>
              <h4 className="font-headline-lg text-[20px] text-primary mb-2">Drag &amp; drop document</h4>
              <p className="font-body-md text-on-surface-variant text-sm mb-4">PDF, DOCX, or Image (Max 10MB)</p>
              <span className="inline-block bg-[#E4E2DD] text-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-[#c3c6ce] transition-colors">
                Browse Files
              </span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
