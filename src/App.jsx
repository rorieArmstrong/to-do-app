import { useEffect, useState, Fragment } from 'react'
import './App.css';
import { auth } from './firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [ user, setUser ] = useState({uid:''})
  console.log(user)
  useEffect(()=>  {
    const auth = getAuth();
    setUser(auth.currentUser);
    
    if (!user.uid) {
      navigate('/SignIn')
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(auth.currentUser)
        } else {
          navigate('/SignIn')
        }
      });
     
  }, [])

  return (
    <div className="App">

      <Fragment>
        <Routes >
          <Route exact path="/DailyHabits" element={<DailyHabits  user={user} />} />
          <Route exact path="/CoreBeliefs" element={<CoreBeliefs user={user} />}/>
          <Route exact path="/Gratitudes" element={<Gratitudes user={user} />}/>
          <Route exact path="/Journal" element={<Journal user={user} />}/>
          <Route exact path="/LongTermGoals" element={<LongTermGoals user={user} />}/>
          <Route exact path="/ShortTermGoals" element={<ShortTermGoals user={user} />}/>
          <Route exact path="/Visualisations" element={<Visualisations user={user} />}/>
          <Route exact path='/SignIn' element={<SignIn/>} />
          <Route path="/" element={<HomePage  user={user} />} />

        </Routes>
      </Fragment>
    </div>
  )
}

export default App
