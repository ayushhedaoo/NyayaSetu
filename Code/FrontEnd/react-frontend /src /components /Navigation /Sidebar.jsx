import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-surface-container dark:bg-surface-container-low docked left-0 h-full w-64 bg-surface-container dark:bg-surface-container-low flex flex-col h-screen fixed left-0 top-0 p-stack-md space-y-stack-sm z-50">
      <div className="mb-stack-lg flex flex-col items-center justify-center pt-stack-md">
        <img 
          alt="User Profile Avatar" 
          className="w-16 h-16 rounded-full mb-stack-sm object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYQJ2VdU6wem0aq9Rkp_TGbYG5m1fJUIMbpR8c0O3HOgYqEmbiy2rkPqFULbELlaeWCrivW8vTcj4yhj-JP1TxFpLII2k8FT5LWHhorqH7mglWOnn1KGiqNHsdsl7u7a7FETLZm0s6TUMj9QhF1pSOrRxGwCVIYgKWhinBdgOFTTv6msmbkCEgRwBsr_jJWQkvX0FndeeEjnrvlW2tsAyOHl32UZhrDu9f7ygaq3fj16D8YyZlos84" 
        />
        <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed text-center">NyayaSetu</h1>
        <p className="font-label-md text-label-md text-on-surface-variant text-center mt-1">Legal Analysis Platform</p>
      </div>

      <Link 
        to="/upload" 
        className="bg-[#E8A317] text-[#102A43] font-label-md text-label-md rounded-lg py-3 px-4 font-bold flex items-center justify-center gap-2 mb-stack-md hover:opacity-90 transition-opacity w-full"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
        New Analysis
      </Link>

      <div className="flex-1 space-y-1">
        <Link 
          to="/dashboard" 
          className={`${isActive('/dashboard') ? 'bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary opacity-80' : 'text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high'} rounded-lg px-4 py-3 flex items-center gap-3 transition-colors font-label-md text-label-md`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/dashboard') ? "'FILL' 1" : "" }}>dashboard</span>
          Overview
        </Link>
        <Link 
          to="/documents" 
          className={`${isActive('/documents') ? 'bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary opacity-80' : 'text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high'} rounded-lg px-4 py-3 flex items-center gap-3 transition-colors font-label-md text-label-md`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/documents') ? "'FILL' 1" : "" }}>description</span>
          My Documents
        </Link>
        <Link 
          to="/upload" 
          className="text-on-surface-variant dark:text-on-surface-variant px-4 py-3 flex items-center gap-3 hover:bg-surface-container-highest dark:hover:bg-surface-container-high rounded-lg font-label-md text-label-md transition-colors"
        >
          <span className="material-symbols-outlined">cloud_upload</span>
          Upload
        </Link>
        <Link 
          to="/frontend/legal-dictionary.html" 
          className="text-on-surface-variant dark:text-on-surface-variant px-4 py-3 flex items-center gap-3 hover:bg-surface-container-highest dark:hover:bg-surface-container-high rounded-lg font-label-md text-label-md transition-colors"
        >
          <span className="material-symbols-outlined">menu_book</span>
          Dictionary
        </Link>
        <Link 
          to="/settings" 
          className={`${isActive('/settings') ? 'bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary opacity-80' : 'text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high'} rounded-lg px-4 py-3 flex items-center gap-3 transition-colors font-label-md text-label-md`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/settings') ? "'FILL' 1" : "" }}>settings</span>
          Settings
        </Link>
      </div>

      <div className="mt-auto space-y-1 pt-stack-md border-t border-outline-variant">
        <Link 
          to="/profile" 
          className={`${isActive('/profile') ? 'bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary opacity-80' : 'text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high'} rounded-lg px-4 py-3 flex items-center gap-3 transition-colors font-label-md text-label-md`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/profile') ? "'FILL' 1" : "" }}>person</span>
          Profile
        </Link>
        <button 
          onClick={logout}
          className="w-full text-on-surface-variant dark:text-on-surface-variant px-4 py-3 flex items-center gap-3 hover:bg-surface-container-highest dark:hover:bg-surface-container-high rounded-lg font-label-md text-label-md transition-colors text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
