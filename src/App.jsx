import { useState, Fragment } from 'react'
import './App.css';

import { BrowserRouter as Router, Routes, Route, useLocation   } from 'react-router-dom';

import HomePage from './pages/HomePage';
import DailyHabits from './pages/DailyHabits';

function App() {

  return (
    <div className="App">
      <Router>

      <Fragment>
        <Routes >
          <Route exact path="/DailyHabits" element={<DailyHabits />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Fragment>
      </Router>
    </div>
  )
}

export default App
