import React, { useState, useEffect } from 'react';
import './CoreBeliefs.css'
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc,} from "firebase/firestore";
import { db } from "../firebase";


function CoreBeliefs() {
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const [combination, setCombination] = useState({ configuration: 6, roundness: 1 })

    const navigate = useNavigate();

    const navigateTo = () => {
        setCombination({ configuration: 1, roundness: 1 })
        setTimeout(() => {navigate('/')},750)
        
    }

    const [coreBeliefs, setCoreBeliefs] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "core_beliefs"));
        const unsub = onSnapshot(q, (querySnapshot) => {
        let coreBeliefsArray = [];
        querySnapshot.forEach((doc) => {
            coreBeliefsArray.push({ ...doc.data(), id: doc.id });
        });
        setCoreBeliefs(coreBeliefsArray);
        });
        return () => unsub();
    }, []);

    const handleEdit = async (coreBeliefs, title) => {
        await updateDoc(doc(db, "todos", coreBeliefs.id), { title: title });
    };
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    };

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