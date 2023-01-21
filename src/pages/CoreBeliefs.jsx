import React, { useState, useEffect } from 'react';
import './CoreBeliefs.css'
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, doc, addDoc, orderBy, where,} from "firebase/firestore";
import { db } from "../firebase";


function CoreBeliefs({user = {uid:''}}) {
    const [combination, setCombination] = useState({ configuration: 6, roundness: 1 })
    const navigate = useNavigate();

    const navigateTo = () => {
        setCombination({ configuration: 1, roundness: 4 })
        setTimeout(() => {navigate('/')},750)
        
    }

    const [CoreBeliefsArray, setCoreBeliefsArray] = useState([]);

    useEffect(() => {
        
    })
    window.scrollTo({
        bottom: 0
    })
    useEffect(() => {
        const q = query(collection(db, "CoreBeliefs"), orderBy("created", "desc"), where("uid", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
        let CoreBeliefsDB = [];
        querySnapshot.forEach((doc) => {
            CoreBeliefsDB.push({ ...doc.data(), id: doc.id });
        });
        setCoreBeliefsArray(CoreBeliefsDB);
        });
        return () => unsub();
    }, []);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (body !== "" && title !== "") {
        await addDoc(collection(db, "CoreBeliefs"), {
            title: title,
            body: body,
            created: Date.now(),
            uid: user.uid,
        });
            setBody("");
            setTitle("");
        }
    };

    const handleEdit = async (coreBeliefs, title) => {
        await updateDoc(doc(db, "todos", coreBeliefs.id), { title: title });
    };
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    };

    return ( <div id='wrapper' data-configuration={combination.configuration} data-roundness={combination.roundness} >
        <div  className='shape'>
        </div>
        <div  className='shape'>
        </div>
        <div  className='shape'>
            <div>
                <h2 onClick={() => navigateTo()}>Core Beliefs</h2>
            </div>
            <div className='content' id='CoreBeliefs-Content'>
                <form onSubmit={handleSubmit}>
                    <div className="input_container">
                        <input 
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id='CoreBeliefs'
                        />
                        <textarea
                            placeholder="Details ..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            id='CoreBeliefs'
                        />
                    </div>
                    <div className="btn_container">
                        <button id='CoreBeliefs'>Add</button>
                    </div>
                </form>
                {CoreBeliefsArray.map(({id, title , body}) => {
                    return(
                        <div className='Content' id='CoreBeliefs' key={id}>
                            <h4>{title}</h4>
                            <p>{body}</p>
                        </div>)
                }) }
            </div>
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

export default CoreBeliefs;