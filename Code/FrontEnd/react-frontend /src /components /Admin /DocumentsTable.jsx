import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsTable = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-body-md text-gray-500">No documents found.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <h3 className="text-display-xs mb-4">Recent Documents</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700">File Name</th>
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700">Owner</th>
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700">Size</th>
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700">Uploaded</th>
              <th className="py-3 px-4 text-body-sm font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-body-md font-medium text-gray-800">
                  <div className="truncate max-w-xs" title={doc.fileName}>{doc.fileName}</div>
                </td>
                <td className="py-3 px-4 text-body-md text-gray-600">
                  {doc.user?.email || 'Unknown'}
                </td>
                <td className="py-3 px-4 text-body-sm text-gray-500">
                  {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doc.summary 
                      ? 'bg-green-100 text-green-800' 
                      : doc.processingError 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.summary ? 'Analyzed' : doc.processingError ? 'Error' : 'Pending'}
                  </span>
                </td>
                <td className="py-3 px-4 text-body-sm text-gray-500">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right">
                  <Link 
                    to={`/analysis/${doc._id}`}
                    className="text-primary hover:text-primary-light text-body-sm font-medium transition-colors"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsTable;
