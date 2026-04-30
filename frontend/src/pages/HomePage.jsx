import React, { useState, useEffect } from 'react';
import { collegeService } from '../services/api';
import CollegeCard from '../components/CollegeCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { FaGraduationCap, FaSpinner } from 'react-icons/fa';

const HomePage = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minFees: '',
    maxFees: ''
  });
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const fetchColleges = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit,
        ...(searchQuery && { search: searchQuery }),
        ...(filters.location && { location: filters.location }),
        ...(filters.type && { type: filters.type }),
        ...(filters.minFees && { minFees: filters.minFees }),
        ...(filters.maxFees && { maxFees: filters.maxFees }),
      };
      
      const response = await collegeService.getColleges(params);
      setColleges(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error('Failed to fetch colleges:', err);
      setError('Something went wrong while fetching colleges. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, searchQuery, filters]);

  // Reset pagination when search or filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Find Your Dream <span className="text-blue-600">College</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover top-rated institutions, compare fees and placements, and take the next step in your career journey.
        </p>
      </div>

      <SearchBar onSearch={setSearchQuery} initialValue={searchQuery} />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sidebar - Filters */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-24">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        {/* Right Content - College Grid */}
        <div className="w-full lg:w-3/4">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
              {error}
            </div>
          )}

          {loading ? (
            // Skeleton Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full animate-pulse">
                  <div className="h-48 bg-gray-200 w-full"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-5"></div>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="h-16 bg-gray-100 rounded"></div>
                      <div className="h-16 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-10 bg-gray-200 rounded flex-grow"></div>
                      <div className="h-10 w-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : colleges.length > 0 ? (
            <>
              {/* College Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition-colors"
                  >
                    Previous
                  </button>
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          page === i + 1 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <FaGraduationCap size={48} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No colleges found</h3>
              <p className="text-gray-500 max-w-md">
                We couldn't find any colleges matching your current search and filter criteria. Try adjusting them to see more results.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ location: '', type: '', minFees: '', maxFees: '' });
                }}
                className="mt-6 text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
