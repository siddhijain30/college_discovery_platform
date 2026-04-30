import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { ChartBarIcon, DocumentTextIcon, CheckBadgeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Predictor() {
  const [exam, setExam] = useState('JEE Main');
  const [rank, setRank] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const exams = [
    { id: 'JEE Main', label: 'JEE Main (Rank)' },
    { id: 'JEE Advanced', label: 'JEE Advanced (Rank)' },
    { id: 'CAT', label: 'CAT (Percentile)' }
  ];

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!rank || isNaN(rank) || rank <= 0) {
      setError('Please enter a valid rank/percentile.');
      return;
    }
    if (exam === 'CAT' && (rank > 100)) {
      setError('CAT percentile cannot be greater than 100.');
      return;
    }

    setError('');
    setLoading(true);
    setResults(null);

    try {
      const response = await api.post('/predictor', { exam, rank: parseFloat(rank) });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ResultCard = ({ college, isBorderline }) => (
    <div className={`bg-white rounded-xl border-2 p-5 ${isBorderline ? 'border-orange-200 shadow-[0_4px_12px_rgba(255,107,53,0.1)]' : 'border-green-200 shadow-[0_4px_12px_rgba(34,197,94,0.1)]'} transition-all hover:-translate-y-1`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary mb-1">{college.name}</h3>
          <p className="text-sm text-text-secondary">{college.location}, {college.state}</p>
        </div>
        <span className="bg-white border border-border-custom text-xs font-bold px-2 py-1 rounded">
          {exam === 'CAT' ? `Cutoff: ${college.cat_cutoff_percentile}%ile` : `Cutoff: ${college.jee_cutoff_rank}`}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>Your {exam === 'CAT' ? 'Percentile' : 'Rank'}</span>
          <span className="font-bold text-text-primary">{rank}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          {/* Simple progress bar logic for visual gap */}
          <div 
            className={`h-2 rounded-full ${isBorderline ? 'bg-orange-400' : 'bg-green-500'}`}
            style={{ width: isBorderline ? '85%' : '100%' }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className={`font-semibold flex items-center gap-1 ${isBorderline ? 'text-orange-600' : 'text-green-600'}`}>
          {isBorderline ? <ExclamationTriangleIcon className="h-4 w-4" /> : <CheckBadgeIcon className="h-4 w-4" />}
          {isBorderline ? 'Borderline Chance' : 'High Chance'}
        </span>
        <Link to={`/colleges/${college.id}`} className="text-primary hover:text-primary-dark font-bold underline">
          View College
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
          <ChartBarIcon className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-3">College Admission Predictor</h1>
        <p className="text-text-secondary">Enter your exam score to discover which colleges you are eligible for based on previous year cutoffs.</p>
      </div>

      <div className="bg-white rounded-2xl border-t-4 border-t-primary shadow-lg p-6 md:p-10 mb-12">
        <form onSubmit={handlePredict}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            <div>
              <label className="block text-sm font-bold text-text-primary mb-4">Select Exam</label>
              <div className="space-y-3">
                {exams.map(e => (
                  <label 
                    key={e.id}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
                      exam === e.id ? 'border-primary bg-primary-light' : 'border-border-custom hover:border-gray-300'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="exam" 
                      value={e.id} 
                      checked={exam === e.id}
                      onChange={(e) => setExam(e.target.value)}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <div className="ml-3 flex items-center gap-2">
                      <DocumentTextIcon className={`h-5 w-5 ${exam === e.id ? 'text-primary' : 'text-text-secondary'}`} />
                      <span className={`font-semibold ${exam === e.id ? 'text-text-primary' : 'text-text-secondary'}`}>
                        {e.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-4">
                Enter Your {exam === 'CAT' ? 'Percentile' : 'Rank'}
              </label>
              <input 
                type="number"
                step={exam === 'CAT' ? "0.01" : "1"}
                min="0"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full text-2xl font-bold text-text-primary p-4 border-2 border-border-custom rounded-xl focus:border-primary focus:ring-0 outline-none transition-colors"
                placeholder={exam === 'CAT' ? "e.g. 95.5" : "e.g. 1500"}
              />
              <p className="text-xs text-text-secondary mt-3 bg-gray-50 p-3 rounded-lg border border-border-custom">
                ℹ️ Results are based on historical cutoffs. This is an estimation and does not guarantee admission.
              </p>
            </div>

          </div>

          {error && <p className="text-red-500 text-sm font-bold mb-4 text-center">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? 'Analyzing Data...' : 'Find My Colleges'}
          </button>
        </form>
      </div>

      {results && (
        <div className="animate-fade-in-up">
          {/* Eligible */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <CheckBadgeIcon className="h-6 w-6 text-green-500" />
              ✅ You Are Eligible ({results.eligible.length})
            </h2>
            {results.eligible.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.eligible.map(college => <ResultCard key={college.id} college={college} isBorderline={false} />)}
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-xl border border-border-custom text-center text-text-secondary">
                No high-chance colleges found for this rank/percentile.
              </div>
            )}
          </div>

          {/* Borderline */}
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-500" />
              ⚡ Borderline — You May Qualify ({results.borderline.length})
            </h2>
            {results.borderline.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.borderline.map(college => <ResultCard key={college.id} college={college} isBorderline={true} />)}
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-xl border border-border-custom text-center text-text-secondary">
                No borderline colleges found for this rank/percentile.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
