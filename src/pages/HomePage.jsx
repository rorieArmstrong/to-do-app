import React, { useState, useEffect } from 'react';
import './HomePage.css'
import { useNavigate } from "react-router-dom";


function HomePage() {
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    
    const uniqueRand = (min, max, prev) => {
        let next = prev;
        
        while(prev === next) next = rand(min, max);
        
        return next;
    }

    const [combination, setCombination] = useState({ configuration: 1, roundness: 1 })
    const [prev, setPrev] = useState(0)
    const [transition, setTransition] = useState(true)
    const [navigating, setNavigating] = useState(false)

    const combinations = [
        { configuration: 1, roundness: 1 },
        { configuration: 1, roundness: 2 },
        { configuration: 1, roundness: 4 },
        { configuration: 2, roundness: 2 },
        { configuration: 2, roundness: 1 },
        { configuration: 3, roundness: 1 },
        { configuration: 3, roundness: 2 },
        { configuration: 3, roundness: 3 }
    ];

    useEffect(() => {
        const updateConfiguration = 
            setInterval(() => {
                if(transition && !navigating){
                    const index = uniqueRand(0, combinations.length - 1, prev)
                    setCombination(combinations[index]);
                    setPrev(index);
                }
            }, 2250);
        return () => {
            clearInterval(updateConfiguration)
        }

    })

    const navigate = useNavigate();

    const navigateTo = (to, config) => {
        setNavigating(true)
        setCombination({ configuration: config, roundness: 1 })
        setTimeout(() => {navigate(to)},750)
        
    }

    return ( <div id='wrapper' data-configuration={combination.configuration} data-roundness={combination.roundness} >
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} onClick={() => navigateTo("LongTermGoals", 4)} className='shape'>
            <h2>Long term goals</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} onClick={() => navigateTo("ShortTermGoals", 5)} className='shape'>
            <h2>Short term goals</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} onClick={() => navigateTo("CoreBeliefs", 6)} className='shape'>
            <h2>Core beliefs</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} onClick={() => navigateTo("DailyHabits", 7)} className='shape'>
            <h2>Daily Habits</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} onClick={() => navigateTo("Visualisations", 8)} className='shape'>
            <h2>Visualisation</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} onClick={() => navigateTo("Gratitudes", 9)} className='shape'>
            <h2>Gratitudes</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} onClick={() => navigateTo("Journal", 10)} className='shape'>
            <h2>Journal</h2>
        </div>
    </div> );
}

export default HomePage;