import React, { useState } from 'react';
import apiClient from '../../services/apiClient';

const TranslationTab = ({ documentId }) => {
  const [translatedSummary, setTranslatedSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get(`/translate/documents/${documentId}/translate`);
      setTranslatedSummary(response.data.translatedSummary);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to translate summary.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <p className="text-on-surface-variant font-body-md text-sm">Translating document summary via AI...</p>
      </div>
    );
  }

  if (!translatedSummary) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4 border border-outline-variant rounded-lg bg-surface-container-lowest text-center">
        <span className="material-symbols-outlined text-4xl text-primary">translate</span>
        <h3 className="font-label-md text-label-md text-on-surface">Hindi Translation</h3>
        <p className="text-on-surface-variant text-sm">
          Translate the generated summary and key facts into Hindi for better accessibility.
        </p>
        <button
          onClick={handleTranslate}
          className="bg-primary text-on-primary hover:bg-primary-light font-label-md text-label-md px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">g_translate</span>
          Generate Translation
        </button>
        {error && <p className="text-error text-sm mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#F8F6F1] rounded-lg p-4 border border-[#E4E7EB]">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#147D78]">translate</span>
          <h3 className="font-label-md text-label-md text-primary">Translated Overview</h3>
        </div>
        <p className="text-on-surface-variant leading-relaxed font-body-md text-body-md" dir="ltr">
          {translatedSummary.documentOverview}
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#147D78]">auto_awesome</span>
          <h3 className="font-label-md text-label-md text-primary">Translated Summary</h3>
        </div>
        <p className="text-on-surface-variant leading-relaxed font-body-md text-body-md" dir="ltr">
          {translatedSummary.plainLanguageSummary}
        </p>
      </div>
    </div>
  );
};

export default TranslationTab;
