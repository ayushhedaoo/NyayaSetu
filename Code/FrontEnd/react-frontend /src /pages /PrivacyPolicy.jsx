import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-display-lg text-primary mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: August 2026</p>

      <div className="prose prose-blue max-w-none text-gray-700">
        <h3>1. Information We Collect</h3>
        <p>
          We collect information you provide directly to us, including when you create an account, upload documents for analysis, or communicate with us. The types of information we may collect include your name, email address, password, and the legal documents you upload.
        </p>

        <h3>2. How We Use Your Information</h3>
        <p>
          We use the information we collect to provide, maintain, and improve our services. Specifically, uploaded documents are used temporarily by our AI models solely for the purpose of generating the requested summary or analysis.
        </p>

        <h3>3. Data Retention and Deletion</h3>
        <p>
          You retain full ownership of your documents. When you delete a document from your NyayaSetu account, it is permanently purged from our active databases and storage buckets. We do not use your documents to train public AI models.
        </p>

        <h3>4. Security</h3>
        <p>
          We implement appropriate technical and organizational security measures to protect your data against unauthorized access, loss, or alteration. All data in transit is encrypted via TLS, and data at rest is encrypted using industry-standard AES-256.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
