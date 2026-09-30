import React, { useState, useRef, useEffect } from 'react';

const DocumentActions = ({ document, onRename, onDelete, onFavorite }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (e, action) => {
    e.stopPropagation();
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
      >
        <span className="material-symbols-outlined text-lg">more_vert</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
          <button 
            onClick={(e) => handleAction(e, onFavorite)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">favorite</span> Favorite
          </button>
          <button 
            onClick={(e) => handleAction(e, onRename)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">edit</span> Rename
          </button>
          <a 
            href={document.fileUrl || '#'} 
            download
            onClick={(e) => e.stopPropagation()}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">download</span> Download Original
          </a>
          <button 
            onClick={(e) => handleAction(e, onDelete)}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">delete</span> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentActions;
