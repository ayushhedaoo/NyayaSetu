import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col md:flex-row antialiased">
      {/* Left Panel: Brand Imagery & Messaging */}
      <div className="hidden md:flex md:w-1/2 lg:w-5/12 bg-surface-container-high relative flex-col justify-between p-margin-desktop overflow-hidden border-r border-outline-variant/30">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPHNClt9IcYjTzBc7SXHA0PZvawiCPXhVfiVlQZ3jSSDWIf6Ttvg8FjhDqz4X125oHYmVPcpv3IBVOYpcOEfNiGHDz3wF1DjjyZneXTHijkPC165M9CFPXuNhADqCrXIPcd7hR9zqKPnd0JeXuMt7GhTjwTp16_mvJJE3CNcQM14uEf3HCIt4K85k19d1T6bh4OyqEtKwHQNsuIDxunCT7s-IEbROmzm8vd_mf4toQJxmv9sVxAg15')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest/90 via-surface-container-highest/50 to-transparent"></div>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
          <span className="font-headline-lg text-headline-lg text-primary tracking-tight">NyayaSetu</span>
        </div>
        <div className="relative z-10 max-w-md pb-stack-lg">
          <h1 className="font-display-md text-display-md text-primary mb-stack-md leading-tight">
            Justice through <br/> <span className="italic text-secondary">Clarity.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Navigate the legal ecosystem with institutional trust and modern efficiency. Your secure portal to precise analysis.
          </p>
        </div>
      </div>
      
      {/* Right Panel: Content */}
      <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center px-margin-mobile py-stack-lg md:px-margin-desktop lg:px-[10%]">
        <div className="md:hidden flex items-center justify-center gap-2 mb-stack-lg">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">NyayaSetu</span>
        </div>
        <div className="w-full max-w-[440px] mx-auto bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-outline-variant shadow-[0_4px_12px_rgba(16,42,67,0.02)]">
          <div className="mb-stack-lg text-center md:text-left">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">{title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
          </div>
          {children}
        </div>
        <div className="mt-auto pt-stack-lg text-center md:text-left flex justify-center md:justify-start">
          <p className="font-caption text-caption text-outline">
            © 2024 NyayaSetu. Legal Analysis Platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
