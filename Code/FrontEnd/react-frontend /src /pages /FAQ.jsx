import React, { useState } from 'react';

const faqs = [
  {
    question: 'How accurate is the AI summary?',
    answer: 'Our AI is fine-tuned specifically on legal corpora to maximize accuracy. However, it is an assistive tool and its outputs should not replace professional legal review.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use AES-256 encryption for data at rest and TLS for data in transit. Your documents are never used to train public models.'
  },
  {
    question: 'What file formats are supported?',
    answer: 'Currently, we support PDF (.pdf) and Word documents (.docx). We plan to support image-based formats (JPG, PNG) in the near future.'
  },
  {
    question: 'Does this replace a lawyer?',
    answer: 'No. NyayaSetu helps you understand the basic terms, risks, and obligations in a document, empowering you to have more informed conversations with your legal counsel.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-display-lg text-primary mb-2 text-center">Frequently Asked Questions</h1>
      <p className="text-body-lg text-gray-600 mb-12 text-center">
        Everything you need to know about the platform and how it works.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <button 
              className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
              onClick={() => toggle(index)}
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              <span className="material-symbols-outlined text-gray-400">
                {openIndex === index ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 pt-2 text-gray-600 bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top-2">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
