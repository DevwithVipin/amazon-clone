import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { useStateValue } from '../Reducer/StateProvider';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ }, dispatch] = useStateValue();
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        window.alert("Sign Up Successful");
        dispatch({
          type: 'SET_USER',
          user: null
        });


        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Error in Signup");
        // ..
      });
  }

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          dispatch({
            type: 'SET_USER',
            user: userCredential.user
          });
          navigate('/')
        }

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Error In Sign In");
        // Handle sign-in error here
      });
  }
  const signOut = (e) => {

  }






  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign In</h1>

        <form>
          <h5>Apna Email</h5>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <h5>Apna Password</h5>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type='submit' onClick={signIn} className="login__signInButton">Sign In</button>
        </form>

        <p>By signing-in you agree to the APNI DUKAAN's Conditions of Use & Sale. Please see out <Link to='/privacy'>Privacy Notice</Link>, our Cookies Notice and our Intereset-Based Ads Notice.</p>

        <button onClick={register} className="login__registerButton">Create your Apna Account</button>
      </div>
    </div>
  );
}

export default Login;
