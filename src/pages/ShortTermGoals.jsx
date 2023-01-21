import React, { useState, useEffect } from 'react';
import './shortTermGoals.css'
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, doc, addDoc, orderBy, where, deleteDoc, updateDoc,} from "firebase/firestore";
import { db } from "../firebase";

import edit from'../assets/edit-round-icon.png';
import cross from '../assets/remove-cross-icon.png'
import tick from '../assets/tick-symbol-icon.png'

function shortTermGoals({user = {uid:''}}) {
    const [combination, setCombination] = useState({ configuration: 5, roundness: 1 })
    const navigate = useNavigate();

    const navigateTo = () => {
        setCombination({ configuration: 1, roundness: 4 })
        setTimeout(() => {navigate('/')},750)
        
    }

    const [shortTermGoalsArray, setshortTermGoalsArray] = useState([]);

    useEffect(() => {
        
    })
    window.scrollTo({
        bottom: 0
    })
    useEffect(() => {
        const q = query(collection(db, "shortTermGoals"), orderBy("created", "desc"), where("uid", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
        let shortTermGoalsDB = [];
        querySnapshot.forEach((doc) => {
            shortTermGoalsDB.push({ ...doc.data(), id: doc.id });
        });
        setshortTermGoalsArray(shortTermGoalsDB);
        });
        return () => unsub();
    }, []);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [id, setID] = useState('')
    const [editMode, setEditMode] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (body !== "" && title !== "") {
        await addDoc(collection(db, "shortTermGoals"), {
            title: title,
            body: body,
            created: Date.now(),
            uid: user.uid,
            completed: false,
            completedDate: '',
        });
            setBody("");
            setTitle("");
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "shortTermGoals", id), { title: title, body: body });
        setBody("");
        setTitle("");
        setID('');
        setEditMode(false)
    };
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "shortTermGoals", id));
    };

    const handleComplete = async (id) => {
        await updateDoc(doc(db, "shortTermGoals", id), { completed:true, completedDate: new Date().toLocaleDateString()});
    }

    return ( <div id='wrapper' data-configuration={combination.configuration} data-roundness={combination.roundness} >
        <div  className='shape'>
        </div>
        <div  className='shape'>
            <div>
                <h2 onClick={() => navigateTo()}>short Term Goals</h2>
            </div>
            <div className='content' id='shortTermGoals-Content'>
                <form onSubmit={editMode ? handleEdit : handleSubmit}>
                    <div className="input_container">
                        <input 
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id='shortTermGoals'
                        />
                        <textarea
                            placeholder="Write down the details of a goal that yo want to achieve within the next year..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            id='shortTermGoals'
                        />
                    </div>
                    <div className="btn_container">
                        { !editMode ? 
                            <button id='shortTermGoals'>Add</button> :
                        <div>
                            <button id='shortTermGoals'>Save</button>
                            <button id='shortTermGoals' onClick={() => {setEditMode(false);setBody('');setID('');setTitle('')}}>Cancel</button> 
                        </div>}
                    </div>
                </form>
                {shortTermGoalsArray.map(({id, title , body, completed, completedDate}) => {
                    return(
                        <div className='Content' id='shortTermGoals' key={id}>
                            <div className='tile-with-buttons'>
                                <h4>{title + " " + (completed? "- completed: " + completedDate :"")}</h4>
                                {!completed?
                                <div className='array-buttons-div'>
                                    <img src={edit} alt='edit' className='button-img' onClick={() => {setEditMode(true);setBody(body);setID(id);setTitle(title)}}/>
                                    <img src={tick} alt='complete' className='button-img' onClick={() => {handleComplete(id)}}/>
                                    <img src={cross} alt='delete' className='button-img' onClick={() => {handleDelete(id)}}/>
                                </div>:
                                <div className='array-buttons-div-complete'>
                                    <img src={cross} alt='delete' className='button-img' onClick={() => {handleDelete(id)}}/>
                                </div>}
                            </div>
                            
                            <p>{body}</p>
                        </div>)
                }) }
            </div>
        </div>
        <div  className='shape'>
        </div>
        <div  className='shape'>
        </div>
        <div  className='shape'>
        </div>
        <div   className='shape'>
        </div>
        <div  className='shape'>
        </div>
    </div> );
}

export default shortTermGoals;