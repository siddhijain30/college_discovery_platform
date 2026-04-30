import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A2E] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎓</span>
              <span className="font-bold text-2xl text-[#FF6B35]">CampusIQ</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's smartest college discovery platform. Find, compare, and predict your dream college.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Twitter" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B35] transition-colors text-sm">𝕏</a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B35] transition-colors text-sm">📸</a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B35] transition-colors text-sm">in</a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Explore</h3>
            <ul className="space-y-3">
              {[
                { label: 'All Colleges', to: '/colleges' },
                { label: 'Engineering', to: '/colleges?type=Engineering' },
                { label: 'Medical', to: '/colleges?type=Medical' },
                { label: 'Management', to: '/colleges?type=Management' },
                { label: 'Arts & Science', to: '/colleges?type=Arts' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-gray-400 hover:text-[#FF6B35] transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Tools</h3>
            <ul className="space-y-3">
              {[
                { label: 'College Comparison', to: '/compare' },
                { label: 'Admission Predictor', to: '/predictor' },
                { label: 'College Rankings', to: '/colleges' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-gray-400 hover:text-[#FF6B35] transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span> support@campusiq.in
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span> Indore, India
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-gray-400 mb-2 font-semibold">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]"
                />
                <button className="bg-[#FF6B35] text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-[#E85D25] transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            © {year} CampusIQ. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-[#FF6B35] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FF6B35] transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
