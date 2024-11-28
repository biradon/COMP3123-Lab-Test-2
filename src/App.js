import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './Weather';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Weather />} />
    </Routes>
  </Router>
  );
}

export default App;
