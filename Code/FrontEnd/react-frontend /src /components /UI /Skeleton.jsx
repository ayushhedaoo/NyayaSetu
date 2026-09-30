import React from 'react';

const Skeleton = ({ className = '', count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div 
      key={i} 
      className={`animate-pulse bg-gray-200 rounded ${className || 'h-4 w-full mb-2'}`}
    />
  ));
  
  return <>{skeletons}</>;
};

export default Skeleton;
