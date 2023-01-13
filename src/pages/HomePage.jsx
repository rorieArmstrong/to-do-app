import React, { useState, useEffect } from 'react';
import './HomePage.css'


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

    const combinations = [
        { configuration: 1, roundness: 1 },
        { configuration: 1, roundness: 2 },
        { configuration: 1, roundness: 4 },
        { configuration: 2, roundness: 2 },
        { configuration: 2, roundness: 1 },
        { configuration: 3, roundness: 3 }
    ];

    const updateConfiguration = () => {
        
    };

    useEffect(() => {
        const updateConfiguration = 
            setInterval(() => {
                if(transition){
                    const index = uniqueRand(0, combinations.length - 1, prev)
                    setCombination(combinations[index]);
                    setPrev(index);
                }
            }, 3000);
        return () => {
            clearInterval(updateConfiguration)
        }

    })

    return ( <div id='wrapper' data-configuration={combination.configuration} data-roundness={combination.roundness} >
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} className='shape'>
            <h2>Test</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} className='shape'>
            <h2>Test</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} className='shape'>
            <h2>Test</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} className='shape'>
            <h2>Test</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} className='shape'>
            <h2>Test</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} className='shape'>
            <h2>Test</h2>
        </div>
        <div onMouseEnter={() => setTransition(false)} onMouseLeave={() => setTransition(true)} className='shape'>
            <h2>Test</h2>
        </div>
    </div> );
}

export default HomePage;