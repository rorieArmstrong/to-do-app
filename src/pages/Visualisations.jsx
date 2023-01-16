import React, { useState, useEffect } from 'react';
import './Visualisations.css'
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, doc, addDoc, orderBy, where,} from "firebase/firestore";
import { db } from "../firebase";

function Visualisations({user} = {user:{uid:''}}) {
    const [combination, setCombination] = useState({ configuration: 8, roundness: 1 })
    const navigate = useNavigate();

    const navigateTo = () => {
        setCombination({ configuration: 1, roundness: 4 })
        setTimeout(() => {navigate('/')},750)
        
    }

    const [VisualisationsArray, setVisualisationsArray] = useState([]);

    useEffect(() => {
        
    })
    window.scrollTo({
        bottom: 0
    })
    useEffect(() => {
        const q = query(collection(db, "visualisations"), orderBy("created", "desc"), where("uid", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
        let visualisationsDB = [];
        querySnapshot.forEach((doc) => {
            visualisationsDB.push({ ...doc.data(), id: doc.id });
        });
        setVisualisationsArray(visualisationsDB);
        });
        return () => unsub();
    }, []);

    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (body !== "") {
        await addDoc(collection(db, "visualisations"), {
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
        <div>
                <h2 onClick={() => navigateTo()}>Visualisations</h2>
            </div>
            <div className='content' id='Visualisations-Content'>
                <form onSubmit={handleSubmit}>
                    <div className="input_container">
                        <textarea
                            placeholder="Try to imagine how you want the day to play out..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            id='Visualisations'
                        />
                    </div>
                    <div className="btn_container">
                        <button id='Visualisations'>Add</button>
                    </div>
                </form>
                {VisualisationsArray.map(({id, title , body}) => {
                    return(
                        <div className='Content' id='Visualisations' key={id}>
                            <h4>{title}</h4>
                            <p>{body}</p>
                        </div>)
                }) }
            </div>
        </div>
        <div   className='shape'>
        </div>
        <div   className='shape'>
            
        </div>
    </div> );
}

export default Visualisations;