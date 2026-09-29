import React from 'react';

const Research = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-display-lg text-primary mb-6">Research & Methodology</h1>
      
      <section className="mb-12">
        <h2 className="text-display-sm text-gray-800 mb-4">AI Methodology</h2>
        <p className="text-body-md text-gray-700 mb-4">
          The NyayaSetu engine is powered by Large Language Models (LLMs) specifically prompted and fine-tuned for legal reasoning. Our research focuses on minimizing "hallucinations" while maximizing the extraction of legally binding clauses.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-display-sm text-gray-800 mb-4">Data Privacy in AI</h2>
        <p className="text-body-md text-gray-700 mb-4">
          All document processing happens in isolated environments. The data used for summarization is never used to train the base foundation models. Once a document is processed and the summary is generated, the temporary text embeddings are discarded.
        </p>
      </section>

      <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined">warning</span>
          AI Disclaimer
        </h2>
        <p className="text-body-sm text-yellow-900">
          NyayaSetu is a tool designed to assist in understanding legal documents. It does not constitute formal legal advice. The AI-generated summaries are approximations and may omit nuances present in the original text. Always consult with a qualified legal professional before making decisions based on legal documents.
        </p>
      </section>
    </div>
  );
};

export default Research;
