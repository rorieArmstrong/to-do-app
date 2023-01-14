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

    const [todos, setTodos] = React.useState([]);

    React.useEffect(() => {
        const q = query(collection(db, "todos"));
        const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
            todosArray.push({ ...doc.data(), id: doc.id });
        });
        setTodos(todosArray);
        });
        return () => unsub();
    }, []);

    const handleEdit = async (todo, title) => {
        await updateDoc(doc(db, "todos", todo.id), { title: title });
    };
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
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