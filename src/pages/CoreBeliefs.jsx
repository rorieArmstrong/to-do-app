import React, { useState, useEffect } from 'react';
import './CoreBeliefs.css'
import { useNavigate } from "react-router-dom";


function CoreBeliefs() {
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    
    const uniqueRand = (min, max, prev) => {
        let next = prev;
        
        while(prev === next) next = rand(min, max);
        
        return next;
    }

    const [combination, setCombination] = useState({ configuration: 6, roundness: 1 })

    const navigate = useNavigate();

    const navigateTo = () => {
        setCombination({ configuration: 1, roundness: 1 })
        setTimeout(() => {navigate('/')},750)
        
    }

    return ( <div id='wrapper' data-configuration={combination.configuration} data-roundness={combination.roundness} >
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
            <h2>Core beliefs</h2>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
    </div> );
}

export default CoreBeliefs;