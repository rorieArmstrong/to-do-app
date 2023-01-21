import React, { useState, useEffect } from 'react';
import './DailyHabits.css'
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, doc, addDoc, orderBy, where, deleteDoc, updateDoc,} from "firebase/firestore";
import { db } from "../firebase";

import cross from '../assets/remove-cross-icon.png'
import tick from '../assets/tick-symbol-icon.png'
import streakImg from '../assets/flame-icon.png'

function dailyHabits({user = {uid:''}}) {
    const [combination, setCombination] = useState({ configuration: 7, roundness: 1 })
    const navigate = useNavigate();

    const navigateTo = () => {
        setCombination({ configuration: 1, roundness: 4 })
        setTimeout(() => {navigate('/')},750)
        
    }

    const [dailyHabitsArray, setdailyHabitsArray] = useState([]);

    useEffect(() => {
        
    })
    window.scrollTo({
        bottom: 0
    })
    useEffect(() => {
        const q = query(collection(db, "dailyHabits"), orderBy("created", "desc"), where("uid", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
        let dailyHabitsDB = [];
        querySnapshot.forEach((doc) => {
            dailyHabitsDB.push({ ...doc.data(), id: doc.id });
        });
        setdailyHabitsArray(dailyHabitsDB);
        });
        return () => unsub();
    }, []);

    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== "") {
        await addDoc(collection(db, "dailyHabits"), {
            title: title,
            created: Date.now(),
            uid: user.uid,
            completedDate: null,
            streak: 0,
        });
            setTitle("");
        }
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "dailyHabits", id));
    };

    const handleComplete = async (id, streak, completedDate) => {
        await updateDoc(doc(db, "dailyHabits", id), { completedDate: Date.now(), streak: (1 == (Math.floor(Date.now()/(1000 * 3600 * 24))-Math.floor(completedDate/(1000 * 3600 * 24)))) ?streak+1:1});
    }

    return ( <div id='wrapper' data-configuration={combination.configuration} data-roundness={combination.roundness} >
        <div  className='shape'>
        </div>
        <div  className='shape'>
        </div>
        <div  className='shape'>
        </div>
        <div  className='shape'>
            <div>
                <h2 onClick={() => navigateTo()}>Daily Habits</h2>
            </div>
            <div className='content' id='dailyHabits-Content'>
                <form onSubmit={handleSubmit}>
                    <div className="input_container">
                        <input 
                            placeholder="What do you want to track?"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id='dailyHabits'
                        />
                    </div>
                    <div className="btn_container">
                        <button id='dailyHabits'>Add</button> :
                    </div>
                </form>
                {dailyHabitsArray.map(({id, title , streak, completedDate}) => {
                    return(
                        <div className='Content' id='dailyHabits' key={id}>
                            <div className='tile-with-buttons'>
                                {streak > 0? 
                                    <div className='habit-title'>
                                        <h4>{title}</h4>
                                        <div className='streak-container'>
                                            <img src={streakImg} alt='streak' className='button-img'/> 
                                            <h4>{' x' + streak} </h4>
                                        </div>
                                    </div>:
                                    <h4>{title}</h4>}
                                {! (0 == (Math.floor(Date.now()/(1000 * 3600 * 24))-Math.floor(completedDate/(1000 * 3600 * 24))))?
                                <div className='array-buttons-div'>
                                    <img src={tick} alt='complete' className='button-img' onClick={() => {handleComplete(id)}}/>
                                    <img src={cross} alt='delete' className='button-img' onClick={() => {handleDelete(id)}}/>
                                </div>:
                                <div className='array-buttons-div'>
                                    <img style={{"visibility": "hidden"}} src={tick} alt='complete' className='button-img' onClick={() => {handleComplete(id)}}/>
                                    <img src={cross} alt='delete' className='button-img' onClick={() => {handleDelete(id)}}/>
                                </div>}
                            </div>
                        </div>)
                }) }
            </div>
        </div>
        <div  className='shape'>
        </div>
        <div   className='shape'>
        </div>
        <div  className='shape'>
        </div>
    </div> );
}

export default dailyHabits;