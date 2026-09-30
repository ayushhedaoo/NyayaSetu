import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import DocumentCard from '../components/Dashboard/DocumentCard';
import EmptyState from '../components/UI/EmptyState';
import { getDocuments } from '../services/documentService';
import { Link, useNavigate } from 'react-router-dom';

const DocumentHistory = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, name
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleRename = (doc) => {
    const newName = window.prompt('Enter new document name:', doc.title || doc.originalFileName);
    if (newName) {
      setDocuments(documents.map(d => d._id === doc._id ? { ...d, title: newName } : d));
    }
  };

  const handleDelete = (doc) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d._id !== doc._id));
    }
  };

  const handleFavorite = (doc) => {
    setDocuments(documents.map(d => d._id === doc._id ? { ...d, favorite: !d.favorite } : d));
  };

  const filteredDocs = documents
    .filter(doc => {
      const title = doc.title || doc.originalFileName || '';
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'name') return (a.title || a.originalFileName || '').localeCompare(b.title || b.originalFileName || '');
      return 0;
    });

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <DashboardLayout>
      <div className="mb-stack-lg">
        <h2 className="font-headline-lg text-[28px] font-bold text-primary mb-2">My Documents</h2>
        <p className="font-body-md text-on-surface-variant">View and manage all your previously analyzed legal documents.</p>
      </div>

      <div className="bg-white rounded-lg border border-outline-variant p-stack-md mb-stack-lg flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline">search</span>
          </div>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary transition-colors"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-outline-variant text-on-surface-variant font-label-md px-4 py-2 rounded-lg focus:outline-none focus:border-secondary bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name (A-Z)</option>
          </select>
          <button className="flex-1 md:flex-none border border-outline-variant text-on-surface-variant font-label-md px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span> Filter
          </button>
          <Link to="/upload" className="flex-1 md:flex-none bg-primary text-on-primary font-label-md px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">upload</span> Upload New
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse bg-surface-container-high h-32 rounded-lg"></div>
          ))}
        </div>
      ) : filteredDocs.length === 0 ? (
        <EmptyState 
          icon="search_off"
          title="No documents found"
          description={searchTerm ? "Try adjusting your search criteria." : "You haven't uploaded any documents yet."}
          actionText={!searchTerm ? "Upload Document" : null}
          onAction={!searchTerm ? () => navigate('/upload') : null}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {paginatedDocs.map(doc => (
              <DocumentCard 
                key={doc._id} 
                document={doc} 
                onClick={() => window.location.href = `/frontend/analysis-commercial-lease.html?id=${doc._id}`} 
                onRename={handleRename}
                onDelete={handleDelete}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-outline-variant rounded-lg disabled:opacity-50 hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="text-body-md text-on-surface-variant">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-outline-variant rounded-lg disabled:opacity-50 hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default DocumentHistory;
