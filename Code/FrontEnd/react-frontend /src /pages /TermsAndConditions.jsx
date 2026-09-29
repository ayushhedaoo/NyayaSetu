import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-display-lg text-primary mb-6">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: August 2026</p>

      <div className="prose prose-blue max-w-none text-gray-700">
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using the NyayaSetu service, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.
        </p>

        <h3>2. Not Legal Advice</h3>
        <p>
          <strong>NyayaSetu is an informational tool and does not provide legal advice.</strong> The AI-generated summaries, analyses, and dictionary definitions are provided for general understanding only and do not create an attorney-client relationship. You should always seek the advice of a qualified legal professional regarding any legal matters.
        </p>

        <h3>3. User Accounts</h3>
        <p>
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
        </p>

        <h3>4. Limitation of Liability</h3>
        <p>
          In no event shall NyayaSetu, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
