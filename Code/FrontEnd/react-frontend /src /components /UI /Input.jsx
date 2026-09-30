import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, icon, type = 'text', ...props }, ref) => {
  return (
    <div>
      {label && (
        <label className="block font-label-md text-label-md text-primary mb-2" htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline text-xl">{icon}</span>
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all`}
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
