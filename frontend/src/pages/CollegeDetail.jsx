import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import StarRating from '../components/StarRating';
import { CompareContext } from '../context/CompareContext';
import { MapPinIcon, CalendarIcon, AcademicCapIcon, CurrencyRupeeIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // null | 'not_found' | 'server_error'
  const [activeTab, setActiveTab] = useState('Overview');
  
  const { addToCompare, compareList } = useContext(CompareContext);
  const isCompared = college && compareList.some(c => c.id === college.id);

  useEffect(() => {
    const fetchCollege = async () => {
      setError(null);
      try {
        const response = await api.get(`/colleges/${id}`);
        setCollege(response.data);
      } catch (err) {
        console.error('Error fetching college details:', err);
        if (err.response?.status === 404) {
          setError('not_found');
        } else {
          setError('server_error');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-text-secondary">Loading details...</div>;
  }

  if (error === 'not_found') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🏫</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">College not found</h2>
        <p className="text-text-secondary mb-6">The college you're looking for doesn't exist or may have been removed.</p>
        <a href="/colleges" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors">Browse Colleges</a>
      </div>
    );
  }

  if (error === 'server_error' || !college) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Something went wrong</h2>
        <p className="text-text-secondary mb-6">Failed to load college details. Please try again.</p>
        <button onClick={() => window.location.reload()} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors">Retry</button>
      </div>
    );
  }

  const tabs = ['Overview', 'Courses', 'Placements', 'Reviews'];

  // Mock data for charts
  const placementData = [
    { year: '2021', avg: college.avg_package * 0.8 },
    { year: '2022', avg: college.avg_package * 0.9 },
    { year: '2023', avg: college.avg_package }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-light to-white border-b border-border-custom pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{college.type}</span>
                {college.ranking && <span className="bg-white border border-border-custom text-text-primary text-xs font-bold px-3 py-1 rounded-full">NIRF Rank: {college.ranking}</span>}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-3">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-text-secondary text-sm font-medium">
                <span className="flex items-center gap-1"><MapPinIcon className="h-5 w-5 text-primary" /> {college.location}, {college.state}</span>
                <span className="flex items-center gap-1"><CalendarIcon className="h-5 w-5 text-primary" /> Estd. {college.established}</span>
                <span className="flex items-center gap-1"><StarRating rating={college.rating || 0} /></span>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={() => addToCompare(college)}
                disabled={isCompared}
                className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-bold border-2 transition-colors ${
                  isCompared 
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                    : 'bg-white text-primary border-primary hover:bg-primary-light'
                }`}
              >
                {isCompared ? 'Added to Compare' : '+ Add to Compare'}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white p-4 rounded-xl border border-border-custom shadow-sm">
              <p className="text-text-secondary text-xs font-semibold mb-1 uppercase tracking-wider">Fees / Year</p>
              <p className="text-xl font-bold text-text-primary flex items-center gap-1">
                <CurrencyRupeeIcon className="h-6 w-6 text-primary" />
                {college.fees_per_year?.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-border-custom shadow-sm">
              <p className="text-text-secondary text-xs font-semibold mb-1 uppercase tracking-wider">Placement Rate</p>
              <p className="text-xl font-bold text-text-primary flex items-center gap-1">
                <CheckBadgeIcon className="h-6 w-6 text-green-500" />
                {college.placement_percent}%
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-border-custom shadow-sm">
              <p className="text-text-secondary text-xs font-semibold mb-1 uppercase tracking-wider">Average Package</p>
              <p className="text-xl font-bold text-text-primary flex items-center gap-1">
                <CurrencyRupeeIcon className="h-6 w-6 text-primary" />
                {college.avg_package} LPA
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-border-custom shadow-sm">
              <p className="text-text-secondary text-xs font-semibold mb-1 uppercase tracking-wider">Total Students</p>
              <p className="text-xl font-bold text-text-primary flex items-center gap-1">
                <AcademicCapIcon className="h-6 w-6 text-primary" />
                {college.total_students?.toLocaleString('en-IN') || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border-custom sticky top-16 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">About {college.name}</h2>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {college.description || "Detailed description not available."}
                </p>
              </section>
            </div>
            <div className="space-y-6">
              <div className="bg-primary-light rounded-xl p-6 border border-border-custom">
                <h3 className="font-bold text-text-primary mb-4">Exams Accepted</h3>
                <div className="flex flex-wrap gap-2">
                  {college.exams_accepted?.map(exam => (
                    <span key={exam} className="bg-white border border-primary text-primary text-xs font-bold px-3 py-1 rounded-full">
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Courses' && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Offered Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {college.courses?.map(course => (
                <div key={course} className="border border-border-custom rounded-xl p-5 hover:border-primary transition-colors">
                  <h3 className="text-lg font-bold text-text-primary mb-2">{course}</h3>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Full Time</span>
                    <span className="font-semibold text-text-primary">₹{college.fees_per_year?.toLocaleString('en-IN')} / yr</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Placements' && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Placement Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                <p className="text-green-800 text-sm font-bold mb-1">Placement Rate</p>
                <p className="text-3xl font-bold text-green-600">{college.placement_percent}%</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
                <p className="text-blue-800 text-sm font-bold mb-1">Highest Package</p>
                <p className="text-3xl font-bold text-blue-600">{college.highest_package} LPA</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 text-center">
                <p className="text-orange-800 text-sm font-bold mb-1">Average Package</p>
                <p className="text-3xl font-bold text-orange-600">{college.avg_package} LPA</p>
              </div>
            </div>

            <div className="h-80 border border-border-custom rounded-xl p-4">
              <h3 className="text-center font-bold text-text-secondary mb-4">Average Package Trend (LPA)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={placementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#FFF4EF' }} />
                  <Bar dataKey="avg" fill="#FF6B35" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text-primary">Student Reviews</h2>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-text-primary">{college.rating}</span>
                <div className="flex flex-col">
                  <StarRating rating={college.rating || 0} />
                  <span className="text-xs text-text-secondary">{college.reviews?.length || 0} reviews</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {college.reviews && college.reviews.length > 0 ? (
                college.reviews.map(review => (
                  <div key={review.id} className="border border-border-custom rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-text-primary">{review.reviewer_name}</p>
                        <p className="text-xs text-text-secondary">Batch of {review.batch_year}</p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-text-secondary text-sm mb-4">"{review.review_text}"</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {review.pros && (
                        <div>
                          <p className="font-bold text-green-600 mb-1">Pros:</p>
                          <p className="text-text-secondary">{review.pros}</p>
                        </div>
                      )}
                      {review.cons && (
                        <div>
                          <p className="font-bold text-red-600 mb-1">Cons:</p>
                          <p className="text-text-secondary">{review.cons}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl">
                  <p className="text-text-secondary">No reviews available yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
