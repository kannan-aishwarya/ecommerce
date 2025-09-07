import React from "react";
import ReactDOM from "react-dom/client";
import {auth}  from "../firebase";

import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../services/userService";

function Signup() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        navigate("/home");
        signUpUser(email);
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
                     <br />
                    <Link to="/">Return to Login</Link>
                </form>
            </div>
        </div>
    );

}


export default Signup;