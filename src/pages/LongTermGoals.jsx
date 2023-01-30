import React, { useState, useEffect } from 'react';
import './LongTermGoals.css'
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, doc, addDoc, orderBy, where, deleteDoc, updateDoc,} from "firebase/firestore";
import { db } from "../firebase";

import edit from'../assets/edit-round-icon.png';
import cross from '../assets/remove-cross-icon.png'
import tick from '../assets/tick-symbol-icon.png'

function LongTermGoals({user = {uid:''}}) {
    const [combination, setCombination] = useState({ configuration: 4, roundness: 1 })
    const navigate = useNavigate();

    const navigateTo = () => {
        setCombination({ configuration: 1, roundness: 4 })
        setTimeout(() => {navigate('/')},750)
        
    }

    const [LongTermGoalsArray, setLongTermGoalsArray] = useState([]);

    useEffect(() => {
        
    })
    window.scrollTo({
        bottom: 0
    })
    useEffect(() => {
        const q = query(collection(db, "LongTermGoals"), orderBy("created", "desc"), where("uid", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
        let LongTermGoalsDB = [];
        querySnapshot.forEach((doc) => {
            LongTermGoalsDB.push({ ...doc.data(), id: doc.id });
        });
        setLongTermGoalsArray(LongTermGoalsDB);
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
        await addDoc(collection(db, "LongTermGoals"), {
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
        await updateDoc(doc(db, "LongTermGoals", id), { title: title, body: body });
        setBody("");
        setTitle("");
        setID('');
        setEditMode(false)
    };
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "LongTermGoals", id));
    };

    const handleComplete = async (id) => {
        await updateDoc(doc(db, "LongTermGoals", id), { completed:true, completedDate: new Date().toLocaleDateString()});
    }

    return ( <div id='wrapper' data-configuration={combination.configuration} data-roundness={combination.roundness} >
        <div  className='shape'>
        <div>
                <h2 onClick={() => navigateTo()}>Long Term Goals</h2>
            </div>
            <div className='content' id='LongTermGoals-Content'>
                <form onSubmit={editMode ? handleEdit : handleSubmit}>
                    <div className="input_container">
                        <input 
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id='LongTermGoals'
                        />
                        <textarea
                            placeholder="Write down the details of a goal that you want to achieve in 5 years..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            id='LongTermGoals'
                        />
                    </div>
                    <div className="btn_container">
                        { !editMode ? 
                            <button id='LongTermGoals'>Add</button> :
                        <div>
                            <button id='LongTermGoals'>Save</button>
                            <button id='LongTermGoals' onClick={() => {setEditMode(false);setBody('');setID('');setTitle('')}}>Cancel</button> 
                        </div>}
                    </div>
                </form>
                {LongTermGoalsArray.map(({id, title , body, completed, completedDate}) => {
                    return(
                        <div className='Content' id='LongTermGoals' key={id}>
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
        <div  className='shape'>
        </div>
        <div   className='shape'>
        </div>
        <div  className='shape'>
        </div>
    </div> );
}

export default LongTermGoals;