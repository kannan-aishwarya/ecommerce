import React from "react";
import ReactDOM from "react-dom/client";
import {auth}  from "../firebase";

import "./signup.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
      })
      .catch((error) => {
       console.error("Error:", error.message);
      });
    }

    return (
        <div className="signup">
            <div className="container">
                <h1 className="header">Log In</h1>
                <form className="form">
                    <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br />
                    <input type="password" placeholder="Password" className="input-field" value={password} onChange={(p) => setPassword(p.target.value)} />
                    <br/>
                    <button type="submit" className="submit-button" onClick={handleSubmit}>Login</button>
                    <br />
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </form>
            </div>
        </div>
    );

}


export default Login;