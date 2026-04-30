import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import StarRating from './StarRating';
import { CompareContext } from '../context/CompareContext';

export default function CollegeCard({ college }) {
  const { addToCompare, compareList } = useContext(CompareContext);
  const isCompared = compareList.some(c => c.id === college.id);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border-custom overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image Section */}
      <div className="h-48 w-full bg-gradient-to-br from-primary-light to-white relative flex items-center justify-center">
        {college.image_url && !imgError ? (
          <img
            src={college.image_url}
            alt={college.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <BuildingLibraryIcon className="h-16 w-16 text-primary opacity-50" />
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {college.type || 'College'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-text-primary truncate mb-1" title={college.name}>
          {college.name}
        </h3>
        
        <div className="flex items-center text-sm text-text-secondary mb-3">
          <MapPinIcon className="h-4 w-4 mr-1 text-primary" />
          <span className="truncate">{college.location}, {college.state}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <StarRating rating={college.rating || 0} />
          <div className="text-right">
            <p className="text-xs text-text-secondary">Fees/Year</p>
            <p className="font-semibold text-text-primary">
              ₹{college.fees_per_year?.toLocaleString('en-IN') || 'N/A'}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium border border-green-200">
            {college.placement_percent || 0}% Placed
          </span>
        </div>

        <div className="flex gap-2">
          <Link 
            to={`/colleges/${college.id}`}
            className="flex-1 bg-primary text-white text-center py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-1"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCompare(college)}
            disabled={isCompared}
            className={`px-4 py-2 rounded-lg font-medium border transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
              isCompared 
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-white text-primary border-primary hover:bg-primary-light'
            }`}
          >
            {isCompared ? 'Added' : '+ Compare'}
          </button>
        </div>
      </div>
    </div>
  );
}
