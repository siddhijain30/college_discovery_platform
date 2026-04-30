import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ChartBarIcon, ScaleIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/colleges');
    }
  };

  const features = [
    { title: "Discover", desc: "Browse 30+ top colleges", icon: AcademicCapIcon, link: "/colleges" },
    { title: "Compare", desc: "Side-by-side analysis", icon: ScaleIcon, link: "/compare" },
    { title: "Predict", desc: "Check your eligibility", icon: ChartBarIcon, link: "/predictor" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-light to-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Find Your Perfect <span className="text-primary">College</span>
        </h1>
        <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
          Discover, compare, and predict your chances at India's top engineering, medical, management, and arts institutions.
        </p>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative mb-12">
          <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary/20 focus-within:border-primary transition-all">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <MagnifyingGlassIcon className="h-6 w-6 text-primary" />
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-text-primary pr-2"
              type="text"
              id="search"
              placeholder="Search colleges by name (e.g. IIT Bombay)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            /> 
            <button 
              type="submit"
              className="h-full px-6 bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-text-secondary">
          <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-border-custom">🏆 30+ Top Colleges</span>
          <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-border-custom">📍 15+ States</span>
          <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-border-custom">📚 4 Streams</span>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-text-primary mb-12">How CampusIQ Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(feature.link)}
              className="bg-white p-8 rounded-2xl border border-border-custom text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="w-16 h-16 mx-auto bg-primary-light rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <feature.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
