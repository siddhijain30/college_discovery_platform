import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  ScaleIcon,
  AcademicCapIcon,
  MapPinIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

/* ── Animated counter hook ── */
function useCounter(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

/* ── Feature cards data ── */
const features = [
  {
    icon: AcademicCapIcon,
    emoji: '🏛️',
    title: 'Smart College Discovery',
    desc: 'Browse 50+ top Indian colleges filtered by state, type, fees and ranking — all in one place.',
    link: '/colleges',
    color: 'from-orange-50 to-amber-50',
    border: 'border-orange-100',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    icon: ScaleIcon,
    emoji: '⚖️',
    title: 'Side-by-Side Comparison',
    desc: 'Compare up to 3 colleges on fees, placement, ratings and courses to make the right choice.',
    link: '/compare',
    color: 'from-blue-50 to-indigo-50',
    border: 'border-blue-100',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: ChartBarIcon,
    emoji: '📊',
    title: 'Admission Predictor',
    desc: 'Enter your marks and category to instantly predict your admission chances at top colleges.',
    link: '/predictor',
    color: 'from-green-50 to-emerald-50',
    border: 'border-green-100',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
];

/* ── How it works steps ── */
const steps = [
  { num: '01', title: 'Search & Filter', desc: 'Use powerful filters — state, type, fees — to narrow down your ideal college.', emoji: '🔍' },
  { num: '02', title: 'Compare Colleges', desc: 'Add colleges to comparison and view them side-by-side on key metrics.', emoji: '📋' },
  { num: '03', title: 'Predict & Apply', desc: 'Check eligibility with our predictor and click through to apply directly.', emoji: '🎯' },
];

/* ── College type quick-filters ── */
const streams = [
  { label: 'Engineering', emoji: '⚙️', type: 'Engineering' },
  { label: 'Medical', emoji: '🏥', type: 'Medical' },
  { label: 'Management', emoji: '💼', type: 'Management' },
  { label: 'Arts', emoji: '🎨', type: 'Arts' },
  { label: 'Science', emoji: '🔬', type: 'Science' },
  { label: 'Law', emoji: '⚖️', type: 'Law' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [collegesCount, collegesRef] = useCounter(51);
  const [statesCount, statesRef]   = useCounter(11);
  const [streamsCount, streamsRef] = useCounter(7);
  const [usersCount, usersRef]     = useCounter(5000);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/colleges?search=${encodeURIComponent(searchQuery)}`);
    else navigate('/colleges');
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 40%, #0F3460 100%)',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF6B35, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF9A6C, transparent)', transform: 'translate(-30%, 30%)' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #FF6B35, transparent)' }} />

        {/* Floating dots grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                50+ Colleges Listed & Growing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up">
                Find Your{' '}
                <span className="gradient-text">Perfect</span>
                <br />College in India
              </h1>

              <p className="text-lg text-white/70 mb-10 leading-relaxed animate-fade-in-up delay-100">
                Discover, compare, and predict your chances at India's top engineering, medical,
                management, and arts institutions — all in one place.
              </p>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="mb-8 animate-fade-in-up delay-200">
                <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-2xl h-14">
                  <div className="pl-4 pr-2">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search colleges — IIT, AIIMS, IIM…"
                    className="flex-1 h-full outline-none text-text-primary text-sm px-2 bg-transparent"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="h-full px-6 font-bold text-white text-sm rounded-r-2xl transition-colors"
                    style={{ background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)' }}
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Stream quick-links */}
              <div className="flex flex-wrap gap-2 animate-fade-in-up delay-300">
                {streams.map(s => (
                  <button
                    key={s.type}
                    onClick={() => navigate(`/colleges?type=${s.type}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full hover:bg-white/20 transition-colors"
                  >
                    <span>{s.emoji}</span> {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Visual card stack */}
            <div className="hidden lg:block relative animate-fade-in delay-400">
              {/* Main card */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl animate-float">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">🏛️</div>
                  <div>
                    <p className="font-bold text-text-primary">IIT Bombay</p>
                    <p className="text-xs text-text-secondary flex items-center gap-1">
                      <MapPinIcon className="h-3 w-3" /> Powai, Mumbai
                    </p>
                  </div>
                  <div className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">NIRF #3</div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[['₹2.4L', 'Fees/yr'], ['4.9★', 'Rating'], ['95%', 'Placed']].map(([val, label]) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="font-bold text-text-primary text-sm">{val}</p>
                      <p className="text-xs text-text-secondary">{label}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 rounded-xl text-white text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)' }}>
                  View Details →
                </button>
              </div>

              {/* Floating mini cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-orange-100">
                <p className="text-xs text-text-secondary mb-1">Match Score</p>
                <p className="text-2xl font-extrabold text-orange-500">87%</p>
                <div className="w-20 h-1.5 bg-gray-100 rounded-full mt-1">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" style={{ width: '87%' }} />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-blue-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">✅</div>
                <div>
                  <p className="text-xs font-bold text-text-primary">Eligible</p>
                  <p className="text-xs text-text-secondary">Based on your score</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: 60 }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { ref: collegesRef, val: collegesCount, suffix: '+', label: 'Colleges Listed', emoji: '🏛️' },
              { ref: statesRef,   val: statesCount,   suffix: '+', label: 'States Covered', emoji: '📍' },
              { ref: streamsRef,  val: streamsCount,  suffix: '',  label: 'Streams',         emoji: '📚' },
              { ref: usersRef,    val: usersCount,    suffix: '+', label: 'Students Helped', emoji: '👨‍🎓' },
            ].map(({ ref, val, suffix, label, emoji }) => (
              <div key={label} ref={ref} className="animate-scale-in">
                <div className="text-3xl mb-2">{emoji}</div>
                <p className="text-4xl font-extrabold text-text-primary">
                  {val}{suffix}
                </p>
                <p className="text-sm text-text-secondary mt-1 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Why CampusIQ?
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Decide Smarter</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Stop guessing. Use data-driven tools built specifically for Indian college admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                onClick={() => navigate(f.link)}
                className={`card-hover cursor-pointer bg-gradient-to-br ${f.color} border ${f.border} rounded-3xl p-8 animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={`w-14 h-14 ${f.iconBg} rounded-2xl flex items-center justify-center mb-6 text-2xl`}>
                  {f.emoji}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">{f.desc}</p>
                <div className={`flex items-center gap-2 text-sm font-bold ${f.iconColor}`}>
                  Explore <ArrowRightIcon className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200" />
            {steps.map((step, i) => (
              <div key={step.num} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="text-center">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 border-4 border-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)' }}>
                      {step.emoji}
                    </div>
                    <span className="absolute -top-1 -right-1 w-7 h-7 bg-text-primary text-white rounded-full text-xs font-bold flex items-center justify-center"
                      style={{ background: '#1A1A2E' }}>
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STREAM QUICK-ACCESS
      ═══════════════════════════════════════════ */}
      <section className="py-16 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary text-center mb-10">
            Browse by <span className="gradient-text">Stream</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {streams.map((s, i) => (
              <button
                key={s.type}
                onClick={() => navigate(`/colleges?type=${s.type}`)}
                className="card-hover flex flex-col items-center gap-3 bg-white rounded-2xl p-6 border border-border-custom text-center animate-scale-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="text-4xl">{s.emoji}</span>
                <span className="text-sm font-bold text-text-primary">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 animate-fade-in-up">
            Your Dream College<br />
            <span className="gradient-text">Awaits You</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 animate-fade-in-up delay-100">
            Join thousands of students who found their perfect fit using CampusIQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Link
              to="/colleges"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)' }}
            >
              Explore Colleges <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/predictor"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base border border-white/30 hover:bg-white/10 transition-colors"
            >
              Check Eligibility <ChartBarIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-14 opacity-60">
            {['Free to Use', 'No Registration Needed', 'Real College Data', 'Updated Regularly'].map(t => (
              <span key={t} className="flex items-center gap-2 text-white text-sm">
                <CheckCircleIcon className="h-4 w-4 text-green-400" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
