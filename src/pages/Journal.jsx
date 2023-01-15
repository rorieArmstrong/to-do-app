import React, { useState, useEffect } from 'react';
import './Journal.css'
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, doc, addDoc, orderBy, where,} from "firebase/firestore";
import { db } from "../firebase";
import JournalEntry from '../components/JournalEntry';

function Journal({user} = {user:{uid:''}}) {
    const [combination, setCombination] = useState({ configuration: 10, roundness: 1 })
    const navigate = useNavigate();

    const navigateTo = () => {
        setCombination({ configuration: 1, roundness: 4 })
        setTimeout(() => {navigate('/')},750)
        
    }

    const [JournalArray, setJournalArray] = useState([]);

    useEffect(() => {
        
    })
    window.scrollTo({
        bottom: 0
    })
    useEffect(() => {
        const q = query(collection(db, "journal"), orderBy("created", "desc"), where("uid", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
        let JournalDB = [];
        querySnapshot.forEach((doc) => {
            JournalDB.push({ ...doc.data(), id: doc.id });
        });
        setJournalArray(JournalDB);
        });
        return () => unsub();
    }, []);

    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (body !== "") {
        await addDoc(collection(db, "journal"), {
            title: new Date().toLocaleDateString(),
            body: body,
            created: Date.now(),
            uid: user.uid,
        });
            setBody("");
        }
    };

    return ( <div id='wrapper' data-configuration={combination.configuration} data-roundness={combination.roundness} >
        <div   className='shape'>
        </div>
        <div   className='shape'>
        </div>
        <div   className='shape'>
        </div>
        <div   className='shape'>
        </div>
        <div   className='shape'>
        </div>
        <div   className='shape'>
        </div>
        <div   className='shape'>
            <div>
                <h2 onClick={() => navigateTo()}>Journal</h2>
            </div>
            <div className='content' id='Journal-Content'>
                <form onSubmit={handleSubmit}>
                    <div className="input_container">
                        <textarea
                            placeholder="My thoughts on today..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            id='Journal'
                        />
                    </div>
                    <div className="btn_container">
                        <button id='Journal'>Add</button>
                    </div>
                </form>
                {JournalArray.map(({id, title , body}) => {
                    return(
                    <JournalEntry 
                        key={id}
                        title={title}
                        body={body}
                    />)
                }) }
            </div>
        </div>
    </div> );
}

export default Journal;