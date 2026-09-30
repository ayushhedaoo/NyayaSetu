import React from 'react';

export const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">User Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
              {user.role}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Joined Date</p>
            <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()} {new Date(user.createdAt).toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const DocumentDetailModal = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Document Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <p className="text-sm text-gray-500">File Name</p>
            <p className="font-medium">{document.originalName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
              document.status === 'completed' ? 'bg-green-100 text-green-800' : 
              document.status === 'failed' ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'
            }`}>
              {document.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Uploaded By</p>
            <p className="font-medium">{document.user?.name || document.user || 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Upload Date</p>
            <p className="font-medium">{new Date(document.createdAt).toLocaleDateString()} {new Date(document.createdAt).toLocaleTimeString()}</p>
          </div>
          {document.summary && (
            <div>
              <p className="text-sm text-gray-500">Summary Snippet</p>
              <p className="text-sm mt-1 p-3 bg-gray-50 rounded border border-gray-100 text-gray-700 italic">
                "{document.summary.substring(0, 150)}..."
              </p>
            </div>
          )}
        </div>
        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
