import React, { useState } from 'react';
import apiClient from '../../services/apiClient';

const DictionaryTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    setDefinition(null);

    try {
      const response = await apiClient.post('/translate/term', { term: searchTerm });
      setDefinition(response.data.translatedTerm);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch definition.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a legal term..."
          className="flex-1 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="bg-primary text-on-primary hover:bg-primary-light px-4 py-2 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-on-primary"></div>
          ) : (
            <span className="material-symbols-outlined text-[18px]">search</span>
          )}
        </button>
      </form>

      {error && (
        <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm font-body-md">
          {error}
        </div>
      )}

      {definition && (
        <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant mt-4">
          <h4 className="font-label-md text-label-md text-primary mb-2">Definition & Translation</h4>
          <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed whitespace-pre-wrap">
            {definition}
          </p>
        </div>
      )}

      {!definition && !loading && !error && (
        <div className="text-center p-6 text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl mb-2 opacity-50">menu_book</span>
          <p className="font-body-md text-sm">Search for complex legal jargon to get plain language explanations and Hindi translations.</p>
        </div>
      )}
    </div>
  );
};

export default DictionaryTab;
