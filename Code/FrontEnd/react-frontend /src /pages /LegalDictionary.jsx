import React, { useState, useEffect, useMemo } from 'react';
import TermDetail from '../components/Dictionary/TermDetail';

const MOCK_TERMS = [
  { 
    term: 'Affidavit', 
    hindiTerm: 'शपथ पत्र (Shapath Patra)',
    definition: 'A written statement confirmed by oath or affirmation, for use as evidence in court.',
    simpleExplanation: 'A sworn written document telling the truth, used like testimony in a courtroom.',
    category: 'Evidence',
    relatedTerms: ['Oath', 'Testimony', 'Deposition']
  },
  { 
    term: 'Breach of Contract', 
    hindiTerm: 'संविदा भंग (Samvida Bhang)',
    definition: 'Failing to perform any term of a contract without a legitimate legal excuse.',
    simpleExplanation: 'Breaking a promise that was written in a legally binding agreement.',
    category: 'Contracts',
    relatedTerms: ['Damages', 'Liability', 'Agreement']
  },
  { 
    term: 'Injunction', 
    hindiTerm: 'निषेधाज्ञा (Nishedhagya)',
    definition: 'A court order requiring a person to do or cease doing a specific action.',
    simpleExplanation: 'An order from a judge telling someone to stop doing something (like tearing down a house) or to do something.',
    category: 'Civil Procedure',
    relatedTerms: ['Restraining Order', 'Court Order', 'Equity']
  },
  { 
    term: 'Jurisdiction', 
    hindiTerm: 'अधिकार क्षेत्र (Adhikar Kshetra)',
    definition: 'The official power to make legal decisions and judgments.',
    simpleExplanation: 'The authority a court has to hear and decide a specific case.',
    category: 'General',
    relatedTerms: ['Venue', 'Authority', 'Appellate']
  },
  { 
    term: 'Litigation', 
    hindiTerm: 'मुकदमेबाजी (Mukadamebaji)',
    definition: 'The process of taking legal action.',
    simpleExplanation: 'The process of resolving disputes by filing or answering a complaint through the public court system.',
    category: 'Civil Procedure',
    relatedTerms: ['Lawsuit', 'Plaintiff', 'Defendant']
  },
  { 
    term: 'Habeas Corpus', 
    hindiTerm: 'बंदी प्रत्यक्षीकरण (Bandi Pratyakshikaran)',
    definition: 'A writ requiring a person under arrest to be brought before a judge or into court, especially to secure the person\'s release unless lawful grounds are shown for their detention.',
    simpleExplanation: 'A legal demand to bring a prisoner to court to decide if they have been imprisoned legally.',
    category: 'Criminal Law',
    relatedTerms: ['Writ', 'Detention', 'Arrest']
  }
];

const CATEGORIES = ['All', 'General', 'Contracts', 'Evidence', 'Civil Procedure', 'Criminal Law'];
const POPULAR_TERMS = ['Injunction', 'Affidavit', 'Habeas Corpus'];

const LegalDictionary = () => {
  const [terms, setTerms] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState(null);

  useEffect(() => {
    // Simulate API load
    const loadData = async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 600));
      setTerms(MOCK_TERMS);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredTerms = useMemo(() => {
    return terms.filter(t => {
      const matchesSearch = t.term.toLowerCase().includes(search.toLowerCase()) || 
                            t.definition.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [terms, search, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar for Categories & Popular */}
      <aside className="w-full lg:w-1/4 flex flex-col gap-8">
        <div>
          <h3 className="text-display-xs text-gray-800 mb-4">Categories</h3>
          <ul className="space-y-2">
            {CATEGORIES.map(cat => (
              <li key={cat}>
                <button 
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-body-md ${activeCategory === cat ? 'bg-primary text-white font-medium' : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="hidden lg:block">
          <h3 className="text-display-xs text-gray-800 mb-4">Popular Terms</h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TERMS.map(termStr => {
              const t = MOCK_TERMS.find(m => m.term === termStr);
              return (
                <button 
                  key={termStr}
                  onClick={() => t && setSelectedTerm(t)}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                >
                  {termStr}
                </button>
              )
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4">
        <h1 className="text-display-lg text-primary mb-2">Legal Dictionary</h1>
        <p className="text-body-lg text-gray-600 mb-8">
          A comprehensive bilingual glossary of legal terms with simplified explanations.
        </p>

        <div className="mb-8 relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Search for a legal term or concept..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>

        {loading ? (
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>)}
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-between items-center text-sm text-gray-500">
              <span>Showing {filteredTerms.length} results</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.map((t, index) => (
                <div 
                  key={index} 
                  className="card hover-lift cursor-pointer border border-gray-100 hover:border-primary transition-colors group"
                  onClick={() => setSelectedTerm(t)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-display-sm text-primary group-hover:text-primary-light transition-colors">{t.term}</h3>
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-primary-light transition-colors">arrow_outward</span>
                  </div>
                  {t.hindiTerm && <p className="text-xs text-gray-400 mb-2 font-medium">{t.hindiTerm}</p>}
                  <p className="text-body-md text-gray-600 line-clamp-2">{t.definition}</p>
                </div>
              ))}
            </div>
            {filteredTerms.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-4">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">search_off</span>
                <p className="text-body-lg font-medium text-gray-700">No terms found</p>
                <p className="text-body-md text-gray-500 mt-1">Try adjusting your search or category filter.</p>
                <button 
                  onClick={() => { setSearch(''); setActiveCategory('All'); }}
                  className="mt-4 px-4 py-2 text-primary hover:bg-blue-50 rounded-md transition-colors font-medium text-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {selectedTerm && (
        <TermDetail term={selectedTerm} onClose={() => setSelectedTerm(null)} />
      )}
    </div>
  );
};

export default LegalDictionary;
