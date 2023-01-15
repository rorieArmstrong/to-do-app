import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
 
const Signup = ({ setSignIn }) => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
        <div className='user-form-section'>                                                            
            <form className='user-form'>                                                                                            
                <div>
                    <label htmlFor="email-address">
                        Email address
                    </label>
                    <input
                        type="email"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  
                        required                                    
                        placeholder="Email address"                                
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        label="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required                                 
                        placeholder="Password"              
                    />
                </div>                                             
                <div className='button-div'>
                    
                    <button
                        type="submit" 
                        onClick={onSubmit}                        
                    >  
                        Sign up                                
                    </button>
                </div>
                                                                
            </form>
            
            <p>
                Already have an account?{' '}
            </p>
            <div className='button-div'>
                <button onClick={() => setSignIn(true)} >
                    Sign in
                </button>
            </div>                   
        </div>
  )
}
 
const Login = ({ setSignIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <div className='user-form-section'>
            <form className='user-form'>                                              
                <div>
                    <label htmlFor="email-address">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"                                    
                        required                                                                                
                        placeholder="Email address"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"                                    
                        required                                                                                
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                                    
                <div className='button-div'>
                    <button                                    
                        onClick={onLogin}                                        
                    >      
                        Login                                                                  
                    </button>
                </div>                               
            </form>
            
            <p className="text-sm text-white text-center">
                No account yet? {' '}
                
            </p>
            <div className='button-div'>
                <button className='button-div' onClick={() => setSignIn(false)}>
                    Sign up
                </button>
            </div>
                                        
        </div>
    )
}
 
function SignIn() {
    const [loggingIn, setLoggingIn]  = useState(true)
    const setSignIn = (value) => {
        setLoggingIn(value)
    }
    return ( <div className='LoginSection'>
        <h1 className='Title'>
            <span>H</span>
            <span>A</span>
            <span>B</span>
            <span>I</span>
            <span>T</span>
            <span>U</span>
            <span>A</span>
            <span>L</span>
        </h1>
        {loggingIn? <Login setSignIn={setSignIn}/> : <Signup setSignIn={setSignIn}/>}
    </div> );
}

export default SignIn;