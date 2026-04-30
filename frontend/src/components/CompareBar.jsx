import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompareContext } from '../context/CompareContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useContext(CompareContext);
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-custom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-4 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
          <span className="font-bold text-text-primary whitespace-nowrap">Compare ({compareList.length}/3)</span>
          <div className="flex gap-2">
            {compareList.map(college => (
              <div key={college.id} className="flex items-center bg-primary-light border border-border-custom rounded-full px-3 py-1 whitespace-nowrap">
                <span className="text-sm font-medium text-text-primary mr-2 truncate max-w-[100px]">
                  {college.name}
                </span>
                <button 
                  onClick={() => removeFromCompare(college.id)}
                  className="text-text-secondary hover:text-primary"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button 
            onClick={clearCompare}
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={() => navigate('/compare')}
            disabled={compareList.length < 2}
            className={`px-6 py-2 rounded-lg font-bold transition-colors whitespace-nowrap ${
              compareList.length >= 2 
                ? 'bg-primary text-white hover:bg-primary-dark shadow-sm' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
}
