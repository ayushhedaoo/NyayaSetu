import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-surface dark:bg-surface-dim docked full-width top-0 sticky border-b border-outline-variant dark:border-outline flat no shadows z-50">
      <div className="flex justify-between items-center px-margin-desktop py-stack-md w-full max-w-container-max mx-auto md:px-gutter">
        <Link className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed" to="/">
          NyayaSetu
        </Link>
        <div className="hidden md:flex space-x-gutter">
          <Link className="text-on-surface-variant dark:text-on-surface-variant font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/about">About</Link>
          <Link className="text-on-surface-variant dark:text-on-surface-variant font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/research">Research & Methodology</Link>
        </div>
        <div className="flex items-center space-x-stack-md">
          <Link to="/login" className="hidden md:inline-flex text-primary font-label-md text-label-md hover:text-primary transition-colors">Sign In</Link>
          <Link to="/register" className="btn-primary font-label-md text-label-md px-4 py-2 rounded-lg transition-transform hover:scale-95 inline-block text-center border border-primary bg-primary text-on-primary">Try Free</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
