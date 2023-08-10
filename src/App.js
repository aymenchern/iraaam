import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import StationServiceTable from './components/StationServiceTable';

const App = () => {
  const [showTables, setShowTables] = useState(false);

  // Function to toggle between the landing page and main page
  const togglePage = () => {
    setShowTables(!showTables);
  };

  return (
    <div className="App">
      {showTables ? (
        <StationServiceTable />
      ) : (
        <LandingPage togglePage={togglePage} />
      )}
    </div>
  );
};

export default App;
