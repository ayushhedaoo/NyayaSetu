import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-label-md text-label-md transition-all duration-200";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary-fixed-variant hover:shadow-[0_4px_12px_rgba(16,42,67,0.1)]",
    secondary: "border border-primary text-primary hover:bg-surface-container",
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
