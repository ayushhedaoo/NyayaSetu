import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-display-lg text-primary mb-6">About NyayaSetu</h1>
      <p className="text-body-lg text-gray-700 mb-8">
        NyayaSetu is a next-generation Legal Tech platform designed to bridge the gap between complex legal jargon and everyday understanding. Our mission is to democratize legal comprehension for everyone.
      </p>

      <section className="mb-12">
        <h2 className="text-display-sm text-gray-800 mb-4">Our Mission</h2>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="text-body-md text-blue-900 leading-relaxed">
            Legal documents are often impenetrable due to archaic language and complex sentence structures. We believe that access to justice begins with access to understanding. NyayaSetu uses state-of-the-art AI to break down these barriers, providing clear, concise, and bilingual summaries of legal contracts, notices, and rulings.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-display-sm text-gray-800 mb-4">The Technology</h2>
        <p className="text-body-md text-gray-700 mb-4">
          Built on a robust and scalable architecture, NyayaSetu leverages the Google Gemini AI models to perform deep semantic analysis on uploaded documents. 
        </p>
        <ul className="list-disc pl-6 space-y-2 text-body-md text-gray-700">
          <li><strong>Document Parsing:</strong> Advanced OCR and PDF text extraction.</li>
          <li><strong>AI Analysis:</strong> Context-aware summarization that highlights risks, obligations, and key dates.</li>
          <li><strong>Security:</strong> Enterprise-grade encryption ensuring your sensitive documents remain strictly confidential.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-display-sm text-gray-800 mb-4">Our Team</h2>
        <p className="text-body-md text-gray-700">
          We are a team of legal professionals, software engineers, and AI researchers passionate about making the legal system more transparent and accessible.
        </p>
      </section>
    </div>
  );
};

export default About;
