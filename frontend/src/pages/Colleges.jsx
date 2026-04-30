import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import CollegeCard from '../components/CollegeCard';
import FilterSidebar from '../components/FilterSidebar';
import Loader from '../components/Loader';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Colleges() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialFilters = {
    search: searchParams.get('search') || '',
    state: searchParams.get('state') || '',
    type: searchParams.get('type') || '',
    max_fees: searchParams.get('max_fees') || ''
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState(initialFilters.search);
  
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchColleges = async (currentFilters, currentPage) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (currentFilters.search) params.append('search', currentFilters.search);
      if (currentFilters.state) params.append('state', currentFilters.state);
      if (currentFilters.type) params.append('type', currentFilters.type);
      if (currentFilters.max_fees) params.append('max_fees', currentFilters.max_fees);
      params.append('page', currentPage);
      params.append('limit', 9);

      const response = await api.get(`/colleges?${params.toString()}`);
      setColleges(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.total);
    } catch (err) {
      setError('Failed to fetch colleges. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges(filters, page);
    // Update URL params
    const newParams = {};
    if (filters.search) newParams.search = filters.search;
    if (filters.state) newParams.state = filters.state;
    if (filters.type) newParams.type = filters.type;
    if (filters.max_fees) newParams.max_fees = filters.max_fees;
    setSearchParams(newParams);
  }, [filters, page]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput }));
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const applyFilters = () => setPage(1); // Triggered by fetchColleges dependency
  const resetFilters = () => {
    setFilters({ search: '', state: '', type: '', max_fees: '' });
    setSearchInput('');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Search Bar */}
      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-text-secondary" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border-2 border-border-custom rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-0 focus:border-primary transition-colors text-lg"
          placeholder="Search for colleges..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 flex-shrink-0">
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            applyFilters={applyFilters} 
            resetFilters={resetFilters} 
          />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-text-primary">
              {loading ? 'Searching...' : `Found ${totalCount} Colleges`}
            </h2>
          </div>

          {error && (
            <div className="p-4 mb-6 border-l-4 border-orange-500 bg-orange-50 text-orange-700 rounded-r-lg">
              <p className="font-medium">{error}</p>
              <button onClick={() => fetchColleges(filters, page)} className="mt-2 text-sm underline font-bold">Retry</button>
            </div>
          )}

          {loading ? (
            <Loader />
          ) : colleges.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {colleges.map(college => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-border-custom rounded-lg hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-text-primary disabled:hover:border-border-custom transition-colors font-medium"
                  >
                    Prev
                  </button>
                  <span className="text-text-secondary font-medium px-4">
                    Page {page} of {totalPages}
                  </span>
                  <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-border-custom rounded-lg hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-text-primary disabled:hover:border-border-custom transition-colors font-medium"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white border border-border-custom rounded-xl">
              <div className="text-6xl mb-4">🏜️</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">No colleges found</h3>
              <p className="text-text-secondary mb-6">Try adjusting your filters or search query.</p>
              <button onClick={resetFilters} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
