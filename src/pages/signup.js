import React from "react";
import ReactDOM from "react-dom/client";
import {auth}  from "../firebase";

import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }

    return (
        <div className="signup">
            <div className="container">
                <h1 className="header">Sign Up</h1>
                <form className="form">
                    <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br />
                    <input type="password" placeholder="Password" className="input-field" value={password} onChange={(p) => setPassword(p.target.value)} />
                    <br/>
                    <button type="submit" className="submit-button" onClick={handleSubmit}>Register</button>
                </form>
            </div>
        </div>
    );

}


export default Signup;