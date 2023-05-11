import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../CSS/Login.css";
import background from "../resources/parkimage.jpg"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { db } from "../db/dbInstance.js";

const app = db;
const auth = getAuth();

function Login() {
    const [loginfail, invalidlogin] = useState(false);
    const [email, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            invalidlogin(false);
            navigate("/MapPage", { state: { username: email } });
          })
          .catch((error) => {
            invalidlogin(true);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
          });
      };


      return (
        <div className="login-container" >
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              class="type-1"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
                id="password"
                type="password"
                placeholder="Password"
                class="type-1"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                />
            <a class="button1 btn-1" onClick={signIn}>Log in</a>
          <span>{loginfail ? 'Invalid username or password' : ''}</span>
        </div>
      );
    }
    
    export default Login;