import React from 'react';

export default function FilterSidebar({ filters, setFilters, applyFilters, resetFilters }) {
  const states = [
    "Maharashtra", "Delhi", "Gujarat", "Tamil Nadu", "Rajasthan", 
    "Karnataka", "Uttar Pradesh", "West Bengal", "Puducherry", 
    "Jharkhand", "Telangana"
  ].sort();
  
  const types = ["Engineering", "Management", "Medical", "Arts", "Science", "Law", "Architecture"];

  const handleStateChange = (e) => setFilters({ ...filters, state: e.target.value });
  const handleTypeChange = (e) => setFilters({ ...filters, type: e.target.value });
  const handleFeeChange = (e) => setFilters({ ...filters, max_fees: e.target.value });

  return (
    <div className="bg-white p-5 rounded-xl border border-border-custom shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-text-primary">Filters</h2>
        <button onClick={resetFilters} className="text-sm text-primary hover:text-primary-dark font-medium">
          Reset All
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-text-primary mb-2">State</label>
        <select 
          value={filters.state} 
          onChange={handleStateChange}
          className="w-full border border-border-custom rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        >
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-text-primary mb-2">College Type</label>
        <select 
          value={filters.type} 
          onChange={handleTypeChange}
          className="w-full border border-border-custom rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        >
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-text-primary mb-2">
          Max Fees: ₹{parseInt(filters.max_fees || 2000000).toLocaleString('en-IN')}
        </label>
        <input 
          type="range" 
          min="10000" 
          max="2000000" 
          step="10000"
          value={filters.max_fees || 2000000} 
          onChange={handleFeeChange}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-text-secondary mt-1">
          <span>₹10K</span>
          <span>₹20L</span>
        </div>
      </div>

      <button 
        onClick={applyFilters}
        className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
