import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { CompareContext } from '../context/CompareContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { compareList } = useContext(CompareContext);

  const navLinks = [
    { name: 'Colleges', path: '/colleges' },
    { name: 'Compare', path: '/compare' },
    { name: 'Predictor', path: '/predictor' }
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-border-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="font-bold text-2xl text-primary">CampusIQ</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-text-primary hover:text-primary transition-colors font-medium">
                {link.name}
              </Link>
            ))}
            <Link to="/compare" className="relative p-2 text-text-secondary hover:text-primary transition-colors">
              <ScaleIcon className="h-6 w-6" />
              {compareList.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                  {compareList.length}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <Link to="/compare" className="relative p-2 mr-2 text-text-secondary">
              <ScaleIcon className="h-6 w-6" />
              {compareList.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                  {compareList.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-primary focus:outline-none"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border-custom bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-primary-light"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
