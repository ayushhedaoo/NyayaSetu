import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-[120px] font-bold text-primary leading-none">404</h1>
        <h2 className="text-display-md text-gray-900 mb-4">Page not found</h2>
        <p className="text-body-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary px-8 py-3 rounded-lg text-body-md font-medium inline-block">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
