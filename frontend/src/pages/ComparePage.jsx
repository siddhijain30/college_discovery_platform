import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collegeService } from '../services/api';
import { useCompare } from '../context/CompareContext';
import { FaTimes, FaBalanceScale, FaExclamationCircle, FaArrowRight } from 'react-icons/fa';

const ComparePage = () => {
  const { selectedColleges, removeCollege, clearCompare } = useCompare();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompareColleges = async () => {
      if (selectedColleges.length === 0) {
        setColleges([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await collegeService.compareColleges(selectedColleges);
        setColleges(response.data);
      } catch (err) {
        console.error('Failed to fetch comparison data:', err);
        setError('Failed to load colleges for comparison.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompareColleges();
  }, [selectedColleges]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (selectedColleges.length < 2 && !loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-2xl min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-blue-50 p-6 rounded-full mb-6">
          <FaBalanceScale size={64} className="text-blue-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Compare Colleges</h2>
        <p className="text-gray-600 mb-8 text-lg">
          {selectedColleges.length === 1 
            ? "You've added one college. Add at least one more to see a side-by-side comparison." 
            : "Select up to 3 colleges to compare their fees, placements, and features side-by-side."}
        </p>
        
        {selectedColleges.length === 1 && colleges.length === 1 && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between w-full max-w-md mx-auto mb-8">
            <div className="flex items-center gap-3">
              <img src={colleges[0].image_url} alt={colleges[0].name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="text-left">
                <p className="font-semibold text-gray-800 text-sm line-clamp-1">{colleges[0].name}</p>
                <p className="text-xs text-gray-500">{colleges[0].city}</p>
              </div>
            </div>
            <button 
              onClick={() => removeCollege(colleges[0].id)}
              className="text-red-500 hover:text-red-700 p-2"
            >
              <FaTimes />
            </button>
          </div>
        )}
        
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          Discover Colleges <FaArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBalanceScale className="text-blue-600" /> Compare Colleges
          </h1>
          <p className="text-gray-600 mt-2">Side-by-side comparison of your selected institutions.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            + Add more colleges
          </Link>
          <button 
            onClick={clearCompare}
            className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1"
          >
            <FaTimes /> Clear All
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 border border-red-200 flex items-center gap-2">
          <FaExclamationCircle /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 bg-gray-50 border-b border-gray-200 border-r w-1/4 align-top sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Features</div>
                </th>
                {colleges.map((college) => (
                  <th key={college.id} className="p-6 bg-white border-b border-gray-200 border-r min-w-[300px] w-1/4 align-top relative group">
                    <button 
                      onClick={() => removeCollege(college.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                      title="Remove from compare"
                    >
                      <FaTimes size={14} />
                    </button>
                    <div className="mb-4">
                      <img 
                        src={college.image_url} 
                        alt={college.name} 
                        className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-100" 
                      />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 leading-tight">
                      <Link to={`/college/${college.id}`} className="hover:text-blue-600 transition-colors">
                        {college.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{college.city}, {college.state}</p>
                    <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      {college.college_type}
                    </span>
                  </th>
                ))}
                {/* Empty columns to maintain layout if < 3 colleges */}
                {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                  <th key={`empty-${i}`} className="p-6 bg-gray-50/50 border-b border-gray-200 min-w-[300px] w-1/4 align-middle text-center">
                    <Link to="/" className="inline-flex flex-col items-center justify-center text-gray-400 hover:text-blue-600 transition-colors p-8 border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl w-full h-full min-h-[160px] bg-white">
                      <span className="text-3xl mb-2">+</span>
                      <span className="font-medium text-sm">Add College</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Rating */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-200 border-r bg-gray-50 font-medium text-gray-700 sticky left-0 z-10">Rating</td>
                {colleges.map((college) => (
                  <td key={college.id} className="p-4 border-b border-gray-200 border-r">
                    <div className="flex items-center gap-1 font-semibold text-gray-800">
                      <FaStar className="text-yellow-400" /> {college.rating} / 5.0
                    </div>
                  </td>
                ))}
                {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                  <td key={`empty-rating-${i}`} className="p-4 border-b border-gray-200 bg-gray-50/20"></td>
                ))}
              </tr>

              {/* Fees */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-200 border-r bg-gray-50 font-medium text-gray-700 sticky left-0 z-10">Annual Fees</td>
                {colleges.map((college) => (
                  <td key={college.id} className="p-4 border-b border-gray-200 border-r font-bold text-gray-900">
                    {formatCurrency(college.fees_per_year)}
                  </td>
                ))}
                {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                  <td key={`empty-fees-${i}`} className="p-4 border-b border-gray-200 bg-gray-50/20"></td>
                ))}
              </tr>

              {/* Placement % */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-200 border-r bg-gray-50 font-medium text-gray-700 sticky left-0 z-10">Placement Rate</td>
                {colleges.map((college) => (
                  <td key={college.id} className="p-4 border-b border-gray-200 border-r font-semibold text-blue-600">
                    {college.placement_percentage}%
                  </td>
                ))}
                {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                  <td key={`empty-placement-${i}`} className="p-4 border-b border-gray-200 bg-gray-50/20"></td>
                ))}
              </tr>

              {/* Highest Package */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-200 border-r bg-gray-50 font-medium text-gray-700 sticky left-0 z-10">Highest Package</td>
                {colleges.map((college) => (
                  <td key={college.id} className="p-4 border-b border-gray-200 border-r font-semibold text-green-600">
                    {formatCurrency(college.highest_package)}
                  </td>
                ))}
                {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                  <td key={`empty-highest-${i}`} className="p-4 border-b border-gray-200 bg-gray-50/20"></td>
                ))}
              </tr>

              {/* Average Package */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-200 border-r bg-gray-50 font-medium text-gray-700 sticky left-0 z-10">Average Package</td>
                {colleges.map((college) => (
                  <td key={college.id} className="p-4 border-b border-gray-200 border-r font-semibold text-indigo-600">
                    {formatCurrency(college.average_package)}
                  </td>
                ))}
                {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                  <td key={`empty-avg-${i}`} className="p-4 border-b border-gray-200 bg-gray-50/20"></td>
                ))}
              </tr>

              {/* Established */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-200 border-r bg-gray-50 font-medium text-gray-700 sticky left-0 z-10">Established Year</td>
                {colleges.map((college) => (
                  <td key={college.id} className="p-4 border-b border-gray-200 border-r text-gray-800">
                    {college.established_year}
                  </td>
                ))}
                {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                  <td key={`empty-est-${i}`} className="p-4 border-b border-gray-200 bg-gray-50/20"></td>
                ))}
              </tr>

              {/* Campus Size */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-200 border-r bg-gray-50 font-medium text-gray-700 sticky left-0 z-10">Campus Size</td>
                {colleges.map((college) => (
                  <td key={college.id} className="p-4 border-b border-gray-200 border-r text-gray-800">
                    {college.campus_size}
                  </td>
                ))}
                {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                  <td key={`empty-campus-${i}`} className="p-4 border-b border-gray-200 bg-gray-50/20"></td>
                ))}
              </tr>

              {/* Courses Count */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-gray-200 border-r bg-gray-50 font-medium text-gray-700 sticky left-0 z-10">Total Courses</td>
                {colleges.map((college) => (
                  <td key={college.id} className="p-4 border-gray-200 border-r text-gray-800">
                    {college.courses_offered ? college.courses_offered.length : 0} programs
                  </td>
                ))}
                {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                  <td key={`empty-courses-${i}`} className="p-4 border-gray-200 bg-gray-50/20"></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
