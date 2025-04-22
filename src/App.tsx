import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FiiDetails from './pages/FiiDetails';
import Recommendations from './pages/Recommendations';
import Forecasts from './pages/Forecasts';
import About from './pages/About';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <BrowserRouter>
        <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fii/:symbol" element={<FiiDetails />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/forecasts" element={<Forecasts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;