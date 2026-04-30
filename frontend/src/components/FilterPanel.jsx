import React, { useState, useEffect } from 'react';
import { collegeService } from '../services/api';
import { FaFilter, FaRedo } from 'react-icons/fa';

const COLLEGE_TYPES = [
  'Engineering',
  'Management',
  'Medical',
  'Arts',
  'Science',
  'Law',
  'Architecture',
];

const FilterPanel = ({ filters, setFilters }) => {
  const [locations, setLocations] = useState([]);
  const [localFilters, setLocalFilters] = useState(filters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await collegeService.getLocations();
        setLocations(response.data);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Update local filters when props change (e.g. from parent reset)
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    // Validate fees
    if (localFilters.minFees && localFilters.maxFees) {
      if (parseInt(localFilters.minFees) > parseInt(localFilters.maxFees)) {
        alert("Minimum fee cannot be greater than maximum fee.");
        return;
      }
    }
    setFilters(localFilters);
  };

  const resetFilters = () => {
    const defaultFilters = { location: '', type: '', minFees: '', maxFees: '' };
    setLocalFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FaFilter className="text-blue-600" /> Filters
        </h3>
        <button 
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
          title="Reset Filters"
        >
          <FaRedo size={12} /> Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* College Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">College Type</label>
          <select
            name="type"
            value={localFilters.type || ''}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-colors"
          >
            <option value="">All Types</option>
            {COLLEGE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location (State)</label>
          <select
            name="location"
            value={localFilters.location}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-colors"
            disabled={loading}
          >
            <option value="">All Locations</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Fees Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Fees (INR)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minFees"
              value={localFilters.minFees}
              onChange={handleChange}
              placeholder="Min"
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-colors"
              min="0"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              name="maxFees"
              value={localFilters.maxFees}
              onChange={handleChange}
              placeholder="Max"
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-colors"
              min="0"
            />
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={applyFilters}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
