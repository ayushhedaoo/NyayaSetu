import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const TopNav = () => {
  const { user } = useAuth();
  
  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-gutter py-stack-md sticky top-0 z-40 w-full flat no shadows">
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed" id="user-greeting">
          {getGreeting()}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-high rounded-full p-2 transition-colors relative flex items-center justify-center">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <Link 
          to="/upload"
          className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Quick Upload
        </Link>
      </div>
    </header>
  );
};

export default TopNav;
