import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collegeService } from '../services/api';
import { useCompare } from '../context/CompareContext';
import { 
  FaMapMarkerAlt, FaStar, FaBuilding, FaCalendarAlt, FaCheckCircle, 
  FaArrowLeft, FaBalanceScale, FaRupeeSign, FaGraduationCap
} from 'react-icons/fa';

const DetailPage = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const { selectedColleges, toggleCollege } = useCompare();
  
  useEffect(() => {
    const fetchCollegeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await collegeService.getCollegeById(id);
        setCollege(response.data);
      } catch (err) {
        console.error('Failed to fetch college details:', err);
        setError(err.response?.status === 404 ? 'College not found.' : 'Failed to load college details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="container mx-auto px-4 py-12 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'College not found'}</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <FaArrowLeft /> Back to Colleges
        </Link>
      </div>
    );
  }

  const isSelected = selectedColleges.includes(college.id);
  const isDisabled = !isSelected && selectedColleges.length >= 3;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        <img 
          src={college.image_url || 'https://via.placeholder.com/1200x400?text=College+Campus'} 
          alt={college.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 lg:px-8 pb-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <FaArrowLeft size={14} /> Back to Search
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                    {college.college_type}
                  </span>
                  <div className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-semibold">
                    <FaStar className="text-yellow-400 mr-1.5" />
                    {college.rating} / 5.0
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
                  {college.name}
                </h1>
                <p className="text-lg text-gray-300 flex items-center gap-2">
                  <FaMapMarkerAlt /> {college.city}, {college.state}
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => toggleCollege(college.id)}
                  disabled={isDisabled}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    isSelected 
                      ? 'bg-white text-blue-600 shadow-lg' 
                      : isDisabled
                        ? 'bg-white/20 text-white/50 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                  }`}
                >
                  <FaBalanceScale />
                  {isSelected ? 'Added to Compare' : 'Add to Compare'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
              <div className="flex overflow-x-auto border-b border-gray-100 no-scrollbar">
                {['overview', 'courses', 'placements', 'facilities'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-sm font-semibold capitalize whitespace-nowrap transition-colors ${
                      activeTab === tab 
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' 
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                {/* Tab Content: Overview */}
                {activeTab === 'overview' && (
                  <div className="animate-fadeIn">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">About the Institute</h3>
                    <p className="text-gray-600 leading-relaxed mb-8">
                      {college.description || 'Detailed description not available for this institution.'}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                          <FaCalendarAlt size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Established</p>
                          <p className="font-semibold text-gray-800">{college.established_year || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                          <FaCheckCircle size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Accreditation</p>
                          <p className="font-semibold text-gray-800">{college.accreditation || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                          <FaBuilding size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Campus Size</p>
                          <p className="font-semibold text-gray-800">{college.campus_size || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                          <FaGraduationCap size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Total Students</p>
                          <p className="font-semibold text-gray-800">{college.total_students ? college.total_students.toLocaleString() : 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content: Courses */}
                {activeTab === 'courses' && (
                  <div className="animate-fadeIn">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Courses Offered</h3>
                    {college.courses_offered && college.courses_offered.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {college.courses_offered.map((course, idx) => (
                          <div key={idx} className="bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-lg text-gray-800 font-medium shadow-sm flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            {course}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Course information not available.</p>
                    )}
                  </div>
                )}

                {/* Tab Content: Placements */}
                {activeTab === 'placements' && (
                  <div className="animate-fadeIn">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8">Placement Statistics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
                        <div className="text-3xl font-extrabold text-blue-600 mb-2">{college.placement_percentage || 0}%</div>
                        <div className="text-sm text-gray-600 font-medium">Placement Rate</div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                        <div className="text-2xl font-extrabold text-green-600 mb-2">{formatCurrency(college.highest_package)}</div>
                        <div className="text-sm text-gray-600 font-medium">Highest Package</div>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-6 text-center border border-indigo-100">
                        <div className="text-2xl font-extrabold text-indigo-600 mb-2">{formatCurrency(college.average_package)}</div>
                        <div className="text-sm text-gray-600 font-medium">Average Package</div>
                      </div>
                    </div>

                    {/* Simple Bar Chart Representation */}
                    <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                      <h4 className="font-bold text-gray-800 mb-6">Salary Comparison</h4>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-gray-700">Highest Package</span>
                            <span className="font-bold text-gray-900">{formatCurrency(college.highest_package)}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-gray-700">Average Package</span>
                            <span className="font-bold text-gray-900">{formatCurrency(college.average_package)}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div 
                              className="bg-blue-500 h-3 rounded-full" 
                              style={{ width: `${Math.min(100, Math.max(10, (college.average_package / college.highest_package) * 100))}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content: Facilities */}
                {activeTab === 'facilities' && (
                  <div className="animate-fadeIn">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Campus Facilities</h3>
                    {college.facilities && college.facilities.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {college.facilities.map((facility, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <FaCheckCircle className="text-green-500 shrink-0" />
                            <span className="font-medium text-gray-700">{facility}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Facility information not available.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Action Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Admissions</h3>
              <p className="text-gray-500 text-sm mb-6">Get detailed information about fees, eligibility, and admission process.</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Annual Fees</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(college.fees_per_year)}</p>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition-colors">
                  Apply Now
                </button>
                <button className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 rounded-lg transition-colors">
                  Download Brochure
                </button>
              </div>

              <hr className="my-6 border-gray-100" />
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-gray-400 shrink-0" size={16} />
                <p>{college.location}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailPage;
