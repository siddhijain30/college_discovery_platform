import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CompareContext } from '../context/CompareContext';
import { XMarkIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import StarRating from '../components/StarRating';

export default function Compare() {
  const { compareList, removeFromCompare } = useContext(CompareContext);
  const [bestCollege, setBestCollege] = useState(null);

  useEffect(() => {
    if (compareList.length >= 2) {
      // Calculate winner
      let maxScore = -1;
      let winner = null;

      compareList.forEach(college => {
        // (placement_percent * 0.4) + (rating * 20 * 0.3) + (package_score * 0.3)
        // package_score could be avg_package relative to fees, but we'll use a simple normalized score
        const placementScore = (college.placement_percent || 0) * 0.4;
        const ratingScore = ((college.rating || 0) * 20) * 0.3; // rating out of 5 -> 100
        const packageScore = Math.min((college.avg_package || 0) * 2, 100) * 0.3; // assume 50 LPA is max
        
        const feePenalty = (college.fees_per_year || 0) / 100000; // rough penalty

        const totalScore = placementScore + ratingScore + packageScore - feePenalty;
        
        if (totalScore > maxScore) {
          maxScore = totalScore;
          winner = college;
        }
      });
      setBestCollege(winner);
    } else {
      setBestCollege(null);
    }
  }, [compareList]);

  if (compareList.length < 2) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white p-10 rounded-2xl border border-border-custom shadow-sm">
          <ExclamationTriangleIcon className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">Select more colleges</h2>
          <p className="text-text-secondary mb-6">You need to select at least 2 colleges to compare them side-by-side.</p>
          <Link to="/colleges" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors inline-block">
            Browse Colleges
          </Link>
        </div>
      </div>
    );
  }

  // Find best values for highlighting
  const attributes = [
    { label: 'Location', key: 'location', type: 'text' },
    { label: 'Type', key: 'type', type: 'text' },
    { label: 'Annual Fees', key: 'fees_per_year', type: 'currency', lowerIsBetter: true },
    { label: 'Total Fees', key: 'total_fees', type: 'currency', lowerIsBetter: true },
    { label: 'NIRF Ranking', key: 'ranking', type: 'number', lowerIsBetter: true },
    { label: 'Rating', key: 'rating', type: 'stars', higherIsBetter: true },
    { label: 'Placement %', key: 'placement_percent', type: 'percent', higherIsBetter: true },
    { label: 'Avg Package', key: 'avg_package', type: 'lpa', higherIsBetter: true },
    { label: 'Highest Package', key: 'highest_package', type: 'lpa', higherIsBetter: true },
    { label: 'Established', key: 'established', type: 'text' },
  ];

  const getBestValue = (key, type, lowerIsBetter, higherIsBetter) => {
    if (!lowerIsBetter && !higherIsBetter) return null;
    
    let best = null;
    compareList.forEach(c => {
      const val = c[key];
      if (val === null || val === undefined) return;
      
      if (best === null) {
        best = val;
      } else if (lowerIsBetter && val < best) {
        best = val;
      } else if (higherIsBetter && val > best) {
        best = val;
      }
    });
    return best;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">Compare Colleges</h1>

      <div className="bg-white rounded-2xl border border-border-custom shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-r border-border-custom bg-gray-50 min-w-[150px] sticky left-0 z-10">
                  <span className="font-bold text-text-secondary">Attributes</span>
                </th>
                {compareList.map(college => (
                  <th key={college.id} className="p-4 border-b border-r border-border-custom min-w-[250px] text-center relative group">
                    <button 
                      onClick={() => removeFromCompare(college.id)}
                      className="absolute top-2 right-2 text-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                    <div className="h-16 w-16 mx-auto bg-primary-light rounded-full flex items-center justify-center mb-3">
                      {college.image_url ? (
                        <img src={college.image_url} alt="" className="h-full w-full object-cover rounded-full" />
                      ) : (
                        <span className="text-2xl">🎓</span>
                      )}
                    </div>
                    <Link to={`/colleges/${college.id}`} className="text-lg font-bold text-text-primary hover:text-primary transition-colors block truncate" title={college.name}>
                      {college.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr, idx) => {
                const bestValue = getBestValue(attr.key, attr.type, attr.lowerIsBetter, attr.higherIsBetter);
                
                return (
                  <tr key={attr.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 border-b border-r border-border-custom font-semibold text-text-primary sticky left-0 z-10 bg-inherit shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      {attr.label}
                    </td>
                    {compareList.map(college => {
                      const isBest = bestValue !== null && college[attr.key] === bestValue;
                      
                      let displayValue = college[attr.key] || 'N/A';
                      if (attr.type === 'currency' && college[attr.key]) displayValue = `₹${college[attr.key].toLocaleString('en-IN')}`;
                      if (attr.type === 'percent' && college[attr.key]) displayValue = `${college[attr.key]}%`;
                      if (attr.type === 'lpa' && college[attr.key]) displayValue = `${college[attr.key]} LPA`;
                      
                      return (
                        <td key={`${college.id}-${attr.key}`} className={`p-4 border-b border-r border-border-custom text-center transition-colors ${isBest ? 'bg-orange-50 font-bold text-primary' : 'text-text-secondary'}`}>
                          {attr.type === 'stars' && college[attr.key] ? (
                            <div className="flex justify-center"><StarRating rating={college[attr.key]} /></div>
                          ) : (
                            displayValue
                          )}
                          {isBest && <span className="block text-xs text-primary font-bold mt-1">Best</span>}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {bestCollege && (
        <div className="bg-gradient-to-r from-primary-light to-white p-8 rounded-2xl border border-primary/30 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white p-4 rounded-full shadow-md text-4xl">👑</div>
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2">
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
              Top Recommendation
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Based on our AI analysis of placement records, annual fees, and overall ratings, <strong className="text-primary">{bestCollege.name}</strong> offers the best Return on Investment (ROI) among your selected choices.
            </p>
          </div>
          <div className="ml-auto mt-4 md:mt-0 flex-shrink-0">
             <Link to={`/colleges/${bestCollege.id}`} className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors inline-block">
               View {bestCollege.name}
             </Link>
          </div>
        </div>
      )}
    </div>
  );
}
