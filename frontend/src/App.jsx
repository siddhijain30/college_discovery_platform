import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CompareBar from './components/CompareBar';
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import CollegeDetail from './pages/CollegeDetail';
import Compare from './pages/Compare';
import Predictor from './pages/Predictor';
import { CompareProvider } from './context/CompareContext';

function App() {
  return (
    <CompareProvider>
      <div className="min-h-screen bg-white font-sans text-text-primary flex flex-col">
        <Navbar />
        <main className="flex-grow relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/colleges/:id" element={<CollegeDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/predictor" element={<Predictor />} />
          </Routes>
        </main>
        <CompareBar />
      </div>
    </CompareProvider>
  );
}

export default App;
