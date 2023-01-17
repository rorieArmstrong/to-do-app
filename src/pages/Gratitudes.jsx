import React, { useState, useEffect } from 'react';
import './Gratitudes.css'
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, doc, addDoc, orderBy, where,} from "firebase/firestore";
import { db } from "../firebase";


function Gratitudes({user = {uid:''}}) {
    const [combination, setCombination] = useState({ configuration: 9, roundness: 1 })
    const navigate = useNavigate();

    const navigateTo = () => {
        setCombination({ configuration: 1, roundness: 4 })
        setTimeout(() => {navigate('/')},750)
        
    }

    const [GratitudesArray, setGratitudesArray] = useState([]);

    useEffect(() => {
        
    })
    window.scrollTo({
        bottom: 0
    })
    useEffect(() => {
        const q = query(collection(db, "Gratitudes"), orderBy("created", "desc"), where("uid", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
        let GratitudesDB = [];
        querySnapshot.forEach((doc) => {
            GratitudesDB.push({ ...doc.data(), id: doc.id });
        });
        setGratitudesArray(GratitudesDB);
        });
        return () => unsub();
    }, []);

    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (body !== "") {
        await addDoc(collection(db, "Gratitudes"), {
            title: new Date().toLocaleDateString(),
            body: body,
            created: Date.now(),
            uid: user.uid,
        });
            setBody("");
        }
    };

    return ( <div id='wrapper' data-configuration={combination.configuration} data-roundness={combination.roundness} >
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
        <div   className='shape'>
            <div>
                <h2 onClick={() => navigateTo()}>Gratitudes</h2>
            </div>
            <div className='content' id='Gratitudes-Content'>
                <form onSubmit={handleSubmit}>
                    <div className="input_container">
                        <textarea
                            placeholder="Today I am grateful for ..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            id='Gratitudes'
                        />
                    </div>
                    <div className="btn_container">
                        <button id='Gratitudes'>Add</button>
                    </div>
                </form>
                {GratitudesArray.map(({id, title , body}) => {
                    return(
                        <div className='Content' id='Gratitudes' key={id}>
                            <h4>{title}</h4>
                            <p>{body}</p>
                        </div>)
                }) }
            </div>
        </div>
        <div  onClick={() => navigateTo()} className='shape'>
        </div>
    </div> );
}

export default Gratitudes;