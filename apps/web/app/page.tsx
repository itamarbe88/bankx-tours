'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Calendar, Users, SlidersHorizontal, Clock, History } from 'lucide-react';
import { MOCK_TOURS, CATEGORIES } from '@bankx/shared';
import type { SearchFilters, CategoryId } from '@bankx/shared';
import { useSearchStore } from '@/store/search';
import { TourCard } from '@/components/TourCard';

const defaultFilters: SearchFilters = {
  query: '',
  location: '',
  dateFrom: '',
  dateTo: '',
  people: 1,
  categories: [],
  sortBy: 'default',
};

export default function HomePage() {
  const { filters, setFilters, setResults, saveSearch, previousSearches } = useSearchStore();
  const [showPrevious, setShowPrevious] = useState(false);

  const filtered = useMemo(() => {
    let tours = [...MOCK_TOURS];
    if (filters.query) {
      const q = filters.query.toLowerCase();
      tours = tours.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q)
      );
    }
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      tours = tours.filter(t =>
        t.location.toLowerCase().includes(loc) ||
        t.country.toLowerCase().includes(loc)
      );
    }
    if (filters.categories.length > 0) {
      tours = tours.filter(t => filters.categories.includes(t.category));
    }
    if (filters.sortBy === 'price_asc') tours.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === 'rating_desc') tours.sort((a, b) => b.rating - a.rating);
    return tours;
  }, [filters]);

  useEffect(() => { setResults(filtered); }, [filtered, setResults]);

  const handleSearch = () => { saveSearch(filters); setShowPrevious(false); };

  const toggleCategory = (cat: CategoryId) => {
    const current = filters.categories;
    setFilters({ categories: current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat] });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero */}
      <div className="bg-[#1E3A5F] pt-10 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Explore the World</h1>
          <p className="text-white/70 text-center mb-8 text-sm">Use your Bank X points, vouchers and rewards to book unforgettable experiences</p>

          <div className="bg-white rounded-2xl shadow-xl p-4 space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                <input
                  type="text"
                  placeholder="Search tours, cities, activities…"
                  value={filters.query}
                  onChange={e => setFilters({ query: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
                />
              </div>
              <div className="relative md:w-44">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={filters.location}
                  onChange={e => setFilters({ location: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                <input type="date" value={filters.dateFrom} onChange={e => setFilters({ dateFrom: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition text-[#4A5568]" />
              </div>
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                <input type="date" value={filters.dateTo} onChange={e => setFilters({ dateTo: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition text-[#4A5568]" />
              </div>
              <div className="relative md:w-36">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                <select value={filters.people} onChange={e => setFilters({ people: Number(e.target.value) })}
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition appearance-none bg-white text-[#4A5568]">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n===1?'person':'people'}</option>)}
                </select>
              </div>
              <button onClick={handleSearch} className="px-6 py-2.5 bg-[#C9A84C] hover:bg-[#D4BA6E] text-[#1A1A2E] font-semibold rounded-lg text-sm transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6">
        {/* Category toggles */}
        <div className="flex gap-2 overflow-x-auto pb-3" style={{scrollbarWidth:'none'}}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => toggleCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                filters.categories.includes(cat.id)
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                  : 'bg-white text-[#4A5568] border-[#E2E8F0] hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
              }`}>
              <span>{cat.icon}</span><span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Sort bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[#4A5568] text-sm"><span className="font-semibold text-[#1A1A2E]">{filtered.length}</span> experiences found</span>
            {previousSearches.length > 0 && (
              <button onClick={() => setShowPrevious(!showPrevious)} className="flex items-center gap-1 text-xs text-[#1E3A5F] hover:underline">
                <History className="w-3 h-3" />Recent searches
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#718096]" />
            <span className="text-sm text-[#4A5568]">Sort by:</span>
            <select value={filters.sortBy} onChange={e => setFilters({ sortBy: e.target.value as SearchFilters['sortBy'] })}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#1E3A5F] bg-white text-[#1A1A2E]">
              <option value="default">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="rating_desc">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Previous searches */}
        {showPrevious && (
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-md p-4 mb-6 space-y-2">
            <p className="text-xs font-semibold text-[#718096] uppercase tracking-wide mb-2">Recent Searches</p>
            {previousSearches.map((prev, i) => (
              <button key={i} onClick={() => { setFilters(prev); setShowPrevious(false); }}
                className="w-full text-left flex items-center gap-2 text-sm text-[#4A5568] hover:text-[#1E3A5F] py-1">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{prev.query || prev.location || 'All tours'}{prev.categories.length > 0 && ` · ${prev.categories.join(', ')}`}{prev.people > 1 && ` · ${prev.people} people`}</span>
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-[#1A1A2E] font-semibold text-lg">No experiences found</p>
            <p className="text-[#718096] text-sm mt-1">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-12">
            {filtered.map(tour => <TourCard key={tour.id} tour={tour} />)}
          </div>
        )}
      </div>
    </div>
  );
}
