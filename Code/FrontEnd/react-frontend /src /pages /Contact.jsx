import React, { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Mock API call
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-display-lg text-primary mb-2 text-center">Contact Us</h1>
      <p className="text-body-lg text-gray-600 mb-12 text-center">
        Have questions or feedback? We'd love to hear from you.
      </p>

      {status === 'success' ? (
        <div className="bg-green-50 p-8 rounded-lg border border-green-100 text-center">
          <span className="material-symbols-outlined text-5xl text-green-500 mb-4">check_circle</span>
          <h2 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h2>
          <p className="text-green-700">Thank you for reaching out. We will get back to you shortly.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-6 px-6 py-2 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea required rows="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-light transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {status === 'loading' ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
