import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-highest dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline full-width flat no shadows">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop md:px-gutter py-stack-lg w-full max-w-container-max mx-auto gap-4">
        <div className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed mb-4 md:mb-0">
          NyayaSetu
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/">Privacy Policy</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/">Terms of Service</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/">Disclaimer</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/">Contact</Link>
        </div>
        <div className="font-caption text-caption text-on-surface-variant mt-4 md:mt-0 text-center md:text-right">
          <p>Not legal advice. For informational assistance only.</p>
          <p className="mt-1">© 2024 NyayaSetu. Justice through Clarity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
