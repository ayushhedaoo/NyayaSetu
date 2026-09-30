import React from 'react';
import PublicLayout from '../components/Layout/PublicLayout';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop md:px-gutter py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 flex flex-col items-start text-left">
          <h1 className="font-display-lg text-display-lg text-primary dark:text-primary-fixed leading-tight mb-stack-md">
            Decipher Legal Complexity with <span className="italic text-secondary dark:text-secondary-fixed">Clarity.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant max-w-xl mb-stack-lg">
            NyayaSetu transforms dense contracts and legal documents into clear, actionable insights. Powered by advanced AI, designed for professionals and citizens alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/upload" className="btn-primary flex items-center justify-center gap-2 font-label-md text-label-md px-6 py-3 rounded-lg shadow-sm transition-transform hover:scale-95 bg-primary text-on-primary">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
              Analyze Document
            </Link>
            <Link to="/research" className="btn-secondary flex items-center justify-center gap-2 font-label-md text-label-md px-6 py-3 rounded-lg bg-surface hover:bg-surface-variant text-primary border border-primary transition-colors">
              <span className="material-symbols-outlined text-xl">gavel</span>
              Legal Research
            </Link>
          </div>
        </div>
        
        {/* Hero Visual Mockup */}
        <div className="md:w-1/2 w-full mt-12 md:mt-0 relative">
          <div className="absolute inset-0 bg-primary-fixed dark:bg-primary/20 rounded-3xl transform rotate-3 scale-105 -z-10 transition-transform duration-500 hover:rotate-6"></div>
          <div className="bg-surface-container-lowest dark:bg-surface-container-highest rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-outline-variant/50 dark:border-outline/30 overflow-hidden relative z-10">
            {/* Browser Header Mock */}
            <div className="h-10 bg-surface-container-low dark:bg-surface-container flex items-center px-4 gap-2 border-b border-outline-variant/30">
              <div className="w-3 h-3 rounded-full bg-error/80"></div>
              <div className="w-3 h-3 rounded-full bg-tertiary-fixed-dim"></div>
              <div className="w-3 h-3 rounded-full bg-secondary/80"></div>
            </div>
            {/* Content Mock */}
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed mb-1">Commercial Lease Agreement</h3>
                  <p className="font-caption text-caption text-on-surface-variant">Analyzed in 4.2 seconds</p>
                </div>
                <span className="px-3 py-1 bg-error-container text-on-error-container rounded-full font-label-md text-xs">High Risk Detected</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-surface dark:bg-surface-dim rounded-lg border-l-4 border-error">
                  <h4 className="font-label-md text-label-md text-on-surface mb-1">Clause 14.2: Termination</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">The landlord reserves the right to terminate with 5 days notice without cause.</p>
                </div>
                <div className="p-4 bg-surface dark:bg-surface-dim rounded-lg border-l-4 border-secondary">
                  <h4 className="font-label-md text-label-md text-on-surface mb-1">Clause 8.1: Maintenance</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Tenant is responsible for all HVAC repairs exceeding ₹10,000.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-y border-outline-variant/50 dark:border-outline/30 bg-surface-container-lowest dark:bg-surface-container">
        <div className="max-w-container-max mx-auto px-margin-desktop md:px-gutter py-8 flex flex-col md:flex-row items-center justify-between gap-6 opacity-70 grayscale">
          <p className="font-label-md text-label-md text-on-surface-variant w-full md:w-auto text-center">Trusted by legal professionals across India</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <span className="font-display-md text-2xl font-bold tracking-tight">LexisNexis</span>
            <span className="font-display-md text-2xl font-bold tracking-tight">Bar Council</span>
            <span className="font-display-md text-2xl font-bold tracking-tight">LegalTech</span>
            <span className="font-display-md text-2xl font-bold tracking-tight">SupremeCourt</span>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop md:px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display-md text-display-md text-primary dark:text-primary-fixed mb-4">How NyayaSetu Works</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">A seamless workflow from dense legal text to actionable insights in three simple steps.</p>
          </div>
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-outline-variant/50 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-surface border-4 border-surface-container-low shadow-sm flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 300" }}>cloud_upload</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-primary">1. Upload</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Securely upload your legal documents (PDF, DOCX, or images).</p>
              </div>
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-surface border-4 border-surface-container-low shadow-sm flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 300" }}>psychology</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-primary">2. Analyze</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Our AI processes the text, identifying key clauses and structures.</p>
              </div>
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-surface border-4 border-surface-container-low shadow-sm flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 300" }}>fact_check</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-primary">3. Understand</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Review clear summaries, translations, and extracted insights instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;
