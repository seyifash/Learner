import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import InputGenerator from "./inputGenerator";
import LabelGenerator from "./LabelGenerator";
import { authActions, getUser } from "../AuthReducer/AuthSlice";
import './signIn.css';

const SignIn = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const Auth = useSelector((state) => state.auth);
    const {error, isLoggedIn, userId } = Auth;
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(getUser(formData));
        
        if(userId){
        dispatch(authActions.loginUser(true))
        } 
        if(isLoggedIn){
            return  navigate("/dashboard");
        }
    } 
    return (
        <div className="signIn">
            <h1>Hello</h1>
            <h3>welcome Back Tutors</h3>
            <section className="section-signin">
                <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <LabelGenerator htmlFor="email" text="Email:" name={formData.email} />
                    <InputGenerator describedBy={'Euidnote'} handleChange={handleChange} formData={formData} userRef={userRef} Style={true} />

                    <LabelGenerator htmlFor="password" text="Password:" name={formData.password} />
                    <InputGenerator describedBy={'pwdnote'}  handleChange={handleChange} formData={formData} userRef={userRef} Style={true}/>
                    <button disabled={!formData.password || !formData.email ? true : false}>
                        Sign In
                    </button>
                </form>
                <p>
                    Not Yet registered?<br />
                    <span className="line">
                        <Link href="/sign-up">Sign Up</Link>
                    </span>
                </p>
            </section>
        </div>
    )
}

export default SignIn