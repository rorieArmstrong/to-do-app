import { useState, Fragment } from 'react'
import './App.css';

import { BrowserRouter as Router, Routes, Route, useLocation   } from 'react-router-dom';

import HomePage from './pages/HomePage';
import DailyHabits from './pages/DailyHabits';
import CoreBeliefs from './pages/CoreBeliefs';
import Gratitudes from './pages/Gratitudes';
import Journal from './pages/Journal';
import LongTermGoals from './pages/LongTermGoals';
import ShortTermGoals from './pages/ShortTermGoals';
import Visualisations from './pages/Visualisations'
import SignIn from './pages/SignIn';

function App() {

  return (
    <div className="App">
      <Router>

      <Fragment>
        <Routes >
          <Route exact path="/DailyHabits" element={<DailyHabits />} />
          <Route exact path="/CoreBeliefs" element={<CoreBeliefs/>}/>
          <Route exact path="/Gratitudes" element={<Gratitudes/>}/>
          <Route exact path="/Journal" element={<Journal/>}/>
          <Route exact path="/LongTermGoals" element={<LongTermGoals/>}/>
          <Route exact path="/ShortTermGoals" element={<ShortTermGoals/>}/>
          <Route exact path="/Visualisations" element={<Visualisations/>}/>
          <Route exact path='/SignIn' element={<SignIn/>} />
          <Route path="/" element={<HomePage />} />

        </Routes>
      </Fragment>
      </Router>
    </div>
  )
}

export default App
